"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ProductMedia } from "./product.types";

type ProductGalleryMobileProps = {
  media?: ProductMedia[];
  activeMedia?: number;
  onMediaChange?: (index: number) => void;
  title: string;
  vendor?: string | null;
};

function isVideoMedia(media?: ProductMedia) {
  if (!media?.url) return false;
  if (media.type === "video") return true;
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(media.url);
}

export default function ProductGalleryMobile({
  media = [],
  activeMedia = 0,
  onMediaChange,
  title,
  vendor,
}: ProductGalleryMobileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const safeMedia = Array.isArray(media) ? media : [];
  const safeIndex =
    activeMedia >= 0 && activeMedia < safeMedia.length ? activeMedia : 0;

  const currentMedia = safeMedia[safeIndex];
  const hasMedia = Boolean(currentMedia?.url);
  const isVideo = isVideoMedia(currentMedia);

  const mediaLabel = useMemo(() => {
    if (!hasMedia) return "Collection";
    return isVideo ? "Film" : "Image";
  }, [hasMedia, isVideo]);

  useEffect(() => {
    const video = videoRef.current;

    if (!isVideo || !video) {
      setIsPlaying(false);
      return;
    }

    video.muted = isMuted;

    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [safeIndex, isVideo, isMuted]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  function revealControls() {
    if (!isVideo || !hasMedia) return;

    setShowControls(true);

    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 2600);
  }

  function goTo(index: number) {
    if (!safeMedia.length) return;
    const nextIndex = (index + safeMedia.length) % safeMedia.length;
    onMediaChange?.(nextIndex);
  }

  function togglePlay(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    revealControls();

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  }

  function toggleMute(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    revealControls();
    setIsMuted((current) => !current);
  }

  return (
    <section
      className="relative h-[82vh] min-h-[640px] overflow-hidden bg-[#dfd4c4]"
      onClick={revealControls}
      onTouchStart={(event) => {
        revealControls();
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null || safeMedia.length <= 1) return;

        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const diff = touchStartX.current - endX;

        if (Math.abs(diff) > 42) {
          goTo(diff > 0 ? safeIndex + 1 : safeIndex - 1);
        }

        touchStartX.current = null;
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.35),transparent_34%),linear-gradient(180deg,#d9cbb8_0%,#a99780_100%)]" />

      {hasMedia && (
        <>
          <div
            className="absolute inset-0 scale-125 bg-cover bg-center opacity-30 blur-3xl"
            style={{
              backgroundImage: `url(${currentMedia.poster ?? currentMedia.url})`,
            }}
          />
          <div className="absolute inset-0 bg-[#21180f]/15" />
        </>
      )}

      {hasMedia ? (
        isVideo ? (
          <video
            ref={videoRef}
            key={currentMedia.url}
            src={currentMedia.url}
            poster={currentMedia.poster ?? undefined}
            className="relative z-[3] h-full w-full scale-[1.01] object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            key={currentMedia.url}
            src={currentMedia.url}
            alt={currentMedia.altText ?? title}
            className="relative z-[3] h-full w-full scale-[1.01] object-cover"
          />
        )
      ) : (
        <div className="relative z-[3] flex h-full items-center justify-center px-8 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-black/35">
              Cattleya
            </p>
            <p className="mt-4 text-sm text-black/45">
              Aucun visuel disponible
            </p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 z-[4] bg-gradient-to-t from-black/62 via-black/10 to-black/18" />
      <div className="absolute inset-x-0 top-0 z-[4] h-44 bg-gradient-to-b from-black/32 to-transparent" />

      <div className="absolute left-5 top-7 z-10">
        <p className="text-[9px] uppercase tracking-[0.5em] text-white/72">
          {vendor || "Maison Cattleya"}
        </p>
      </div>

      <div className="absolute right-5 top-7 z-10">
        <p className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.36em] text-white/72 backdrop-blur-xl">
          {mediaLabel}
        </p>
      </div>

      {isVideo && hasMedia && (
        <div
          className={`absolute right-5 bottom-32 z-20 flex flex-col gap-3 transition-all duration-500 ${
            showControls
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={togglePlay}
            className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-2xl"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-2xl"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      )}
    </section>
  );
}