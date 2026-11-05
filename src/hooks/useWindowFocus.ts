"use client";
import { useEffect, useEffectEvent } from "react";

export function useWindowFocus(onFocus: () => void) {
  const handleFocus = useEffectEvent(onFocus);

  useEffect(() => {
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
}
