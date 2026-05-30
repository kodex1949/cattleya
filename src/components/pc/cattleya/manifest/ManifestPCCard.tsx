import Link from "next/link";
import { motion } from "framer-motion";
import type { ManifestProduct } from "./manifest.types";
import ManifestPCMedia from "./ManifestPCMedia";
import { formatManifestIndex } from "./manifest.pc.utils";

type ManifestPCCardProps = {
  product: ManifestProduct;
  index: number;
};

export default function ManifestPCCard({
  product,
  index,
}: ManifestPCCardProps) {
  const variants = product.variants ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.75,
        delay: index * 0.045,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group min-w-[420px] snap-start bg-[#efe6da] xl:min-w-[470px]"
    >
      <Link href={product.href} className="block">
        <div className="relative h-[640px] overflow-hidden bg-[#e7dccd]">
          <ManifestPCMedia
            title={product.title}
            image={product.image}
            video={product.video}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/5" />
          <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />

          <div className="absolute left-6 top-6 flex items-center gap-3 text-white/75">
            <span className="text-[10px] uppercase tracking-[0.32em]">
              {formatManifestIndex(index)}
            </span>
            <span className="h-px w-10 bg-white/40" />
          </div>

          {product.tag ? (
            <p className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.32em] text-white/70">
              {product.tag}
            </p>
          ) : null}

          <div className="absolute inset-x-6 bottom-6">
            <p className="text-[10px] uppercase tracking-[0.36em] text-white/55">
              Maison Cattleya
            </p>

            <h3 className="mt-3 max-w-[380px] font-serif text-[48px] font-light leading-[0.88] tracking-[-0.08em] text-white">
              {product.title}
            </h3>
          </div>
        </div>

        <div className="min-h-[190px] border-x border-b border-black/[0.07] bg-[#f7f2eb] px-6 pb-7 pt-6">
          <div className="flex items-start justify-between gap-8">
            <div>
              {product.subtitle ? (
                <p className="max-w-[280px] text-[13px] font-light leading-6 text-black/48">
                  {product.subtitle}
                </p>
              ) : null}

              <div className="mt-5">
                <p className="text-[14px] font-light text-black/85">
                  {product.price}
                </p>

                {product.unitPrice ? (
                  <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-black/32">
                    {product.unitPrice}
                  </p>
                ) : null}
              </div>
            </div>

            <span className="mt-1 whitespace-nowrap border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.28em] text-black/55 transition group-hover:border-black group-hover:text-black">
              Découvrir
            </span>
          </div>

          {variants.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {variants.slice(0, 4).map((variant) => (
                <span
                  key={variant}
                  className="border border-black/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-black/35"
                >
                  {variant}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}