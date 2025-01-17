import toast, { ToastOptions } from "react-hot-toast";

interface NewToastProps {
  type?: "success" | "error";
  text: string;
}

export function newToast({ text, type = "success" }: NewToastProps) {
  const configs: ToastOptions = {
    position: "bottom-center",
    duration: 6000,
    style: {
      border: "2px solid #27272a",
      padding: "12px",
      color: "#27272a",
    },
    iconTheme: {
      primary: "#27272a",
      secondary: "#FFFAEE",
    },
  };

  if (type === "success") {
    return toast.success(text, configs);
  }

  return toast.error(text, configs);
}
