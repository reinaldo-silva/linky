import { type NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { initDB } from "@/db/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const url = searchParams.get("url");

  if (!url) {
    return Response.json({ message: "A URL é necessária" }, { status: 400 });
  }

  const id = nanoid(8);

  const db = await initDB();

  const urlFound = db.data.urls.find((urlItem) => urlItem.url === url);

  if (urlFound) {
    const shortUrl = `${request.headers.get("host")}/s/${urlFound.id}`;

    return Response.json({ message: "Linky your url!", shortUrl });
  }

  db.data.urls.push({ id, url });
  db.write();

  const shortUrl = `${request.headers.get("host")}/s/${id}`;

  return Response.json({ message: "Linky your url!", shortUrl });
}
