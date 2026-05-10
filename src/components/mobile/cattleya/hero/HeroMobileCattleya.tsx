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
        y: -52,
        opacity: 0.74,
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

    const delay = activeMedia?.type === "video" ? 6800 : 4600;

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
      className="relative h-[100svh] overflow-hidden bg-[#090705] text-white"
    >
      <div
        className="relative h-full overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={pauseAutoplayTemporarily}
      >
        <div
          className="flex h-full transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                    className="pointer-events-none select-none object-cover object-center"
                    unoptimized
                    draggable={false}
                  />
                )}

                <div className="absolute inset-0 bg-black/[0.08]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.10),transparent_34%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/44 via-black/0 to-black/90" />
                <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#060403] via-[#060403]/78 to-transparent" />
              </div>
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/50">
              Aucun média trouvé
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute left-5 right-5 top-[92px] z-30 flex items-center justify-between border-t border-white/14 pt-4">
        <p className="text-[9px] uppercase tracking-[0.52em] text-white/52">
          Maison Cattleya
        </p>

        {totalSlides > 0 ? (
          <p className="text-[9px] uppercase tracking-[0.26em] text-white/42">
            {padNumber(activeIndex + 1)} / {padNumber(totalSlides)}
          </p>
        ) : null}
      </div>

      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-[max(38px,env(safe-area-inset-bottom))]"
      >
        <motion.div
          key={activeIndex}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.86,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[365px] pb-12"
        >
          {data.eyebrow ? (
            <p className="mb-5 text-[9px] uppercase tracking-[0.44em] text-[#d6bc91]/72">
              {data.eyebrow}
            </p>
          ) : null}

          <h1 className="font-serif text-[60px] font-light leading-[0.78] tracking-[-0.11em]">
            {data.title}
          </h1>

          {data.description ? (
            <p className="mt-6 max-w-[305px] text-[14px] font-light leading-7 text-white/62">
              {data.description}
            </p>
          ) : null}

          <div className="mt-8 flex items-center gap-6">
            {data.primary_cta_label && data.primary_cta_href ? (
              <Link
                href={data.primary_cta_href}
                className="pointer-events-auto group flex items-center gap-3 border-b border-white/70 pb-2 text-[10px] uppercase tracking-[0.25em] text-white transition active:opacity-70"
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
                className="pointer-events-auto text-[10px] uppercase tracking-[0.25em] text-white/46 transition active:text-white/70"
              >
                {data.secondary_cta_label}
              </Link>
            ) : null}
          </div>

          {data.caption ? (
            <p className="mt-7 max-w-[260px] border-l border-white/16 pl-4 text-[11px] font-light leading-5 text-white/36">
              {data.caption}
            </p>
          ) : null}
        </motion.div>
      </div>

      {totalSlides > 1 ? (
        <div className="pointer-events-auto absolute bottom-[max(36px,env(safe-area-inset-bottom))] right-5 z-40 flex items-center gap-2">
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
                index === activeIndex ? "w-12 bg-white" : "w-5 bg-white/28"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}