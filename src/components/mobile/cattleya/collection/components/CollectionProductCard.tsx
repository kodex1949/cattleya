"use client";

import Link from "next/link";

import type { CollectionProduct } from "../collection.types";

import { formatCollectionPrice } from "../collection.utils";

type CollectionProductCardProps = {
  product: CollectionProduct;
  index: number;
};

function parsePrice(price: string) {
  const normalized = price
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".");

  const value = Number(normalized);

  return Number.isNaN(value)
    ? null
    : value;
}

function parseUnit(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  const match =
    normalized.match(
      /^(\d+(?:[.,]\d+)?)(ml|cl|l)$/i
    );

  if (!match) return null;

  const amount = Number(
    match[1].replace(",", ".")
  );

  const unit = match[2].toLowerCase();

  if (Number.isNaN(amount)) {
    return null;
  }

  return {
    amount,
    unit,
  };
}

function getUnitPrice(
  price: string,
  variants: string[]
) {
  const numericPrice =
    parsePrice(price);

  if (
    !numericPrice ||
    variants.length === 0
  ) {
    return null;
  }

  const parsed = parseUnit(
    variants[0]
  );

  if (!parsed) return null;

  let result: number;

  if (parsed.unit === "ml") {
    result =
      numericPrice /
      (parsed.amount / 1000);
  } else if (
    parsed.unit === "cl"
  ) {
    result =
      numericPrice /
      (parsed.amount / 100);
  } else {
    result =
      numericPrice /
      parsed.amount;
  }

  return `${result
    .toFixed(2)
    .replace(".", ",")} € / L`;
}

export default function CollectionProductCard({
  product,
  index,
}: CollectionProductCardProps) {
  const price =
    formatCollectionPrice(
      product.price.amount,
      product.price.currencyCode
    );

  const variants =
    product.variants ?? [];

  const unitPrice =
    getUnitPrice(
      price,
      variants
    );

  return (
    <Link
      href={`/mobile/product/${product.handle}`}
      className="group block"
    >
      <article className="flex h-full flex-col">
        <div className="relative h-[285px] overflow-hidden bg-[#e8dfd3] shadow-[0_18px_45px_rgba(42,32,22,0.10)]">
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-3 pt-3">
            <span className="text-[8px] uppercase tracking-[0.30em] text-white/70">
              {String(
                index + 1
              ).padStart(2, "0")}
            </span>

            <span className="max-w-[90px] text-right text-[7px] uppercase tracking-[0.24em] text-white/60">
              {product.vendor ||
                "Maison"}
            </span>
          </div>

          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              draggable={false}
              className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-active:scale-[1.035]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[0.28em] text-black/30">
              Cattleya
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />

          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
            <span className="h-px w-8 bg-white/35" />

            <span className="text-[7px] uppercase tracking-[0.26em] text-white/60">
              Cattleya
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-3">
          <p className="mb-2 text-[8px] uppercase tracking-[0.36em] text-black/28">
            Maison
          </p>

          <h3 className="line-clamp-2 text-[20px] font-light leading-[0.95] tracking-[-0.07em] text-black">
            {product.title}
          </h3>

          {variants.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {variants.map(
                (variant) => (
                  <span
                    key={variant}
                    className="border border-black/[0.08] px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-black/45"
                  >
                    {variant}
                  </span>
                )
              )}
            </div>
          ) : null}

          <div className="mt-4 flex items-end justify-between border-b border-black/[0.06] pb-3">
            <p className="text-[10px] text-black/35">
              {unitPrice ??
                "Édition parfumée"}
            </p>

            <p className="text-[14px] font-light tracking-[-0.02em] text-black">
              {price}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-[8px] uppercase tracking-[0.26em] text-black/65">
            <span>Découvrir</span>

            <span className="transition-transform duration-300 group-active:translate-x-1">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}