import { JSONFilePreset } from "lowdb/node";

type URL = {
  id: string;
  url: string;
};

type Data = {
  urls: URL[];
};

export async function initDB() {
  const db = await JSONFilePreset<Data>("db.json", { urls: [] });
  return db;
}
