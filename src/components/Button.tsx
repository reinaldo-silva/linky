import clsx from "clsx";
import { ComponentProps } from "react";

export enum ButtonVariants {
  DEFAULT,
  SECONDARY,
  GHOST,
}
interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariants;
}

export function Button({
  className,
  variant = ButtonVariants.DEFAULT,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "text-zinc-50 transition-colors font-semibold p-4 rounded-2xl w-full flex items-center justify-center gap-2",
        className,
        {
          "bg-gradient-to-br from-zinc-950 to-zinc-600 hover:from-zinc-700 hover:to-zinc-500":
            variant === ButtonVariants.DEFAULT,
          "hover:underline !bg-transparent text-zinc-800":
            variant === ButtonVariants.GHOST,
          "bg-sky-600 hover:bg-sky-700": variant === ButtonVariants.SECONDARY,
        }
      )}
      {...rest}
    />
  );
}
