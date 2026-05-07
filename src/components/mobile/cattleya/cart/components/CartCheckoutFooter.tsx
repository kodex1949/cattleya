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
    <div className="sticky bottom-0 mt-7 rounded-[26px] bg-white p-4 text-black shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">
          Sous-total
        </p>

        <p className="text-[18px] font-semibold tracking-[-0.04em]">
          {formatCartPrice(total)}
        </p>
      </div>

      <a
        href={checkoutUrl}
        className="
          mt-4 flex h-14 items-center justify-center
          rounded-full bg-black
          text-[12px] font-semibold uppercase
          tracking-[0.22em] text-white
        "
      >
        Commander
      </a>

      <p className="mt-3 text-center text-[11px] text-black/45">
        Expédition sous 24h
      </p>
    </div>
  );
}