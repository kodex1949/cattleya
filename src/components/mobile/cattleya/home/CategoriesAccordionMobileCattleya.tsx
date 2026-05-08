"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";
import { useRef, useState } from "react";

const categories = [
  {
    title: "Parfums",
    label: "Signature",
    description: "Des sillages élégants, profonds et mémorables.",
    href: "/mobile/collection/parfums",
    background: "#332c27",
    accent: "#dcc4aa",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Bâtonnets parfumés",
    label: "Maison",
    description: "Une atmosphère douce, raffinée, toujours présente.",
    href: "/mobile/collection/maison",
    background: "#303734",
    accent: "#d8cbb8",
    image:
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Éditions privées",
    label: "Collection privée",
    description: "Des compositions rares pour une signature plus intense.",
    href: "/mobile/collection/editions-privees",
    background: "#2e2932",
    accent: "#dbc1d8",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Musc",
    label: "Sillage intime",
    description: "Une douceur propre, enveloppante et subtile.",
    href: "/mobile/collection/musc",
    background: "#392d29",
    accent: "#e4bba6",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
  },
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function CategoriesAccordionMobileCattleya() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const activeCategory = categories[activeIndex] ?? categories[0];

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
    <section
      className="relative isolate overflow-hidden py-24 text-white transition-colors duration-700"
      style={{ backgroundColor: activeCategory.background }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_30%,rgba(0,0,0,0.18)_100%)]" />

      <div className="relative px-5 text-center">
        <p
          className="text-[10px] uppercase tracking-[0.54em] transition-colors duration-700"
          style={{ color: activeCategory.accent }}
        >
          Nos univers
        </p>

        <h2 className="mx-auto mt-4 max-w-[350px] text-[50px] font-light leading-[0.86] tracking-[-0.1em]">
          Choisir son rituel.
        </h2>

        <p className="mx-auto mt-5 max-w-[285px] text-[14px] font-light leading-7 text-white/56">
          Des catégories pensées comme des ambiances, pas comme de simples
          rayons.
        </p>

        <div className="mx-auto mt-7 flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/44">
          <span>{pad(activeIndex + 1)}</span>
          <span className="h-px w-9 bg-white/24" />
          <span>{pad(categories.length)}</span>
        </div>
      </div>

      <div className="relative mt-14">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="
            flex
            snap-x
            snap-mandatory
            gap-5
            overflow-x-auto
            px-[calc(50%-148px)]
            pb-10
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {categories.map((category, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={category.title}
                onClick={() => setActiveIndex(index)}
                className={`
                  group relative h-[562px] w-[296px] shrink-0 snap-center overflow-hidden
                  bg-[#0b0908] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.9] opacity-58"
                  }
                `}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="296px"
                  className={`
                    object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isActive ? "scale-100" : "scale-[1.06]"}
                  `}
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-black/8 to-black/88" />
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/90 via-black/48 to-transparent" />

                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center bg-black/28 text-[10px] tracking-[0.2em] text-white/80">
                  {pad(index + 1)}
                </div>

                <div
                  className={`
                    absolute right-5 top-5 flex h-11 w-11 items-center justify-center bg-black/24
                    transition-opacity duration-500
                    ${isActive ? "opacity-100" : "opacity-45"}
                  `}
                >
                  <span className="h-2 w-2 rotate-45 bg-white/80" />
                </div>

                <div className="absolute inset-x-6 bottom-7 text-center">
                  <p
                    className="text-[10px] uppercase tracking-[0.42em]"
                    style={{ color: category.accent }}
                  >
                    {category.label}
                  </p>

                  <h3 className="mx-auto mt-3 max-w-[265px] text-[38px] font-light leading-[0.84] tracking-[-0.085em] text-white">
                    {category.title}
                  </h3>

                  <p
                    className={`
                      mx-auto mt-4 max-w-[240px] text-[13px] font-light leading-6 text-white/64
                      transition-all duration-500
                      ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }
                    `}
                  >
                    {category.description}
                  </p>

                  <div
                    className={`
                      mx-auto mt-5 h-px bg-white/24 transition-all duration-500
                      ${
                        isActive
                          ? "w-20 opacity-100"
                          : "w-8 opacity-40"
                      }
                    `}
                  />

                  <Link
                    href={category.href}
                    className={`
                      mx-auto mt-6 flex h-12 w-fit items-center gap-3 bg-white px-6
                      text-[10px] uppercase tracking-[0.26em] text-black transition-all duration-500 active:scale-[0.97]
                      ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }
                    `}
                  >
                    Découvrir
                    <ArrowUpRight size={14} weight="bold" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {categories.map((category, index) => (
            <button
              key={category.title}
              type="button"
              onClick={() => goToCategory(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-9 bg-white" : "w-1.5 bg-white/28"
              }`}
              aria-label={`Voir ${category.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}