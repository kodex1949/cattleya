import type { CartMoney } from "./cart-panel.types";

export function formatCartPrice(money?: CartMoney | null) {
  if (!money) return "";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(money.amount));
}

export function getCartLineImageAlt(title: string, altText?: string | null) {
  return altText || title;
}