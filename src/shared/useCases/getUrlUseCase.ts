import { IRepository } from "@shared/repository/interface";
import { URL } from "@shared/useCases/interface";

export class GetUrlUseCase {
  db: IRepository;

  constructor(db: IRepository) {
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
