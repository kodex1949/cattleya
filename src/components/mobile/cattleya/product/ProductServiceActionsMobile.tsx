"use client";

import { motion } from "framer-motion";

const services = [
  "Livraison offerte",
  "Écrin signature Cattleya",
  "Retours simples sous 30 jours",
];

export default function ProductServiceActionsMobile() {
  const loop = [...services, ...services]; // duplication pour effet infini

  return (
    <div className="mt-12 overflow-hidden">
      {/* LABEL */}
      <p className="mb-6 text-center text-[10px] uppercase tracking-[0.42em] text-black/35">
        Services Cattleya
      </p>

      {/* MARQUEE */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loop.map((item, index) => (
            <span
              key={index}
              className="text-[12px] uppercase tracking-[0.28em] text-black/55"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* FADE EDGES */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f8f5ef] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f8f5ef] to-transparent" />
      </div>

      {/* ACTION */}
      <button
        type="button"
        className="
          mt-8 flex h-[54px] w-full items-center justify-between
          border border-black/15 px-4
          text-[12px] uppercase tracking-[0.24em]
          text-black/70 transition-all duration-300
          active:scale-[0.98]
        "
      >
        Trouver en boutique
        <span className="text-[16px]">⌖</span>
      </button>
    </div>
  );
}