"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { VortexDemo } from "./vortexdemo";
import { MovingBorderDemo } from "./ButtonBorder";
import { mockData } from "@/utils/mockdata";
import { DummyContent } from "@/utils/eventadata/Dance";
import { DummyContent1 } from "@/utils/eventadata/Dramatics";
import { DummyContent2 } from "@/utils/eventadata/FineArts";
import { DummyContent3 } from "@/utils/eventadata/Literary";
import { DummyContent4 } from "@/utils/eventadata/Music";
import { DummyContent5 } from "@/utils/eventadata/Quizzing";
import { DummyContent6 } from "@/utils/eventadata/Photo";
import { DummyContent8 } from "@/utils/eventadata/Informal";
import { DummyContent10 } from "@/utils/eventadata/Fashion";
import { DummyContentFlagship } from "@/utils/eventadata/Flagship";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="h-full w-full py-20">
      <div className="relative z-20 text-center">
        <h2
          className="font-Bangers text-6xl tracking-wider md:text-7xl lg:text-8xl"
          style={{
            background: "linear-gradient(135deg, #ffd700, #ff4444, #ffd700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px rgba(255, 215, 0, 0.3)",
            letterSpacing: "4px",
          }}
        >
          EVENTS
        </h2>
        <p
          className="mx-auto mt-2 font-Bangers text-lg tracking-[6px] md:text-xl"
          style={{
            color: "#00e5ff",
            textShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
          }}
        >
          COMIC CON EDITION
        </p>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "Dance",
    title: "Get ready to groove! Show off your best moves",
    src: "/event2026/Dance.jpeg",
    content: <DummyContent />,
  },
  {
    category: "Dramatics",
    title: "Unleash the actor within! Participate in skits, plays, and more.",
    src: "/event2026/Dramatics.jpeg",
    content: <DummyContent1 />,
  },
  {
    category: "Fine Arts",
    title:
      "Unleash your creativity! Showcase your paintings and artwork to win recognition!",
    src: "/event2026/FineArts.jpeg",
    content: <DummyContent2 />,
  },

  {
    category: "Literary",
    title: "Word wizards, assemble!",
    src: "/event2026/Literary.jpeg",
    content: <DummyContent3 />,
  },
  {
    category: "Music",
    title:
      "Strike a chord! Sing, play, or compose your way to stardom and win exciting prizes!",
    src: "/event2026/Music.jpeg",
    content: <DummyContent4 />,
  },
  {
    category: "Quizzing",
    title:
      "Brainiacs, get ready! Test your knowledge, speed, and strategy to win quizzing championships!",
    src: "/event2026/Quizzing.jpeg",
    content: <DummyContent5 />,
  },
  {
    category: "Photography",
    title: "Capture the moment! Showcase your photography skills and win",
    src: "/event2026/PhotoGraphy.jpeg",
    content: <DummyContent6 />,
  },
  {
    category: "Informals",
    title:
      "Participate in casual games, activities, and events to win prizes and make memories!",
    src: "/event2026/Informals.jpeg",
    content: <DummyContent8 />,
  },
  {
    category: "Fashion",
    title:
      "Walk the ramp! Showcase your style, creativity, and confidence to win fashion contests ",
    src: "/event2026/Fashion.jpeg",
    content: <DummyContent10 />,
  },
  {
    category: "FlagShipEvent",
    title:
      "Walk the ramp! Showcase your style, creativity, and confidence to win fashion contests ",
    src: "/event2026/FlagshipEvent.jpeg",
    content: <DummyContentFlagship />,
  },
];
