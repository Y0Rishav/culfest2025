
"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "CULFEST .",
      className: "text-orange-500 dark:text-white text-7xl font-Bangers tracking-wider",
    },
  ];
  return <TypewriterEffect words={words} />;
}
