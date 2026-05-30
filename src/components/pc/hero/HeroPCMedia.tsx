"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { HeroPCMediaItem } from "./hero.types";

type HeroPCMediaProps = {
  slides: HeroPCMediaItem[];
  activeIndex: number;
  title: string;
};

export default function HeroPCMedia({
  slides,
  activeIndex,
  title,
}: HeroPCMediaProps) {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    const activeSlide = slides[activeIndex];

    if (!activeSlide) return;

    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;

      if (id === activeSlide.id && activeSlide.type === "video") {
        video.currentTime = 0;
        video.muted = true;

        const playPromise = video.play();

        if (playPromise) {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  }, [activeIndex, slides]);

  if (slides.length === 0) {
    return <div className="absolute inset-0 bg-[#070504]" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((media, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={media.id}
            className={[
              "absolute inset-0 overflow-hidden transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              isActive
                ? "z-[2] scale-100 opacity-100"
                : "pointer-events-none z-[1] scale-[1.05] opacity-0",
            ].join(" ")}
          >
            {media.type === "video" ? (
              <video
                ref={(element) => {
                  videoRefs.current[media.id] = element;
                }}
                data-hero-video={media.id}
                src={media.url}
                muted
                defaultMuted
                playsInline
                preload="auto"
                autoPlay={isActive}
                className={[
                  "h-full w-full object-cover transition-transform duration-[2200ms]",
                  isActive ? "scale-100" : "scale-[1.08]",
                ].join(" ")}
              />
            ) : (
              <Image
                src={media.url}
                alt={media.title ?? title}
                fill
                priority={index === 0}
                sizes="100vw"
                className={[
                  "object-cover transition-transform duration-[2200ms]",
                  isActive ? "scale-100" : "scale-[1.08]",
                ].join(" ")}
                unoptimized
              />
            )}

            <div className="absolute inset-0 bg-black/15" />
          </div>
        );
      })}

      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-[#070504]/90 via-[#070504]/40 to-transparent" />

      <div className="absolute inset-0 z-[4] bg-gradient-to-t from-[#070504]/95 via-transparent to-[#070504]/20" />
    </div>
  );
}