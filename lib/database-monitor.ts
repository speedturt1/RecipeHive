
import { PrismaClient } from '@prisma/client';
import RedisManager from './redis';

interface DatabaseMetrics {
  activeConnections: number;
  slowQueries: any[];
  tableStats: any[];
  indexUsage: any[];
  cacheHitRatio: number;
  avgQueryTime: number;
  errorRate: number;
}

interface PerformanceAlert {
  type: 'slow_query' | 'high_connections' | 'low_cache_hit' | 'high_error_rate';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  value: number;
  threshold: number;
  timestamp: Date;
}

class DatabaseMonitor {
  private static instance: DatabaseMonitor;
  private prisma: PrismaClient;
  private redis: RedisManager;
  private alertThresholds: Record<string, number>;
  private monitoringInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.prisma = new PrismaClient();
    this.redis = RedisManager.getInstance();
    
    this.alertThresholds = {
      maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '80'),
      slowQueryMs: parseInt(process.env.DB_SLOW_QUERY_MS || '1000'),
      minCacheHitRatio: parseFloat(process.env.DB_MIN_CACHE_HIT || '0.85'),
      maxErrorRate: parseFloat(process.env.DB_MAX_ERROR_RATE || '0.05'),
      maxAvgQueryTime: parseInt(process.env.DB_MAX_AVG_QUERY_MS || '500'),
    };
  }

  public static getInstance(): DatabaseMonitor {
    if (!DatabaseMonitor.instance) {
      DatabaseMonitor.instance = new DatabaseMonitor();
    }
    return DatabaseMonitor.instance;
  }

  async getActiveConnections(): Promise<number> {
    try {
      const result = await this.prisma.$queryRaw<[{ count: number }]>`
        SELECT COUNT(*) as count 
        FROM pg_stat_activity 
        WHERE state = 'active' AND datname = current_database()
      `;
      return result[0]?.count || 0;
    } catch (error) {
      console.error('Error getting active connections:', error);
      return 0;
    }
  }

  async getSlowQueries(limit: number = 10): Promise<any[]> {
    try {
      const result = await this.prisma.$queryRaw<any[]>`
        SELECT 
          query,
          calls,
          total_time,
          mean_time,
          rows,
          100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
        FROM pg_stat_statements 
        WHERE mean_time > ${this.alertThresholds.slowQueryMs}
        ORDER BY mean_time DESC 
        LIMIT ${limit}
      `;
      return result;
    } catch (error) {
      console.error('Error getting slow queries:', error);
      return [];
    }
  }

  async getTableStatistics(): Promise<any[]> {
    try {
      const result = await this.prisma.$queryRaw<any[]>`
        SELECT 
          schemaname,
          tablename,
          n_tup_ins as inserts,
          n_tup_upd as updates,
          n_tup_del as deletes,
          n_tup_hot_upd as hot_updates,
          n_live_tup as live_tuples,
          n_dead_tup as dead_tuples,
          last_vacuum,
          last_autovacuum,
          last_analyze,
          last_autoanalyze
        FROM pg_stat_user_tables 
        ORDER BY n_live_tup DESC
        LIMIT 20
      `;
      return result;
    } catch (error) {
      console.error('Error getting table statistics:', error);
      return [];
    }
  }

  async getIndexUsage(): Promise<any[]> {
    try {
      const result = await this.prisma.$queryRaw<any[]>`
        SELECT 
          schemaname,
          tablename,
          indexname,
          idx_tup_read,
          idx_tup_fetch,
          idx_scan,
          CASE WHEN idx_scan = 0 THEN 0 
               ELSE round((idx_tup_fetch::numeric / idx_scan), 2) 
          END as avg_tuples_per_scan
        FROM pg_stat_user_indexes 
        ORDER BY idx_scan DESC
        LIMIT 20
      `;
      return result;
    } catch (error) {
      console.error('Error getting index usage:', error);
      return [];
    }
  }

  async getCacheHitRatio(): Promise<number> {
    try {
      const result = await this.prisma.$queryRaw<[{ ratio: number }]>`
        SELECT 
          ROUND(
            100.0 * SUM(blks_hit) / (SUM(blks_hit) + SUM(blks_read)), 2
          ) as ratio
        FROM pg_stat_database
        WHERE datname = current_database()
      `;
      return result[0]?.ratio || 0;
    } catch (error) {
      console.error('Error getting cache hit ratio:', error);
      return 0;
    }
  }

  async getAverageQueryTime(): Promise<number> {
    try {
      const result = await this.prisma.$queryRaw<[{ avg_time: number }]>`
        SELECT ROUND(AVG(mean_time), 2) as avg_time
        FROM pg_stat_statements
        WHERE calls > 10
      `;
      return result[0]?.avg_time || 0;
    } catch (error) {
      console.error('Error getting average query time:', error);
      return 0;
    }
  }

  async collectMetrics(): Promise<DatabaseMetrics> {
    const [
      activeConnections,
      slowQueries,
      tableStats,
      indexUsage,
      cacheHitRatio,
      avgQueryTime
    ] = await Promise.all([
      this.getActiveConnections(),
      this.getSlowQueries(),
      this.getTableStatistics(),
      this.getIndexUsage(),
      this.getCacheHitRatio(),
      this.getAverageQueryTime()
    ]);

    const metrics: DatabaseMetrics = {
      activeConnections,
      slowQueries,
      tableStats,
      indexUsage,
      cacheHitRatio,
      avgQueryTime,
      errorRate: 0 // Would need application-level error tracking
    };

    // Cache metrics in Redis
    await this.redis.setSession('db:metrics:latest', metrics, 300);

    return metrics;
  }

  checkForAlerts(metrics: DatabaseMetrics): PerformanceAlert[] {
    const alerts: PerformanceAlert[] = [];

    // High connections alert
    if (metrics.activeConnections > this.alertThresholds.maxConnections) {
      alerts.push({
        type: 'high_connections',
        severity: metrics.activeConnections > this.alertThresholds.maxConnections * 1.2 ? 'critical' : 'high',
        message: `High number of active database connections: ${metrics.activeConnections}`,
        value: metrics.activeConnections,
        threshold: this.alertThresholds.maxConnections,
        timestamp: new Date()
      });
    }

    // Low cache hit ratio alert
    if (metrics.cacheHitRatio < this.alertThresholds.minCacheHitRatio * 100) {
      alerts.push({
        type: 'low_cache_hit',
        severity: metrics.cacheHitRatio < this.alertThresholds.minCacheHitRatio * 80 ? 'critical' : 'medium',
        message: `Low database cache hit ratio: ${metrics.cacheHitRatio}%`,
        value: metrics.cacheHitRatio,
        threshold: this.alertThresholds.minCacheHitRatio * 100,
        timestamp: new Date()
      });
    }

    // Slow queries alert
    if (metrics.slowQueries.length > 0) {
      const worstQuery = metrics.slowQueries[0];
      alerts.push({
        type: 'slow_query',
        severity: worstQuery.mean_time > this.alertThresholds.slowQueryMs * 2 ? 'high' : 'medium',
        message: `Slow query detected: ${worstQuery.mean_time}ms average`,
        value: worstQuery.mean_time,
        threshold: this.alertThresholds.slowQueryMs,
        timestamp: new Date()
      });
    }

    return alerts;
  }

  async sendAlert(alert: PerformanceAlert): Promise<void> {
    console.warn(`🚨 Database Alert [${alert.severity.toUpperCase()}]: ${alert.message}`);
    
    // Store alert in Redis for dashboard
    await this.redis.bufferAnalyticsEvent({
      type: 'database_alert',
      alert,
      timestamp: new Date()
    });

    // In production, you would send to monitoring service
    // await this.sendToMonitoringService(alert);
  }

  async startMonitoring(intervalMs: number = 60000): Promise<void> {
    console.log('🔍 Starting database monitoring...');
    
    const monitor = async () => {
      try {
        const metrics = await this.collectMetrics();
        const alerts = this.checkForAlerts(metrics);
        
        // Send alerts if any
        for (const alert of alerts) {
          await this.sendAlert(alert);
        }
        
        // Log periodic status
        if (Date.now() % (300000) < intervalMs) { // Every 5 minutes
          console.log(`📊 Database Status: ${metrics.activeConnections} connections, ${metrics.cacheHitRatio}% cache hit, ${metrics.avgQueryTime}ms avg query`);
        }
        
      } catch (error) {
        console.error('Database monitoring error:', error);
      }
    };

    // Initial check
    await monitor();
    
    // Schedule periodic monitoring
    this.monitoringInterval = setInterval(monitor, intervalMs);
  }

  async stopMonitoring(): Promise<void> {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      console.log('⏹️  Database monitoring stopped');
    }
  }

  async getMetricsHistory(hours: number = 24): Promise<any[]> {
    const key = 'db:metrics:history';
    try {
      const cached = await this.redis.getSession(key);
      return cached || [];
    } catch (error) {
      console.error('Error getting metrics history:', error);
      return [];
    }
  }

  async optimizeDatabase(): Promise<void> {
    console.log('🔧 Running database optimization...');
    
    try {
      // Update table statistics
      await this.prisma.$executeRaw`ANALYZE`;
      
      // Vacuum dead tuples
      await this.prisma.$executeRaw`VACUUM`;
      
      // Reindex critical tables
      const criticalTables = ['users', 'recipes', 'recipe_saves', 'user_activity_logs'];
      
      for (const table of criticalTables) {
        await this.prisma.$executeRawUnsafe(`REINDEX TABLE ${table}`);
      }
      
      console.log('✅ Database optimization completed');
    } catch (error) {
      console.error('Database optimization failed:', error);
      throw error;
    }
  }
}

export default DatabaseMonitor;
