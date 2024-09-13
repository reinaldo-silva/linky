import clsx from "clsx";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        "bg-zinc-800 text-zinc-50 font-semibold p-4 rounded-2xl w-full flex items-center justify-center gap-2",
        className
      )}
      {...rest}
    />
  );
}
