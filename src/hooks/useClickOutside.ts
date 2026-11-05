"use client";
import { RefObject, useEffect, useEffectEvent } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) {
  const onClickOutside = useEffectEvent((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  });

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);
}
