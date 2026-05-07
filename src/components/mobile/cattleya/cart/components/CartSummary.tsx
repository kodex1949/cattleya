import type { ShopifyCart } from "../cart-panel.types";

import { formatCartPrice } from "../cart-panel.utils";

type CartSummaryProps = {
  cart: ShopifyCart;
};

export default function CartSummary({
  cart,
}: CartSummaryProps) {
  return (
    <div className="rounded-[24px] bg-white/[0.07] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] uppercase tracking-[0.18em] text-white/42">
          Sous-total
        </p>

        <p className="text-[15px] font-semibold text-white">
          {formatCartPrice(
            cart.cost.subtotalAmount
          )}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[12px] uppercase tracking-[0.18em] text-white/42">
          Total
        </p>

        <p className="text-[17px] font-semibold text-white">
          {formatCartPrice(
            cart.cost.totalAmount
          )}
        </p>
      </div>
    </div>
  );
}