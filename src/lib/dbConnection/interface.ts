export interface IDBConnection {
  get<T = unknown>(key: string): Promise<T | null>;
  create<T = unknown>(key: string, data: T, exp: number): Promise<T>;
}
