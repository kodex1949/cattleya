"use client";

type CartQuantitySelectorProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  loading?: boolean;
};

export default function CartQuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  loading = false,
}: CartQuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white/[0.08] px-3 py-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={loading}
        className="flex h-5 w-5 items-center justify-center text-[15px] text-white/55 transition active:scale-90 disabled:opacity-40"
      >
        −
      </button>

      <span className="min-w-[12px] text-center text-[13px] font-medium text-white">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={loading}
        className="flex h-5 w-5 items-center justify-center text-[15px] text-white/55 transition active:scale-90 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}