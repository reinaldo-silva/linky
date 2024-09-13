"use client";
import { Button } from "@/components/Button";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Clipboard, Link2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { zinc } from "tailwindcss/colors";

export function ShortenUrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/shorten?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resJson = await res.json();

    if (resJson.shortUrl) {
      setShortUrl(resJson.shortUrl);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-w-[360px] gap-4 mt-8"
    >
      {!shortUrl ? (
        <>
          <div className="bg-zinc-200 flex items-center p-3 py-4 rounded-2xl border border-zinc-300">
            <Link2 color={zinc[400]} />
            <input
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
              placeholder="google.com"
              className="bg-transparent border-l-2 w-full border-zinc-400 ml-3 outline-none px-3 placeholder:font-semibold"
            />
          </div>
          <Button>Shorten!</Button>
        </>
      ) : (
        <>
          <span className="bg-zinc-200 p-4 font-semibold rounded-2xl border border-zinc-300">
            {shortUrl}
          </span>
          <Button
            onClick={() => copyToClipboard(shortUrl)}
            type="button"
            className="!bg-sky-600"
          >
            Copy to clipboard
            <Clipboard size={20} />
          </Button>
          <Button
            className="hover:underline !bg-transparent text-zinc-800"
            type="button"
            onClick={() => {
              setShortUrl("");
              setUrl("");
            }}
          >
            Generate a new linky!
          </Button>
        </>
      )}
    </form>
  );
}
