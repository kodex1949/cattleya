"use client";

import { useMemo, useState } from "react";

import type { ProductPCData, ProductPCVariant } from "./product.types";
import { getInitialVariant } from "./product.utils";

import ProductPCHero from "./ProductPCHero";
import ProductPCStory from "./ProductPCStory";
import ProductPCFloatingBar from "./ProductPCFloatingBar";

type ProductPCCattleyaProps = {
  product: ProductPCData;
};

export default function ProductPCCattleya({ product }: ProductPCCattleyaProps) {
  const initialVariant = useMemo(
    () => getInitialVariant(product.variants),
    [product.variants],
  );

  const [selectedVariant, setSelectedVariant] =
    useState<ProductPCVariant | null>(initialVariant);

  return (
    <main className="min-h-screen bg-white text-[#11100d]">
      <ProductPCHero
        product={product}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
      />

      <ProductPCStory product={product} />

      <ProductPCFloatingBar
        product={product}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
      />
    </main>
  );
}