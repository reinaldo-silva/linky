import { Redis } from "@upstash/redis";
import { IDBConnection, URL } from "./interface";

export function dbConnectionUpstash(): IDBConnection {
  const oneDaySeconds = 24 * 60 * 60;

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  async function getUrlById(key: string): Promise<string | null> {
    const url = await redis.get<string>(key);

    return url;
  }

  async function saveUrl({ exp, id, url }: URL): Promise<URL> {
    await redis.set(id, url);
    await redis.expire(id, exp * oneDaySeconds);

    return { exp, id, url };
  }

  return { getUrlById, saveUrl };
}
