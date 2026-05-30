import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";

import type { SearchPCProduct } from "./search.pc.types";

type SearchPCProductCardProps = {
  product: SearchPCProduct;
  onClick?: () => void;
};

export default function SearchPCProductCard({
  product,
  onClick,
}: SearchPCProductCardProps) {
  return (
    <Link
      href={`/pc/product/${product.handle}`}
      onClick={onClick}
      className="group block"
    >
      <article className="relative">
        <div className="relative aspect-[0.78] overflow-hidden bg-[#efebe4]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              unoptimized
              className="object-cover transition duration-[1600ms] ease-out group-hover:scale-[1.045]"
            />
          ) : null}

          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.08)_100%)] opacity-0 transition duration-700 group-hover:opacity-100" />

          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/70 opacity-0 backdrop-blur-xl transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight
              size={16}
              className="text-black"
            />
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/24">
              {product.vendor}
            </p>

            <h3 className="mt-2 font-serif text-[28px] font-light leading-none tracking-[-0.06em] text-black">
              {product.title}
            </h3>
          </div>

          <div className="pt-1 text-right">
            <p className="text-[12px] tracking-[0.02em] text-black/52">
              {product.price}
            </p>
          </div>
        </div>

        <div className="mt-5 h-px w-0 bg-black/14 transition-all duration-700 group-hover:w-full" />
      </article>
    </Link>
  );
}