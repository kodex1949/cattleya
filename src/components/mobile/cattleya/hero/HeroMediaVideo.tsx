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

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    async function playVideo() {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;

      try {
        await currentVideo.play();
      } catch {
        // Safari/iOS peut bloquer temporairement l’autoplay.
      }
    }

    if (!isActive) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    void playVideo();

    const firstRetry = window.setTimeout(() => {
      void playVideo();
    }, 160);

    const secondRetry = window.setTimeout(() => {
      void playVideo();
    }, 600);

    return () => {
      window.clearTimeout(firstRetry);
      window.clearTimeout(secondRetry);
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
        className="h-full w-full select-none object-cover"
      />
    </div>
  );
}