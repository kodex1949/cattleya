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
  const [searchQuery, setSearchQuery] =
    useState("");

  const [products, setProducts] =
    useState<SearchProduct[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const cleanQuery =
    searchQuery.trim();

  const hasQuery =
    cleanQuery.length > 1;

  useEffect(() => {
    if (!hasQuery) {
      setProducts([]);
      return;
    }

    const controller =
      new AbortController();

    async function searchProducts() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/shopify/search?q=${encodeURIComponent(
            cleanQuery
          )}`,
          {
            signal:
              controller.signal,
          }
        );

        const data =
          await response.json();

        setProducts(
          Array.isArray(
            data.products
          )
            ? data.products
            : []
        );
      } catch {
        if (
          !controller.signal.aborted
        ) {
          setProducts([]);
        }
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setIsLoading(false);
        }
      }
    }

    const timer =
      window.setTimeout(
        searchProducts,
        320
      );

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
            className="fixed inset-x-3 top-[86px] z-50 max-h-[calc(100dvh-104px)] overflow-y-auto rounded-[30px] border border-white/10 bg-[#101010] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
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
          >
            <div className="relative px-5 pb-7 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">
                    Cattleya Search
                  </p>

                  <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.05em]">
                    Recherche
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10"
                >
                  <X
                    size={16}
                    weight="bold"
                  />
                </button>
              </div>

              <div className="sticky top-3 z-30 mt-6 flex h-14 items-center gap-3 rounded-full bg-white px-4 text-black shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
                <MagnifyingGlass
                  size={20}
                  weight="bold"
                />

                <input
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Que veux-tu sentir ?"
                  className="h-full flex-1 bg-transparent text-[16px] font-medium outline-none"
                  autoComplete="off"
                />

                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchQuery("")
                    }
                    className="grid h-8 w-8 place-items-center rounded-full bg-black/10"
                  >
                    <X
                      size={13}
                      weight="bold"
                    />
                  </button>
                ) : null}
              </div>

              {!hasQuery && (
                <>
                  <div className="mt-7">
                    <SearchSectionHeader
                      title="Parcourir les notes"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      {searchNotes.map(
                        (
                          item,
                          index
                        ) => (
                          <SearchNoteCard
                            key={
                              item.title
                            }
                            item={item}
                            index={
                              index
                            }
                            onClick={() =>
                              setSearchQuery(
                                item.title
                              )
                            }
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-7">
                    <SearchSectionHeader
                      title="Pour vous"
                      value="Sélection"
                    />

                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {curatedSearches.map(
                        (
                          item
                        ) => (
                          <button
                            key={
                              item.title
                            }
                            type="button"
                            onClick={() =>
                              setSearchQuery(
                                item.subtitle.split(
                                  " · "
                                )[0]
                              )
                            }
                            className="min-w-[155px] rounded-[24px] bg-white/[0.08] p-4 text-left"
                          >
                            <div className="mb-5 h-20 rounded-[20px] bg-gradient-to-br from-[#d6bc91]/30 via-white/10 to-transparent" />

                            <p className="text-[15px] font-semibold tracking-[-0.04em] text-white">
                              {
                                item.title
                              }
                            </p>

                            <p className="mt-1 text-[12px] leading-4 text-white/45">
                              {
                                item.subtitle
                              }
                            </p>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-7">
                    <SearchSectionHeader
                      title="Tendances Cattleya"
                      value="Trending"
                    />

                    <div className="space-y-3">
                      {trendingSearches.map(
                        (item) => (
                          <button
                            key={
                              item.title
                            }
                            type="button"
                            className="group relative h-[120px] w-full overflow-hidden rounded-[26px] text-left"
                          >
                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.title
                              }
                              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-active:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

                            <div className="relative flex h-full flex-col justify-end p-5">
                              <p className="text-[24px] font-semibold tracking-[-0.06em] text-white">
                                {
                                  item.title
                                }
                              </p>

                              <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-white/55">
                                {
                                  item.subtitle
                                }
                              </p>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}

              {hasQuery && (
                <div className="mt-7">
                  <SearchSectionHeader
                    title="Résultats"
                    value={
                      isLoading
                        ? "Recherche"
                        : `${products.length} trouvé(s)`
                    }
                  />

                  <div className="space-y-3">
                    {products.map(
                      (
                        product
                      ) => (
                        <SearchProductResult
                          key={
                            product.id
                          }
                          product={
                            product
                          }
                          onClick={
                            onClose
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}