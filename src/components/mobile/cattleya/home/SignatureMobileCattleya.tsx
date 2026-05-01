"use client";

import { motion } from "framer-motion";

export default function SignatureMobileCattleya() {
  return (
    <section className="relative bg-[#f8f5ef] px-6 py-24 text-center text-black overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8dfd3] blur-[120px]" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-[320px]"
      >
        {/* MICRO LABEL */}
        <p className="text-[9px] uppercase tracking-[0.38em] text-black/30">
          Signature
        </p>

        {/* MAIN TEXT */}
        <h2 className="mt-6 text-[32px] font-light leading-[1.15] tracking-[-0.05em]">
          Une empreinte
          <br />
          invisible.
        </h2>

        {/* SUB TEXT */}
        <p className="mt-6 text-[14px] leading-7 text-black/50">
          Chaque fragrance Cattleya est pensée comme une présence silencieuse,
          un souvenir qui reste.
        </p>

        {/* LINE */}
        <div className="mt-10 flex justify-center">
          <span className="h-px w-12 bg-black/12" />
        </div>
      </motion.div>
    </section>
  );
}