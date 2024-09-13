"use client";
import { Button } from "@/components/Button";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { ChevronDown, Clipboard, Link2, TimerReset } from "lucide-react";
import { FormEvent, useState } from "react";
import { zinc } from "tailwindcss/colors";

const expirationOptions = [
  { value: 1, description: "1 day" },
  { value: 7, description: "1 week" },
  { value: 30, description: "1 month" },
];

export function ShortenUrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [expirationIndex, setExpirationIndex] = useState(0);
  const [settingOpen, setSettingOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        exp: expirationOptions[expirationIndex].value,
      }),
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
            <Link2 color={zinc[600]} strokeWidth={3} />
            <input
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
              placeholder="google.com"
              className="bg-transparent border-l-2 w-full border-zinc-400 ml-3 outline-none px-3 placeholder:font-semibold"
            />
          </div>
          <div className="flex justify-end flex-col gap-2">
            <button
              onClick={() => setSettingOpen((oldValue) => !oldValue)}
              type="button"
              className="flex items-center gap-1 justify-end"
            >
              <span className="bg-zinc-800 flex gap-2 items-center text-zinc-200 text-sm p-1 px-3 rounded-2xl">
                <TimerReset size={18} strokeWidth={3} />
                <p className="font-semibold">
                  {expirationOptions[expirationIndex].description}
                </p>
              </span>
              <ChevronDown />
            </button>
            {settingOpen && (
              <div className="flex bg-zinc-200 border border-zinc-300 rounded-xl">
                {expirationOptions.map((op, index) => (
                  <label
                    key={index}
                    className="text-zinc-800 font-semibold select-none flex-1 border-r last:border-none p-3 border-zinc-400 cursor-pointer"
                  >
                    <input
                      className="focus:ring-zinc-800 text-zinc-800"
                      checked={
                        expirationOptions[expirationIndex].value === op.value
                      }
                      type="radio"
                      value={op.value}
                      name="expiration"
                      onChange={() => {
                        setExpirationIndex(index);
                      }}
                    />{" "}
                    {op.description}
                  </label>
                ))}
              </div>
            )}
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
