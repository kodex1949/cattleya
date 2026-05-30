"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import type { ShopifyMenuItem } from "@/lib/shopify/menu/get-shopify-menu";

type HeaderPCJournalProps = {
  item: ShopifyMenuItem;
  hovered: boolean;
  setHovered: (
    value: boolean,
  ) => void;
};

export default function HeaderPCJournal({
  item,
  hovered,
  setHovered,
}: HeaderPCJournalProps) {
  const children =
    item?.items ?? [];

  return (
    <div
      className="relative"
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
    >
      <Link
        href={item.href}
        className="group relative text-[10px] uppercase tracking-[0.34em] opacity-70 transition hover:opacity-100"
      >
        {item.title}

        <span className="absolute -bottom-2 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
      </Link>

      <AnimatePresence>
        {hovered &&
        children.length > 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 14,
              scale: 0.985,
            }}
            transition={{
              duration: 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-[-32px] top-[46px] w-[1180px] overflow-hidden border border-black/10 bg-[#fbfaf8] p-3 text-[#11100d] shadow-[0_38px_120px_rgba(0,0,0,0.16)]"
          >
            <div className="grid grid-cols-[260px_1fr] gap-3">
              <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-[#11100d] p-8 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,188,145,0.18),transparent_42%)]" />

                <div className="relative">
                  <p className="text-[9px] uppercase tracking-[0.46em] text-[#d6bc91]/70">
                    Cattleya
                  </p>

                  <p className="mt-9 font-serif text-[56px] font-light leading-[0.82] tracking-[-0.095em]">
                    {item.title}
                  </p>
                </div>

                <div className="relative">
                  <p className="max-w-[210px] text-[12px] font-light leading-6 text-white/48">
                    Une sélection éditoriale
                    pensée comme un
                    vestiaire olfactif.
                  </p>

                  <Link
                    href={item.href}
                    className="mt-6 inline-block border-b border-white/45 pb-1 text-[10px] uppercase tracking-[0.28em] text-white/70 transition hover:border-white hover:text-white"
                  >
                    Tout voir
                  </Link>
                </div>
              </div>

              <div className="flex gap-px overflow-x-auto bg-black/[0.06] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {children.map(
                  (child, index) => (
                    <div
                      key={child.id}
                      className="min-w-[240px] bg-[#fbfaf8]"
                    >
                      <Link
                        href={child.href}
                        className="group block min-h-[168px] px-5 py-5 transition hover:bg-white"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[9px] uppercase tracking-[0.28em] text-black/30">
                            {String(
                              index + 1,
                            ).padStart(
                              2,
                              "0",
                            )}
                          </p>

                          <span className="h-px w-8 bg-black/15 transition group-hover:w-12 group-hover:bg-black/35" />
                        </div>

                        <p className="mt-5 font-serif text-[32px] font-light leading-[0.9] tracking-[-0.085em] text-black">
                          {child.title}
                        </p>
                      </Link>

                      {child.items.length >
                      0 ? (
                        <div className="px-5 pb-5">
                          <div className="space-y-2 border-t border-black/8 pt-4">
                            {child.items
                              .slice(0, 6)
                              .map(
                                (
                                  subItem,
                                ) => (
                                  <Link
                                    key={
                                      subItem.id
                                    }
                                    href={
                                      subItem.href
                                    }
                                    className="block w-fit text-[11px] text-black/42 transition hover:translate-x-1 hover:text-black"
                                  >
                                    {
                                      subItem.title
                                    }
                                  </Link>
                                ),
                              )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}