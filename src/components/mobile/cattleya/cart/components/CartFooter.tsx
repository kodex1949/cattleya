import { formatCartPrice } from "../cart-panel.utils";

type CartFooterProps = {
  subtotal: {
    amount: string;
    currencyCode: string;
  };

  checkoutUrl: string;
};

export default function CartFooter({
  subtotal,
  checkoutUrl,
}: CartFooterProps) {
  return (
    <div className="sticky bottom-0 mt-7 rounded-[26px] bg-white p-4 text-black shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">
          Sous-total
        </p>

        <p className="text-[15px] font-semibold">
          {formatCartPrice(
            subtotal
          )}
        </p>
      </div>

      <a
        href={checkoutUrl}
        className="mt-4 flex h-13 items-center justify-center rounded-full bg-black px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white"
      >
        Commander
      </a>
    </div>
  );
}