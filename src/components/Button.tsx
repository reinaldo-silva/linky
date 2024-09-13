import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { ComponentProps } from "react";

export enum ButtonVariants {
  DEFAULT,
  SECONDARY,
  GHOST,
}
interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariants;
  isLoading?: boolean;
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  variant = ButtonVariants.DEFAULT,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        "text-zinc-50 transition-colors font-semibold p-4 rounded-2xl w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60",
        className,
        {
          "bg-gradient-to-br from-zinc-800 to-zinc-600 hover:from-zinc-950 hover:to-zinc-700":
            variant === ButtonVariants.DEFAULT,
          "hover:underline !bg-transparent text-zinc-800":
            variant === ButtonVariants.GHOST,
          "bg-sky-600 hover:bg-sky-700": variant === ButtonVariants.SECONDARY,
        }
      )}
      {...rest}
    >
      {children}
      {isLoading && <LoaderCircle className="animate-spin" />}
    </button>
  );
}
