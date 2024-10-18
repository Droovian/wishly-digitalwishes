"use client";
import { TypewriterEffect} from "./ui/typewriter-effect";

export function HeaderTextOccasion() {
  const words = [
    {
      text: "Choose",
    },
    {
      text: "an",
    },
    {
      text: "Occasion...",
    },
  ];
  return (
      <TypewriterEffect words={words} />
  );
}
