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
  const subtotalAmount = Number(subtotal.amount);

  const shipping =
    subtotalAmount >= 80 ? 0 : 4.90;

  const total =
    subtotalAmount + shipping;

  return (
    <div className="sticky bottom-0 mt-7 rounded-[26px] bg-white p-4 text-black shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-black/55">
            Sous-total
          </p>

          <p className="text-[14px] font-medium">
            {formatCartPrice(subtotal)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[12px] text-black/55">
            Livraison
          </p>

          <p className="text-[14px] font-medium">
            {shipping === 0
              ? "Offerte"
              : new Intl.NumberFormat(
                  "fr-FR",
                  {
                    style: "currency",
                    currency:
                      subtotal.currencyCode,
                  }
                ).format(shipping)}
          </p>
        </div>

        <div className="mt-3 h-px bg-black/8" />

        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em]">
            Total
          </p>

          <p className="text-[16px] font-semibold">
            {new Intl.NumberFormat(
              "fr-FR",
              {
                style: "currency",
                currency:
                  subtotal.currencyCode,
              }
            ).format(total)}
          </p>
        </div>
      </div>

      <a
        href={checkoutUrl}
        className="mt-5 flex h-13 items-center justify-center rounded-full bg-black px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-opacity duration-300 hover:opacity-90"
      >
        Commander
      </a>

      <p className="mt-3 text-center text-[11px] tracking-[0.08em] text-black/45">
        Livraison offerte dès 80€
      </p>
    </div>
  );
}