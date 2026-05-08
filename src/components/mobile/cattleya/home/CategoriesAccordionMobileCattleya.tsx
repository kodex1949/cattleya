"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";
import { useRef, useState } from "react";

type HomeCategory = {
  id: string;
  title: string;
  label: string | null;
  description: string | null;
  collection_handle: string;
  image_url: string;
  background: string | null;
  accent: string | null;
};

type CategoriesAccordionMobileCattleyaProps = {
  categories?: HomeCategory[];
};

const fallbackCategories: HomeCategory[] = [
  {
    id: "fallback-parfums",
    title: "Parfums",
    label: "Signature",
    description: "Des sillages élégants, profonds et mémorables.",
    collection_handle: "parfums",
    image_url:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1400&auto=format&fit=crop",
    background: "#332c27",
    accent: "#dcc4aa",
  },
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function CategoriesAccordionMobileCattleya({
  categories = [],
}: CategoriesAccordionMobileCattleyaProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const safeCategories =
    categories.length > 0 ? categories : fallbackCategories;

  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = safeCategories[activeIndex] ?? safeCategories[0];

  function handleScroll() {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = Array.from(slider.children);
    const center = slider.scrollLeft + slider.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const element = card as HTMLElement;
      const cardCenter = element.offsetLeft + element.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }

  function goToCategory(index: number) {
    const slider = sliderRef.current;
    const card = slider?.children[index] as HTMLElement | undefined;

    if (!slider || !card) return;

    slider.scrollTo({
      left: card.offsetLeft - slider.clientWidth / 2 + card.offsetWidth / 2,
      behavior: "smooth",
    });

    setActiveIndex(index);
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#0b0908] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          key={activeCategory.id}
          src={activeCategory.image_url}
          alt=""
          fill
          sizes="100vw"
          className="scale-125 object-cover opacity-45 blur-3xl transition-all duration-700"
          unoptimized
          priority={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-colors duration-700"
        style={{
          backgroundColor: `${activeCategory.background ?? "#0b0908"}cc`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.48)_100%)]" />

      <div className="relative px-5">
        <div className="flex items-start justify-between gap-6">
          <p
            className="pt-2 text-[10px] uppercase tracking-[0.48em] transition-colors duration-700 [writing-mode:vertical-rl]"
            style={{
              color: activeCategory.accent ?? "#dcc4aa",
            }}
          >
            Nos univers
          </p>

          <div className="flex-1 text-left">
            <h2 className="max-w-[330px] text-[54px] font-light leading-[0.82] tracking-[-0.105em]">
              Choisir son rituel.
            </h2>

            <p className="mt-5 max-w-[290px] text-[14px] font-light leading-7 text-white/56">
              Des catégories pensées comme des ambiances, pas comme de simples
              rayons.
            </p>
          </div>

          <div className="pt-2 text-right text-[10px] uppercase tracking-[0.28em] text-white/44">
            <span>{pad(activeIndex + 1)}</span>

            <div className="mx-auto my-2 h-8 w-px bg-white/24" />

            <span>{pad(safeCategories.length)}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-16">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-148px)] pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {safeCategories.map((category, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={category.id}
                onClick={() => setActiveIndex(index)}
                className={`group relative h-[570px] w-[296px] shrink-0 snap-center overflow-hidden bg-[#0b0908] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? "scale-100 opacity-100" : "scale-[0.91] opacity-60"
                }`}
              >
                <Image
                  src={category.image_url}
                  alt={category.title}
                  fill
                  sizes="296px"
                  className={`object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "scale-100" : "scale-[1.05]"
                  }`}
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/88" />
                <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/92 via-black/54 to-transparent" />

                <div className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.24em] text-white/70">
                  {pad(index + 1)}
                </div>

                <div className="absolute right-5 top-5">
                  <span className="block h-2 w-2 rotate-45 bg-white/80" />
                </div>

                <div className="absolute inset-x-6 bottom-7 text-left">
                  <p
                    className="text-[10px] uppercase tracking-[0.42em]"
                    style={{
                      color: category.accent ?? "#dcc4aa",
                    }}
                  >
                    {category.label ?? "Collection"}
                  </p>

                  <h3 className="mt-3 max-w-[255px] text-[42px] font-light leading-[0.82] tracking-[-0.095em] text-white">
                    {category.title}
                  </h3>

                  {category.description && (
                    <p
                      className={`mt-5 max-w-[240px] text-[13px] font-light leading-6 text-white/64 transition-all duration-500 ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                    >
                      {category.description}
                    </p>
                  )}

                  <Link
                    href={`/mobile/collection/${category.collection_handle}`}
                    className={`mt-7 flex h-12 w-fit items-center gap-3 bg-white px-6 text-[10px] uppercase tracking-[0.26em] text-black transition-all duration-500 active:scale-[0.97] ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    Découvrir

                    <ArrowUpRight size={14} weight="bold" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          {safeCategories.map((category, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => goToCategory(index)}
                aria-label={`Voir ${category.title}`}
                className="group relative flex items-center justify-center"
              >
                <div
                  className={`relative overflow-hidden transition-all duration-700 ${
                    isActive ? "h-[2px] w-14 bg-white" : "h-[2px] w-5 bg-white/22"
                  }`}
                >
                  <span
                    className={`absolute inset-0 transition-all duration-700 ${
                      isActive
                        ? "translate-x-0 bg-white"
                        : "-translate-x-full bg-white/60"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}