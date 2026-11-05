import { GET } from "@/app/s/[id]/route";
import { POST } from "@/app/api/shorten/route";
import { NextRequest } from "next/server";

jest.mock("nanoid", () => ({ nanoid: () => "abc12345" }));

const ORIGIN = "http://localhost:3000";

function postShorten(body: unknown) {
  return POST(
    new NextRequest(`${ORIGIN}/api/shorten`, {
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

function getRedirect(id: string) {
  return GET(new NextRequest(`${ORIGIN}/s/${id}`), {
    params: Promise.resolve({ id }),
  });
}

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("POST /api/shorten", () => {
  it("creates a short url", async () => {
    const res = await postShorten({ url: "google.com", exp: 7 });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      message: "Linky your url!",
      shortUrl: `${ORIGIN}/s/abc12345`,
    });
  });

  it.each([
    ["invalid JSON", "{not json"],
    ["missing url", { exp: 1 }],
    ["invalid url", { url: "not a url" }],
    ["non integer exp", { url: "google.com", exp: 1.5 }],
    ["exp out of range", { url: "google.com", exp: 366 }],
  ])("returns 400 for %s", async (_, body) => {
    const res = await postShorten(body);

    expect(res.status).toBe(400);
    expect(await res.json()).toHaveProperty("message");
  });
});

describe("GET /s/[id]", () => {
  it("redirects to the stored url with protocol", async () => {
    await postShorten({ url: "google.com" });

    const res = await getRedirect("abc12345");

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://google.com/");
  });

  it("redirects unknown ids to /url-not-found", async () => {
    const res = await getRedirect("unknown");

    expect(res.headers.get("location")).toBe(`${ORIGIN}/url-not-found`);
  });
});
