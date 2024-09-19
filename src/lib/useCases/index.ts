import { DbConnectionUpstash } from "../dbConnection/upstash";
import { CreateUrlUseCase } from "./createUrlUseCase";
import { GetUrlUseCase } from "./getUrlUseCase";

const initDB = new DbConnectionUpstash();

const getUrl = new GetUrlUseCase(initDB);
const createUrl = new CreateUrlUseCase(initDB);

export { getUrl, createUrl };
