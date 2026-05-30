import "server-only";

import type { ManifestProduct } from "@/components/pc/cattleya/manifest/manifest.types";

const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

const MANIFEST_QUERY = `
  query ManifestCollection {
    collection(handle: "manifest") {
      products(first: 10) {
        nodes {
          id
          title
          handle
          vendor

          featuredImage {
            url
            altText
          }

          media(first: 10) {
            nodes {
              mediaContentType

              ... on Video {
                sources {
                  url
                  mimeType
                  format
                }
              }
            }
          }

          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }

          variants(first: 10) {
            nodes {
              title
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}

type ShopifyManifestResponse = {
  data?: {
    collection: {
      products: {
        nodes: ShopifyManifestProduct[];
      };
    } | null;
  };
  errors?: unknown;
};

type ShopifyManifestProduct = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  media: {
    nodes: {
      mediaContentType: string;
      sources?: {
        url: string;
        mimeType: string;
        format: string;
      }[];
    }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: {
      title: string;
      selectedOptions: {
        name: string;
        value: string;
      }[];
    }[];
  };
};

function getProductVideo(product: ShopifyManifestProduct) {
  const videoMedia = product.media.nodes.find(
    (media) => media.mediaContentType === "VIDEO",
  );

  return (
    videoMedia?.sources?.find((source) => source.mimeType === "video/mp4")
      ?.url ??
    videoMedia?.sources?.[0]?.url ??
    null
  );
}

export async function getManifestProducts(): Promise<ManifestProduct[]> {
  if (
    !process.env.SHOPIFY_STORE_DOMAIN ||
    !process.env.SHOPIFY_STOREFRONT_TOKEN
  ) {
    return [];
  }

  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: MANIFEST_QUERY,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const json = (await response.json()) as ShopifyManifestResponse;

  if (json.errors) {
    return [];
  }

  const products = json.data?.collection?.products.nodes ?? [];

  return products.map((product) => {
    const price = product.priceRange.minVariantPrice;
    const video = getProductVideo(product);

    return {
      id: product.id,
      title: product.title,
      subtitle: product.vendor,
      tag: video ? "Vidéo" : "Parfum",
      href: `/pc/product/${product.handle}`,
      image: product.featuredImage?.url ?? null,
      video,
      price: formatPrice(price.amount, price.currencyCode),
      unitPrice: null,
      variants: product.variants.nodes.map((variant) => variant.title),
    };
  });
}