import { IDBConnection } from "./interface";
import { dbConnectionUpstash } from "./upstash";

export function initDB(): IDBConnection {
  return dbConnectionUpstash();
}
