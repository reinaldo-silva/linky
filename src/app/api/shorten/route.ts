import { initDB } from "@/lib/redis";
import { nanoid } from "nanoid";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const url = searchParams.get("url");
  const exp = searchParams.get("exp");

  if (!url) {
    return Response.json({ message: "A URL é necessária" }, { status: 400 });
  }

  const id = nanoid(8);

  const { saveUrl } = initDB();

  await saveUrl({ id, url, exp: exp && !isNaN(Number(exp)) ? Number(exp) : 1 });

  const shortUrl = `${request.headers.get("host")}/s/${id}`;

  return Response.json({ message: "Linky your url!", shortUrl });
}
