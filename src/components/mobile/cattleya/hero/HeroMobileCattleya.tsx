"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "phosphor-react";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const totalSlides = data.media.length;

  const activeMedia = useMemo(() => {
    if (totalSlides === 0) return null;
    return data.media[activeIndex] ?? data.media[0];
  }, [activeIndex, data.media, totalSlides]);

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
    autoplayEnabledRef.current = false;

    clearAutoplayTimeout();
    clearResumeTimeout();

    resumeTimeoutRef.current = window.setTimeout(() => {
      autoplayEnabledRef.current = true;
    }, 5200);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    pauseAutoplayTemporarily();
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchEndXRef.current = null;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
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
        y: -46,
        opacity: 0.78,
        scale: 0.985,
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
      !autoplayEnabledRef.current ||
      totalSlides <= 1
    ) {
      clearAutoplayTimeout();
      return;
    }

    clearAutoplayTimeout();

    const delay = activeMedia?.type === "video" ? 6800 : 4800;

    autoplayTimeoutRef.current = window.setTimeout(() => {
      if (!autoplayEnabledRef.current) return;
      goToNextSlide();
    }, delay);

    return () => clearAutoplayTimeout();
  }, [activeIndex, activeMedia?.type, totalSlides, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      clearAutoplayTimeout();
      clearResumeTimeout();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-[#070504] text-white"
    >
      <div
        className="relative h-full overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={pauseAutoplayTemporarily}
      >
        <div
          className="flex h-full transition-transform duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                  />
                ) : (
                  <Image
                    src={item.url}
                    alt={data.title}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="pointer-events-none select-none object-cover object-center scale-[1.03]"
                    unoptimized
                    draggable={false}
                  />
                )}

                <div className="absolute inset-0 bg-black/[0.10]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(214,188,145,0.18),transparent_32%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.04)_34%,rgba(0,0,0,0.82)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#050302] via-[#050302]/82 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-black/46 to-transparent" />
              </div>
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/50">
              Aucun média trouvé
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute left-5 right-5 top-[86px] z-30">
        <div className="flex items-center justify-between border-t border-white/12 pt-4">
          <p className="text-[8px] uppercase tracking-[0.48em] text-white/48">
            Maison Cattleya
          </p>

          {totalSlides > 0 ? (
            <p className="text-[8px] uppercase tracking-[0.28em] text-white/42">
              {padNumber(activeIndex + 1)} / {padNumber(totalSlides)}
            </p>
          ) : null}
        </div>
      </div>

      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-x-0 bottom-[74px] z-30 flex justify-center px-6"
      >
        <motion.div
          key={activeIndex}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 28, scale: 0.985 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.92,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[348px] text-center"
        >
          {data.eyebrow ? (
            <p className="mb-5 text-[9px] uppercase tracking-[0.52em] text-[#d6bc91]/82">
              {data.eyebrow}
            </p>
          ) : null}

          <h1 className="font-serif text-[62px] font-light leading-[0.82] tracking-[-0.105em] text-white drop-shadow-[0_18px_46px_rgba(0,0,0,0.52)]">
            {data.title}
          </h1>

          {data.description ? (
            <p className="mx-auto mt-6 max-w-[300px] text-[13px] font-light leading-[1.9] text-white/66">
              {data.description}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            {data.primary_cta_label && data.primary_cta_href ? (
              <Link
                href={data.primary_cta_href}
                className="pointer-events-auto group flex h-11 min-w-[218px] items-center justify-center gap-3 border border-white/80 bg-white px-6 text-[10px] uppercase tracking-[0.28em] text-black shadow-[0_20px_70px_rgba(0,0,0,0.36)] transition active:scale-[0.98]"
              >
                {data.primary_cta_label}

                <ArrowRight
                  size={13}
                  weight="thin"
                  className="transition-transform duration-300 group-active:translate-x-1"
                />
              </Link>
            ) : null}

            {data.secondary_cta_label && data.secondary_cta_href ? (
              <Link
                href={data.secondary_cta_href}
                className="pointer-events-auto border-b border-white/22 pb-2 text-[10px] uppercase tracking-[0.28em] text-white/58 transition active:text-white"
              >
                {data.secondary_cta_label}
              </Link>
            ) : null}
          </div>

          {data.caption ? (
            <p className="mx-auto mt-7 max-w-[260px] border-t border-white/14 pt-4 text-[10px] font-light uppercase leading-5 tracking-[0.18em] text-white/34">
              {data.caption}
            </p>
          ) : null}
        </motion.div>
      </div>

      {totalSlides > 1 ? (
        <div className="pointer-events-auto absolute bottom-[max(34px,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
          {data.media.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                pauseAutoplayTemporarily();
                goToSlide(index);
              }}
              aria-label={`Aller au visuel ${index + 1}`}
              className={`h-px rounded-full transition-all duration-500 ${
                index === activeIndex ? "w-11 bg-white" : "w-4 bg-white/26"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}