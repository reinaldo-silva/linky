import { getUseCases } from "@shared/index";
import { ensureHttp } from "@/utils/ensureHttp";
import { isValidURL } from "@/utils/isValidUrl";
import { nanoid } from "nanoid";
import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_EXPIRATION_DAYS = 1;
const MAX_EXPIRATION_DAYS = 365;

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

function parseExpiration(exp: unknown): number | null {
  if (exp === undefined || exp === null || exp === "") {
    return DEFAULT_EXPIRATION_DAYS;
  }

  const days = Number(exp);

  return Number.isInteger(days) && days >= 1 && days <= MAX_EXPIRATION_DAYS
    ? days
    : null;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return badRequest("The request body must be valid JSON!");
  }

  const { url, exp } = (body ?? {}) as { url?: unknown; exp?: unknown };

  if (typeof url !== "string" || !url.trim()) {
    return badRequest("The URL is required!");
  }

  if (!isValidURL(url)) {
    return badRequest("The URL is invalid!");
  }

  const expDays = parseExpiration(exp);

  if (expDays === null) {
    return badRequest(
      `The exp must be an integer between 1 and ${MAX_EXPIRATION_DAYS}!`
    );
  }

  try {
    const id = nanoid(8);
    const { createUrl } = getUseCases();

    await createUrl.handle(id, ensureHttp(url.trim()), expDays);

    const shortUrl = `${request.nextUrl.origin}/s/${id}`;

    return NextResponse.json({ message: "Linky your url!", shortUrl });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { message: "Error processing the request" },
      { status: 500 }
    );
  }
}
