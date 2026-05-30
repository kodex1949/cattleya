import "server-only";

import type {
  ProductPCData,
  ProductPCImage,
  ProductPCMedia,
  ProductPCVariant,
} from "@/components/pc/cattleya/product/product.types";

const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description

      featuredImage {
        url
        altText
      }

      images(first: 12) {
        nodes {
          url
          altText
        }
      }

      media(first: 20) {
        nodes {
          mediaContentType

          ... on MediaImage {
            image {
              url
              altText
            }
          }

          ... on Video {
            previewImage {
              url
              altText
            }
            sources {
              url
              mimeType
              format
            }
          }
        }
      }

      variants(first: 50) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

type ShopifyMediaNode = {
  mediaContentType: string;
  image?: ProductPCImage | null;
  previewImage?: ProductPCImage | null;
  sources?: {
    url: string;
    mimeType: string;
    format: string;
  }[];
};

type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  description: string;
  featuredImage: ProductPCImage | null;
  images: {
    nodes: ProductPCImage[];
  };
  media: {
    nodes: ShopifyMediaNode[];
  };
  variants: {
    nodes: ProductPCVariant[];
  };
};

type ShopifyProductResponse = {
  data?: {
    product: ShopifyProduct | null;
  };
  errors?: unknown;
};

function mapProductMedia(product: ShopifyProduct): ProductPCMedia[] {
  return product.media.nodes
    .map((media): ProductPCMedia | null => {
      if (media.mediaContentType === "IMAGE" && media.image?.url) {
        return {
          type: "image",
          url: media.image.url,
          altText: media.image.altText,
        };
      }

      if (media.mediaContentType === "VIDEO") {
        const videoUrl =
          media.sources?.find((source) => source.mimeType === "video/mp4")
            ?.url ??
          media.sources?.[0]?.url ??
          null;

        if (!videoUrl) return null;

        return {
          type: "video",
          url: videoUrl,
          altText: media.previewImage?.altText ?? product.title,
          poster: media.previewImage?.url ?? product.featuredImage?.url ?? null,
        };
      }

      return null;
    })
    .filter((media): media is ProductPCMedia => media !== null);
}

export async function getProductByHandle(
  handle: string,
): Promise<ProductPCData | null> {
  if (
    !process.env.SHOPIFY_STORE_DOMAIN ||
    !process.env.SHOPIFY_STOREFRONT_TOKEN
  ) {
    return null;
  }

  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: PRODUCT_QUERY,
      variables: { handle },
    }),
    cache: "no-store",
  });

  if (!response.ok) return null;

  const json = (await response.json()) as ShopifyProductResponse;

  if (json.errors) return null;

  const product = json.data?.product;

  if (!product) return null;

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    vendor: product.vendor,
    description: product.description,
    featuredImage: product.featuredImage,
    images: product.images.nodes,
    media: mapProductMedia(product),
    variants: product.variants.nodes,
  };
}