import type { ProductPCData } from "./product.types";

type ProductPCDetailsProps = {
  product: ProductPCData;
};

const benefits = [
  "Signature olfactive maison",
  "Sillage longue tenue",
  "Sélection premium",
  "Expédition suivie",
];

export default function ProductPCDetails({
  product,
}: ProductPCDetailsProps) {
  return (
    <aside className="pt-24">
      <p className="mb-8 text-[10px] uppercase tracking-[0.34em] text-black/38">
        Retour
      </p>

      <p className="text-[11px] uppercase tracking-[0.34em] text-black/35">
        {product.vendor}
      </p>

      <h1 className="mt-5 font-serif text-[54px] font-light leading-[0.95] tracking-[-0.08em] text-black">
        {product.title}
      </h1>

      {product.description ? (
        <p className="mt-8 max-w-[320px] text-[15px] font-light leading-8 text-black/58">
          {product.description}
        </p>
      ) : null}

      <div className="mt-10 h-px w-full bg-black/10" />

      <div className="mt-8 space-y-6">
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-5 text-[13px] text-black/62"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
            {benefit}
          </div>
        ))}
      </div>

      <ProductInfoAccordion />
    </aside>
  );
}

function ProductInfoAccordion() {
  const items = ["Détails", "Ingrédients", "Conseils", "Livraison & retours"];

  return (
    <div className="mt-12 border-t border-black/10">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className="flex w-full items-center justify-between border-b border-black/10 py-5 text-left text-[11px] uppercase tracking-[0.26em] text-black/65"
        >
          {item}
          <span className="text-lg font-light">+</span>
        </button>
      ))}
    </div>
  );
}