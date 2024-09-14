"use client";
import { Button, ButtonVariants } from "@/components/Button";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { isValidURL } from "@/utils/isValidUrl";
import { newToast } from "@/utils/newToast";
import { Clipboard, Link2, TimerReset } from "lucide-react";
import { FormEvent, useState } from "react";
import { Dropdown } from "./Dropdown";
import { Input } from "./Input";
import { Radio } from "./Radio";

const expirationOptions = [
  { value: 1, description: "1 day" },
  { value: 7, description: "1 week" },
  { value: 30, description: "1 month" },
];

export function ShortenUrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [expirationIndex, setExpirationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidURL(url)) {
      return newToast({ text: "Invalid url!", type: "error" });
    }

    setIsLoading(true);
    const res = await fetch(`/api/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        exp: expirationOptions[expirationIndex].value,
      }),
    }).finally(() => setIsLoading(false));

    const resJson = await res.json();

    if (!resJson.shortUrl) {
      return newToast({
        text: "There was a problem generating your shortUrl",
        type: "error",
      });
    }

    setShortUrl(resJson.shortUrl);
  };

  return (
    <div className="flex flex-col w-full sm:max-w-[460px] gap-4 mt-8">
      {!shortUrl ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            icon={Link2}
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
            placeholder="google.com"
          />

          <Dropdown.Root>
            <Dropdown.Trigger>
              <span className="bg-zinc-800 flex gap-2 items-center text-zinc-200 text-sm p-1 px-3 rounded-2xl">
                <TimerReset size={18} strokeWidth={3} />
                <p className="font-semibold">
                  {expirationOptions[expirationIndex].description}
                </p>
              </span>
            </Dropdown.Trigger>

            <Dropdown.Content className="flex bg-zinc-200 border border-zinc-300 rounded-xl">
              {expirationOptions.map((op, index) => (
                <Radio
                  contentClassName="flex-1 border-r p-3 last:border-none border-zinc-400"
                  label={op.description}
                  id={`${op.value}-${index}`}
                  key={index}
                  checked={
                    expirationOptions[expirationIndex].value === op.value
                  }
                  value={op.value}
                  name="expiration"
                  onChange={() => {
                    setExpirationIndex(index);
                  }}
                />
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
          <Button type="submit" isLoading={isLoading}>
            Shorten!
          </Button>
        </form>
      ) : (
        <>
          <span className="bg-zinc-200 p-4 font-semibold rounded-2xl border border-zinc-300">
            {shortUrl}
          </span>
          <Button
            variant={ButtonVariants.SECONDARY}
            type="button"
            onClick={() => copyToClipboard(shortUrl)}
          >
            Copy to clipboard
            <Clipboard size={20} />
          </Button>
          <Button
            variant={ButtonVariants.GHOST}
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
    </div>
  );
}
