import Link from "next/link";

import type { SearchProduct } from "../search-panel.types";
import { formatPrice } from "../search-panel.utils";

type SearchProductResultProps = {
  product: SearchProduct;
  onClick: () => void;
};

export default function SearchProductResult({
  product,
  onClick,
}: SearchProductResultProps) {
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  return (
    <Link
      href={`/mobile/product/${product.handle}`}
      onClick={onClick}
      className="grid grid-cols-[74px_1fr] gap-3 rounded-[22px] bg-white/[0.07] p-3 transition active:scale-[0.99]"
    >
      <div className="h-[74px] overflow-hidden rounded-[18px] bg-white/[0.08]">
        {product.featuredImage?.url ? (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col justify-between py-1">
        <div>
          <p className="truncate text-[10px] uppercase tracking-[0.2em] text-white/35">
            {product.vendor || "Cattleya"}
          </p>

          <p className="mt-1 truncate text-[16px] font-semibold tracking-[-0.04em] text-white">
            {product.title}
          </p>
        </div>

        <p className="text-[12px] font-medium text-white/55">{price}</p>
      </div>
    </Link>
  );
}