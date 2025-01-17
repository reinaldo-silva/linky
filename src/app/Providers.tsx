"use client";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
