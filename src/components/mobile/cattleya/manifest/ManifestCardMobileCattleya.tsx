import Link from "next/link";
import type { ManifestProduct } from "./manifest.types";

type Props = {
  product: ManifestProduct;
  index: number;
};

function isVideo(url?: string | null) {
  if (!url) return false;
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

function parsePrice(price: string) {
  const normalized = price.replace(/[^\d,.-]/g, "").replace(",", ".");
  const value = Number(normalized);
  return Number.isNaN(value) ? null : value;
}

function parseUnit(value: string) {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "");
  const match = normalized.match(/^(\d+(?:[.,]\d+)?)(ml|cl|l|g|kg)$/i);

  if (!match) return null;

  const amount = Number(match[1].replace(",", "."));
  const unit = match[2].toLowerCase();

  if (Number.isNaN(amount)) return null;

  return { amount, unit };
}

function getUnitPrice(price: string, variants: string[]) {
  const numericPrice = parsePrice(price);
  if (!numericPrice || variants.length === 0) return null;

  const parsed = parseUnit(variants[0]);
  if (!parsed) return null;

  let result: number;
  let label: "L" | "KG";

  if (parsed.unit === "ml") {
    result = numericPrice / (parsed.amount / 1000);
    label = "L";
  } else if (parsed.unit === "cl") {
    result = numericPrice / (parsed.amount / 100);
    label = "L";
  } else if (parsed.unit === "l") {
    result = numericPrice / parsed.amount;
    label = "L";
  } else if (parsed.unit === "g") {
    result = numericPrice / (parsed.amount / 1000);
    label = "KG";
  } else {
    result = numericPrice / parsed.amount;
    label = "KG";
  }

  return `${result.toFixed(2).replace(".", ",")} € / ${label}`;
}

export default function ManifestCardMobileCattleya({
  product,
  index,
}: Props) {
  const variants = product.variants ?? [];
  const unitPrice = getUnitPrice(product.price, variants);

  const mediaUrl = product.video || product.image;
  const videoMedia = isVideo(mediaUrl);

  return (
    <Link
      href={product.href}
      className="group flex w-[78vw] max-w-[320px] min-w-[270px] flex-none"
    >
      <article className="flex h-full w-full min-h-[540px] flex-col">
        <div className="relative h-[385px] overflow-hidden bg-[#e8dfd3] shadow-[0_20px_60px_rgba(42,32,22,0.10)]">
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-4 pt-3">
            <span className="text-[9px] uppercase tracking-[0.30em] text-white/70">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="max-w-[110px] text-right text-[8px] uppercase tracking-[0.24em] text-white/60">
              {product.subtitle ?? "Édition"}
            </span>
          </div>

          {videoMedia ? (
            <video
              src={mediaUrl}
              poster={product.image}
              className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
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
              draggable={false}
              className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
            <span className="h-px w-10 bg-white/35" />
            <span className="text-[8px] uppercase tracking-[0.26em] text-white/60">
              {videoMedia ? "Film" : "Cattleya"}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-3">
          <p className="mb-2 text-[8px] uppercase tracking-[0.42em] text-black/28">
            {product.tag ?? "Maison"}
          </p>

          <h3 className="line-clamp-2 text-[23px] font-light leading-[0.95] tracking-[-0.07em] text-black">
            {product.title}
          </h3>

          {variants.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {variants.map((variant) => (
                <span
                  key={variant}
                  className="border border-black/[0.08] px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-black/45"
                >
                  {variant}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-end justify-between border-b border-black/[0.06] pb-3">
            <p className="text-[10px] text-black/35">{unitPrice ?? ""}</p>

            <p className="text-[15px] font-light tracking-[-0.02em] text-black">
              {product.price}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.26em] text-black/65">
            <span>Découvrir</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}