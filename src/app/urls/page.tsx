"use client";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { formatDate, isExpired } from "@/utils/date";
import { getUrls, removeUrl, UrlType } from "@/utils/localStorageUtils";
import { animated, useTransition } from "@react-spring/web";
import { AlertCircle, Copy, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Urls() {
  const [urls, setUrls] = useState<UrlType[]>([]);

  function getAllUrls() {
    const urlsList = getUrls();
    setUrls(urlsList);
  }

  useEffect(() => {
    getAllUrls();
  }, []);

  return (
    <div className="h-svh flex flex-col items-start overflow-x-hidden flex-1 mx-auto pt-28 pb-6 overflow-scroll space-y-5 scrollbar-hide">
      <div className="flex flex-col items-start">
        <h1 className="font-sans text-3xl font-semibold">
          Your generated URLs
        </h1>
        <p className="text-zinc-500 mt-2">
          Your URLs are saved in Local Storage
        </p>
      </div>

      <div className="w-full flex rounded-lg overflow-y-hidden overflow-x-scroll border">
        <table className="w-full bg-white">
          <thead className="bg-gradient-to-br from-zinc-800 to-zinc-600">
            <tr className="text-zinc-100">
              <th className="border-r border-zinc-600 py-2 uppercase">url</th>
              <th className="border-r border-zinc-600 py-2 uppercase">
                expiration
              </th>
              <th className="py-2 uppercase">shortenUrl</th>
              <th className="py-2 uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {urls.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="border-x text-center py-2 text-zinc-400"
                >
                  Nenhuma URL cadastrada
                </td>
              </tr>
            ) : (
              urls.reverse().map((row, index) => (
                <tr className="border-t" key={index}>
                  <td className="border-r text-center p-2">
                    <p className="truncate max-w-[200px]">{row.url}</p>
                  </td>
                  <td className="border-r text-center p-2">
                    {formatDate(row.expiration)}
                    {isExpired(row.expiration) && (
                      <AlertCircle
                        strokeWidth={3}
                        size={16}
                        className="inline-block my-auto ml-2 mb-1 text-red-600"
                      />
                    )}
                  </td>
                  <td className="text-center border-r p-2 relative overflow-hidden max-w-[200px]">
                    <AnimationCopyText shortenUrl={row.shortenUrl} />
                  </td>
                  <td className="text-center p-2">
                    <button
                      onClick={() => {
                        removeUrl(row.shortenUrl);
                        getAllUrls();
                      }}
                      className="flex justify-center items-center w-full min-w-7"
                    >
                      <Trash size={16} strokeWidth={3} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnimationCopyText({ shortenUrl }: { shortenUrl: string }) {
  const [clicked, setClicked] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const transitions = useTransition(clicked, {
    from: { x: 100 },
    enter: { x: 0 },
    leave: { x: 100 },
    config: { duration: 200 },
    onRest: () => {
      setTimeout(() => {
        setClicked(false);
      }, 1000);

      setTimeout(() => {
        setDisabledButton(false);
      }, 2500);
    },
  });

  return (
    <>
      {transitions((style, item) =>
        item ? (
          <animated.span
            style={style}
            className="absolute shadow-md border-l bg-white h-full px-2 z-20 right-0 top-0 font-extrabold -rotate-6 text-zinc-950 flex items-center"
          >
            Copied!
          </animated.span>
        ) : null
      )}

      <button
        disabled={disabledButton}
        type="button"
        className="flex items-center justify-between w-full gap-2 hover:underline px-2"
        onClick={() => {
          setClicked(true);
          setDisabledButton(true);
          copyToClipboard(shortenUrl);
        }}
      >
        <p className="truncate font-medium">{shortenUrl}</p>
        <Copy size={16} strokeWidth={3} className="min-w-4" />
      </button>
    </>
  );
}
