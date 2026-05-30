"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkle, X } from "phosphor-react";

import CartPCItem from "./components/CartPCItem";
import CartPCFooter from "./components/CartPCFooter";
import CartPCEmpty from "./components/CartPCEmpty";

import type { ShopifyCart } from "./cart.pc.types";

type CartPCPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartPCPanel({
  open,
  onClose,
}: CartPCPanelProps) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchCart() {
    try {
      setLoading(true);

      const response = await fetch("/api/cart", {
        cache: "no-store",
      });

      const data = await response.json();

      setCart(data.cart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleCartUpdated() {
      fetchCart();
    }

    function handleCartOpen() {
      fetchCart();
    }

    window.addEventListener("cart:updated", handleCartUpdated);
    window.addEventListener("cart:open", handleCartOpen);

    return () => {
      window.removeEventListener("cart:updated", handleCartUpdated);
      window.removeEventListener("cart:open", handleCartOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    fetchCart();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const lines = cart?.lines.nodes ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-[#080604]/55 backdrop-blur-[10px]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          initial={{ x: "104%" }}
          animate={{ x: 0 }}
          exit={{ x: "104%" }}
          transition={{
            duration: 0.82,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute right-0 top-0 grid h-full w-[760px] grid-cols-[260px_1fr] bg-[#f8f3ea] text-black shadow-[-40px_0_120px_rgba(0,0,0,0.35)]"
        >
          <aside className="relative hidden h-full overflow-hidden border-r border-black/10 bg-[#100b07] text-white xl:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(221,190,139,0.22),transparent_42%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_35%,rgba(0,0,0,0.4))]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.42em] text-white/42">
                  Sélection
                </p>

                <h2 className="mt-8 font-serif text-[58px] font-light leading-[0.82] tracking-[-0.09em]">
                  Votre rituel parfumé.
                </h2>
              </div>

              <div>
                <div className="mb-8 h-px w-full bg-white/12" />

                <p className="text-[12px] font-light leading-6 text-white/54">
                  Chaque création Cattleya est pensée comme une trace. Une
                  présence, un sillage, une signature.
                </p>

                <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40">
                  <Sparkle size={14} weight="light" />
                  Maison Cattleya
                </div>
              </div>
            </div>
          </aside>

          <section className="flex h-full min-h-0 flex-col bg-[#fbf8f2]">
            <header className="shrink-0 border-b border-black/10 px-9 py-7">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.38em] text-black/38">
                    Panier privé
                  </p>

                  <h3 className="mt-3 font-serif text-[42px] font-light leading-[0.9] tracking-[-0.075em] text-black">
                    Votre sélection
                  </h3>

                  <p className="mt-4 max-w-[360px] text-[13px] font-light leading-6 text-black/48">
                    Vérifiez vos formats, ajustez vos quantités puis finalisez
                    votre commande.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="group flex h-11 w-11 items-center justify-center border border-black/10 bg-white text-black transition hover:bg-black hover:text-white"
                >
                  <X size={20} weight="light" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 border border-black/10 bg-white">
                <div className="px-5 py-4">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-black/35">
                    Articles
                  </p>

                  <p className="mt-2 font-serif text-2xl tracking-[-0.06em]">
                    {totalQuantity}
                  </p>
                </div>

                <div className="border-l border-black/10 px-5 py-4">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-black/35">
                    Livraison
                  </p>

                  <p className="mt-2 text-[12px] text-black/62">offerte</p>
                </div>

                <div className="border-l border-black/10 px-5 py-4">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-black/35">
                    Paiement
                  </p>

                  <p className="mt-2 text-[12px] text-black/62">sécurisé</p>
                </div>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-9">
              {loading ? (
                <div className="flex h-full flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-black/35">
                    Chargement de votre sélection
                  </p>

                  <div className="mt-8 space-y-5">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-28 animate-pulse bg-black/[0.035]"
                      />
                    ))}
                  </div>
                </div>
              ) : lines.length === 0 ? (
                <CartPCEmpty />
              ) : (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.08,
                      },
                    },
                  }}
                >
                  {lines.map((line) => (
                    <motion.div
                      key={line.id}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <CartPCItem line={line} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {cart ? (
              <div className="shrink-0 border-t border-black/10 bg-[#fbf8f2]">
                <CartPCFooter
                  subtotal={cart.cost.subtotalAmount.amount}
                  currencyCode={cart.cost.subtotalAmount.currencyCode}
                  checkoutUrl={cart.checkoutUrl}
                />
              </div>
            ) : null}
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}