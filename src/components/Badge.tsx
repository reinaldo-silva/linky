import { PropsWithChildren } from "react";

interface BadgeProps extends PropsWithChildren {}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="bg-zinc-800 flex gap-2 items-center text-zinc-200 text-sm p-1 px-3 rounded-2xl">
      {children}
    </span>
  );
}
