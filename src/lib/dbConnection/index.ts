import { IDBConnection } from "./interface";
import { DbConnectionUpstash } from "./upstash";

const initDB: IDBConnection = new DbConnectionUpstash();

export default initDB;
