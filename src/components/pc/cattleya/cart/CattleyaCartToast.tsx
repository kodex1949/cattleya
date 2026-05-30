"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ShoppingBag, X } from "phosphor-react";
import { toast } from "sonner";

type CattleyaCartToastProps = {
  toastId: string | number;
  productTitle: string;
  variantTitle?: string;
  price: string;
  imageUrl?: string | null;
};

export default function CattleyaCartToast({
  toastId,
  productTitle,
  variantTitle,
  price,
  imageUrl,
}: CattleyaCartToastProps) {
  function closeToast() {
    toast.dismiss(toastId);
  }

  function openCartPanel() {
    closeToast();
    window.dispatchEvent(new CustomEvent("cart:updated"));
    window.dispatchEvent(new CustomEvent("cart:open"));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 54, y: -10, scale: 0.94, filter: "blur(14px)" }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 34, scale: 0.96, filter: "blur(8px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[440px] overflow-hidden border border-[#d6bc91]/35 bg-[#fbf6ee]/95 p-4 text-[#17110b] shadow-[0_34px_110px_rgba(23,17,11,0.22)] backdrop-blur-2xl"
    >
      <motion.div
        aria-hidden
        initial={{ x: "-120%" }}
        animate={{ x: "130%" }}
        transition={{ duration: 1.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(214,188,145,0.12)_38%,rgba(255,255,255,0.62)_50%,rgba(214,188,145,0.12)_62%,transparent_100%)]"
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 55, y: 30, scale: 0.35, rotate: -12 }}
        animate={{
          opacity: [0, 0.95, 0],
          x: -82,
          y: -52,
          scale: 1.45,
          rotate: -28,
        }}
        transition={{ duration: 1.55, ease: "easeOut" }}
        className="pointer-events-none absolute right-9 top-10 h-28 w-28 bg-[radial-gradient(circle,rgba(214,188,145,0.7)_0_2px,transparent_3px)] bg-[length:18px_18px]"
      />

      <button
        type="button"
        onClick={closeToast}
        className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center border border-black/10 bg-white/50 text-black/45 transition hover:border-black/30 hover:bg-white hover:text-black"
        aria-label="Fermer"
      >
        <X size={14} />
      </button>

      <div className="relative z-10 flex gap-4 pr-8">
        <div className="relative h-[104px] w-[82px] shrink-0 overflow-hidden bg-[#eee4d6]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productTitle}
              fill
              sizes="82px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingBag size={22} className="text-black/25" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#8a6a3f]" />

            <p className="text-[9px] uppercase tracking-[0.34em] text-[#8a6a3f]">
              Ajouté au panier
            </p>
          </div>

          <h3 className="mt-3 line-clamp-2 font-serif text-[24px] font-light leading-[0.95] tracking-[-0.055em] text-[#17110b]">
            {productTitle}
          </h3>

          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              {variantTitle ? (
                <p className="text-[11px] text-black/45">
                  Format : {variantTitle}
                </p>
              ) : null}

              <p className="mt-1 text-[11px] text-black/45">Quantité : 1</p>
            </div>

            <p className="font-serif text-[24px] font-light tracking-[-0.06em] text-black">
              {price}
            </p>
          </div>

          <button
            type="button"
            onClick={openCartPanel}
            className="mt-4 flex h-11 w-full items-center justify-center bg-[#17110b] text-[10px] uppercase tracking-[0.3em] text-white transition duration-500 hover:bg-[#8a6a3f]"
          >
            Voir le panier
          </button>
        </div>
      </div>
    </motion.div>
  );
}