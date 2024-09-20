import { IRepository } from "@shared/repository/interface";
import { URL } from "@shared/useCases/interface";

export class CreateUrlUseCase {
  db: IRepository;

  constructor(db: IRepository) {
    this.db = db;
  }

  async handle(key: string, data: string, exp = 1): Promise<URL> {
    const itemCreated = await this.db.create<string>(key, data, exp);

    return { exp, id: key, url: itemCreated };
  }
}
