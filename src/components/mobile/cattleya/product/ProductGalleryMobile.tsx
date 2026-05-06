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
      className="relative h-[84vh] min-h-[650px] overflow-hidden bg-[#e8dfd2]"
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#efe7da_0%,#d2c1aa_100%)]" />

      {hasMedia && (
        <>
          <div
            className="absolute inset-0 scale-125 bg-cover bg-center opacity-25 blur-3xl"
            style={{
              backgroundImage: `url(${currentMedia.poster ?? currentMedia.url})`,
            }}
          />
          <div className="absolute inset-0 bg-[#120d08]/10" />
        </>
      )}

      {hasMedia ? (
        isVideo ? (
          <video
            ref={videoRef}
            key={currentMedia.url}
            src={currentMedia.url}
            poster={currentMedia.poster ?? undefined}
            className="relative z-[3] h-full w-full object-cover"
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
            className="relative z-[3] h-full w-full object-cover"
          />
        )
      ) : (
        <div className="relative z-[3] flex h-full items-center justify-center px-8 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.52em] text-black/35">
              Cattleya
            </p>
            <p className="mt-4 text-sm text-black/45">
              Aucun visuel disponible
            </p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 z-[4] bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      <div className="absolute inset-x-0 top-0 z-[4] h-52 bg-gradient-to-b from-black/35 to-transparent" />

      <div className="absolute left-5 right-5 top-7 z-10 flex items-start justify-between gap-5">
        <div>
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/75">
            {vendor || "Maison Cattleya"}
          </p>
          <div className="mt-3 h-px w-12 bg-white/35" />
        </div>

        <p className="border border-white/20 bg-white/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.36em] text-white/75 backdrop-blur-xl">
          {mediaLabel}
        </p>
      </div>

      <div className="absolute bottom-10 left-5 right-5 z-10">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div className="max-w-[78%]">
            <p className="mb-3 text-[9px] uppercase tracking-[0.46em] text-white/55">
              Découverte olfactive
            </p>

            <h1 className="font-serif text-[34px] leading-[0.95] tracking-[-0.04em] text-white">
              {title}
            </h1>
          </div>

          {safeMedia.length > 1 && (
            <p className="pb-1 text-[10px] uppercase tracking-[0.24em] text-white/65">
              {String(safeIndex + 1).padStart(2, "0")} /{" "}
              {String(safeMedia.length).padStart(2, "0")}
            </p>
          )}
        </div>

        {safeMedia.length > 1 && (
          <div className="flex items-center gap-2">
            {safeMedia.map((item, index) => (
              <button
                key={`${item.url}-${index}`}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(index);
                }}
                className={`h-px flex-1 transition-all duration-500 ${
                  index === safeIndex ? "bg-white" : "bg-white/25"
                }`}
                aria-label={`Afficher le média ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {isVideo && hasMedia && (
        <div
          className={`absolute right-5 bottom-36 z-20 flex flex-col gap-3 transition-all duration-500 ${
            showControls
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={togglePlay}
            className="grid h-12 w-12 place-items-center border border-white/20 bg-black/20 text-[11px] text-white backdrop-blur-2xl transition active:scale-95"
            aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="grid h-12 w-12 place-items-center border border-white/20 bg-black/20 text-[10px] text-white backdrop-blur-2xl transition active:scale-95"
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? "MUTE" : "SOUND"}
          </button>
        </div>
      )}
    </section>
  );
}