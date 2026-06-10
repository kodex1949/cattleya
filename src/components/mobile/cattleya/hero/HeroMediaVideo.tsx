"use client";

import { useEffect, useRef } from "react";

type HeroMediaVideoProps = {
  url: string;
  isActive: boolean;
  isPaused?: boolean;
  isMuted?: boolean;
};

export default function HeroMediaVideo({
  url,
  isActive,
  isPaused = false,
  isMuted = true,
}: HeroMediaVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = isMuted;

    if (!isActive || isPaused) {
      video.pause();
      return;
    }

    void video.play().catch(() => undefined);
  }, [isActive, isPaused, isMuted]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isActive) return;

    video.currentTime = 0;
  }, [isActive, url]);

  return (
    <video
      ref={videoRef}
      src={url}
      className="pointer-events-none h-full w-full select-none object-cover object-center scale-[1.08]"
      autoPlay
      muted={isMuted}
      loop
      playsInline
      preload="metadata"
    />
  );
}