import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { zinc } from "tailwindcss/colors";

interface InputProps extends ComponentProps<"input"> {
  icon?: LucideIcon;
}
export function Input({ className, icon, ...rest }: InputProps) {
  const Icon = icon;
  return (
    <div className="bg-white flex items-center p-3 py-4 rounded-2xl border border-zinc-300 focus-within:ring-2 ring-0 ring-sky-500 hover:ring-2">
      {Icon && (
        <div className="border-r-2 border-zinc-400 pr-3">
          <Icon color={zinc[600]} strokeWidth={3} />
        </div>
      )}
      <input
        className={clsx(
          className,
          "bg-transparent rounded-none w-full outline-none px-3 placeholder:font-semibold"
        )}
        {...rest}
      />
    </div>
  );
}
