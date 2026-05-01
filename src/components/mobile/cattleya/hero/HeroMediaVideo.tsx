"use client";

import { useEffect, useRef } from "react";

type HeroMediaVideoProps = {
  url: string;
  isActive: boolean;
};

export default function HeroMediaVideo({
  url,
  isActive,
}: HeroMediaVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // config iOS autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    if (!isActive) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error("Hero video autoplay failed:", error);
      }
    };

    // tentative immédiate
    void tryPlay();

    // retry pour Safari iPhone
    const t1 = window.setTimeout(tryPlay, 120);
    const t2 = window.setTimeout(tryPlay, 500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isActive, url]);

  return (
    <div className="pointer-events-none absolute inset-0">
      <video
        ref={videoRef}
        src={url}
        autoPlay={isActive}
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        className="h-full w-full object-cover select-none"
      />
    </div>
  );
}