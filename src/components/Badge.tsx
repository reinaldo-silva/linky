import clsx from "clsx";
import { PropsWithChildren } from "react";

interface BadgeProps extends PropsWithChildren {
  variant?:
    | "default"
    | "green"
    | "violet"
    | "required"
    | "white"
    | "outline"
    | "optional";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={clsx(
        "flex gap-2 items-center text-zinc-100 text-sm p-1 px-3 rounded-xl font-semibold border-2 border-transparent",
        {
          "bg-zinc-800": variant === "default",
          "bg-green-600": variant === "green",
          "bg-lime-200 text-zinc-700": variant === "required",
          "bg-purple-800": variant === "violet",
          "bg-zinc-200 text-zinc-800": variant === "white",
          "bg-zinc-200 text-zinc-800 !border-zinc-800": variant === "outline",
          "bg-sky-200 text-zinc-700": variant === "optional",
        }
      )}
    >
      {children}
    </span>
  );
}
