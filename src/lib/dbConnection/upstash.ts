import { Redis } from "@upstash/redis";
import { IDBConnection, URL } from "./interface";

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

  async getUrlById(key: string): Promise<string | null> {
    try {
      const url = await this.redis.get<string>(key);
      return url;
    } catch (error) {
      console.error(`Error fetching URL with key ${key}:`, error);
      return null;
    }
  }

  async saveUrl({ exp, id, url }: URL): Promise<URL> {
    try {
      await this.redis.set(id, url);
      await this.redis.expire(id, exp * this.oneDaySeconds);
      return { exp, id, url };
    } catch (error) {
      console.error(`Error saving URL with id ${id}:`, error);
      throw new Error("Failed to save URL to Redis");
    }
  }
}
