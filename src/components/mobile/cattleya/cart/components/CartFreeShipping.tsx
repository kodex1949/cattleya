"use client";

type CartFreeShippingProps = {
  subtotal: number;
};

const FREE_SHIPPING_THRESHOLD = 80;

export default function CartFreeShipping({
  subtotal,
}: CartFreeShippingProps) {
  const remaining = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0
  );

  const progress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );

  return (
    <div className="rounded-[24px] bg-[#d6bc91]/10 p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#d6bc91]">
        Livraison offerte
      </p>

      <p className="mt-3 text-[14px] leading-5 text-white/75">
        {remaining > 0 ? (
          <>
            Plus que{" "}
            <span className="text-white">
              {remaining.toFixed(0)}€
            </span>{" "}
            pour profiter de la livraison offerte.
          </>
        ) : (
          "Votre livraison est offerte."
        )}
      </p>

      <div className="mt-4 h-[5px] overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#d6bc91] transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}