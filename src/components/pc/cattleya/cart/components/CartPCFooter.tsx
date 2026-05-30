"use client";

import {
  ArrowRight,
  CreditCard,
  Lock,
  Sparkle,
} from "phosphor-react";
import { motion } from "framer-motion";

import { formatCartPrice } from "../cart.pc.utils";

type CartPCFooterProps = {
  subtotal: string;
  currencyCode: string;
  checkoutUrl: string;
};

export default function CartPCFooter({
  subtotal,
  currencyCode,
  checkoutUrl,
}: CartPCFooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#f6f0e7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,183,132,0.14),transparent_36%)]" />

      <div className="relative z-10 px-7 py-6">
        <div className="overflow-hidden border border-black/10 bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.04)]">
          <div className="flex items-start justify-between px-6 py-5">
            <div>
              <div className="flex items-center gap-2">
                <Sparkle
                  size={12}
                  weight="fill"
                  className="text-black/35"
                />

                <p className="text-[9px] uppercase tracking-[0.34em] text-black/35">
                  Résumé
                </p>
              </div>

              <p className="mt-3 font-serif text-[14px] italic text-black/48">
                Livraison calculée au paiement.
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] uppercase tracking-[0.3em] text-black/32">
                Sous-total
              </p>

              <motion.p
                key={subtotal}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-2 font-serif text-[40px] font-light leading-none tracking-[-0.08em] text-black"
              >
                {formatCartPrice(
                  subtotal,
                  currencyCode,
                )}
              </motion.p>
            </div>
          </div>

          <div className="border-t border-black/10 p-4">
            <motion.a
              href={checkoutUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={{
                scale: 0.985,
              }}
              className="group relative flex h-[68px] w-full items-center justify-between overflow-hidden bg-[#120d08] px-6 text-white"
            >
              <motion.div
                initial={{
                  x: "-120%",
                }}
                whileHover={{
                  x: "120%",
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]"
              />

              <div className="relative z-10">
                <p className="text-[9px] uppercase tracking-[0.32em] text-white/40">
                  Paiement sécurisé
                </p>

                <p className="mt-1 text-[13px]">
                  Finaliser la commande
                </p>
              </div>

              <motion.div
                whileHover={{
                  x: 4,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="relative z-10 flex items-center gap-4"
              >
                <span className="font-serif text-[22px] font-light tracking-[-0.06em]">
                  {formatCartPrice(
                    subtotal,
                    currencyCode,
                  )}
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl">
                  <ArrowRight
                    size={16}
                    weight="light"
                  />
                </div>
              </motion.div>
            </motion.a>

            <button
              type="button"
              className="group mt-3 flex h-[54px] w-full items-center justify-between border border-black/10 bg-[#faf7f2] px-5 transition hover:bg-white"
            >
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-[0.28em] text-black/32">
                  Paiement express
                </p>

                <p className="mt-1 text-[11px] text-black/55">
                  Apple Pay · PayPal
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white transition group-hover:bg-black group-hover:text-white">
                <CreditCard
                  size={15}
                  weight="light"
                />
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-black/10 px-5 py-3">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-black/34">
              <Lock size={12} weight="light" />
              SSL sécurisé
            </div>

            <div className="text-[9px] uppercase tracking-[0.24em] text-black/34">
              Visa · Mastercard · PayPal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}