"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
  Sparkle,
} from "phosphor-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroMediaVideo from "./HeroMediaVideo";

type HeroMediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
};

type HeroMobileData = {
  eyebrow: string | null;
  title: string;
  description: string | null;
  caption: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  media: HeroMediaItem[];
};

function padNumber(value: number) {
  return String(value).padStart(2, "0");
}

export default function HeroMobileCattleya({ data }: { data: HeroMobileData }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const autoplayTimeoutRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const autoplayEnabledRef = useRef(true);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const totalSlides = data.media.length;

  const activeMedia = useMemo(() => {
    if (totalSlides === 0) return null;
    return data.media[activeIndex] ?? data.media[0];
  }, [activeIndex, data.media, totalSlides]);

  const hasVideo = activeMedia?.type === "video";

  function clearAutoplayTimeout() {
    if (autoplayTimeoutRef.current !== null) {
      window.clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  }

  function clearResumeTimeout() {
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }

  function goToSlide(index: number) {
    if (totalSlides <= 0) return;
    setActiveIndex(Math.max(0, Math.min(index, totalSlides - 1)));
  }

  function goToNextSlide() {
    if (totalSlides <= 1) return;

    setActiveIndex((current) =>
      current + 1 >= totalSlides ? 0 : current + 1
    );
  }

  function goToPreviousSlide() {
    if (totalSlides <= 1) return;

    setActiveIndex((current) =>
      current - 1 < 0 ? totalSlides - 1 : current - 1
    );
  }

  function pauseAutoplayTemporarily() {
    if (isPaused) return;

    autoplayEnabledRef.current = false;

    clearAutoplayTimeout();
    clearResumeTimeout();

    resumeTimeoutRef.current = window.setTimeout(() => {
      autoplayEnabledRef.current = true;
    }, 5200);
  }

  function togglePause() {
    setIsPaused((current) => !current);
    autoplayEnabledRef.current = isPaused;
    clearAutoplayTimeout();
    clearResumeTimeout();
  }

  function toggleMute() {
    setIsMuted((current) => !current);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    pauseAutoplayTemporarily();
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchEndXRef.current = null;
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    touchEndXRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd() {
    const startX = touchStartXRef.current;
    const endX = touchEndXRef.current;

    touchStartXRef.current = null;
    touchEndXRef.current = null;

    if (startX === null || endX === null) return;

    const distance = startX - endX;
    const threshold = 34;

    if (Math.abs(distance) < threshold) return;

    if (distance > 0) {
      goToNextSlide();
      return;
    }

    goToPreviousSlide();
  }

  useEffect(() => {
    if (shouldReduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.to(content, {
        y: -54,
        opacity: 0.78,
        scale: 0.965,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (
      shouldReduceMotion ||
      isPaused ||
      !autoplayEnabledRef.current ||
      totalSlides <= 1
    ) {
      clearAutoplayTimeout();
      return;
    }

    clearAutoplayTimeout();

    const delay = activeMedia?.type === "video" ? 7200 : 5200;

    autoplayTimeoutRef.current = window.setTimeout(() => {
      if (!autoplayEnabledRef.current || isPaused) return;
      goToNextSlide();
    }, delay);

    return () => clearAutoplayTimeout();
  }, [activeIndex, activeMedia?.type, totalSlides, shouldReduceMotion, isPaused]);

  useEffect(() => {
    return () => {
      clearAutoplayTimeout();
      clearResumeTimeout();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#060403] text-white"
    >
      <div
        className="relative h-[100svh] overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={pauseAutoplayTemporarily}
      >
        <div
          className="flex h-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translate3d(-${activeIndex * 100}%,0,0)`,
          }}
        >
          {totalSlides > 0 ? (
            data.media.map((item, index) => (
              <div
                key={item.id}
                className="relative h-full min-w-full shrink-0 overflow-hidden"
              >
                {item.type === "video" ? (
                  <HeroMediaVideo
                    url={item.url}
                    isActive={index === activeIndex}
                    isPaused={isPaused}
                    isMuted={isMuted}
                  />
                ) : (
                  <Image
                    src={item.url}
                    alt={data.title}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="pointer-events-none select-none object-cover object-center scale-[1.08]"
                    unoptimized
                    draggable={false}
                  />
                )}

                <div className="absolute inset-0 bg-black/16" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(232,197,135,0.18),transparent_34%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.08)_34%,rgba(5,3,2,0.9)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-[#050302] via-[#050302]/76 to-transparent" />
              </div>
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/50">
              Aucun média trouvé
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute left-5 right-5 top-[82px] z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/18 px-3 py-2 backdrop-blur-xl">
            <Sparkle size={11} weight="thin" className="text-[#e7c98f]" />
            <p className="text-[8px] uppercase tracking-[0.36em] text-white/58">
              Maison Cattleya
            </p>
          </div>

          {totalSlides > 0 ? (
            <div className="rounded-full border border-white/10 bg-black/18 px-3 py-2 text-[8px] uppercase tracking-[0.24em] text-white/50 backdrop-blur-xl">
              {padNumber(activeIndex + 1)} / {padNumber(totalSlides)}
            </div>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-auto absolute right-5 top-[136px] z-40 flex flex-col gap-2">
        <button
          type="button"
          onClick={togglePause}
          aria-label={isPaused ? "Relancer le hero" : "Mettre le hero en pause"}
          className="flex size-11 items-center justify-center rounded-full border border-white/12 bg-black/22 text-white/76 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition active:scale-95"
        >
          {isPaused ? (
            <Play size={15} weight="fill" />
          ) : (
            <Pause size={15} weight="fill" />
          )}
        </button>

        {hasVideo ? (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
            className="flex size-11 items-center justify-center rounded-full border border-white/12 bg-black/22 text-white/76 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition active:scale-95"
          >
            {isMuted ? (
              <SpeakerSlash size={16} weight="fill" />
            ) : (
              <SpeakerHigh size={16} weight="fill" />
            )}
          </button>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-x-6 bottom-[96px] z-30">
        <div ref={contentRef} className="flex flex-col items-center text-center">
          <motion.div
            key={activeIndex}
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            {data.eyebrow ? (
              <p className="mb-4 text-[9px] uppercase tracking-[0.46em] text-[#e7c98f]/86">
                {data.eyebrow}
              </p>
            ) : null}

            <h1 className="text-[58px] font-light leading-[0.82] tracking-[-0.11em] text-white drop-shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
              {data.title}
            </h1>

            {data.description ? (
              <p className="mx-auto mt-6 max-w-[300px] text-[13px] font-light leading-[1.9] text-white/72 drop-shadow-[0_12px_34px_rgba(0,0,0,0.7)]">
                {data.description}
              </p>
            ) : null}

            <div className="mt-7 flex flex-col items-center justify-center gap-3">
              {data.primary_cta_label && data.primary_cta_href ? (
                <Link
                  href={data.primary_cta_href}
                  className="pointer-events-auto group flex h-12 w-full max-w-[260px] items-center justify-center gap-3 rounded-full border border-white/80 bg-white px-6 text-[10px] uppercase tracking-[0.26em] text-black shadow-[0_18px_60px_rgba(0,0,0,0.38)] transition active:scale-[0.98]"
                >
                  {data.primary_cta_label}

                  <ArrowRight
                    size={14}
                    weight="thin"
                    className="transition-transform duration-300 group-active:translate-x-1"
                  />
                </Link>
              ) : null}

              {data.secondary_cta_label && data.secondary_cta_href ? (
                <Link
                  href={data.secondary_cta_href}
                  className="pointer-events-auto text-[10px] uppercase tracking-[0.28em] text-white/64 transition active:text-white"
                >
                  {data.secondary_cta_label}
                </Link>
              ) : null}
            </div>

            {data.caption ? (
              <p className="mx-auto mt-6 max-w-[260px] border-t border-white/14 pt-4 text-[9px] font-light uppercase leading-5 tracking-[0.18em] text-white/42">
                {data.caption}
              </p>
            ) : null}
          </motion.div>
        </div>
      </div>

      {totalSlides > 1 ? (
        <div className="pointer-events-auto absolute bottom-[max(32px,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 px-2 py-2">
          {data.media.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                pauseAutoplayTemporarily();
                goToSlide(index);
              }}
              aria-label={`Aller au visuel ${index + 1}`}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                index === activeIndex ? "w-10 bg-white" : "w-3 bg-white/26"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}