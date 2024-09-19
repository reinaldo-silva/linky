import initDB from "@/lib/dbConnection";
import { nanoid } from "nanoid";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { url, exp } = body;

    if (!url) {
      return NextResponse.json(
        { message: "The URL is required!" },
        { status: 400 }
      );
    }

    const id = nanoid(8);

    await initDB.saveUrl({
      id,
      url,
      exp: exp && !isNaN(Number(exp)) ? Number(exp) : 1,
    });

    const shortUrl = `${request.headers.get("host")}/s/${id}`;

    return NextResponse.json({ message: "Linky your url!", shortUrl });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Error processing the request" },
      { status: 400 }
    );
  }
}
