"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type CollectionPCFiltersProps = {
  total: number;
};

type PanelType = "filters" | "sort" | null;

export default function CollectionPCFilters({ total }: CollectionPCFiltersProps) {
  const [panel, setPanel] = useState<PanelType>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const open = panel !== null;
  const activeItems = [...selectedFilters, ...(selectedSort ? [selectedSort] : [])];

  function toggleFilter(value: string) {
    setSelectedFilters((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function removeItem(item: string) {
    if (selectedSort === item) {
      setSelectedSort(null);
      return;
    }

    setSelectedFilters((current) =>
      current.filter((value) => value !== item)
    );
  }

  return (
    <section className="fixed bottom-6 left-1/2 z-50 w-full -translate-x-1/2 px-6">
      <div className="mx-auto w-full max-w-[920px]">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key={panel}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border border-white/10 bg-[#17110be8] text-white shadow-[0_30px_120px_rgba(0,0,0,0.38)] backdrop-blur-3xl"
            >
              <div className="flex h-[68px] items-center justify-between border-b border-white/10 px-8">
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => setPanel("filters")}
                    className={`text-[10px] uppercase tracking-[0.36em] ${
                      panel === "filters" ? "text-white" : "text-white/40"
                    }`}
                  >
                    Filtres
                  </button>

                  <button
                    onClick={() => setPanel("sort")}
                    className={`text-[10px] uppercase tracking-[0.36em] ${
                      panel === "sort" ? "text-white" : "text-white/40"
                    }`}
                  >
                    Trier
                  </button>
                </div>

                <button
                  onClick={() => setPanel(null)}
                  className="text-[10px] uppercase tracking-[0.34em] text-white/55 transition-opacity hover:opacity-60"
                >
                  Fermer
                </button>
              </div>

              {panel === "filters" ? (
                <div className="grid grid-cols-3 gap-[1px] bg-white/10 p-[1px]">
                  {[
                    { title: "Type", items: ["Eau de parfum", "Extrait", "Brume"] },
                    { title: "Format", items: ["30ml", "50ml", "75ml", "100ml"] },
                    { title: "Famille", items: ["Ambré", "Boisé", "Vanillé", "Floral"] },
                  ].map((group) => (
                    <div
                      key={group.title}
                      className="min-h-[230px] bg-[#17110b] px-7 py-7"
                    >
                      <p className="mb-6 text-[10px] uppercase tracking-[0.36em] text-white/35">
                        {group.title}
                      </p>

                      <div className="space-y-3">
                        {group.items.map((item) => {
                          const active = selectedFilters.includes(item);

                          return (
                            <button
                              key={item}
                              onClick={() => toggleFilter(item)}
                              className={`flex w-full items-center justify-between border px-4 py-3 text-left text-[11px] uppercase tracking-[0.22em] transition-all ${
                                active
                                  ? "border-white bg-white text-black"
                                  : "border-white/10 text-white/62 hover:border-white/35 hover:text-white"
                              }`}
                            >
                              <span>{item}</span>
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  active ? "bg-black" : "bg-white/25"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-[1px] bg-white/10 p-[1px]">
                  {["Sélection", "Prix croissant", "Prix décroissant", "Alphabétique"].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => setSelectedSort(item)}
                        className={`px-6 py-8 text-[11px] uppercase tracking-[0.28em] transition-colors ${
                          selectedSort === item
                            ? "bg-white text-black"
                            : "bg-[#17110b] text-white/65 hover:bg-white hover:text-black"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-white/10 px-8 py-6">
                <button
                  onClick={() => {
                    setSelectedFilters([]);
                    setSelectedSort(null);
                  }}
                  className="text-[10px] uppercase tracking-[0.34em] text-white/35 transition-colors hover:text-white"
                >
                  Réinitialiser
                </button>

                <button
                  onClick={() => setPanel(null)}
                  className="bg-white px-8 py-4 text-[10px] uppercase tracking-[0.34em] text-black transition-opacity hover:opacity-80"
                >
                  Appliquer
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-[62px] items-center justify-between border border-white/10 bg-[#17110be6] px-8 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-8">
                <button
                  onClick={() => setPanel("filters")}
                  className="text-[10px] uppercase tracking-[0.36em] text-white transition-opacity hover:opacity-60"
                >
                  Filtres
                </button>

                <span className="h-4 w-px bg-white/12" />

                <button
                  onClick={() => setPanel("sort")}
                  className="text-[10px] uppercase tracking-[0.36em] text-white/55 transition-colors hover:text-white"
                >
                  Trier
                </button>
              </div>

              <div className="flex max-w-[520px] items-center justify-end gap-2 overflow-hidden">
                {activeItems.length > 0 ? (
                  activeItems.slice(0, 4).map((item) => (
                    <button
                      key={item}
                      onClick={() => removeItem(item)}
                      className="group flex items-center gap-2 whitespace-nowrap border border-white/10 bg-white/5 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white/70 transition-all hover:border-white/30 hover:bg-white hover:text-black"
                    >
                      <span>{item}</span>
                      <span className="text-[10px] opacity-45 transition-opacity group-hover:opacity-100">
                        ×
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/55">
                    {total} fragrances
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}