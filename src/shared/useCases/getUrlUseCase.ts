import { IRepository } from "@shared/repository/interface";
import { ShortUrl } from "@shared/useCases/interface";

export class GetUrlUseCase {
  constructor(private readonly db: IRepository) {}

  async handle(key: string): Promise<ShortUrl | null> {
    const url = await this.db.get<string>(key);

    if (!url) {
      return null;
    }

    return { exp: 0, id: key, url };
  }
}
