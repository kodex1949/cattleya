"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import type { ManifestProduct } from "./manifest.types";
import ManifestPCCard from "./ManifestPCCard";

type ManifestPCCattleyaProps = {
  products: ManifestProduct[];
};

export default function ManifestPCCattleya({
  products,
}: ManifestPCCattleyaProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProducts = products.slice(0, 10);

  function scrollToIndex(index: number) {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.children[index] as HTMLElement | undefined;
    if (!card) return;

    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  }

  function goPrevious() {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  }

  function goNext() {
    scrollToIndex(Math.min(activeIndex + 1, visibleProducts.length - 1));
  }

  if (visibleProducts.length === 0) {
    return (
      <section className="bg-[#f6f1ea] px-10 py-28 text-black">
        <div className="mx-auto max-w-[1900px]">
          <h2 className="font-serif text-[92px] font-light leading-[0.88] tracking-[-0.08em]">
            Manifest
          </h2>

          <p className="mt-4 text-[11px] uppercase tracking-[0.38em] text-black/35">
            Alerte nouveautés
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f2eb] py-32 text-black">
      <div className="absolute inset-x-0 top-0 h-px bg-black/[0.07]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/[0.07]" />

      <div className="mx-auto max-w-[1900px] px-10 xl:px-24 2xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 grid grid-cols-[minmax(0,760px)_1fr] items-end gap-16"
        >
          <div>
            <h2 className="font-serif text-[104px] font-light leading-[0.86] tracking-[-0.085em] xl:text-[128px]">
              Manifest
            </h2>

            <p className="mt-5 text-[11px] uppercase tracking-[0.42em] text-black/38">
              Alerte nouveautés
            </p>
          </div>

          <div className="justify-self-end text-right">
            <p className="text-[11px] uppercase tracking-[0.34em] text-black/35">
              Sélection maison
            </p>

            <p className="mt-4 max-w-[360px] text-[14px] font-light leading-7 text-black/48">
              Une collection courte, dense, pensée comme une garde-robe
              olfactive.
            </p>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={goPrevious}
                disabled={activeIndex === 0}
                className="grid h-11 w-11 place-items-center border border-black/15 text-black/55 transition hover:border-black/35 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Produit précédent"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex === visibleProducts.length - 1}
                className="grid h-11 w-11 place-items-center border border-black/15 text-black/55 transition hover:border-black/35 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Produit suivant"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-10 pb-4 xl:px-24 2xl:px-32 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {visibleProducts.map((product, index) => (
          <ManifestPCCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}