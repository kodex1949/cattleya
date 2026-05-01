"use client";

import { useEffect, useState } from "react";

import type { ProductVariant } from "./product.types";
import { formatProductPrice } from "./product.utils";

type ProductStickyBarMobileProps = {
  variant: ProductVariant | null;
};

export default function ProductStickyBarMobile({
  variant,
}: ProductStickyBarMobileProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const available = Boolean(variant?.availableForSale);

  const price = variant
    ? formatProductPrice(
        variant.price.amount,
        variant.price.currencyCode
      )
    : "";

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 420);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleAddToCart() {
    if (!available || isAdding) return;

    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false);
    }, 900);
  }

  return (
    <div
      className={`fixed bottom-6 left-0 z-50 w-full px-5 transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      }`}
    >
      <button
        type="button"
        disabled={!available || isAdding}
        onClick={handleAddToCart}
        className="
          flex h-[60px] w-full items-center justify-between
          rounded-[10px] bg-black px-6 text-white
          shadow-[0_18px_50px_rgba(0,0,0,0.25)]
          transition-all duration-300
          active:scale-[0.97]
          disabled:bg-black/30 disabled:text-white/50
        "
      >
        <span className="text-[12px] uppercase tracking-[0.28em]">
          {!available
            ? "Indisponible"
            : isAdding
            ? "Ajout..."
            : "Commander"}
        </span>

        <span className="text-[13px] tracking-[0.08em]">
          {price}
        </span>
      </button>
    </div>
  );
}