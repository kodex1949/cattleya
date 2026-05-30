import Image from "next/image";

type CollectionPCHeroProps = {
  title: string;
  description?: string | null;
  image?: {
    url: string;
    altText: string | null;
  } | null;
};

export default function CollectionPCHero({
  title,
  description,
  image,
}: CollectionPCHeroProps) {
  return (
    <section className="relative h-[58vh] min-h-[520px] overflow-hidden bg-[#120d08] text-white">
      {/* IMAGE */}
      {image?.url ? (
        <div
          className="absolute inset-0"
          data-collection-hero="image"
        >
          <Image
            src={image.url}
            alt={image.altText || title}
            fill
            priority
            sizes="100vw"
            className="scale-[1.02] object-cover"
          />
        </div>
      ) : null}

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/34" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/78" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,185,135,0.18),transparent_34%)]" />

      {/* CONTENT */}
      <div className="relative z-20 flex h-full flex-col justify-end px-8 pb-8 pt-28 lg:px-16 lg:pb-10">
        <div className="max-w-[1500px]">
          <p
            data-collection-hero="eyebrow"
            className="mb-6 text-[10px] uppercase tracking-[0.44em] text-white/58"
          >
            Maison Cattleya — Collection
          </p>

          <h1
            data-collection-hero="title"
            className="max-w-[860px] font-serif text-[54px] font-light leading-[0.9] tracking-[-0.08em] text-white md:text-[72px] xl:text-[94px]"
          >
            {title}
          </h1>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p
              data-collection-hero="description"
              className="max-w-[520px] text-[14px] leading-[1.95] text-white/72"
            >
              {description ||
                "Une sélection de parfums pensée comme une garde-robe olfactive : matières nobles, sillages profonds et présence silencieuse."}
            </p>

            <div
              data-collection-hero="meta"
              className="hidden items-center gap-4 lg:flex"
            >
              <span className="text-[10px] uppercase tracking-[0.34em] text-white/42">
                Édition parfumée
              </span>

              <span className="h-px w-12 bg-white/42" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}