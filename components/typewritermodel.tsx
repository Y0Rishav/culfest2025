
"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "CULFEST'26 ",
      className: "text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter font-['Montserrat']",
    },
  ];


  return <TypewriterEffect words={words} />;
}
