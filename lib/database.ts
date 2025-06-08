
import { PrismaClient } from '@prisma/client';

interface DatabaseConfig {
  url: string;
  maxConnections: number;
  connectionTimeout: number;
  queryTimeout: number;
  enableLogging: boolean;
}

class DatabaseManager {
  private static instance: DatabaseManager;
  private clients: Map<string, PrismaClient> = new Map();
  private configs: Map<string, DatabaseConfig> = new Map();

  private constructor() {
    this.initializeConfigs();
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  private initializeConfigs(): void {
    // Development configuration
    this.configs.set('development', {
      url: process.env.DATABASE_URL || '',
      maxConnections: 10,
      connectionTimeout: 5000,
      queryTimeout: 10000,
      enableLogging: true
    });

    // Staging configuration
    this.configs.set('staging', {
      url: process.env.STAGING_DATABASE_URL || '',
      maxConnections: 20,
      connectionTimeout: 5000,
      queryTimeout: 15000,
      enableLogging: true
    });

    // Production configuration
    this.configs.set('production', {
      url: process.env.PRODUCTION_DATABASE_URL || '',
      maxConnections: 50,
      connectionTimeout: 3000,
      queryTimeout: 20000,
      enableLogging: false
    });
  }

  getClient(environment: string = process.env.NODE_ENV || 'development'): PrismaClient {
    if (!this.clients.has(environment)) {
      const config = this.configs.get(environment);
      if (!config) {
        throw new Error(`No database configuration found for environment: ${environment}`);
      }

      const client = new PrismaClient({
        datasources: {
          db: {
            url: config.url
          }
        },
        log: config.enableLogging 
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
        errorFormat: 'pretty'
      });

      this.clients.set(environment, client);
      console.log(`✅ Database client initialized for ${environment} environment`);
    }

    return this.clients.get(environment)!;
  }

  async testConnection(environment: string = process.env.NODE_ENV || 'development'): Promise<boolean> {
    try {
      const client = this.getClient(environment);
      await client.$queryRaw`SELECT 1`;
      console.log(`✅ Database connection test passed for ${environment}`);
      return true;
    } catch (error) {
      console.error(`❌ Database connection test failed for ${environment}:`, error);
      return false;
    }
  }

  async testAllConnections(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    
    for (const env of ['development', 'staging', 'production']) {
      const config = this.configs.get(env);
      if (config?.url) {
        results[env] = await this.testConnection(env);
      } else {
        results[env] = false;
        console.warn(`⚠️  No database URL configured for ${env} environment`);
      }
    }
    
    return results;
  }

  async closeConnections(): Promise<void> {
    for (const [env, client] of this.clients.entries()) {
      try {
        await client.$disconnect();
        console.log(`🔌 Disconnected from ${env} database`);
      } catch (error) {
        console.error(`Error disconnecting from ${env} database:`, error);
      }
    }
    this.clients.clear();
  }

  getConfig(environment: string): DatabaseConfig | undefined {
    return this.configs.get(environment);
  }

  // Transaction helper with retry logic
  async withTransaction<T>(
    operation: (tx: any) => Promise<T>,
    environment?: string,
    maxRetries: number = 3
  ): Promise<T> {
    const client = this.getClient(environment);
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await client.$transaction(operation);
      } catch (error) {
        lastError = error as Error;
        console.warn(`Transaction attempt ${attempt} failed:`, error);
        
        if (attempt < maxRetries) {
          // Wait before retry with exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError;
  }

  // Connection pool health check
  async healthCheck(environment?: string): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    details: any;
  }> {
    const client = this.getClient(environment);
    
    try {
      const start = Date.now();
      await client.$queryRaw`SELECT 1`;
      const responseTime = Date.now() - start;
      
      const config = this.getConfig(environment || process.env.NODE_ENV || 'development');
      
      return {
        status: responseTime < (config?.queryTimeout || 5000) / 2 ? 'healthy' : 'degraded',
        details: {
          responseTime,
          environment: environment || process.env.NODE_ENV,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          error: (error as Error).message,
          environment: environment || process.env.NODE_ENV,
          timestamp: new Date().toISOString()
        }
      };
    }
  }
}

// Export singleton instance
export const dbManager = DatabaseManager.getInstance();

// Export individual clients for convenience
export const db = dbManager.getClient('development');
export const stagingDb = dbManager.getClient('staging');
export const prodDb = dbManager.getClient('production');

export default DatabaseManager;
