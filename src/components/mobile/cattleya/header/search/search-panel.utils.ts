export function formatPrice(
  amount: string,
  currencyCode: string
) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}