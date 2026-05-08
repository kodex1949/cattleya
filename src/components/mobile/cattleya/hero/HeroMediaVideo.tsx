"use client";

import { Pause, Play, SpeakerHigh, SpeakerSlash } from "phosphor-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type HeroMediaVideoProps = {
  url: string;
  isActive: boolean;
};

export default function HeroMediaVideo({
  url,
  isActive,
}: HeroMediaVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);

  function clearControlsTimeout() {
    if (controlsTimeoutRef.current !== null) {
      window.clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  }

  function revealControls() {
    setControlsVisible(true);
    clearControlsTimeout();

    controlsTimeoutRef.current = window.setTimeout(() => {
      setControlsVisible(false);
    }, 2600);
  }

  async function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    revealControls();

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;

    video.muted = nextMuted;
    video.defaultMuted = nextMuted;
    setIsMuted(nextMuted);

    revealControls();
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;
    video.playsInline = true;
    video.loop = true;

    async function playVideo() {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;

      try {
        await currentVideo.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }

    if (!isActive) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    void playVideo();
    revealControls();

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
  }, [isActive, url, isMuted]);

  useEffect(() => {
    return () => {
      clearControlsTimeout();
    };
  }, []);

  return (
    <div
      className="absolute inset-0"
      onPointerMove={revealControls}
      onTouchStart={revealControls}
    >
      <video
        ref={videoRef}
        src={url}
        autoPlay={isActive}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        className="h-full w-full select-none object-cover object-center"
      />

      {isActive && (
        <motion.div
          initial={false}
          animate={{
            opacity: controlsVisible ? 1 : 0,
            y: controlsVisible ? 0 : 8,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-auto absolute right-5 top-[74px] z-40 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white shadow-[0_18px_48px_rgba(0,0,0,0.26)] backdrop-blur-md transition-transform duration-300 active:scale-95"
          >
            {isPlaying ? (
              <Pause size={15} weight="fill" />
            ) : (
              <Play size={15} weight="fill" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white shadow-[0_18px_48px_rgba(0,0,0,0.26)] backdrop-blur-md transition-transform duration-300 active:scale-95"
          >
            {isMuted ? (
              <SpeakerSlash size={16} weight="fill" />
            ) : (
              <SpeakerHigh size={16} weight="fill" />
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}