"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  MagnifyingGlass,
  X,
} from "phosphor-react";

type SearchProduct = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

export default function SearchMobileCattleya() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const cleanQuery = query.trim();
  const hasQuery = cleanQuery.length > 1;

  const suggestions = useMemo(
    () => [
      "Vanille",
      "Rose noire",
      "Musc blanc",
      "Ambre",
      "Boisé",
      "Signature",
    ],
    []
  );

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
          { signal: controller.signal }
        );

        const data = (await response.json()) as {
          products?: SearchProduct[];
        };

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

    const timer = window.setTimeout(searchProducts, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [cleanQuery, hasQuery]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ede5d8] text-[#16110c]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7f2eb_0%,#ede2d1_100%)]" />

      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] bg-[#ceb08a]/25 blur-3xl" />

      <section className="relative px-6 pb-12 pt-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-black/35">
            Search
          </p>

          <p className="text-[10px] uppercase tracking-[0.28em] text-black/30">
            Maison Cattleya
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-10 max-w-[320px] font-serif text-[72px] leading-[0.78] tracking-[-0.09em]"
        >
          Find
          <br />
          your
          <br />
          scent.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 max-w-[260px] text-[13px] leading-6 text-black/50"
        >
          Une approche éditoriale du parfum.
          Cherchez une émotion avant un produit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-14 border-b border-black/12 pb-4"
        >
          <div className="flex items-center gap-4">
            <MagnifyingGlass
              size={20}
              weight="thin"
              className="text-black/55"
            />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search fragrance"
              className="h-14 w-full bg-transparent text-[28px] tracking-[-0.05em] outline-none placeholder:text-black/22"
            />

            <AnimatePresence>
              {query && (
                <motion.button
                  type="button"
                  onClick={() => setQuery("")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <X size={18} weight="thin" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {!hasQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="mt-12"
          >
            <div className="flex flex-wrap gap-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="group flex items-center gap-3 border-b border-black/10 py-3 text-[14px] uppercase tracking-[0.18em] text-black/65 transition"
                >
                  {suggestion}

                  <ArrowUpRight
                    size={14}
                    weight="thin"
                    className="transition group-active:translate-x-1 group-active:-translate-y-1"
                  />
                </button>
              ))}
            </div>

            <div className="mt-20">
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/35">
                Editorial note
              </p>

              <p className="mt-5 max-w-[310px] font-serif text-[36px] leading-[0.92] tracking-[-0.06em] text-black/80">
                Les parfums ne se cherchent pas.
                Ils se reconnaissent.
              </p>
            </div>
          </motion.div>
        )}
      </section>

      <AnimatePresence mode="wait">
        {hasQuery && (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            className="relative px-4 pb-24"
          >
            <div className="mb-6 flex items-center justify-between px-2">
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/35">
                Results
              </p>

              <p className="text-[10px] uppercase tracking-[0.24em] text-black/35">
                {isLoading ? "Searching" : `${products.length} found`}
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-5">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-[460px] animate-pulse bg-black/[0.04]"
                  />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="space-y-5">
                {products.map((product, index) => {
                  const price = formatPrice(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode
                  );

                  return (
                    <Link
                      key={product.id}
                      href={`/mobile/product/${product.handle}`}
                      className="group relative block overflow-hidden bg-[#ddd0be]"
                    >
                      <div className="relative aspect-[0.78] overflow-hidden">
                        {product.featuredImage?.url ? (
                          <img
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText ?? product.title}
                            className="h-full w-full object-cover transition duration-700 group-active:scale-[1.03]"
                          />
                        ) : null}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                        <div className="absolute left-5 top-5">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-white/70">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                            {product.vendor || "Cattleya"}
                          </p>

                          <div className="mt-4 flex items-end justify-between gap-5">
                            <div>
                              <h2 className="max-w-[220px] font-serif text-[42px] leading-[0.88] tracking-[-0.08em] text-white">
                                {product.title}
                              </h2>

                              {product.productType ? (
                                <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/55">
                                  {product.productType}
                                </p>
                              ) : null}
                            </div>

                            <ArrowUpRight
                              size={18}
                              weight="thin"
                              className="mb-2 text-white/72"
                            />
                          </div>

                          <div className="mt-7 flex items-center justify-between border-t border-white/12 pt-4">
                            <span className="text-[11px] uppercase tracking-[0.22em] text-white/72">
                              {price}
                            </span>

                            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                              Discover
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="border-t border-black/10 py-10">
                <p className="text-[10px] uppercase tracking-[0.34em] text-black/35">
                  Aucun résultat
                </p>

                <p className="mt-4 max-w-[240px] font-serif text-[30px] leading-[0.96] tracking-[-0.05em]">
                  Aucun parfum ne correspond à votre recherche.
                </p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}