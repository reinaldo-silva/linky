import clsx from "clsx";
import { ComponentProps } from "react";

interface RadioProps extends ComponentProps<"input"> {
  label: string;
  contentClassName?: string;
}
export function Radio({
  label,
  disabled,
  contentClassName,
  id,
  ...rest
}: RadioProps) {
  return (
    <div className={clsx("flex items-start", contentClassName)}>
      <div className="grid place-items-center mt-1">
        <input
          className="peer
          col-start-1 row-start-1
          appearance-none shrink-0
          w-4 h-4 border-2 border-zinc-800 rounded-full
          focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-sky-400
          disabled:border-zinc-400"
          id={id}
          disabled={disabled}
          {...rest}
          type="radio"
        />
        <div
          className={clsx(
            "pointer-events-none",
            "col-start-1 row-start-1",
            "w-2 h-2 rounded-full peer-checked:bg-zinc-800",
            "peer-checked:peer-disabled:bg-gray-400"
          )}
        />
      </div>
      <label
        htmlFor={id}
        className={clsx("pl-2 truncate text-start font-semibold flex-1", {
          "text-zinc-400": disabled,
        })}
      >
        {label}
      </label>
    </div>
  );
}
