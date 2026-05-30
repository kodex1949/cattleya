import type { SearchPCProduct } from "./search.pc.types";
import SearchPCProductCard from "./SearchPCProductCard";

type SearchPCResultsProps = {
  products: SearchPCProduct[];
  onResultClick: () => void;
};

export default function SearchPCResults({
  products,
  onResultClick,
}: SearchPCResultsProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[360px] items-center border-t border-black/8">
        <div className="max-w-[540px]">
          <p className="text-[10px] uppercase tracking-[0.4em] text-black/24">
            Aucun résultat
          </p>

          <h2 className="mt-6 font-serif text-[54px] font-light leading-[0.9] tracking-[-0.075em] text-black/85">
            Aucun sillage trouvé.
          </h2>

          <p className="mt-6 max-w-[380px] text-[13px] leading-7 text-black/38">
            Essayez une autre note, une collection ou une émotion.
          </p>

          <div className="mt-10 h-px w-20 bg-black/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between border-b border-black/8 pb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.38em] text-black/24">
            Résultats
          </p>

          <h2 className="mt-3 font-serif text-[34px] font-light tracking-[-0.06em] text-black/85">
            {products.length} création
            {products.length > 1 ? "s" : ""}
          </h2>
        </div>

        <span className="text-[10px] uppercase tracking-[0.34em] text-black/18">
          Maison Cattleya
        </span>
      </div>

      <div className="grid grid-cols-4 gap-x-5 gap-y-9">
        {products.map((product) => (
          <SearchPCProductCard
            key={product.id}
            product={product}
            onClick={onResultClick}
          />
        ))}
      </div>
    </div>
  );
}