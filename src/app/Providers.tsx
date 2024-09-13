"use client";
import clsx from "clsx";
import { X } from "lucide-react";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CloseButton = ({
  closeToast,
}: {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
}) => (
  <button type="button" className="flex self-start" onClick={closeToast}>
    <X size={16} strokeWidth={3} />
  </button>
);

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ToastContainer
        toastClassName={(context) =>
          clsx(
            "!bg-gradient-to-br !from-zinc-800 !to-zinc-600 !font-semibold md:!rounded-lg !text-zinc-100 border",
            context?.defaultClassName
          )
        }
        closeButton={CloseButton}
      />
      {children}
    </>
  );
}
