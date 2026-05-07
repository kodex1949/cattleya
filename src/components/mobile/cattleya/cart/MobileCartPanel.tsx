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

  const subtotal = cart
    ? Number(cart.cost.subtotalAmount.amount)
    : 0;

  return (
    <AnimatePresence>
      {open && (
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
            className="fixed inset-x-3 top-[86px] z-50 max-h-[calc(100dvh-104px)] overflow-y-auto rounded-[30px] border border-white/10 bg-[#101010] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative px-5 pb-7 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">
                    Cattleya Cart
                  </p>

                  <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.05em]">
                    Panier
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition active:scale-95"
                  aria-label="Fermer le panier"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div className="mt-7">
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="h-[96px] animate-pulse rounded-[24px] bg-white/[0.07]"
                      />
                    ))}
                  </div>
                ) : isEmpty ? (
                  <div className="rounded-[26px] bg-white/[0.07] p-5">
                    <p className="text-[18px] font-semibold tracking-[-0.04em]">
                      Votre panier est vide.
                    </p>

                    <p className="mt-2 text-[13px] leading-5 text-white/50">
                      Ajoutez une signature Cattleya pour commencer votre rituel.
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
              </div>

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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}