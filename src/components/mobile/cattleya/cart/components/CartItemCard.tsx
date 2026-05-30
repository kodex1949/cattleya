"use client";

import { useState } from "react";

import type { CartApiResponse, CartLine } from "../cart-panel.types";
import { formatCartPrice } from "../cart-panel.utils";
import CartQuantitySelector from "./CartQuantitySelector";

type CartItemCardProps = {
  line: CartLine;
  onRefresh: () => Promise<void>;
};

export default function CartItemCard({ line, onRefresh }: CartItemCardProps) {
  const [loading, setLoading] = useState(false);

  const product = line.merchandise.product;
  const image = line.merchandise.image ?? product.featuredImage;

  async function updateQuantity(quantity: number) {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineId: line.id,
          quantity,
        }),
      });

      const data = (await response.json()) as CartApiResponse;

      if (!response.ok) {
        console.error("Cart PATCH error:", data);
        return;
      }

      console.log("Cart updated:", data.cart);

      await onRefresh();
    } catch (error) {
      console.error("Cart update failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-[82px_1fr_auto] items-center gap-3 rounded-[24px] bg-white/[0.07] p-3">
      <div className="h-[82px] overflow-hidden rounded-[20px] bg-white/[0.08]">
        {image?.url ? (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="flex h-full min-w-0 flex-col justify-between py-1">
        <div>
          <p className="truncate text-[10px] uppercase tracking-[0.2em] text-white/35">
            {product.vendor || "Cattleya"}
          </p>

          <p className="mt-1 line-clamp-2 text-[16px] font-semibold tracking-[-0.04em] text-white">
            {product.title}
          </p>
        </div>

        <p className="text-[14px] font-medium text-white/60">
          {formatCartPrice(line.cost.totalAmount)}
        </p>
      </div>

      <CartQuantitySelector
        quantity={line.quantity}
        loading={loading}
        onDecrease={() => updateQuantity(Math.max(0, line.quantity - 1))}
        onIncrease={() => updateQuantity(line.quantity + 1)}
      />
    </div>
  );
}