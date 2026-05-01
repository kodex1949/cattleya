import "server-only";

import type { ManifestProduct } from "@/components/mobile/cattleya/manifest/manifest.types";
import type { ShopifyProductNode } from "@/lib/shopify/queries/getCollectionProducts";

function formatPrice(amount: string, currencyCode: string): string {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return amount;
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: numericAmount % 1 === 0 ? 0 : 2,
  }).format(numericAmount);
}

function cleanMetafieldValue(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();

  if (!trimmed) {
    return undefined;
  }

  return trimmed;
}

function normalizeVariantValue(value: string): string {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

function extractVariants(product: ShopifyProductNode): string[] {
  const values: string[] = [];

  product.variants.edges.forEach(({ node }) => {
    node.selectedOptions.forEach((option) => {
      const optionName = option.name.trim().toLowerCase();

      if (["size", "taille", "volume", "contenance"].includes(optionName)) {
        values.push(normalizeVariantValue(option.value));
      }
    });
  });

  return [...new Set(values)].slice(0, 4);
}

function extractVideo(product: ShopifyProductNode): string | null {
  const videoMedia = product.media.edges.find(
    ({ node }) => node.mediaContentType === "VIDEO",
  );

  const mp4Source =
    videoMedia?.node.sources?.find((source) => source.format === "mp4") ??
    videoMedia?.node.sources?.find((source) => source.mimeType === "video/mp4");

  return mp4Source?.url ?? videoMedia?.node.sources?.[0]?.url ?? null;
}

export function mapProductToManifest(
  product: ShopifyProductNode,
): ManifestProduct {
  const subtitle =
    cleanMetafieldValue(product.manifestSubtitle?.value) ?? "Fragrance";

  const tag = cleanMetafieldValue(product.manifestTag?.value) ?? "Maison";

  const variants = extractVariants(product);

  return {
    id: product.id,
    title: product.title,
    href: `/mobile/product/${product.handle}`,
    image: product.featuredImage?.url ?? "",
    video: extractVideo(product),
    price: formatPrice(
      product.priceRange.minVariantPrice.amount,
      product.priceRange.minVariantPrice.currencyCode,
    ),
    subtitle,
    tag,
    variants,
  };
}