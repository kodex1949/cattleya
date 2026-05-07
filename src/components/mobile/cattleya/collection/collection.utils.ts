export function formatCollectionPrice(
  amount: string,
  currencyCode: string
) {
  return new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: currencyCode,
    }
  ).format(Number(amount));
}