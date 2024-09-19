import { IDBConnection } from "../dbConnection/interface";
import { URL } from "./interface";

export class CreateUrlUseCase {
  db: IDBConnection;

  constructor(db: IDBConnection) {
    this.db = db;
  }

  async handle(key: string, data: string, exp = 1): Promise<URL> {
    const itemCreated = await this.db.create<string>(key, data, exp);

    return { exp, id: key, url: itemCreated };
  }
}
