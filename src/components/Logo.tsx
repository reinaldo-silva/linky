"use client";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { Link2 } from "lucide-react";
import { useState } from "react";

interface LogoProps {
  whitAnimation?: boolean;
}

export function Logo({ whitAnimation = false }: LogoProps) {
  const [showLinky, setShowLinky] = useState(false);

  const url =
    "https://www.thisisthemostridiculouslylongurlthatevenyourcatwouldgetboredreading.com/seriously/whywouldanyone/needalink/thislong/areyoustillthere/becauseitisgettingweird/justclickalready/pleasedontleave/ohwaityouarestillreading";

  const fullText = showLinky ? "Linky!" : url;
  const textLength = fullText.length;

  const { animatedText } = useSpring({
    to: { animatedText: textLength },
    from: { animatedText: 0 },
    reset: true,
    reverse: showLinky,
    delay: 250,
    onRest: () => setShowLinky(true),
    config: { duration: showLinky ? 1500 : 2000 },
  });

  return (
    <div className="flex items-end mx-auto select-none overflow-x-hidden">
      <div className="border-[3px] border-zinc-800 rounded-xl p-1">
        <Link2 size={28} color="black" className="-rotate-45" strokeWidth={3} />
      </div>
      <animated.h1
        className={clsx(
          "ml-2 truncate flex-1 text-ellipsis max-w-[260px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl",
          {
            "text-xl font-mono": !showLinky && whitAnimation,
            "font-sans text-3xl font-semibold": showLinky || !whitAnimation,
          }
        )}
      >
        {whitAnimation
          ? animatedText.to((val) =>
              fullText.slice(0, textLength - Math.floor(val))
            )
          : "Linky!"}
      </animated.h1>
    </div>
  );
}
