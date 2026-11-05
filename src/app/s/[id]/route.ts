import { getUseCases } from "@shared/index";
import { ensureHttp } from "@/utils/ensureHttp";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { getUrl } = getUseCases();

  const entry = await getUrl.handle(id);

  if (!entry) {
    return NextResponse.redirect(new URL("/url-not-found", request.url));
  }

  return NextResponse.redirect(ensureHttp(entry.url));
}
