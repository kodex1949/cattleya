import type { ProductPCVariant } from "./product.types";

export function formatProductPrice(variant: ProductPCVariant | null) {
  if (!variant) return "";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: variant.price.currencyCode,
  }).format(Number(variant.price.amount));
}

export function getInitialVariant(variants: ProductPCVariant[]) {
  return variants.find((variant) => variant.availableForSale) ?? variants[0] ?? null;
}