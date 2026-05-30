export function formatCartPrice(
  amount: string,
  currencyCode = "EUR",
) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}