"use client";

import { useState } from "react";

import type {
  ProductPCData,
  ProductPCVariant,
} from "./product.types";

import ProductPCGallery from "./ProductPCGallery";

type ProductPCHeroProps = {
  product: ProductPCData;
  selectedVariant: ProductPCVariant | null;
  onVariantChange: (variant: ProductPCVariant) => void;
};

export default function ProductPCHero({ product }: ProductPCHeroProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f8f8f6] pt-[92px] text-[#11100d]">
      <div className="grid min-h-[calc(100vh-92px)] grid-cols-[38vw_1fr] pb-[150px]">
        <div className="relative flex items-center justify-center border-r border-black/[0.04] bg-white">
          <ProductPCGallery
            product={product}
            mode="secondary"
            activeIndex={activeMediaIndex}
            onActiveIndexChange={setActiveMediaIndex}
          />
        </div>

        <div className="relative flex items-center justify-center bg-white">
          <ProductPCGallery
            product={product}
            mode="main"
            activeIndex={activeMediaIndex}
            onActiveIndexChange={setActiveMediaIndex}
          />
        </div>
      </div>
    </section>
  );
}