"use client";

import { useState } from "react";

type ProductPanelsMobileProps = {
  description?: string | null;
};

const panelsBase = [
  {
    title: "Ingrédients",
    content:
      "Alcohol, Parfum, Aqua, Limonene, Linalool, Citral, Coumarin, Geraniol.",
  },
  {
    title: "Livraison & retours",
    content:
      "Livraison offerte. Retours simples sous 30 jours. Chaque commande est préparée dans un écrin signature Cattleya.",
  },
];

export default function ProductPanelsMobile({
  description,
}: ProductPanelsMobileProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const panels = [
    {
      title: "Description",
      content:
        description ||
        "Une fragrance florale et boisée pensée comme une signature personnelle. Élégante, douce et profonde.",
    },
    ...panelsBase,
  ];

  return (
    <div className="mt-12 border-t border-black/10">
      {panels.map((panel, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={panel.title} className="border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-[12px] uppercase tracking-[0.28em] text-black/65">
                {panel.title}
              </span>

              <span
                className={`text-[22px] font-light text-black/55 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-6 text-[14px] leading-7 text-black/60">
                  {panel.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}