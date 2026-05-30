"use client";

import Link from "next/link";
import { Pause, Play, SpeakerHigh, SpeakerSlash } from "phosphor-react";

import type { HeroPCMediaItem } from "./hero.types";
import { padNumber } from "./hero.utils";

type HeroPCSliderControlsProps = {
  slides: HeroPCMediaItem[];
  activeIndex: number;
  isVideoPlaying?: boolean;
  isVideoMuted?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
  onToggleVideoPlay?: () => void;
  onToggleVideoMute?: () => void;
};

export default function HeroPCSliderControls({
  slides,
  activeIndex,
  isVideoPlaying = true,
  isVideoMuted = true,
  onPrevious,
  onNext,
  onSlideChange,
  onToggleVideoPlay,
  onToggleVideoMute,
}: HeroPCSliderControlsProps) {
  if (slides.length <= 1) return null;

  const activeSlide = slides[activeIndex];
  const isVideo = activeSlide?.type === "video";

  return (
    <div className="absolute bottom-20 right-10 z-30 hidden xl:block">
      <div className="relative w-[420px] translate-y-[-40px] overflow-hidden border border-white/10 bg-black/20 px-8 py-8 shadow-[0_40px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

        <div className="relative z-10 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#d6bc91]/70">
            {activeSlide?.eyebrow ?? "Maison Cattleya"}
          </p>

          <span className="text-[10px] uppercase tracking-[0.24em] text-white/25">
            {padNumber(activeIndex + 1)}
          </span>
        </div>

        <div className="relative z-10 mt-8 max-w-[340px]">
          <h2 className="font-serif text-[34px] font-light leading-[0.95] tracking-[-0.06em] text-white">
            {activeSlide?.title ?? ""}
          </h2>

          {activeSlide?.description ? (
            <p className="mt-6 text-[13px] font-light leading-7 tracking-[-0.01em] text-white/48">
              {activeSlide.description}
            </p>
          ) : null}

          {activeSlide?.caption ? (
            <p className="mt-5 border-l border-white/12 pl-4 text-[11px] font-light leading-5 tracking-[-0.01em] text-white/34">
              {activeSlide.caption}
            </p>
          ) : null}
        </div>

        {isVideo ? (
          <div className="relative z-10 mt-7 flex items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/28">
                Vidéo
              </p>

              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#d6bc91]/75">
                Contrôle média
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleVideoPlay}
                className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/20 text-white/70 transition duration-500 hover:border-[#d6bc91]/60 hover:text-[#d6bc91]"
                aria-label={isVideoPlaying ? "Mettre en pause" : "Lire la vidéo"}
              >
                {isVideoPlaying ? <Pause size={15} /> : <Play size={15} />}
              </button>

              <button
                type="button"
                onClick={onToggleVideoMute}
                className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/20 text-white/70 transition duration-500 hover:border-[#d6bc91]/60 hover:text-[#d6bc91]"
                aria-label={isVideoMuted ? "Activer le son" : "Couper le son"}
              >
                {isVideoMuted ? (
                  <SpeakerSlash size={15} />
                ) : (
                  <SpeakerHigh size={15} />
                )}
              </button>
            </div>
          </div>
        ) : null}

        {activeSlide?.primary_cta_label && activeSlide?.primary_cta_href ? (
          <div className="relative z-10 mt-8 border-t border-white/8 pt-6">
            <Link
              href={activeSlide.primary_cta_href}
              className="group flex items-center justify-between border border-[#d6bc91]/30 bg-[#d6bc91]/5 px-5 py-4 transition-all duration-500 hover:border-[#d6bc91] hover:bg-[#d6bc91]/10"
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6bc91]/60">
                  Découvrir
                </p>

                <p className="mt-2 text-[12px] uppercase tracking-[0.24em] text-white">
                  {activeSlide.primary_cta_label}
                </p>
              </div>

              <span className="text-[18px] text-[#d6bc91] transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {activeSlide.secondary_cta_label &&
            activeSlide.secondary_cta_href ? (
              <Link
                href={activeSlide.secondary_cta_href}
                className="mt-4 block text-center text-[10px] uppercase tracking-[0.28em] text-white/45 transition hover:text-white"
              >
                {activeSlide.secondary_cta_label}
              </Link>
            ) : null}
          </div>
        ) : null}

        <div className="relative z-10 mt-8 border-t border-white/10 pt-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/34">
                Galerie
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="font-serif text-[28px] font-light leading-none tracking-[-0.06em] text-white">
                  {padNumber(activeIndex + 1)}
                </span>

                <span className="pb-[2px] text-[18px] text-white/24">/</span>

                <span className="pb-[2px] text-[18px] text-white/32">
                  {padNumber(slides.length)}
                </span>
              </div>
            </div>

            <div className="flex w-[180px] items-center gap-3 pb-2">
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => onSlideChange(index)}
                    className="group relative h-6 flex-1"
                    aria-label={`Afficher la slide ${index + 1}`}
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/14" />

                    <span
                      className={[
                        "absolute left-0 top-1/2 h-px -translate-y-1/2 bg-[#d6bc91] transition-all duration-700",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
            <button
              type="button"
              onClick={onPrevious}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40 transition duration-500 hover:text-[#d6bc91]"
            >
              ← Précédent
            </button>

            <button
              type="button"
              onClick={onNext}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/72 transition duration-500 hover:text-[#d6bc91]"
            >
              Suivant →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}