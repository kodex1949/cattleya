"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bag, Check, Star } from "phosphor-react";
import { toast } from "sonner";

import CattleyaCartToast from "@/components/pc/cattleya/cart/CattleyaCartToast";

import type { ProductPCData, ProductPCVariant } from "./product.types";
import { formatProductPrice } from "./product.utils";

type ProductPCFloatingBarProps = {
  product: ProductPCData;
  selectedVariant: ProductPCVariant | null;
  onVariantChange: (variant: ProductPCVariant) => void;
};

function getVariantLabel(variant: ProductPCVariant) {
  const formatOption = variant.selectedOptions.find((option) =>
    ["size", "taille", "format"].includes(option.name.toLowerCase()),
  );

  return formatOption?.value ?? variant.title;
}

export default function ProductPCFloatingBar({
  product,
  selectedVariant,
  onVariantChange,
}: ProductPCFloatingBarProps) {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const price = formatProductPrice(selectedVariant);
  const variants = product.variants ?? [];

  async function handleAddToCart() {
    if (!selectedVariant || adding) return;

    try {
      setAdding(true);

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchandiseId: selectedVariant.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        toast.error("Ajout impossible", {
          description: "Le produit n’a pas pu être ajouté au panier.",
        });
        return;
      }

      toast.custom(
        (toastId) => (
          <CattleyaCartToast
            toastId={toastId}
            productTitle={product.title}
            variantTitle={getVariantLabel(selectedVariant)}
            price={price}
            imageUrl={product.featuredImage?.url ?? null}
          />
        ),
        {
          duration: 6500,
          position: "top-right",
        },
      );

      window.dispatchEvent(new CustomEvent("cart:updated"));
    } catch {
      toast.error("Erreur panier", {
        description: "Une erreur est survenue pendant l’ajout.",
      });
    } finally {
      setAdding(false);
    }
  }

  const buttonLabel = adding ? "Ajout..." : "Commander";

  return (
    <section className="pointer-events-none fixed bottom-7 left-1/2 z-50 w-full -translate-x-1/2 px-8">
      <div className="pointer-events-auto mx-auto w-full max-w-[1380px]">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border border-black/10 bg-white/94 shadow-[0_30px_110px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
            >
              <div className="grid grid-cols-[1.15fr_0.95fr_1.15fr_0.9fr] gap-px bg-black/10">
                <div className="bg-white px-8 py-7">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-black/38">
                    {product.vendor}
                  </p>

                  <h2 className="mt-5 font-serif text-[34px] font-light leading-[0.95] tracking-[-0.075em] text-black">
                    {product.title}
                  </h2>

                  {product.description ? (
                    <p className="mt-5 max-w-[360px] text-[13px] font-light leading-6 text-black/58">
                      {product.description}
                    </p>
                  ) : null}

                  <div className="mt-6 flex items-center gap-4 text-[12px] text-black/62">
                    <span>Intensité</span>
                    <span className="tracking-[0.38em] text-black">••••</span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[12px] text-black/70">
                    <Star size={15} weight="fill" />
                    <span className="underline underline-offset-4">
                      5.0 (60 avis)
                    </span>
                  </div>
                </div>

                <div className="bg-[#f3f3f1] px-7 py-7">
                  <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-black/80">
                    Cadeau exclusif
                  </p>

                  <p className="mt-4 text-[12px] font-light leading-6 text-black/58">
                    Une attention offerte dès 100€ d’achat sur une sélection de
                    parfums maison.
                  </p>

                  <button
                    type="button"
                    className="mt-6 border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.24em] text-black/60 transition hover:border-black hover:text-black"
                  >
                    Découvrir
                  </button>
                </div>

                <div className="bg-white px-7 py-7">
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
                          disabled={!variant.availableForSale || adding}
                          className={`h-12 border text-[12px] transition ${
                            active
                              ? "border-black bg-black text-white"
                              : "border-black/15 bg-white text-black/55 hover:border-black/40 hover:text-black"
                          } disabled:cursor-not-allowed disabled:opacity-30`}
                        >
                          {getVariantLabel(variant)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white px-7 py-7">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!selectedVariant?.availableForSale || adding}
                    className="flex h-[54px] w-full items-center justify-between bg-[#22282c] px-5 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="text-[12px] font-medium">
                      {buttonLabel}
                    </span>

                    <span className="text-[12px] font-medium">{price}</span>
                  </button>

                  <button
                    type="button"
                    className="mt-3 flex h-[50px] w-full items-center justify-between border border-black bg-white px-5 text-black transition hover:bg-black/[0.03]"
                  >
                    <span className="text-[12px] font-medium">
                      Paiement express
                    </span>

                    <span className="text-[11px] text-black/55">
                      Apple Pay · PayPal
                    </span>
                  </button>

                  <div className="mt-5 border-t border-black/8 pt-4 text-[10px] uppercase tracking-[0.16em] text-black/42">
                    <p className="flex items-center gap-1.5 whitespace-nowrap">
                      <Check size={12} weight="light" />
                      Livraison offerte
                    </p>

                    <p className="mt-3 flex items-center gap-1.5 whitespace-nowrap">
                      <Bag size={12} weight="light" />
                      Paiement sécurisé
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-[58px] items-center justify-between border-t border-black/10 bg-white px-8">
                <p className="text-[10px] uppercase tracking-[0.32em] text-black/38">
                  {product.title}
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[10px] uppercase tracking-[0.32em] text-black/55 transition hover:text-black"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bar"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto flex h-[64px] w-fit min-w-[900px] items-center justify-between gap-16 border border-black/10 bg-white/92 px-7 text-black shadow-[0_25px_70px_rgba(0,0,0,0.14)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-7">
                <p className="font-serif text-[21px] font-light tracking-[-0.06em]">
                  {product.title}
                </p>

                <span className="h-5 w-px bg-black/10" />

                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="text-[10px] uppercase tracking-[0.32em] text-black/48 transition hover:text-black"
                >
                  Voir les détails
                </button>

                <span className="text-[10px] uppercase tracking-[0.32em] text-black/48">
                  {selectedVariant
                    ? getVariantLabel(selectedVariant)
                    : "Format"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale || adding}
                className="flex h-[42px] items-center gap-5 bg-black px-5 text-white transition hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]">
                  <Bag size={14} />
                  {buttonLabel}
                </span>

                <span className="text-[13px]">{price}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}