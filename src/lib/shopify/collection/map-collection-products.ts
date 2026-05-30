function formatPrice(
  amount: string,
  currencyCode: string
) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}

export function mapCollectionProducts(
  products: any[]
) {
  return products.map((product) => ({
    id: product.id,
    handle: product.handle,
    title: product.title,

    image:
      product.featuredImage?.url ??
      "/images/placeholder.jpg",

    price: formatPrice(
      product.priceRange.minVariantPrice.amount,
      product.priceRange.minVariantPrice.currencyCode
    ),
  }));
}