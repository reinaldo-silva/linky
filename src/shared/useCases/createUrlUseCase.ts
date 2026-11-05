import { IRepository } from "@shared/repository/interface";
import { ShortUrl } from "@shared/useCases/interface";

export class CreateUrlUseCase {
  constructor(private readonly db: IRepository) {}

  async handle(key: string, data: string, exp = 1): Promise<ShortUrl> {
    const itemCreated = await this.db.create<string>(key, data, exp);

    return { exp, id: key, url: itemCreated };
  }
}
