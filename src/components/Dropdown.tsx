"use client";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface DropdownContextProps {
  isOpen: boolean;
  toggle: () => void;
}

const DropdownContext = createContext({} as DropdownContextProps);

export function Root({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((oldValue) => !oldValue);
  }

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className="flex justify-end flex-col gap-2">{children}</div>
    </DropdownContext.Provider>
  );
}

function useDropdownContext() {
  const context = useContext(DropdownContext);

  return context;
}

function Trigger({ children }: PropsWithChildren) {
  const { toggle } = useDropdownContext();
  return (
    <button
      onClick={toggle}
      type="button"
      className="flex items-center gap-1 justify-end"
    >
      {children}
      <ChevronDown />
    </button>
  );
}

interface ContentProps extends PropsWithChildren {
  className?: string;
}

export function Content({ children, className }: ContentProps) {
  const { isOpen } = useDropdownContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const { height: animatedHeight, opacity } = useSpring({
    height: isOpen ? height + 2 : 0,
    opacity: isOpen ? 1 : 0,
    config: { tension: 220, friction: 120, duration: 250 }, // Ajuste para suavidade
  });

  return (
    <animated.div
      style={{ height: animatedHeight, opacity }}
      className={clsx("overflow-hidden")}
    >
      <div ref={contentRef} className={className}>
        {children}
      </div>
    </animated.div>
  );
}

export const Dropdown = {
  Root,
  Trigger,
  Content,
};
