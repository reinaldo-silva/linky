export function isValidURL(url: string): boolean {
  const regex =
    /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,}(\/[\w\d-]*)*(\?.*)?(#.*)?$/i;

  const fullURL =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `http://${url}`;

  try {
    const parsedURL = new URL(fullURL);
    return regex.test(parsedURL.href);
  } catch (_) {
    return false;
  }
}
