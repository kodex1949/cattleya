"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import HeroPCContent from "./HeroPCContent";
import HeroPCMedia from "./HeroPCMedia";
import HeroPCSliderControls from "./HeroPCSliderControls";

import type { HeroPCProps } from "./hero.types";

export default function HeroPC({ data }: HeroPCProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const slides = useMemo(() => data.media ?? [], [data.media]);
  const activeSlide = slides[activeIndex];

  const getActiveVideo = useCallback(() => {
    if (!activeSlide || activeSlide.type !== "video") return null;

    return document.querySelector(
      `[data-hero-video="${activeSlide.id}"]`,
    ) as HTMLVideoElement | null;
  }, [activeSlide]);

  const syncVideoState = useCallback(() => {
    const video = getActiveVideo();

    if (!video) {
      setIsVideoPlaying(false);
      setIsVideoMuted(true);
      return;
    }

    setIsVideoPlaying(!video.paused);
    setIsVideoMuted(video.muted);
  }, [getActiveVideo]);

  const toggleVideoPlay = useCallback(() => {
    const video = getActiveVideo();

    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  }, [getActiveVideo]);

  const toggleVideoMute = useCallback(() => {
    const video = getActiveVideo();

    if (!video) return;

    video.muted = !video.muted;
    setIsVideoMuted(video.muted);
  }, [getActiveVideo]);

  const goToPreviousSlide = useCallback(() => {
    if (!slides.length) return;
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNextSlide = useCallback(() => {
    if (!slides.length) return;
    setActiveIndex((current) => (current + 1) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!slides.length) return;
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    setIsVideoPlaying(activeSlide?.type === "video");
    setIsVideoMuted(true);

    window.setTimeout(() => {
      syncVideoState();
    }, 80);
  }, [activeSlide, syncVideoState]);

  useEffect(() => {
    if (slides.length <= 1 || !activeSlide) return;

    if (activeSlide.type === "image") {
      const timeout = window.setTimeout(() => {
        goToNextSlide();
      }, 6500);

      return () => window.clearTimeout(timeout);
    }

    const video = getActiveVideo();

    if (!video) return;

    function handleEnded() {
      goToNextSlide();
    }

    function handlePlay() {
      setIsVideoPlaying(true);
    }

    function handlePause() {
      setIsVideoPlaying(false);
    }

    function handleVolumeChange() {
      setIsVideoMuted(video.muted);
    }

    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [activeSlide, getActiveVideo, goToNextSlide, slides.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070504] text-white">
      <HeroPCMedia
        slides={slides}
        activeIndex={activeIndex}
        title={activeSlide?.title ?? data.title}
      />

      <div className="pointer-events-none absolute left-10 top-[52%] z-10 hidden -translate-y-1/2 xl:block">
        <div className="flex h-[360px] flex-col items-center justify-between">
          <span className="h-24 w-px bg-white/20" />

          <p className="-rotate-90 text-[10px] uppercase tracking-[0.42em] text-white/35">
            Maison Cattleya
          </p>

          <span className="h-24 w-px bg-white/20" />
        </div>
      </div>

      <HeroPCContent activeSlide={activeSlide} />

      <HeroPCSliderControls
        slides={slides}
        activeIndex={activeIndex}
        isVideoPlaying={isVideoPlaying}
        isVideoMuted={isVideoMuted}
        onPrevious={goToPreviousSlide}
        onNext={goToNextSlide}
        onSlideChange={goToSlide}
        onToggleVideoPlay={toggleVideoPlay}
        onToggleVideoMute={toggleVideoMute}
      />
    </section>
  );
}