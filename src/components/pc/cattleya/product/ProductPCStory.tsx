"use client";

import { useState } from "react";
import type { ProductPCData } from "./product.types";
import ProductPCInfoPanel from "./ProductPCInfoPanel";

type ProductPCStoryProps = {
  product: ProductPCData;
};

const accordItems = [
  {
    label: "Ingrédients",
    value: "ingredients",
  },
  {
    label: "Tri & Environnement",
    value: "environment",
  },
] as const;

const serviceLinks = [
  "Service d’emballage cadeau Cattleya offert",
  "Livraison standard offerte dès 100€",
  "Échantillons offerts selon disponibilité",
];

export default function ProductPCStory({
  product,
}: ProductPCStoryProps) {
  const [panelOpen, setPanelOpen] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<
      | "description"
      | "ingredients"
      | "environment"
    >("ingredients");

  function openPanel(
    tab:
      | "description"
      | "ingredients"
      | "environment",
  ) {
    setActiveTab(tab);
    setPanelOpen(true);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f7f5] px-10 py-32 text-black xl:px-24 2xl:px-32">
        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />

        <div className="mx-auto grid max-w-[1680px] grid-cols-[minmax(0,1fr)_430px] gap-32">
          <div>
            <p className="mb-8 text-[10px] uppercase tracking-[0.42em] text-black/32">
              La signature
            </p>

            <p className="max-w-[1050px] font-serif text-[34px] font-light leading-[1.14] tracking-[-0.06em] text-black">
              {product.description ||
                "Une création pensée comme une présence. Un parfum qui habille la peau avec retenue, profondeur et caractère."}
            </p>

            <button
              type="button"
              onClick={() =>
                openPanel("description")
              }
              className="mt-10 border-b border-black pb-1 text-[13px] text-black transition hover:text-black/55"
            >
              Voir plus
            </button>
          </div>

          <aside className="pt-2">
            <div className="border-t border-black">
              {accordItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    openPanel(item.value)
                  }
                  className="group flex w-full items-center justify-between border-b border-black py-7 text-left"
                >
                  <span className="text-[15px] font-medium text-black">
                    {item.label}
                  </span>

                  <span className="text-3xl font-light leading-none text-black transition group-hover:translate-x-1">
                    ›
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-16 space-y-7">
              {serviceLinks.map((item) => (
                <p
                  key={item}
                  className="w-fit border-b border-black pb-1 text-[14px] leading-6 text-black transition hover:text-black/55"
                >
                  {item}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <ProductPCInfoPanel
        open={panelOpen}
        activeTab={activeTab}
        onClose={() =>
          setPanelOpen(false)
        }
        onTabChange={setActiveTab}
        description={
          product.description
        }
      />
    </>
  );
}