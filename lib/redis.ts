
import Redis from 'ioredis';

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  retryDelayOnFailover?: number;
  maxRetriesPerRequest?: number;
}

class RedisManager {
  private static instance: RedisManager;
  private client: Redis;
  private subscriber: Redis;
  private publisher: Redis;

  private constructor() {
    const config: RedisConfig = {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
    };

    this.client = new Redis(config);
    this.subscriber = new Redis(config);
    this.publisher = new Redis(config);

    this.setupEventHandlers();
  }

  public static getInstance(): RedisManager {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }
    return RedisManager.instance;
  }

  private setupEventHandlers(): void {
    this.client.on('connect', () => {
      console.log('✅ Redis client connected');
    });

    this.client.on('error', (err) => {
      console.error('❌ Redis client error:', err);
    });

    this.client.on('ready', () => {
      console.log('🚀 Redis client ready');
    });
  }

  // Session Management
  async setSession(sessionId: string, sessionData: any, ttl: number = 3600): Promise<void> {
    const key = `session:${sessionId}`;
    await this.client.setex(key, ttl, JSON.stringify(sessionData));
  }

  async getSession(sessionId: string): Promise<any | null> {
    const key = `session:${sessionId}`;
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async deleteSession(sessionId: string): Promise<void> {
    const key = `session:${sessionId}`;
    await this.client.del(key);
  }

  async extendSession(sessionId: string, ttl: number = 3600): Promise<void> {
    const key = `session:${sessionId}`;
    await this.client.expire(key, ttl);
  }

  // Subscription Status Caching
  async setUserSubscriptionStatus(userId: string, status: any, ttl: number = 300): Promise<void> {
    const key = `user:subscription:${userId}`;
    await this.client.setex(key, ttl, JSON.stringify(status));
  }

  async getUserSubscriptionStatus(userId: string): Promise<any | null> {
    const key = `user:subscription:${userId}`;
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async invalidateUserSubscriptionStatus(userId: string): Promise<void> {
    const key = `user:subscription:${userId}`;
    await this.client.del(key);
  }

  // Usage Limits Caching
  async setUserUsageLimits(userId: string, limits: any, ttl: number = 300): Promise<void> {
    const key = `user:limits:${userId}`;
    await this.client.setex(key, ttl, JSON.stringify(limits));
  }

  async getUserUsageLimits(userId: string): Promise<any | null> {
    const key = `user:limits:${userId}`;
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async incrementUsageCounter(userId: string, counterType: string, ttl: number = 86400): Promise<number> {
    const key = `usage:${userId}:${counterType}`;
    const pipeline = this.client.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, ttl);
    const results = await pipeline.exec();
    return results?.[0]?.[1] as number || 0;
  }

  // Feature Flag Caching
  async setFeatureFlags(flags: Record<string, any>, ttl: number = 600): Promise<void> {
    const key = 'feature:flags';
    await this.client.setex(key, ttl, JSON.stringify(flags));
  }

  async getFeatureFlags(): Promise<Record<string, any> | null> {
    const key = 'feature:flags';
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  // Rate Limiting
  async checkRateLimit(key: string, limit: number, window: number): Promise<{ allowed: boolean; remaining: number }> {
    const current = await this.client.incr(key);
    
    if (current === 1) {
      await this.client.expire(key, window);
    }
    
    const remaining = Math.max(0, limit - current);
    return {
      allowed: current <= limit,
      remaining
    };
  }

  // Analytics Event Buffering
  async bufferAnalyticsEvent(event: any): Promise<void> {
    const key = 'analytics:buffer';
    await this.client.lpush(key, JSON.stringify(event));
  }

  async getBufferedAnalyticsEvents(count: number = 100): Promise<any[]> {
    const key = 'analytics:buffer';
    const events = await this.client.lrange(key, 0, count - 1);
    await this.client.ltrim(key, count, -1);
    return events.map(event => JSON.parse(event));
  }

  // Real-time Notifications
  async publishNotification(channel: string, message: any): Promise<void> {
    await this.publisher.publish(channel, JSON.stringify(message));
  }

  async subscribeToNotifications(channel: string, callback: (message: any) => void): Promise<void> {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (receivedChannel, message) => {
      if (receivedChannel === channel) {
        callback(JSON.parse(message));
      }
    });
  }

  // Health Check
  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.client.ping();
      return result === 'PONG';
    } catch (error) {
      console.error('Redis health check failed:', error);
      return false;
    }
  }

  // Cleanup
  async disconnect(): Promise<void> {
    await this.client.disconnect();
    await this.subscriber.disconnect();
    await this.publisher.disconnect();
  }
}

export default RedisManager;
