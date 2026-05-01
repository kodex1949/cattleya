"use client";

import { motion } from "framer-motion";
import ManifestCardMobileCattleya from "./ManifestCardMobileCattleya";
import type { ManifestProduct } from "./manifest.types";

type ManifestMobileCattleyaProps = {
  products: ManifestProduct[];
};

export default function ManifestMobileCattleya({
  products,
}: ManifestMobileCattleyaProps) {
  if (products.length === 0) {
    return (
      <section className="bg-[#f6f1ea] px-5 py-20 text-black">
        <div className="mx-auto max-w-[430px]">
          <h2 className="text-[42px] font-light leading-[0.9] tracking-[-0.09em] text-black">
            Manifest
          </h2>

          <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-black/35">
            Alerte nouveautés
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-24 text-black">
      {/* LINES */}
      <div className="absolute inset-x-0 top-0 h-px bg-black/[0.06]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/[0.06]" />

      {/* HEADER */}
      <div className="px-5">
        <div className="mx-auto max-w-[430px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <div className="flex items-end justify-between">
              {/* TITLE + SUBTITLE */}
              <div>
                <h2 className="text-[42px] font-light leading-[0.9] tracking-[-0.09em] text-black">
                  Manifest
                </h2>

                <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-black/35">
                  Alerte nouveautés
                </p>
              </div>

              {/* COUNT */}
              <span className="pb-1 text-[10px] uppercase tracking-[0.28em] text-black/30">
                {String(products.length).padStart(2, "0")}
              </span>
            </div>

            {/* LINE */}
            <div className="mt-5 h-px w-10 bg-black/12" />
          </motion.div>
        </div>
      </div>

      {/* CARDS */}
      <div
        className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-stretch snap-x snap-mandatory gap-4 px-5">
          {products.map((product, index) => (
            <div key={product.id} className="flex h-full snap-center">
              <ManifestCardMobileCattleya
                product={product}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}