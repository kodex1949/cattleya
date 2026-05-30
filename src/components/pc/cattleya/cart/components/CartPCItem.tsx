"use client";

import Image from "next/image";
import { Minus, Plus, Trash } from "phosphor-react";
import { useState } from "react";

import type { CartLine } from "../cart.pc.types";
import { formatCartPrice } from "../cart.pc.utils";

type CartPCItemProps = {
  line: CartLine;
};

function getFormatLabel(title: string) {
  return title === "Default Title" ? "Format unique" : title;
}

export default function CartPCItem({ line }: CartPCItemProps) {
  const image = line.merchandise.image;
  const [loading, setLoading] = useState(false);

  async function updateQuantity(quantity: number) {
    try {
      setLoading(true);

      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineId: line.id,
          quantity,
        }),
      });

      if (!response.ok) return;

      window.dispatchEvent(new CustomEvent("cart:updated"));
    } finally {
      setLoading(false);
    }
  }

  async function removeLine() {
    try {
      setLoading(true);

      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineIds: [line.id],
        }),
      });

      if (!response.ok) return;

      window.dispatchEvent(new CustomEvent("cart:updated"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="group border-b border-black/8 py-5">
      <div className="grid grid-cols-[96px_1fr] gap-5">
        <div className="relative h-[122px] overflow-hidden bg-[#efe9df]">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? line.merchandise.product.title}
              fill
              sizes="96px"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/8" />
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.32em] text-black/32">
                Maison Cattleya
              </p>

              <h3 className="mt-2 truncate font-serif text-[27px] font-light leading-[0.95] tracking-[-0.07em] text-black">
                {line.merchandise.product.title}
              </h3>

              <div className="mt-3 flex items-center gap-2">
                <span className="border border-black/10 bg-white px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-black/55">
                  {getFormatLabel(line.merchandise.title)}
                </span>

                <span className="text-[10px] text-black/38">
                  Eau de parfum
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={removeLine}
              disabled={loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-black/10 bg-white text-black/35 transition hover:border-black hover:text-black disabled:opacity-40"
            >
              <Trash size={14} weight="light" />
            </button>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[8px] uppercase tracking-[0.28em] text-black/30">
                Quantité
              </p>

              <div className="flex h-[38px] items-center border border-black/10 bg-white">
                <button
                  type="button"
                  onClick={() => updateQuantity(Math.max(1, line.quantity - 1))}
                  disabled={loading}
                  className="flex h-full w-10 items-center justify-center text-black/45 transition hover:bg-black hover:text-white disabled:opacity-30"
                >
                  <Minus size={12} weight="bold" />
                </button>

                <div className="flex h-full min-w-[48px] items-center justify-center border-x border-black/10 text-[12px] text-black">
                  {line.quantity}
                </div>

                <button
                  type="button"
                  onClick={() => updateQuantity(line.quantity + 1)}
                  disabled={loading}
                  className="flex h-full w-10 items-center justify-center text-black/45 transition hover:bg-black hover:text-white disabled:opacity-30"
                >
                  <Plus size={12} weight="bold" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[8px] uppercase tracking-[0.28em] text-black/30">
                Prix
              </p>

              <p className="mt-2 font-serif text-[28px] font-light tracking-[-0.06em] text-black">
                {formatCartPrice(
                  line.merchandise.price.amount,
                  line.merchandise.price.currencyCode,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}