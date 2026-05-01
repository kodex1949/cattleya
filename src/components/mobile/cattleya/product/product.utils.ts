import type {
  ProductImage,
  ProductMedia,
  ProductMobileData,
  ProductOptionGroup,
  ProductVariant,
  ShopifyMediaNode,
} from "./product.types";

export function formatProductPrice(amount: string, currencyCode: string): string {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return amount;
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

function mapShopifyMediaNode(node: ShopifyMediaNode): ProductMedia | null {
  if (node.mediaContentType === "IMAGE" && node.image?.url) {
    return {
      url: node.image.url,
      altText: node.image.altText ?? node.alt ?? null,
      type: "image",
      poster: node.previewImage?.url ?? null,
    };
  }

  if (node.mediaContentType === "VIDEO") {
    const source =
      node.sources?.find((item) => item.format === "mp4") ??
      node.sources?.find((item) => item.mimeType?.includes("mp4")) ??
      node.sources?.[0];

    if (!source?.url) {
      return null;
    }

    return {
      url: source.url,
      altText: node.alt ?? null,
      type: "video",
      poster: node.previewImage?.url ?? null,
    };
  }

  return null;
}

export function getProductImages(product: ProductMobileData): ProductImage[] {
  const media =
    product.media?.edges
      .map((edge) => mapShopifyMediaNode(edge.node))
      .filter((item): item is ProductMedia => Boolean(item)) ?? [];

  if (media.length > 0) {
    return media;
  }

  const images =
    product.images?.edges?.map((edge) => ({
      url: edge.node.url,
      altText: edge.node.altText ?? null,
      type: "image" as const,
      poster: null,
    })) ?? [];

  if (images.length > 0) {
    return images;
  }

  return product.featuredImage ? [product.featuredImage] : [];
}

export function getProductVariants(product: ProductMobileData): ProductVariant[] {
  return product.variants?.edges?.map((edge) => edge.node) ?? [];
}

export function getOptionGroups(variants: ProductVariant[]): ProductOptionGroup[] {
  const groups = new Map<string, Set<string>>();

  variants.forEach((variant) => {
    variant.selectedOptions.forEach((option) => {
      if (!groups.has(option.name)) {
        groups.set(option.name, new Set<string>());
      }

      groups.get(option.name)?.add(option.value);
    });
  });

  return Array.from(groups.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));
}

export function getInitialSelections(
  variant: ProductVariant,
): Record<string, string> {
  return variant.selectedOptions.reduce<Record<string, string>>(
    (acc, option) => {
      acc[option.name] = option.value;
      return acc;
    },
    {},
  );
}

export function findMatchingVariant(
  variants: ProductVariant[],
  selections: Record<string, string>,
): ProductVariant | null {
  return (
    variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => selections[option.name] === option.value,
      ),
    ) ?? null
  );
}

export function getVariantImageIndex(
  images: ProductImage[],
  variant: ProductVariant | null,
): number {
  if (!variant?.image?.url) {
    return 0;
  }

  const index = images.findIndex((image) => image.url === variant.image?.url);

  return index >= 0 ? index : 0;
}