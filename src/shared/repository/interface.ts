export interface IRepository {
  get<T = unknown>(key: string): Promise<T | null>;
  create<T = unknown>(key: string, data: T, expDays: number): Promise<T>;
}
