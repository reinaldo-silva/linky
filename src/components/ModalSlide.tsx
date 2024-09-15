"use client";
import { useClickOutside } from "@/hook/useClickOutside";
import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import { X } from "lucide-react";
import { PropsWithChildren, useRef } from "react";
import { Logo } from "./Logo";

interface ModalSlideProps extends PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
}

export function ModalSlide({ children, isOpen, closeModal }: ModalSlideProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useClickOutside(divRef, () => {
    if (isOpen) {
      closeModal();
    }
  });

  const transitionSlide = useTransition(isOpen, {
    from: { y: 400, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 400, opacity: 0 },
    config: { tension: 170, friction: 26 },
  });

  const transitionFade = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <>
      {transitionFade((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="fixed w-full h-svh bg-zinc-700/40 backdrop-blur-sm top-0 left-0"
          />
        ) : null
      )}
      <div ref={divRef} className="fixed left-0 bottom-0 w-full">
        {transitionSlide((style, item) =>
          item ? (
            <animated.div
              style={style}
              className={clsx(
                "z-10 border-t shadow-md p-4 py-10 bg-zinc-50 flex justify-center"
              )}
            >
              <button
                onClick={closeModal}
                type="button"
                className="absolute top-4 right-4"
              >
                <X />
              </button>
              <div className="absolute shadow-md border-[3px] rotate-3 border-zinc-800 -top-8 bg-zinc-50 p-3 rounded-2xl">
                <Logo />
              </div>
              {children}
            </animated.div>
          ) : null
        )}
      </div>
    </>
  );
}
