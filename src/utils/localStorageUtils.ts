interface UrlType {
  url: string;
  expiration: string;
  shortenUrl: string;
}

const saveUrl = (newUrl: UrlType): void => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("urls");
    const urls = storedData ? (JSON.parse(storedData) as UrlType[]) : [];
    urls.push(newUrl);
    localStorage.setItem("urls", JSON.stringify(urls));
  }
};

const getUrls = (): UrlType[] => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("urls");
    if (storedData) {
      return JSON.parse(storedData) as UrlType[];
    }
  }
  return [];
};

const removeUrl = (shortenUrl: string): void => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("urls");
    if (storedData) {
      const urls = JSON.parse(storedData) as UrlType[];
      const updatedUrls = urls.filter((url) => url.shortenUrl !== shortenUrl);
      localStorage.setItem("urls", JSON.stringify(updatedUrls));
    }
  }
};

export type { UrlType };

export { getUrls, saveUrl, removeUrl };
