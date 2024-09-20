"use client";
import { Badge } from "@/components/Badge";
import { Button, ButtonVariants } from "@/components/Button";
import { CopyAnimation } from "@/components/CopyAnimation";
import { Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { ModalSlide } from "@/components/ModalSlide";
import { Radio } from "@/components/Radio";
import useClipboardCheck from "@/hook/useClipboardCheck";
import { isValidURL } from "@/utils/isValidUrl";
import { newToast } from "@/utils/newToast";
import {
  Clipboard,
  ClipboardPaste,
  CornerLeftUp,
  Link2,
  TimerReset,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";

const expirationOptions = [
  { value: 1, description: "1 day" },
  { value: 7, description: "1 week" },
  { value: 30, description: "1 month" },
];

export function ShortenUrlForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [expirationIndex, setExpirationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { clipboardContent, hasClipboardContent, resetData } =
    useClipboardCheck();

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

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setShortUrl(resJson.shortUrl);
    setModalIsOpen(true);
  };

  function closeModal() {
    setShortUrl("");
    setUrl("");
    setModalIsOpen(false);
  }

  return (
    <div className="flex flex-col w-full sm:max-w-[460px] gap-4 mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Input
            ref={inputRef}
            icon={Link2}
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
            placeholder="google.com"
          />

          {hasClipboardContent && clipboardContent && (
            <button
              className="flex gap-1 text-sky-500 hover:text-sky-600 self-end items-center hover:underline"
              type="button"
              onClick={() => {
                setUrl(clipboardContent);
                resetData();
              }}
            >
              <CornerLeftUp size={12} strokeWidth={3} />
              <span className="text-xs font-bold">
                Paste text from clipboard
              </span>
              <ClipboardPaste size={12} strokeWidth={3} />
            </button>
          )}
        </div>

        <Dropdown.Root>
          <Dropdown.Trigger>
            <Badge>
              <TimerReset size={18} strokeWidth={3} />
              <p className="font-semibold">
                {expirationOptions[expirationIndex].description}
              </p>
            </Badge>
          </Dropdown.Trigger>

          <Dropdown.Content className="flex bg-white border border-zinc-300 rounded-xl">
            {expirationOptions.map((op, index) => (
              <Radio
                contentClassName="flex-1 border-r p-3 last:border-none border-zinc-300"
                label={op.description}
                id={`${op.value}-${index}`}
                key={index}
                checked={expirationOptions[expirationIndex].value === op.value}
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

      <ModalSlide isOpen={modalIsOpen} closeModal={closeModal}>
        <div className="w-full sm:max-w-[460px] flex flex-col items-center justify-center">
          <div className="mb-6 flex flex-col items-center">
            <span className="text-zinc-500 mt-2">Since your link is small</span>
            <div className="flex items-center mt-6 gap-2">
              <p>Your link will expire in</p>
              <Badge>
                <TimerReset size={18} strokeWidth={3} />
                <p className="font-semibold">
                  {expirationOptions[expirationIndex].description}
                </p>
              </Badge>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full">
            <span className="bg-zinc-200 text-sm flex-1 p-4 truncate select-all font-semibold rounded-2xl border border-zinc-300">
              {shortUrl || "Nothing here!"}
            </span>
            <CopyAnimation textToCopy={shortUrl}>
              <span className="hidden sm:flex">Copy</span>
              <Clipboard size={20} />
            </CopyAnimation>
          </div>
          <Button
            variant={ButtonVariants.GHOST}
            type="button"
            onClick={closeModal}
            className="mt-4 !w-auto"
          >
            Generate a new linky!
          </Button>
        </div>
      </ModalSlide>
    </div>
  );
}
