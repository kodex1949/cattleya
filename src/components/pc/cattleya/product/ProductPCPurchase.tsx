"use client";

import { useState } from "react";
import { Bag, Check, Star } from "phosphor-react";
import { toast } from "sonner";

import type { ProductPCData, ProductPCVariant } from "./product.types";
import { formatProductPrice } from "./product.utils";

type ProductPCPurchaseProps = {
  product: ProductPCData;
  selectedVariant: ProductPCVariant | null;
  onVariantChange: (variant: ProductPCVariant) => void;
  onAddToCart: (variant: ProductPCVariant) => Promise<void>;
};

function getVariantLabel(variant: ProductPCVariant) {
  const formatOption = variant.selectedOptions.find((option) =>
    ["size", "taille", "format"].includes(option.name.toLowerCase()),
  );

  return formatOption?.value ?? variant.title;
}

export default function ProductPCPurchase({
  product,
  selectedVariant,
  onVariantChange,
  onAddToCart,
}: ProductPCPurchaseProps) {
  const [isAdding, setIsAdding] = useState(false);

  const price = formatProductPrice(selectedVariant);
  const variants = product.variants ?? [];

  async function handleAddToCart() {
    if (!selectedVariant || !selectedVariant.availableForSale || isAdding) {
      return;
    }

    try {
      setIsAdding(true);

      await onAddToCart(selectedVariant);

      toast.success("Ajouté au panier", {
        description: `${product.title} — ${getVariantLabel(selectedVariant)}`,
      });
    } catch {
      toast.error("Ajout impossible", {
        description: "Le produit n’a pas pu être ajouté au panier.",
      });
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <aside className="fixed right-8 top-1/2 z-40 max-h-[calc(100vh-96px)] w-[430px] -translate-y-1/2 overflow-y-auto border border-black/10 bg-white/90 px-8 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.14)] backdrop-blur-2xl">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.34em] text-black/38">
          {product.vendor}
        </p>

        <h1 className="mx-auto mt-6 max-w-[360px] font-serif text-[42px] font-light leading-[0.95] tracking-[-0.075em] text-black">
          {product.title}
        </h1>

        {product.description ? (
          <p className="mx-auto mt-7 max-w-[340px] text-[14px] font-light leading-7 text-black/58">
            {product.description}
          </p>
        ) : null}

        <div className="mt-7 flex items-center justify-center gap-4 text-[12px] text-black/62">
          <span>Intensité</span>
          <span className="tracking-[0.38em] text-black">••••</span>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-black/70">
          <Star size={15} weight="fill" />
          <span className="underline underline-offset-4">5.0 (60 avis)</span>
        </div>
      </div>

      <div className="mt-12 border border-black/10 bg-[#f3f3f1] p-4">
        <div className="grid grid-cols-[72px_1fr] gap-4">
          <div className="aspect-square bg-white" />

          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-black/80">
              Cadeau exclusif
            </p>

            <p className="mt-2 text-[12px] font-light leading-5 text-black/58">
              Une attention offerte dès 100€ d’achat sur une sélection de
              parfums maison.
            </p>

            <button
              type="button"
              className="mt-3 border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.24em] text-black/60 transition hover:border-black hover:text-black"
            >
              Découvrir
            </button>
          </div>
        </div>
      </div>

      {variants.length > 0 ? (
        <div className="mt-10">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-black/38">
            Choisir le format
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {variants.map((variant) => {
              const active = selectedVariant?.id === variant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => onVariantChange(variant)}
                  disabled={!variant.availableForSale || isAdding}
                  className={`h-12 border text-[12px] transition ${
                    active
                      ? "border-black bg-white text-black"
                      : "border-black/15 bg-white text-black/55 hover:border-black/40 hover:text-black"
                  } disabled:cursor-not-allowed disabled:opacity-30`}
                >
                  {getVariantLabel(variant)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale || isAdding}
        className="mt-8 flex h-[58px] w-full items-center justify-between bg-[#22282c] px-6 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="text-[13px] font-medium">
          {isAdding ? "Ajout..." : "Commander"}
        </span>

        <span className="text-[13px] font-medium">{price}</span>
      </button>

      <button
        type="button"
        className="mt-3 flex h-[52px] w-full items-center justify-between border border-black bg-white px-6 text-black transition hover:bg-black/[0.03]"
      >
        <span className="text-[13px] font-medium">Paiement express</span>

        <span className="text-[12px] text-black/55">Apple Pay · PayPal</span>
      </button>

      <div className="mt-6 flex items-center justify-center gap-6 border-t border-black/8 pt-4 text-[10px] uppercase tracking-[0.16em] text-black/42">
        <p className="flex items-center gap-1.5 whitespace-nowrap">
          <Check size={12} weight="light" />
          Livraison offerte
        </p>

        <span className="h-[10px] w-px bg-black/10" />

        <p className="flex items-center gap-1.5 whitespace-nowrap">
          <Bag size={12} weight="light" />
          Paiement sécurisé
        </p>
      </div>
    </aside>
  );
}