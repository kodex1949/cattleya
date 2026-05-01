"use client";

import { motion } from "framer-motion";

type VideoSectionMobileCattleyaProps = {
  videoSrc?: string;
  posterSrc?: string;
};

export default function VideoSectionMobileCattleya({
  videoSrc = "/videos/cattleya-ritual.mp4",
  posterSrc = "/images/cattleya-video-poster.jpg",
}: VideoSectionMobileCattleyaProps) {
  return (
    <section className="relative overflow-hidden bg-[#0f0d0b] px-5 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
      >
        <div className="relative h-[560px] overflow-hidden bg-black">
          <video
            src={videoSrc}
            poster={posterSrc}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/25" />

          <div className="absolute bottom-6 left-5 right-5">
            <p className="text-[9px] uppercase tracking-[0.42em] text-white/55">
              Le rituel Cattleya
            </p>

            <h2 className="mt-4 max-w-[290px] text-[38px] font-light leading-[0.9] tracking-[-0.08em]">
              Le parfum comme une présence.
            </h2>

            <div className="mt-6 h-px w-12 bg-white/35" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}