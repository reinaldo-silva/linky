import { ensureHttp } from "@/utils/ensureHttp";
import { isValidURL } from "@/utils/isValidUrl";

describe("isValidURL", () => {
  it.each([
    "google.com",
    "https://google.com/search?q=linky",
    "http://sub.domain.com.br/path",
    "localhost:3000",
  ])("accepts %s", (url) => {
    expect(isValidURL(url)).toBe(true);
  });

  it.each(["", "   ", "google", "not a url.com", "http://", "javascript:alert(1)"])(
    "rejects %p",
    (url) => {
      expect(isValidURL(url)).toBe(false);
    }
  );
});

describe("ensureHttp", () => {
  it("keeps an existing protocol", () => {
    expect(ensureHttp("https://google.com")).toBe("https://google.com");
    expect(ensureHttp("HTTP://google.com")).toBe("HTTP://google.com");
  });

  it("adds http:// when missing", () => {
    expect(ensureHttp("google.com")).toBe("http://google.com");
  });
});
