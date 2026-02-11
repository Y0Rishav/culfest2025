"use client";
import React from "react";
import ComicBackground from "@/components/ComicBackground";

export function CanvasRevealEffectDemo3({ children }: any) {
  return (
    <div
      className="relative mx-auto flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-8 lg:flex-row lg:px-16"
      style={{ minHeight: "auto" }}
    >
      {/* Comic Con Background */}
      <ComicBackground backgroundColor="#0a0a1a" topRingOffset="15%" />

      {/* Content Layer - Above Background */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
