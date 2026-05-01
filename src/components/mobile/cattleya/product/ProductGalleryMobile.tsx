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
  const hideTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
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
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  function revealControls() {
    if (!isVideo || !hasMedia) return;

    setShowControls(true);

    if (hideTimerRef.current) {
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
            aria-label={isPlaying ? "Pause vidéo" : "Lire vidéo"}
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-300 active:scale-95"
          >
            <span className="absolute inset-[5px] rounded-full border border-white/10" />

            {isPlaying ? (
              <span className="relative flex h-4 w-4 items-center justify-center gap-[3px]">
                <span className="h-4 w-[3px] rounded-full bg-white" />
                <span className="h-4 w-[3px] rounded-full bg-white" />
              </span>
            ) : (
              <span className="relative ml-[2px] h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-300 active:scale-95"
          >
            <span className="absolute inset-[5px] rounded-full border border-white/10" />

            <span className="relative flex items-center">
              <span className="h-3 w-2 rounded-[2px] bg-white" />
              <span className="h-5 w-3 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />

              {!isMuted && (
                <span className="ml-1 flex gap-[2px]">
                  <span className="h-2 w-[2px] rounded-full bg-white/70" />
                  <span className="h-3 w-[2px] rounded-full bg-white" />
                  <span className="h-4 w-[2px] rounded-full bg-white/70" />
                </span>
              )}

              {isMuted && (
                <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] bg-white" />
              )}
            </span>
          </button>
        </div>
      )}

      <div className="absolute bottom-12 left-5 right-5 z-10 text-white">
        <p className="mb-5 text-[9px] uppercase tracking-[0.52em] text-white/62">
          Haute parfumerie
        </p>

        <h2 className="max-w-[335px] text-[46px] font-light leading-[0.84] tracking-[-0.095em]">
          Une présence qui laisse une trace.
        </h2>

        <div className="mt-7 flex items-center gap-4">
          <div className="h-px w-16 bg-white/42" />
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/55">
            {String(safeIndex + 1).padStart(2, "0")} /{" "}
            {String(Math.max(safeMedia.length, 1)).padStart(2, "0")}
          </p>
        </div>
      </div>

      {safeMedia.length > 1 && (
        <div className="absolute bottom-9 right-5 z-20 flex items-center gap-1.5">
          {safeMedia.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goTo(index);
              }}
              aria-label={`Visuel ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === safeIndex ? "w-10 bg-white" : "w-1.5 bg-white/35"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}