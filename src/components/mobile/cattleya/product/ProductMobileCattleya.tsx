"use client";

import { useMemo, useState } from "react";
import type { ProductMobileData } from "./product.types";

import ProductGalleryMobile from "./ProductGalleryMobile";
import ProductOptionSelectorMobile from "./ProductOptionSelectorMobile";
import ProductPersonalisationMobile from "./ProductPersonalisationMobile";
import ProductServiceActionsMobile from "./ProductServiceActionsMobile";
import ProductPanelsMobile from "./ProductPanelsMobile";
import ProductStickyBarMobile from "./ProductStickyBarMobile";

import {
  getProductImages,
  getProductVariants,
  getOptionGroups,
  getInitialSelections,
  findMatchingVariant,
  formatProductPrice,
  getVariantImageIndex,
} from "./product.utils";

type ProductMobileCattleyaProps = {
  product: ProductMobileData;
};

export default function ProductMobileCattleya({
  product,
}: ProductMobileCattleyaProps) {
  const media = useMemo(() => {
    const images = getProductImages(product);
    return Array.isArray(images) ? images : [];
  }, [product]);

  const variants = useMemo(() => getProductVariants(product), [product]);
  const optionGroups = useMemo(() => getOptionGroups(variants), [variants]);

  const firstVariant = variants[0] ?? null;

  const [selectedVariant, setSelectedVariant] = useState(firstVariant);
  const [selections, setSelections] = useState<Record<string, string>>(
    firstVariant ? getInitialSelections(firstVariant) : {}
  );

  const [activeMedia, setActiveMedia] = useState(0);

  const price = selectedVariant
    ? formatProductPrice(
        selectedVariant.price.amount,
        selectedVariant.price.currencyCode
      )
    : "";

  const isAvailable = Boolean(selectedVariant?.availableForSale);

  function handleSelectOption(name: string, value: string) {
    const nextSelections = { ...selections, [name]: value };
    setSelections(nextSelections);

    const variant = findMatchingVariant(variants, nextSelections);
    if (!variant) return;

    setSelectedVariant(variant);

    const index = getVariantImageIndex(media, variant);
    setActiveMedia(index >= 0 ? index : 0);
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] pb-36 text-[#15120f]">
      <ProductGalleryMobile
        media={media}
        activeMedia={activeMedia}
        onMediaChange={setActiveMedia}
        title={product.title ?? "Parfum Cattleya"}
        vendor={product.vendor}
      />

      <section className="px-5 pt-8">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.42em] text-black/38">
            Parfums
          </p>

          <h1 className="mx-auto mt-4 max-w-[340px] text-[42px] font-light leading-[0.9] tracking-[-0.075em]">
            {product.title}
          </h1>

          <p className="mx-auto mt-5 max-w-[310px] text-[14px] leading-7 text-black/58">
            Notes florales, ambrées et boisées. Une essence intense, élégante et
            enveloppante.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-[12px] text-black/55">Intensité</span>
            <span className="text-[12px] tracking-[0.22em]">◆ ◆ ◆ ◇</span>
          </div>

          <button className="mt-4 text-[13px] text-black/65 underline underline-offset-4">
            5.0 — avis clients
          </button>
        </div>

        {optionGroups.length > 0 && (
          <div className="mt-9">
            <ProductOptionSelectorMobile
              optionGroups={optionGroups}
              selections={selections}
              onSelect={handleSelectOption}
            />
          </div>
        )}

        <div className="mt-8">
          <button
            disabled={!isAvailable}
            className="flex h-[58px] w-full items-center justify-between bg-[#1b1713] px-5 text-white transition-all duration-300 active:scale-[0.985] disabled:bg-black/25 disabled:text-white/50"
          >
            <span className="text-[12px] uppercase tracking-[0.28em]">
              {isAvailable ? "Commander" : "Indisponible"}
            </span>

            {price && (
              <span className="text-[14px] font-light tracking-[0.08em]">
                {price}
              </span>
            )}
          </button>

          <button className="mt-3 h-[50px] w-full border border-black/15 text-[12px] uppercase tracking-[0.24em] text-black/62">
            Paiement express
          </button>
        </div>

        <div className="mt-8">
          <ProductPersonalisationMobile />
        </div>

        <div className="mt-8">
          <ProductServiceActionsMobile />
        </div>

        <ProductPanelsMobile description={product.description} />
      </section>

      <ProductStickyBarMobile variant={selectedVariant} />
    </main>
  );
}