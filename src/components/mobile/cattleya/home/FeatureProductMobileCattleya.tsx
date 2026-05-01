import Link from "next/link";
import type { ManifestProduct } from "@/components/mobile/cattleya/manifest/manifest.types";

type FeatureProductMobileCattleyaProps = {
  product?: ManifestProduct;
};

export default function FeatureProductMobileCattleya({
  product,
}: FeatureProductMobileCattleyaProps) {
  if (!product) return null;

  return (
    <section className="bg-[#f8f5ef] px-5 py-24 text-black">
      <div className="mx-auto max-w-[430px]">
        <p className="text-[10px] uppercase tracking-[0.4em] text-black/35">
          Sélection Cattleya
        </p>

        <div className="mt-7 overflow-hidden bg-[#e8dfd3]">
          {product.video ? (
            <video
              src={product.video}
              poster={product.image}
              className="h-[520px] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={product.image}
              alt={product.title}
              className="h-[520px] w-full object-cover"
            />
          )}
        </div>

        <div className="mt-7 text-center">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/35">
            {product.subtitle ?? "Fragrance"}
          </p>

          <h2 className="mx-auto mt-4 max-w-[330px] text-[42px] font-light leading-[0.9] tracking-[-0.08em]">
            {product.title}
          </h2>

          <p className="mx-auto mt-5 max-w-[300px] text-[14px] leading-7 text-black/55">
            Une fragrance signature, pensée comme une présence discrète et
            mémorable.
          </p>

          <div className="mt-7 flex items-center justify-center gap-4">
            <span className="text-[15px] font-light">{product.price}</span>

            <Link
              href={product.href}
              className="border border-black px-5 py-3 text-[10px] uppercase tracking-[0.28em]"
            >
              Découvrir
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}