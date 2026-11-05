import { ensureHttp } from "@/utils/ensureHttp";

export function isValidURL(url: string): boolean {
  const value = url.trim();

  if (!value || /\s/.test(value)) {
    return false;
  }

  try {
    const { hostname } = new URL(ensureHttp(value));

    // Requires a domain like "google.com"; "localhost" is allowed for local testing.
    return hostname === "localhost" || hostname.includes(".");
  } catch {
    return false;
  }
}
