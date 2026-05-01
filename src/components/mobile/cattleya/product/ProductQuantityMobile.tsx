"use client";

type ProductQuantityMobileProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export default function ProductQuantityMobile({
  quantity,
  onQuantityChange,
}: ProductQuantityMobileProps) {
  return (
    <section className="border-y border-black/10 py-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.45em] text-neutral-400">
            Sélection
          </p>

          <h3 className="mt-3 text-[30px] font-light leading-none tracking-[-0.06em]">
            Quantité
          </h3>
        </div>

        <div className="flex items-center gap-7">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="text-2xl font-light text-neutral-500"
          >
            −
          </button>

          <span className="min-w-6 text-center text-[20px] font-light">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => onQuantityChange(quantity + 1)}
            className="text-2xl font-light text-neutral-500"
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}