"use client";
import { useWindowFocus } from "@/hooks/useWindowFocus";
import { useCallback, useEffect, useState } from "react";

// Resolves to null when the Clipboard API is unavailable, permission is
// denied or the document is not focused.
function readClipboard(): Promise<string | null> {
  if (!navigator.clipboard?.readText) {
    return Promise.resolve(null);
  }

  return navigator.clipboard.readText().then(
    (text) => text.trim() || null,
    () => null
  );
}

export function useClipboardCheck() {
  const [clipboardContent, setClipboardContent] = useState<string | null>(null);

  const checkClipboard = useCallback(
    () => readClipboard().then(setClipboardContent),
    []
  );

  const resetData = useCallback(() => setClipboardContent(null), []);

  useWindowFocus(checkClipboard);

  useEffect(() => {
    readClipboard().then(setClipboardContent);
  }, []);

  return { clipboardContent, checkClipboard, resetData };
}
