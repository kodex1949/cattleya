import Image from "next/image";
import Link from "next/link";

import type { CollectionEditorialBlock } from "@/lib/cattleya/collection/get-collection-editorial-blocks";

type CollectionPCEditorialBlockProps = {
  block: CollectionEditorialBlock;
};

export default function CollectionPCEditorialBlock({
  block,
}: CollectionPCEditorialBlockProps) {
  const hasMedia =
    typeof block.media_url === "string" &&
    block.media_url.trim().length > 0;

  return (
    <article className="group relative col-span-2 overflow-hidden bg-[#120d08] text-[#f8f1e7]">
      <div className="relative min-h-[620px]">
        {hasMedia ? (
          <div className="absolute inset-0 z-0">
            {block.media_type === "video" ? (
              <video
                src={block.media_url!}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-[1.03]"
              />
            ) : (
              <Image
                src={block.media_url!}
                alt={block.title}
                fill
                unoptimized
                sizes="50vw"
                className="object-cover transition-transform duration-[1800ms] group-hover:scale-[1.03]"
              />
            )}
          </div>
        ) : null}

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />

        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(216,185,135,0.18),transparent_38%)]" />

        <div className="relative z-20 flex min-h-[620px] flex-col justify-between p-12">
          <div>
            {block.eyebrow ? (
              <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-white/55">
                {block.eyebrow}
              </p>
            ) : null}

            <h2 className="max-w-[520px] font-serif text-[62px] font-light leading-[0.88] tracking-[-0.08em]">
              {block.title}
            </h2>
          </div>

          <div>
            {block.description ? (
              <p className="max-w-[430px] text-[15px] leading-[1.9] text-white/72">
                {block.description}
              </p>
            ) : null}

            {block.cta_label && block.cta_href ? (
              <Link
                href={block.cta_href}
                className="mt-8 inline-flex items-center gap-6 border border-white/25 px-7 py-4 text-[10px] uppercase tracking-[0.34em] text-white transition-all duration-500 hover:bg-white hover:text-black"
              >
                {block.cta_label}

                <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}