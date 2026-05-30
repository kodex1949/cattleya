// src/components/pc/cattleya/home/editorial/EditorialCollectionPC.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { CattleyaEditorialItem } from "@/lib/cattleya/editorial/get-editorial-collection";

gsap.registerPlugin(ScrollTrigger);

const CARD_WIDTH = 430;
const CARD_GAP = 16;
const SCROLL_STEP = CARD_WIDTH + CARD_GAP;

type EditorialCollectionPCProps = {
  items: CattleyaEditorialItem[];
};

export default function EditorialCollectionPC({
  items,
}: EditorialCollectionPCProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftContentRef = useRef<HTMLElement | null>(null);
  const carouselWrapRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const cards = useMemo(() => items.slice(0, 7), [items]);
  const totalPages = 2;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        },
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          delay: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        },
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          delay: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 90, scale: 1.04 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.25,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [cards.length]);

  function updatePageFromScroll() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const nextPage =
      Math.round(carousel.scrollLeft / (SCROLL_STEP * 2)) + 1;

    setPage(Math.min(totalPages, Math.max(1, nextPage)));
  }

  function hideLeftAndExpandCarousel() {
    const leftContent = leftContentRef.current;
    const carouselWrap = carouselWrapRef.current;

    if (!leftContent || !carouselWrap || expanded) return;

    setExpanded(true);

    gsap.to(leftContent, {
      x: -260,
      opacity: 0,
      duration: 0.9,
      ease: "power3.inOut",
      pointerEvents: "none",
    });

    gsap.to(carouselWrap, {
      x: -520,
      width: "calc(100% + 520px)",
      duration: 0.95,
      ease: "power3.inOut",
    });
  }

  function showLeftAndResetCarousel() {
    const leftContent = leftContentRef.current;
    const carouselWrap = carouselWrapRef.current;

    if (!leftContent || !carouselWrap || !expanded) return;

    setExpanded(false);

    gsap.to(leftContent, {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.inOut",
      pointerEvents: "auto",
    });

    gsap.to(carouselWrap, {
      x: 0,
      width: "100%",
      duration: 0.95,
      ease: "power3.inOut",
    });
  }

  function scrollLeft() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const futureScroll = carousel.scrollLeft - SCROLL_STEP;

    carousel.scrollBy({
      left: -SCROLL_STEP,
      behavior: "smooth",
    });

    if (futureScroll <= 0) {
      showLeftAndResetCarousel();
    }

    window.setTimeout(updatePageFromScroll, 520);
  }

  function scrollRight() {
    hideLeftAndExpandCarousel();

    carouselRef.current?.scrollBy({
      left: SCROLL_STEP,
      behavior: "smooth",
    });

    window.setTimeout(updatePageFromScroll, 520);
  }

  if (cards.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080604] py-28 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_85%_100%,rgba(147,99,54,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-none px-10">
        <div className="relative grid grid-cols-[560px_minmax(0,1fr)] gap-10">
          <aside
            ref={leftContentRef}
            className="sticky top-28 z-10 ml-28 mt-28 h-fit will-change-transform"
          >
            <p
              ref={eyebrowRef}
              className="text-[10px] uppercase tracking-[0.38em] text-white/35"
            >
              Prenez soin de vous
            </p>

            <h2
              ref={titleRef}
              className="mt-24 max-w-[340px] font-serif text-[84px] font-light leading-[0.86] tracking-[-0.085em] text-white"
            >
              La touche
              <br />
              finale.
            </h2>

            <p
              ref={textRef}
              className="mt-10 max-w-[300px] text-[15px] leading-[1.9] text-white/50"
            >
              Une collection pensée comme un dernier geste. Matières profondes,
              silence chaud, présence durable.
            </p>

            <Link
              href="/pc/collection/manifest"
              className="group mt-14 inline-flex flex-col text-[10px] uppercase tracking-[0.32em] text-white/45 transition hover:text-white"
            >
              Découvrir l’univers
              <span className="mt-3 h-px w-14 bg-white/25 transition-all duration-500 group-hover:w-full group-hover:bg-white" />
            </Link>
          </aside>

          <div className="min-w-0 overflow-visible">
            <div
              ref={carouselWrapRef}
              className="w-full will-change-transform"
            >
              <div
                ref={carouselRef}
                onScroll={updatePageFromScroll}
                className="hide-scrollbar overflow-x-auto overflow-y-hidden scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div
                  ref={cardsRef}
                  className="flex w-[calc((430px*7)+(16px*6))] snap-x snap-mandatory gap-4 pr-[340px]"
                >
                  {cards.map((item, index) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group relative h-[640px] w-[430px] shrink-0 snap-start overflow-hidden bg-black"
                    >
                      {item.media_type === "video" ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale-[0.12] transition duration-[1600ms] group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                        >
                          <source src={item.media_url} />
                        </video>
                      ) : (
                        <Image
                          src={item.media_url}
                          alt={item.title}
                          fill
                          sizes="430px"
                          className="object-cover opacity-80 grayscale-[0.12] transition duration-[1600ms] group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />

                      <div className="absolute left-7 top-7 flex items-center gap-4">
                        <p className="text-[10px] uppercase tracking-[0.34em] text-white/60">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <div className="h-px w-9 bg-white/30" />
                        <p className="text-[10px] uppercase tracking-[0.34em] text-white/35">
                          Cattleya
                        </p>
                      </div>

                      <div className="absolute bottom-8 left-7 right-7">
                        <p className="mb-5 text-[10px] uppercase tracking-[0.34em] text-white/45">
                          {item.subtitle}
                        </p>

                        <h3 className="font-serif text-[52px] font-light leading-[0.86] tracking-[-0.075em] text-white">
                          {item.title}
                        </h3>

                        <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-white/45 transition group-hover:text-white">
                          Découvrir
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-end gap-6 pr-24">
              <button
                type="button"
                onClick={scrollLeft}
                className="flex h-11 w-11 items-center justify-center border border-white/10 text-white/35 transition hover:border-white/25 hover:text-white"
                aria-label="Carte précédente"
              >
                <CaretLeft size={22} weight="light" />
              </button>

              <div className="flex items-center gap-4">
                <span className="text-[13px] tracking-[0.2em] text-white">
                  {String(page).padStart(2, "0")}
                </span>

                <div className="h-px w-24 bg-white/15">
                  <div
                    className="h-full bg-white/60 transition-all duration-500"
                    style={{ width: `${(page / totalPages) * 100}%` }}
                  />
                </div>

                <span className="text-[13px] tracking-[0.2em] text-white/35">
                  {String(totalPages).padStart(2, "0")}
                </span>
              </div>

              <button
                type="button"
                onClick={scrollRight}
                className="flex h-11 w-11 items-center justify-center border border-white/10 text-white/70 transition hover:border-white/25 hover:text-white"
                aria-label="Carte suivante"
              >
                <CaretRight size={22} weight="light" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}