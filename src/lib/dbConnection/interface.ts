export type URL = {
  id: string;
  url: string;
  exp: number;
};

export interface IDBConnection {
  getUrlById(key: string): Promise<string | null>;
  saveUrl(url: URL): Promise<URL>;
}
