import { IDBConnection } from "../dbConnection/interface";
import { URL } from "./interface";

export class GetUrlUseCase {
  db: IDBConnection;

  constructor(db: IDBConnection) {
    this.db = db;
  }

  async handle(key: string): Promise<URL | null> {
    const url = await this.db.get<string>(key);

    if (!url) {
      return null;
    }

    return { exp: 0, id: key, url };
  }
}
