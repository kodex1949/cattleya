"use client";

import { formatCartPrice } from "../cart-panel.utils";

type CartCheckoutFooterProps = {
  total: {
    amount: string;
    currencyCode: string;
  };

  checkoutUrl: string;
};

export default function CartCheckoutFooter({
  total,
  checkoutUrl,
}: CartCheckoutFooterProps) {
  return (
    <div className="sticky bottom-0 mt-7 overflow-hidden rounded-[26px] border border-[#d6bc91]/20 bg-[#f7f0e6] p-4 text-[#11100d] shadow-[0_18px_50px_rgba(0,0,0,0.34)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8b6f48]/40 to-transparent" />

      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.26em] text-black/45">
          Sous-total
        </p>

        <p className="font-serif text-[24px] font-light tracking-[-0.06em]">
          {formatCartPrice(total)}
        </p>
      </div>

      <a
        href={checkoutUrl}
        className="mt-4 flex h-14 items-center justify-center rounded-full bg-[#0c0b09] text-[11px] font-medium uppercase tracking-[0.26em] text-white transition active:scale-[0.98]"
      >
        Commander
      </a>

      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-black/38">
        Expédition sous 24h · Paiement sécurisé
      </p>
    </div>
  );
}