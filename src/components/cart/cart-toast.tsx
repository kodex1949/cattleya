"use client";

import Image from "next/image";
import { Bag, ArrowRight } from "phosphor-react";

type CartToastProps = {
  productTitle: string;
  variantTitle?: string | null;
  price?: string | null;
  imageUrl?: string | null;
};

export default function CartToast({
  productTitle,
  variantTitle,
  price,
  imageUrl,
}: CartToastProps) {
  return (
    <div className="relative w-[410px] overflow-hidden border border-[#d6bc91]/30 bg-[#f7f1e8] text-black shadow-[0_40px_120px_rgba(0,0,0,0.34)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(214,188,145,0.42),transparent_42%)]" />

      <div className="relative grid grid-cols-[124px_1fr]">
        <div className="relative min-h-[170px] overflow-hidden bg-[#120d09]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productTitle}
              fill
              sizes="124px"
              className="object-contain p-5 drop-shadow-[0_22px_34px_rgba(0,0,0,0.42)]"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Bag size={30} weight="thin" className="text-[#d6bc91]" />
            </div>
          )}
        </div>

        <div className="relative px-6 py-5">
          <p className="text-[9px] uppercase tracking-[0.38em] text-[#9b7b4d]">
            Maison Cattleya
          </p>

          <h3 className="mt-4 font-serif text-[26px] font-light leading-[0.92] tracking-[-0.07em] text-black">
            {productTitle}
          </h3>

          {variantTitle ? (
            <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-black/45">
              {variantTitle}
            </p>
          ) : null}

          <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-black/42">
                Ajouté
              </p>

              <p className="mt-1 text-[12px] text-black/65">
                Votre sélection est prête.
              </p>
            </div>

            {price ? (
              <p className="font-serif text-[22px] tracking-[-0.06em]">
                {price}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("cart:open"));
            }}
            className="mt-5 flex h-11 w-full items-center justify-between bg-black px-4 text-white transition hover:bg-[#2a2118]"
          >
            <span className="text-[10px] uppercase tracking-[0.28em]">
              Voir le panier
            </span>

            <ArrowRight size={14} weight="thin" />
          </button>
        </div>
      </div>

      <div className="h-[2px] w-full bg-[#d6bc91]/25">
        <div className="h-full origin-left animate-[cattleyaToastProgress_5.2s_linear_forwards] bg-[#d6bc91]" />
      </div>
    </div>
  );
}