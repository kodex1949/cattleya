"use client";

import Link from "next/link";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { CattleyaMaterial } from "@/lib/cattleya/materials/get-cattleya-materials";

gsap.registerPlugin(ScrollTrigger);

const CARD_WIDTH = 280;
const CARD_GAP = 16;
const SCROLL_STEP = CARD_WIDTH + CARD_GAP;

type MaterialsCattleyaMobileProps = {
  materials: CattleyaMaterial[];
};

export default function MaterialsCattleyaMobile({
  materials,
}: MaterialsCattleyaMobileProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, materials.length);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 54, scale: 1.03 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 86%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  function updatePageFromScroll() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const nextPage = Math.round(carousel.scrollLeft / SCROLL_STEP) + 1;
    setPage(Math.min(totalPages, Math.max(1, nextPage)));
  }

  function scrollLeft() {
    carouselRef.current?.scrollBy({
      left: -SCROLL_STEP,
      behavior: "smooth",
    });

    window.setTimeout(updatePageFromScroll, 450);
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({
      left: SCROLL_STEP,
      behavior: "smooth",
    });

    window.setTimeout(updatePageFromScroll, 450);
  }

  if (materials.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080604] py-20 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.07),transparent_34%),radial-gradient(circle_at_85%_100%,rgba(147,99,54,0.12),transparent_36%)]" />

      <div className="relative">
        <div
          ref={carouselRef}
          onScroll={updatePageFromScroll}
          className="overflow-x-auto overflow-y-hidden scroll-smooth px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={cardsRef}
            className="flex w-max snap-x snap-mandatory gap-4"
          >
            <div
              ref={introRef}
              className="flex h-[430px] w-[245px] shrink-0 snap-start flex-col justify-between border-t border-white/12 pt-5"
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.42em] text-white/38">
                  Les matières
                </p>

                <h2 className="mt-16 max-w-[220px] font-serif text-[48px] font-light leading-[0.86] tracking-[-0.085em] text-white">
                  Choisir une fragrance par instinct.
                </h2>
              </div>

              <p className="max-w-[210px] text-[13px] font-light leading-7 text-white/45">
                Notes profondes, gestes silencieux, présence durable.
              </p>
            </div>

            {materials.map((item, index) => (
              <Link
                key={item.id}
                href={`/mobile/matieres/${item.handle}`}
                className="group relative h-[430px] w-[280px] shrink-0 snap-start overflow-hidden bg-black"
              >
                {item.media_type === "video" ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-[1200ms] group-active:scale-[1.03] group-active:opacity-100"
                  >
                    <source src={item.media_url} />
                  </video>
                ) : (
                  <img
                    src={item.media_url}
                    alt={item.label}
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-[1200ms] group-active:scale-[1.03] group-active:opacity-100"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/24 to-black/5" />

                <div className="absolute left-5 top-5 flex items-center gap-3">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-white/60">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div className="h-px w-7 bg-white/28" />

                  <p className="max-w-[150px] truncate text-[9px] uppercase tracking-[0.28em] text-white/38">
                    {item.label}
                  </p>
                </div>

                <div className="absolute bottom-6 left-5 right-5">
                  <h3 className="font-serif text-[42px] font-light leading-[0.86] tracking-[-0.075em] text-white">
                    {item.title}
                  </h3>

                  <p className="mt-5 line-clamp-2 text-[13px] font-light leading-6 text-white/58">
                    {item.description}
                  </p>

                  <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-white/45 transition group-active:text-white">
                    Explorer
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between px-5">
          <button
            type="button"
            onClick={scrollLeft}
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/35 transition active:border-white/25 active:text-white"
            aria-label="Carte précédente"
          >
            <CaretLeft size={20} weight="light" />
          </button>

          <div className="flex items-center gap-4">
            <span className="text-[12px] tracking-[0.2em] text-white">
              {String(page).padStart(2, "0")}
            </span>

            <div className="h-px w-20 bg-white/15">
              <div
                className="h-full bg-white/60 transition-all duration-500"
                style={{ width: `${(page / totalPages) * 100}%` }}
              />
            </div>

            <span className="text-[12px] tracking-[0.2em] text-white/35">
              {String(totalPages).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={scrollRight}
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/70 transition active:border-white/25 active:text-white"
            aria-label="Carte suivante"
          >
            <CaretRight size={20} weight="light" />
          </button>
        </div>
      </div>
    </section>
  );
}