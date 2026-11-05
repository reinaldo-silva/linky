import { IRepository } from "@shared/repository/interface";
import { MockLocalRepository } from "@shared/repository/mockLocal";
import { UpstashRepository } from "@shared/repository/upstash";
import { CreateUrlUseCase } from "@shared/useCases/createUrlUseCase";
import { GetUrlUseCase } from "@shared/useCases/getUrlUseCase";

// Kept on globalThis so the in-memory repository survives dev hot reloads
// and is shared between route handlers.
const globalForRepository = globalThis as unknown as {
  linkyRepository?: IRepository;
};

function createRepository(): IRepository {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    return new UpstashRepository(url, token);
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Upstash credentials not found, using in-memory repository (data is lost on restart)."
    );
    return new MockLocalRepository();
  }

  throw new Error(
    "Upstash Redis URL or Token is missing from environment variables"
  );
}

// Created lazily so `next build` does not require the Upstash credentials.
function getRepository(): IRepository {
  globalForRepository.linkyRepository ??= createRepository();
  return globalForRepository.linkyRepository;
}

export function getUseCases() {
  const repository = getRepository();

  return {
    createUrl: new CreateUrlUseCase(repository),
    getUrl: new GetUrlUseCase(repository),
  };
}
