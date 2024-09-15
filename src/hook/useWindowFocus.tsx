import { useEffect } from "react";

const useWindowFocus = (onFocus: () => void, onBlur?: () => void) => {
  useEffect(() => {
    const handleFocus = () => {
      onFocus();
    };

    const handleBlur = () => {
      if (onBlur) {
        onBlur();
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [onFocus, onBlur]);
};

export default useWindowFocus;
