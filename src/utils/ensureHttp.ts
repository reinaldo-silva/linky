export function ensureHttp(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `http://${url}`;
}
