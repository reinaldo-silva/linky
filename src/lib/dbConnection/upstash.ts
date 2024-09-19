import { Redis } from "@upstash/redis";
import { IDBConnection } from "./interface";

export class DbConnectionUpstash implements IDBConnection {
  oneDaySeconds = 24 * 60 * 60;
  redis: Redis;

  constructor() {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
      throw new Error(
        "Upstash Redis URL or Token is missing from environment variables"
      );
    }

    this.redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const url = await this.redis.get<T>(key);
    return url;
  }

  async create<T = unknown>(key: string, data: T, exp: number): Promise<T> {
    await this.redis.set(key, data);
    await this.redis.expire(key, exp * this.oneDaySeconds);
    return data;
  }
}
