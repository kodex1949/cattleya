"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "phosphor-react";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const clearAutoplayTimeout = () => {
    if (autoplayTimeoutRef.current) {
      window.clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  };

  const clearResumeTimeout = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const clearScrollEndTimeout = () => {
    if (scrollEndTimeoutRef.current) {
      window.clearTimeout(scrollEndTimeoutRef.current);
      scrollEndTimeoutRef.current = null;
    }
  };

  const getCurrentIndexFromScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return 0;

    const slideWidth = slider.clientWidth;
    if (!slideWidth) return 0;

    return Math.max(
      0,
      Math.min(Math.round(slider.scrollLeft / slideWidth), totalSlides - 1)
    );
  };

  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slideWidth = slider.clientWidth;

    slider.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
  };

  const goToNextSlide = () => {
    if (totalSlides <= 1) return;

    const current = getCurrentIndexFromScroll();
    const nextIndex = current + 1 >= totalSlides ? 0 : current + 1;

    goToSlide(nextIndex);
  };

  const pauseAutoplayTemporarily = () => {
    autoplayEnabledRef.current = false;

    clearAutoplayTimeout();
    clearResumeTimeout();

    resumeTimeoutRef.current = window.setTimeout(() => {
      autoplayEnabledRef.current = true;
    }, 5000);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      clearScrollEndTimeout();

      scrollEndTimeoutRef.current = window.setTimeout(() => {
        const index = getCurrentIndexFromScroll();
        setActiveIndex(index);
      }, 90);
    };

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

    const delay = activeMedia?.type === "video" ? 6500 : 4000;

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
    <section className="relative h-[100svh] overflow-hidden bg-[#0d0d0c] text-white">
      
      {/* SLIDER */}
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

              <div className="pointer-events-none absolute inset-0 bg-black/12" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/72" />
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
            Aucun média trouvé
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[340px]"
        >
          {data.eyebrow && (
            <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-white/60">
              {data.eyebrow}
            </p>
          )}

          <h1 className="text-[42px] leading-[0.95] tracking-tight">
            {data.title}
          </h1>

          {data.description && (
            <p className="mt-4 text-[14px] text-white/80">
              {data.description}
            </p>
          )}

          <div className="mt-6 flex gap-4">
            {data.primary_cta_label && data.primary_cta_href && (
              <Link
                href={data.primary_cta_href}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[11px] uppercase text-black"
              >
                {data.primary_cta_label}
                <ArrowRight size={14} />
              </Link>
            )}

            {data.secondary_cta_label && data.secondary_cta_href && (
              <Link
                href={data.secondary_cta_href}
                className="pointer-events-auto text-[11px] uppercase text-white/70"
              >
                {data.secondary_cta_label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}