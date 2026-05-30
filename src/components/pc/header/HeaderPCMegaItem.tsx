"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { ShopifyMenuItem } from "@/lib/shopify/menu/get-shopify-menu";

type HeaderPCMegaItemProps = {
  item: ShopifyMenuItem;
  hovered: string | null;
  setHovered: (value: string | null) => void;
};

export default function HeaderPCMegaItem({
  item,
  hovered,
  setHovered,
}: HeaderPCMegaItemProps) {
  const children = item.items ?? [];
  const opened = hovered === item.id;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(item.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <Link
        href={item.href}
        className="group relative text-[10px] uppercase tracking-[0.34em] opacity-70 transition hover:opacity-100"
      >
        {item.title}
        <span className="absolute -bottom-2 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
      </Link>

      <AnimatePresence>
        {opened && children.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.965 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
              duration: 0.52,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-[-32px] top-[46px] w-[920px] overflow-hidden border border-white/10 bg-[#17110be8] text-white shadow-[0_30px_120px_rgba(0,0,0,0.38)] backdrop-blur-3xl"
          >
            <div className="flex h-[68px] items-center justify-between border-b border-white/10 px-8">
              <p className="text-[10px] uppercase tracking-[0.36em] text-white/55">
                {item.title}
              </p>

              <Link
                href={item.href}
                className="text-[10px] uppercase tracking-[0.34em] text-white/45 transition hover:text-white"
              >
                Tout voir
              </Link>
            </div>

            <div className="grid grid-cols-[280px_1fr] gap-[1px] bg-white/10 p-[1px]">
              <div className="relative min-h-[310px] bg-[#17110b] px-8 py-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,185,135,0.18),transparent_42%)]" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.46em] text-[#d8b987]/60">
                      Maison Cattleya
                    </p>

                    <h2 className="mt-9 font-serif text-[58px] font-light leading-[0.82] tracking-[-0.09em] text-white">
                      {item.title}
                    </h2>
                  </div>

                  <p className="max-w-[220px] text-[12px] leading-6 text-white/48">
                    Une sélection olfactive pensée comme un vestiaire de
                    signatures.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-[1px] bg-white/10">
                {children.slice(0, 6).map((child, index) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    className="group min-h-[155px] bg-[#17110b] px-6 py-6 transition-colors hover:bg-white hover:text-black"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.28em] text-current opacity-35">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="h-px w-8 bg-current opacity-20 transition-all duration-500 group-hover:w-12 group-hover:opacity-50" />
                    </div>

                    <p className="mt-8 font-serif text-[30px] font-light leading-[0.92] tracking-[-0.075em]">
                      {child.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}