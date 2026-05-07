"use client";

import { SlidersHorizontal } from "phosphor-react";

const filters = ["Tous", "Vanille", "Musc", "Boisé", "Rose"];

export default function CollectionFilterBar() {
  return (
    <div className="sticky top-[86px] z-30 mt-8 px-4">
      <div className="rounded-[28px] border border-black/[0.06] bg-white/82 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-black px-4 text-[10px] uppercase tracking-[0.2em] text-white"
          >
            <SlidersHorizontal size={14} weight="thin" />
            Filtrer
          </button>

          {filters.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`h-10 shrink-0 rounded-full px-5 text-[10px] uppercase tracking-[0.2em] transition active:scale-95 ${
                index === 0
                  ? "bg-[#d6bc91] text-black"
                  : "bg-black/[0.04] text-black/55"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}