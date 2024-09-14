"use client";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { animated, useTransition } from "@react-spring/web";
import { PropsWithChildren, useState } from "react";
import { Button, ButtonVariants } from "./Button";

interface CopyAnimationProps extends PropsWithChildren {
  textToCopy: string;
}

export function CopyAnimation({ children, textToCopy }: CopyAnimationProps) {
  const [clicked, setClicked] = useState(false);

  const transitions = useTransition(clicked, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 400 },
    onRest: () => setClicked(false),
  });

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className="relative w-auto">
      {/* text */}
      {transitions((style, item) =>
        item ? (
          <animated.span
            style={style}
            className="absolute z-20 right-1/2 translate-x-1/2 -top-7 font-extrabold -rotate-6 text-zinc-950"
          >
            Copied!
          </animated.span>
        ) : null
      )}

      <Button
        variant={ButtonVariants.SECONDARY}
        type="button"
        onClick={() => {
          copyToClipboard(textToCopy);
          handleClick();
        }}
        disabled={clicked}
      >
        {children}
      </Button>
    </div>
  );
}
