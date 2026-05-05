"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

export default function HeroMobileCattleya({
  data,
}: {
  data: HeroMobileData;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const autoplayTimeoutRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const scrollEndTimeoutRef = useRef<number | null>(null);
  const autoplayEnabledRef = useRef(true);

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

  function clearScrollEndTimeout() {
    if (scrollEndTimeoutRef.current !== null) {
      window.clearTimeout(scrollEndTimeoutRef.current);
      scrollEndTimeoutRef.current = null;
    }
  }

  function getCurrentIndexFromScroll() {
    const slider = sliderRef.current;
    if (!slider || totalSlides <= 0) return 0;

    const slideWidth = slider.clientWidth;
    if (!slideWidth) return 0;

    return Math.max(
      0,
      Math.min(Math.round(slider.scrollLeft / slideWidth), totalSlides - 1)
    );
  }

  function goToSlide(index: number) {
    const slider = sliderRef.current;
    if (!slider || totalSlides <= 0) return;

    const safeIndex = Math.max(0, Math.min(index, totalSlides - 1));

    slider.scrollTo({
      left: slider.clientWidth * safeIndex,
      behavior: "smooth",
    });
  }

  function goToNextSlide() {
    if (totalSlides <= 1) return;

    const current = getCurrentIndexFromScroll();
    const nextIndex = current + 1 >= totalSlides ? 0 : current + 1;

    goToSlide(nextIndex);
  }

  function pauseAutoplayTemporarily() {
    autoplayEnabledRef.current = false;

    clearAutoplayTimeout();
    clearResumeTimeout();

    resumeTimeoutRef.current = window.setTimeout(() => {
      autoplayEnabledRef.current = true;
    }, 5000);
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.to(content, {
        y: -72,
        opacity: 0.78,
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
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    function handleScroll() {
      clearScrollEndTimeout();

      scrollEndTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex(getCurrentIndexFromScroll());
      }, 90);
    }

    slider.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [totalSlides]);

  useEffect(() => {
    if (!autoplayEnabledRef.current || totalSlides <= 1) {
      clearAutoplayTimeout();
      return;
    }

    clearAutoplayTimeout();

    const delay = activeMedia?.type === "video" ? 6500 : 4200;

    autoplayTimeoutRef.current = window.setTimeout(() => {
      if (!autoplayEnabledRef.current) return;
      goToNextSlide();
    }, delay);

    return () => {
      clearAutoplayTimeout();
    };
  }, [activeIndex, activeMedia?.type, totalSlides]);

  useEffect(() => {
    return () => {
      clearAutoplayTimeout();
      clearResumeTimeout();
      clearScrollEndTimeout();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-[#0d0b09] text-white"
    >
      <div
        ref={sliderRef}
        className="relative flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
        onTouchStart={pauseAutoplayTemporarily}
        onPointerDown={pauseAutoplayTemporarily}
      >
        {totalSlides > 0 ? (
          data.media.map((item, index) => (
            <div
              key={item.id}
              className="relative h-full min-w-full shrink-0 snap-start overflow-hidden"
            >
              {item.type === "video" ? (
                <HeroMediaVideo url={item.url} isActive={index === activeIndex} />
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

              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_32%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/78" />
              <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#090706] via-[#090706]/72 to-transparent" />
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
            Aucun média trouvé
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute left-5 right-5 top-7 z-30 flex items-center justify-between">
        <p className="text-[9px] uppercase tracking-[0.48em] text-white/62">
          Cattleya
        </p>

        {totalSlides > 0 && (
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/58">
            {padNumber(activeIndex + 1)} / {padNumber(totalSlides)}
          </p>
        )}
      </div>

      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-8"
      >
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[355px]"
        >
          {data.eyebrow && (
            <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-white/58">
              {data.eyebrow}
            </p>
          )}

          <h1 className="max-w-[350px] text-[50px] font-light leading-[0.84] tracking-[-0.095em]">
            {data.title}
          </h1>

          {data.description && (
            <p className="mt-5 max-w-[305px] text-[14px] leading-6 text-white/68">
              {data.description}
            </p>
          )}

          <div className="mt-7 flex items-center gap-3">
            {data.primary_cta_label && data.primary_cta_href && (
              <Link
                href={data.primary_cta_href}
                className="pointer-events-auto flex h-12 items-center gap-3 bg-white px-5 text-[10px] font-medium uppercase tracking-[0.22em] text-black"
              >
                {data.primary_cta_label}
                <ArrowRight size={14} weight="bold" />
              </Link>
            )}

            {data.secondary_cta_label && data.secondary_cta_href && (
              <Link
                href={data.secondary_cta_href}
                className="pointer-events-auto flex h-12 items-center px-2 text-[10px] uppercase tracking-[0.22em] text-white/68"
              >
                {data.secondary_cta_label}
              </Link>
            )}
          </div>

          {data.caption && (
            <p className="mt-6 max-w-[260px] text-[11px] leading-5 text-white/42">
              {data.caption}
            </p>
          )}
        </motion.div>

        {totalSlides > 1 && (
          <div className="pointer-events-auto mt-7 flex items-center gap-1.5">
            {data.media.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  pauseAutoplayTemporarily();
                  goToSlide(index);
                }}
                aria-label={`Aller au visuel ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-9 bg-white" : "w-1.5 bg-white/32"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}