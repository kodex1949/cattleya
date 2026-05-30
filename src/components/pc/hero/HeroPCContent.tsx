"use client";

import type { HeroPCMediaItem } from "./hero.types";

type HeroPCContentProps = {
  activeSlide?: HeroPCMediaItem;
};

export default function HeroPCContent({ activeSlide }: HeroPCContentProps) {
  void activeSlide;

  return null;
}