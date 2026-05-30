"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlass, X } from "phosphor-react";

import SearchPCInput from "./SearchPCInput";
import SearchPCResults from "./SearchPCResults";
import SearchPCEmpty from "./SearchPCEmpty";

import type { SearchPCProduct } from "./search.pc.types";

type SearchPCOverlayProps = {
  open: boolean;
  onClose: () => void;
};

type SearchEditorial = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
  media_type: "image" | "video";
  media_url: string;
  sort_order: number;
};

export default function SearchPCOverlay({
  open,
  onClose,
}: SearchPCOverlayProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchPCProduct[]>([]);
  const [editorials, setEditorials] = useState<SearchEditorial[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    async function loadEditorials() {
      try {
        const response = await fetch("/api/search/editorial", {
          cache: "no-store",
        });

        if (!response.ok) {
          setEditorials([]);
          return;
        }

        const data = (await response.json()) as SearchEditorial[];
        setEditorials(data);
      } catch {
        setEditorials([]);
      }
    }

    loadEditorials();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setProducts([]);
      setLoading(false);
      return;
    }

    const cleanQuery = query.trim();

    if (cleanQuery.length < 2) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const timeout = window.setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(cleanQuery)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          setProducts([]);
          return;
        }

        const data = (await response.json()) as SearchPCProduct[];
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => window.clearTimeout(timeout);
  }, [query, open]);

  const cleanQuery = query.trim();
  const hasQuery = cleanQuery.length >= 2;
  const featuredEditorial = editorials[0];

  return (
    <AnimatePresence>
      {open ? (
        <motion.section
          initial={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          }}
          animate={{
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
          }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[120] overflow-hidden bg-[#f6efe5] text-black"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#fffaf4_0%,#f5ecdf_48%,#eadfce_100%)]" />

          <div className="relative z-10 flex h-full">
            <aside className="relative hidden h-full w-[34%] shrink-0 overflow-hidden bg-black xl:block">
              <SearchPCEmpty
                onSelect={setQuery}
                eyebrow={featuredEditorial?.eyebrow}
                title={featuredEditorial?.title}
                description={featuredEditorial?.description}
                ctaLabel={featuredEditorial?.cta_label}
                mediaType={featuredEditorial?.media_type}
                mediaUrl={featuredEditorial?.media_url}
              />
            </aside>

            <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
              <header className="relative flex h-[96px] shrink-0 items-center justify-between px-16">
                <div className="flex items-center gap-4 text-black/32">
                  <MagnifyingGlass size={16} />

                  <span className="text-[10px] uppercase tracking-[0.42em]">
                    Recherche
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/35 backdrop-blur-xl transition-all duration-500 hover:bg-black"
                  aria-label="Fermer la recherche"
                >
                  <X
                    size={15}
                    className="text-black/45 transition duration-500 group-hover:rotate-90 group-hover:text-white"
                  />
                </button>
              </header>

              <main className="relative flex min-h-0 flex-1 flex-col px-16">
                <motion.div
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.12,
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="shrink-0 pt-14"
                >
                  <SearchPCInput value={query} onChange={setQuery} />
                </motion.div>

                <div className="relative mt-12 min-h-0 flex-1 overflow-y-auto pr-1">
                  {hasQuery && loading ? (
                    <div className="grid grid-cols-3 gap-6">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="h-[280px] animate-pulse bg-black/[0.035]"
                        />
                      ))}
                    </div>
                  ) : null}

                  {hasQuery && !loading ? (
                    <SearchPCResults
                      products={products}
                      onResultClick={onClose}
                    />
                  ) : null}
                </div>
              </main>
            </div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}