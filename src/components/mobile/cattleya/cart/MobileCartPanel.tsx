"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";

import CartCheckoutFooter from "./components/CartCheckoutFooter";
import CartFreeShipping from "./components/CartFreeShipping";
import CartItemCard from "./components/CartItemCard";
import CartPromoCode from "./components/CartPromoCode";
import CartRecommendations from "./components/CartRecommendations";

import type { CartApiResponse, ShopifyCart } from "./cart-panel.types";

type MobileCartPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileCartPanel({
  open,
  onClose,
}: MobileCartPanelProps) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function refreshCart() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/cart", {
        method: "GET",
        cache: "no-store",
      });

      const data = (await response.json()) as CartApiResponse;

      setCart(data.cart ?? null);
    } catch {
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    void refreshCart();
  }, [open]);

  useEffect(() => {
    function handleCartUpdated() {
      void refreshCart();
    }

    window.addEventListener("cart:updated", handleCartUpdated);

    return () => {
      window.removeEventListener("cart:updated", handleCartUpdated);
    };
  }, []);

  const lines = cart?.lines.nodes ?? [];
  const isEmpty = lines.length === 0;

  const subtotal = cart ? Number(cart.cost.subtotalAmount.amount) : 0;

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Fermer le panier"
          />

          <motion.aside
            className="fixed inset-x-3 top-[86px] z-50 max-h-[calc(100dvh-104px)] overflow-hidden rounded-[30px] border border-white/10 bg-[#0c0b09] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6bc91]/70 to-transparent" />

              <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#d6bc91]/10 blur-3xl" />

              <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
            </div>

            <div className="relative flex max-h-[calc(100dvh-104px)] flex-col overflow-hidden px-5 pb-5 pt-5">
              <header className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.42em] text-[#d6bc91]/70">
                    Maison Cattleya
                  </p>

                  <h2 className="mt-2 font-serif text-[36px] font-light leading-[0.9] tracking-[-0.08em]">
                    Panier
                  </h2>

                  <p className="mt-3 max-w-[235px] text-[12px] font-light leading-5 text-white/42">
                    Votre sélection, prête pour le rituel.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition active:scale-95"
                  aria-label="Fermer le panier"
                >
                  <X size={16} weight="thin" />
                </button>
              </header>

              <div className="mt-7 flex-1 overflow-y-auto pr-1">
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="h-[96px] animate-pulse rounded-[24px] border border-white/10 bg-white/[0.045]"
                      />
                    ))}
                  </div>
                ) : isEmpty ? (
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5">
                    <p className="font-serif text-[28px] font-light tracking-[-0.06em]">
                      Votre panier est vide.
                    </p>

                    <p className="mt-3 text-[12px] leading-5 text-white/44">
                      Ajoutez une signature Cattleya pour commencer votre
                      rituel.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lines.map((line) => (
                      <CartItemCard
                        key={line.id}
                        line={line}
                        onRefresh={refreshCart}
                      />
                    ))}
                  </div>
                )}

                {!isEmpty && cart ? (
                  <div className="mt-7 space-y-7">
                    <CartFreeShipping subtotal={subtotal} />

                    <CartRecommendations />

                    <CartPromoCode />

                    <CartCheckoutFooter
                      total={cart.cost.subtotalAmount}
                      checkoutUrl={cart.checkoutUrl}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}