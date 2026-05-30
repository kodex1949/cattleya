"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowsOutSimple,
  CaretLeft,
  CaretRight,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";

import type {
  ProductPCData,
  ProductPCMedia,
} from "./product.types";

type ProductPCGalleryProps = {
  product: ProductPCData;
  mode?: "main" | "secondary";
  activeIndex: number;
  onActiveIndexChange: (
    index: number,
  ) => void;
};

type ProductMedia = ProductPCMedia;

function getUniqueMedia(
  product: ProductPCData,
): ProductMedia[] {
  const productMedia =
    product.media ?? [];

  const fallbackImages: ProductMedia[] =
    [
      ...(product.featuredImage
        ? [
            {
              type: "image" as const,
              url: product.featuredImage
                .url,
              altText:
                product.featuredImage
                  .altText,
            },
          ]
        : []),

      ...(product.images ?? []).map(
        (image) => ({
          type: "image" as const,
          url: image.url,
          altText: image.altText,
        }),
      ),
    ];

  const media =
    productMedia.length > 0
      ? productMedia
      : fallbackImages;

  return media.filter(
    (item, index, array) =>
      array.findIndex(
        (mediaItem) =>
          mediaItem.url === item.url,
      ) === index,
  );
}

function getNeighbourIndex(
  activeIndex: number,
  length: number,
) {
  if (length <= 1) return 0;

  return (activeIndex + 1) % length;
}

function getPreviousIndex(
  activeIndex: number,
  length: number,
) {
  if (length <= 1) return 0;

  return activeIndex === 0
    ? length - 1
    : activeIndex - 1;
}

function getNextIndex(
  activeIndex: number,
  length: number,
) {
  if (length <= 1) return 0;

  return (activeIndex + 1) % length;
}

export default function ProductPCGallery({
  product,
  mode = "main",
  activeIndex,
  onActiveIndexChange,
}: ProductPCGalleryProps) {
  const [videoPaused, setVideoPaused] =
    useState(false);

  const [videoMuted, setVideoMuted] =
    useState(true);

  const cleanMedia =
    getUniqueMedia(product);

  const safeActiveIndex =
    activeIndex >= 0 &&
    activeIndex < cleanMedia.length
      ? activeIndex
      : 0;

  const activeMedia =
    cleanMedia[safeActiveIndex] ?? null;

  const secondaryMedia =
    cleanMedia[
      getNeighbourIndex(
        safeActiveIndex,
        cleanMedia.length,
      )
    ] ?? activeMedia;

  function goToMedia(index: number) {
    onActiveIndexChange(index);

    setVideoPaused(false);
    setVideoMuted(true);
  }

  function goPrevious() {
    goToMedia(
      getPreviousIndex(
        safeActiveIndex,
        cleanMedia.length,
      ),
    );
  }

  function goNext() {
    goToMedia(
      getNextIndex(
        safeActiveIndex,
        cleanMedia.length,
      ),
    );
  }

  if (mode === "secondary") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f7f5f2] px-16">
        <div className="relative aspect-[0.72] w-full max-w-[330px] overflow-hidden border border-black/[0.04] bg-[#ebe7e2] shadow-[0_35px_90px_rgba(0,0,0,0.08)]">
          <AnimatePresence mode="wait">
            {secondaryMedia ? (
              <motion.div
                key={`secondary-${secondaryMedia.type}-${secondaryMedia.url}`}
                initial={{
                  opacity: 0,
                  x: 70,
                  scale: 1.04,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -70,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.72,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="absolute inset-0"
              >
                <MediaRenderer
                  media={secondaryMedia}
                  title={product.title}
                  compact
                  muted
                  paused={false}
                />
              </motion.div>
            ) : (
              <div className="h-full w-full bg-black/5" />
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 z-10">
            <p className="text-[9px] uppercase tracking-[0.34em] text-white/45">
              Média suivant
            </p>

            <p className="mt-2 font-serif text-[26px] font-light leading-none tracking-[-0.08em] text-white/85">
              {String(
                getNeighbourIndex(
                  safeActiveIndex,
                  cleanMedia.length,
                ) + 1,
              ).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#fbfaf8]">
      <div className="absolute left-8 top-8 z-20 flex items-center gap-4">
        <p className="text-[10px] uppercase tracking-[0.32em] text-black/35">
          {String(
            safeActiveIndex + 1,
          ).padStart(2, "0")}

          <span className="mx-2 text-black/18">
            /
          </span>

          {String(
            cleanMedia.length,
          ).padStart(2, "0")}
        </p>
      </div>

      <div className="relative h-[78vh] min-h-[620px] w-full max-w-[780px] overflow-hidden">
        <AnimatePresence mode="wait">
          {activeMedia ? (
            <motion.div
              key={`main-${activeMedia.type}-${activeMedia.url}`}
              initial={{
                opacity: 0,
                x: 90,
                rotate: 1.6,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -90,
                rotate: -1.6,
                scale: 0.985,
              }}
              transition={{
                duration: 0.72,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="absolute inset-0"
            >
              <MediaRenderer
                media={activeMedia}
                title={product.title}
                paused={videoPaused}
                muted={videoMuted}
              />
            </motion.div>
          ) : (
            <div className="h-full w-full bg-black/5" />
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-black/10 bg-white/80 text-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:border-black/25 hover:bg-white hover:text-black"
          aria-label="Agrandir le média"
        >
          <ArrowsOutSimple
            size={17}
            weight="light"
          />
        </button>

        {activeMedia?.type ===
        "video" ? (
          <>
            <button
              type="button"
              onClick={() =>
                setVideoPaused(
                  (value) => !value,
                )
              }
              className="grid h-11 w-11 place-items-center border border-black/10 bg-white/80 text-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:border-black/25 hover:bg-white hover:text-black"
              aria-label={
                videoPaused
                  ? "Lire la vidéo"
                  : "Mettre la vidéo en pause"
              }
            >
              {videoPaused ? (
                <Play size={17} />
              ) : (
                <Pause size={17} />
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setVideoMuted(
                  (value) => !value,
                )
              }
              className="grid h-11 w-11 place-items-center border border-black/10 bg-white/80 text-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:border-black/25 hover:bg-white hover:text-black"
              aria-label={
                videoMuted
                  ? "Activer le son"
                  : "Couper le son"
              }
            >
              {videoMuted ? (
                <SpeakerSlash
                  size={17}
                />
              ) : (
                <SpeakerHigh
                  size={17}
                />
              )}
            </button>
          </>
        ) : null}

        <div className="ml-2 flex items-center gap-3">
          <button
            type="button"
            onClick={goPrevious}
            disabled={
              cleanMedia.length <= 1
            }
            className="grid h-11 w-11 place-items-center border border-black/10 bg-white/80 text-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:border-black/25 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Média précédent"
          >
            <CaretLeft
              size={17}
              weight="light"
            />
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={
              cleanMedia.length <= 1
            }
            className="grid h-11 w-11 place-items-center border border-black/10 bg-white/80 text-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:border-black/25 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Média suivant"
          >
            <CaretRight
              size={17}
              weight="light"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

type MediaRendererProps = {
  media: ProductMedia;
  title: string;
  paused?: boolean;
  muted?: boolean;
 compact?: boolean;
};

function MediaRenderer({
  media,
  title,
  paused = false,
  muted = true,
  compact = false,
}: MediaRendererProps) {
  const videoRef =
    useRef<HTMLVideoElement | null>(
      null,
    );

  useEffect(() => {
    if (
      !videoRef.current ||
      media.type !== "video"
    ) {
      return;
    }

    if (paused) {
      videoRef.current.pause();
      return;
    }

    videoRef.current
      .play()
      .catch(() => {
        videoRef.current?.pause();
      });
  }, [paused, media.type]);

  if (media.type === "video") {
    return (
      <video
        ref={videoRef}
        src={media.url}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
        poster={
          media.poster ??
          undefined
        }
        className={`h-full w-full ${
          compact
            ? "object-cover"
            : "object-contain"
        } drop-shadow-[0_38px_54px_rgba(0,0,0,0.14)]`}
      />
    );
  }

  return (
    <Image
      src={media.url}
      alt={
        media.altText ?? title
      }
      fill
      priority
      sizes={
        compact ? "330px" : "780px"
      }
      className={`${
        compact
          ? "object-cover"
          : "object-contain"
      } drop-shadow-[0_38px_54px_rgba(0,0,0,0.14)]`}
      unoptimized
    />
  );
}