"use client";
import useWindowFocus from "@/hook/useWindowFocus";
import { useEffect, useState } from "react";

const useClipboardCheck = () => {
  const [clipboardContent, setClipboardContent] = useState<string | null>(null);
  const [hasClipboardContent, setHasClipboardContent] = useState(false);

  const resetData = () => {
    setClipboardContent(null);
    setHasClipboardContent(false);
  };

  const checkClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        setClipboardContent(text);
        setHasClipboardContent(!!text);
      } else {
        console.warn("Clipboard API não suportada neste navegador.");
      }
    } catch (err) {
      console.error("Erro ao acessar a área de transferência:", err);
    }
  };

  useWindowFocus(checkClipboard);

  useEffect(() => {
    checkClipboard();
  }, []);

  return { clipboardContent, hasClipboardContent, checkClipboard, resetData };
};

export default useClipboardCheck;
