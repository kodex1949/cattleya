"use client";

export default function CartPromoCode() {
  return (
    <div className="rounded-[24px] bg-white/[0.07] p-4">
      <p className="text-[12px] uppercase tracking-[0.18em] text-white/40">
        Code promo
      </p>

      <div className="mt-4 flex gap-2">
        <input
          placeholder="Entrer un code"
          className="
            h-12 flex-1 rounded-full border border-white/10
            bg-white/[0.04] px-4 text-[14px]
            outline-none placeholder:text-white/25
          "
        />

        <button
          type="button"
          className="
            rounded-full bg-white px-5
            text-[11px] font-semibold uppercase
            tracking-[0.16em] text-black
          "
        >
          Appliquer
        </button>
      </div>
    </div>
  );
}