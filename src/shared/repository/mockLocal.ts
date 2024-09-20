import { IRepository } from "@shared/repository/interface";

export class MockLocalRepository implements IRepository {
  private oneDaySeconds = 24 * 60 * 60;
  private data: { key: string; value: unknown; expiresAt: number }[] = [];

  constructor() {}

  async get<T = unknown>(key: string): Promise<T | null> {
    const entry = this.data.find((item) => item.key === key);

    if (!entry || entry.expiresAt < Date.now()) {
      return null;
    }

    return entry.value as T;
  }

  async create<T = unknown>(key: string, value: T, exp: number): Promise<T> {
    const expiresAt = Date.now() + exp * this.oneDaySeconds * 1000; // Expiração em milissegundos

    this.data.push({ key, value, expiresAt });

    return value;
  }
}
