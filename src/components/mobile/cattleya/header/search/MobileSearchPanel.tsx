"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlass, X } from "phosphor-react";
import { useEffect, useState } from "react";

import SearchNoteCard from "./components/SearchNoteCard";
import SearchProductResult from "./components/SearchProductResult";
import SearchSectionHeader from "./SearchSectionHeader";

import {
  curatedSearches,
  searchNotes,
  trendingSearches,
} from "./search-panel.data";

import type { SearchProduct } from "./search-panel.types";

type MobileSearchPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSearchPanel({
  open,
  onClose,
}: MobileSearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState<SearchProduct[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const cleanQuery = searchQuery.trim();

  const hasQuery = cleanQuery.length > 1;

  useEffect(() => {
    if (!hasQuery) {
      setProducts([]);
      return;
    }

    const controller = new AbortController();

    async function searchProducts() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/shopify/search?q=${encodeURIComponent(cleanQuery)}`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch {
        if (!controller.signal.aborted) {
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    const timer = window.setTimeout(searchProducts, 320);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [cleanQuery, hasQuery]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[4px]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed inset-x-3 top-[86px] z-50 max-h-[calc(100dvh-104px)] overflow-hidden rounded-[30px] border border-white/10 bg-[#0c0b09] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            initial={{
              opacity: 0,
              y: -14,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.98,
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6bc91]/70 to-transparent" />

              <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#d6bc91]/10 blur-3xl" />

              <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
            </div>

            <div className="relative flex max-h-[calc(100dvh-104px)] flex-col overflow-hidden px-5 pb-5 pt-5">
              <header className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.42em] text-[#d6bc91]/70">
                    Maison Cattleya
                  </p>

                  <h2 className="mt-2 font-serif text-[36px] font-light leading-[0.9] tracking-[-0.08em]">
                    Recherche
                  </h2>

                  <p className="mt-3 max-w-[235px] text-[12px] font-light leading-5 text-white/42">
                    Explorez les signatures et trouvez votre parfum.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition active:scale-95"
                >
                  <X size={16} weight="thin" />
                </button>
              </header>

              <div className="mt-6">
                <div className="flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 backdrop-blur-xl">
                  <MagnifyingGlass
                    size={18}
                    weight="thin"
                    className="text-[#d6bc91]"
                  />

                  <input
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Que veux-tu sentir ?"
                    className="h-full flex-1 bg-transparent text-[15px] font-light tracking-[-0.02em] text-white placeholder:text-white/28 outline-none"
                    autoComplete="off"
                  />

                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.05]"
                    >
                      <X
                        size={12}
                        weight="thin"
                        className="text-white/60"
                      />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="mt-7 flex-1 overflow-y-auto pr-1">
                {!hasQuery && (
                  <>
                    <div>
                      <SearchSectionHeader
                        title="Parcourir les notes"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        {searchNotes.map((item, index) => (
                          <SearchNoteCard
                            key={item.title}
                            item={item}
                            index={index}
                            onClick={() =>
                              setSearchQuery(item.title)
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <SearchSectionHeader
                        title="Sélection Cattleya"
                        value="Curated"
                      />

                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {curatedSearches.map((item) => (
                          <button
                            key={item.title}
                            type="button"
                            onClick={() =>
                              setSearchQuery(
                                item.subtitle.split(" · ")[0]
                              )
                            }
                            className="group relative min-w-[170px] overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] p-4 text-left transition active:scale-[0.98]"
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,188,145,0.14),transparent_70%)]" />

                            <div className="relative">
                              <div className="mb-6 h-24 rounded-[22px] bg-gradient-to-br from-[#d6bc91]/25 via-white/[0.08] to-transparent" />

                              <p className="font-serif text-[22px] font-light tracking-[-0.06em] text-white">
                                {item.title}
                              </p>

                              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/42">
                                {item.subtitle}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <SearchSectionHeader
                        title="Tendances Cattleya"
                        value="Trending"
                      />

                      <div className="space-y-3">
                        {trendingSearches.map((item) => (
                          <button
                            key={item.title}
                            type="button"
                            className="group relative h-[132px] w-full overflow-hidden rounded-[28px] text-left"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-active:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />

                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                            <div className="relative flex h-full flex-col justify-end p-5">
                              <p className="font-serif text-[28px] font-light tracking-[-0.07em] text-white">
                                {item.title}
                              </p>

                              <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/52">
                                {item.subtitle}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {hasQuery && (
                  <div>
                    <SearchSectionHeader
                      title="Résultats"
                      value={
                        isLoading
                          ? "Recherche"
                          : `${products.length} trouvé(s)`
                      }
                    />

                    <div className="space-y-3">
                      {products.map((product) => (
                        <SearchProductResult
                          key={product.id}
                          product={product}
                          onClick={onClose}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}