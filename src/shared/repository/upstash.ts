import { IRepository } from "@shared/repository/interface";
import { Redis } from "@upstash/redis";

const ONE_DAY_SECONDS = 24 * 60 * 60;

export class UpstashRepository implements IRepository {
  private redis: Redis;

  constructor(url: string, token: string) {
    this.redis = new Redis({ url, token });
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    return this.redis.get<T>(key);
  }

  async create<T = unknown>(key: string, data: T, expDays: number): Promise<T> {
    await this.redis.set(key, data, { ex: expDays * ONE_DAY_SECONDS });
    return data;
  }
}
