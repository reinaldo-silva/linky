"use client";
import { PropsWithChildren, ReactNode, useSyncExternalStore } from "react";

interface ClientOnlyProps extends PropsWithChildren {
  fallback?: ReactNode;
}

const subscribe = () => () => {};

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return isClient ? children : fallback;
}
