import Image from "next/image";
import Link from "next/link";

type ProductVariant = {
  title: string;
};

type Product = {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string;
  variants?: ProductVariant[];
  pricePerLiter?: string | null;
};

type CollectionPCCardProps = {
  product: Product;
};

export default function CollectionPCCard({
  product,
}: CollectionPCCardProps) {
  const variants = product.variants?.slice(0, 3) ?? [];

  return (
    <Link
      href={`/pc/product/${product.handle}`}
      data-collection-card
      className="group relative flex min-h-[660px] flex-col overflow-hidden bg-[#f8f3eb] transition-colors duration-700 hover:bg-[#efe4d5]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute inset-x-10 top-24 h-56 rounded-full bg-[#d8b987]/20 blur-[70px]" />
      </div>

      <div className="flex items-center justify-between px-7 pt-7">
        <p className="text-[10px] uppercase tracking-[0.34em] text-black/32">
          Signature
        </p>

        <p className="text-[11px] text-black/38">
          {product.price}
        </p>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-10 py-12">
        <Image
          src={product.image}
          alt={product.title}
          width={760}
          height={760}
          className="relative z-10 h-[350px] w-auto object-contain transition-transform duration-[1300ms] group-hover:scale-[1.045]"
        />
      </div>

      <div className="border-t border-black/10 px-7 py-7">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">
            Eau de parfum
          </p>

          {product.pricePerLiter ? (
            <p className="text-[11px] text-black/35">
              {product.pricePerLiter}
            </p>
          ) : null}
        </div>

        <h2 className="max-w-[310px] font-serif text-[30px] font-light leading-[0.98] tracking-[-0.055em] text-black">
          {product.title}
        </h2>

        {variants.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {variants.map((variant) => (
              <span
                key={variant.title}
                className="border border-black/10 bg-white/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-black/45"
              >
                {variant.title}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between">
          <span className="text-[12px] text-black/42">
            Découvrir
          </span>

          <span className="h-px w-12 bg-black/28 transition-all duration-500 group-hover:w-20" />
        </div>
      </div>
    </Link>
  );
}