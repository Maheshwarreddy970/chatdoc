"use client";
import { TypewriterEffectSmooth } from "./typewriter-effect";
export function TypewriterEffectSmoothComp() {
  const words = [
    {
      text: "Chat",
    },
    {
      text: "with",
    },
    {
      text: "your",
    },
    {
      text: "documents",
      className:"bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500"
    },
    {
      text: "in seconds",
    },
  ];
  return (
    <div className="flex flex-col z-20 items-center justify-center ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
