export function isValidURL(url: string): boolean {
  try {
    const fullURL =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `http://${url}`;

    const parsedURL = new URL(fullURL);

    return !!parsedURL;
  } catch (_) {
    return false;
  }
}
