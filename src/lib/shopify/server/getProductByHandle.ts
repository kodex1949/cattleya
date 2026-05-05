import "server-only";

import { shopifyServerFetch } from "../server-client";
import type { ProductMobileData } from "@/components/mobile/cattleya/product/product.types";

const GET_PRODUCT_QUERY = `
query getProductByHandle($handle: String!) {
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

    images(first: 10) {
      edges {
        node {
          url
          altText
        }
      }
    }

    media(first: 20) {
      edges {
        node {
          mediaContentType
          alt
          previewImage {
            url
          }

          ... on MediaImage {
            image {
              url
              altText
            }
          }

          ... on Video {
            sources {
              url
              mimeType
              format
            }
          }

          ... on ExternalVideo {
            originUrl
          }
        }
      }
    }

    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          image {
            url
            altText
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
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
}
`;

type GetProductByHandleResponse = {
  product: ProductMobileData | null;
};

export async function getProductByHandle(
  handle: string
): Promise<ProductMobileData | null> {
  const data = await shopifyServerFetch<GetProductByHandleResponse>({
    query: GET_PRODUCT_QUERY,
    variables: { handle },
  });

  return data.product;
}