interface UrlType {
  url: string;
  expiration: string;
  shortenUrl: string;
}

const STORAGE_KEY = "urls";

const getUrls = (): UrlType[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? (JSON.parse(storedData) as UrlType[]) : [];
  } catch {
    return [];
  }
};

const setUrls = (urls: UrlType[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
};

const saveUrl = (newUrl: UrlType): void => {
  setUrls([...getUrls(), newUrl]);
};

const removeUrl = (shortenUrl: string): void => {
  setUrls(getUrls().filter((url) => url.shortenUrl !== shortenUrl));
};

export type { UrlType };

export { getUrls, removeUrl, saveUrl };
