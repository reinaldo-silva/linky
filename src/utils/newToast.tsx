import { toast, TypeOptions } from "react-toastify";

interface NewToastProps {
  type?: TypeOptions;
  text: string;
}

export function newToast({ text, type = "success" }: NewToastProps) {
  toast(text, {
    position: "bottom-center",
    type,
    autoClose: 4000,
    closeOnClick: true,
  });
}
