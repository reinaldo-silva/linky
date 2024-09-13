import { Redis } from "@upstash/redis";

type URL = {
  id: string;
  url: string;
  exp: number;
};

export function initDB() {
  const oneDaySeconds = 24 * 60 * 60;
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  async function getUrlById(key: string): Promise<string | null> {
    const url = await redis.get<string>(key);

    return url;
  }

  async function saveUrl({ exp, id, url }: URL): Promise<URL | null> {
    await redis.set(id, url);
    await redis.expire(id, exp * oneDaySeconds);

    return { exp, id, url };
  }

  return { redis, getUrlById, saveUrl };
}
