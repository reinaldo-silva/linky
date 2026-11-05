import { IRepository } from "@shared/repository/interface";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export class MockLocalRepository implements IRepository {
  private data = new Map<string, { value: unknown; expiresAt: number }>();

  async get<T = unknown>(key: string): Promise<T | null> {
    const entry = this.data.get(key);

    if (!entry || entry.expiresAt < Date.now()) {
      this.data.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async create<T = unknown>(key: string, value: T, expDays: number): Promise<T> {
    this.data.set(key, { value, expiresAt: Date.now() + expDays * ONE_DAY_MS });
    return value;
  }
}
