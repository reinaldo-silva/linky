import { SingletonInstance } from "@shared/singletonInstance";
import { CreateUrlUseCase } from "@shared/useCases/createUrlUseCase";
import { GetUrlUseCase } from "@shared/useCases/getUrlUseCase";
import { UpstashRepository } from "./repository/upstash";

// Upstash
const repository = SingletonInstance.getInstance(UpstashRepository);
// Mock
// const repository = SingletonInstance.getInstance(MockLocalRepository);

const getUrl = new GetUrlUseCase(repository);
const createUrl = new CreateUrlUseCase(repository);

export { createUrl, getUrl };
