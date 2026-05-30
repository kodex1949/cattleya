import "server-only";

import type { SearchPCProduct } from "@/components/pc/search/search.pc.types";

const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!) {
    products(first: 12, query: $query) {
      nodes {
        id
        title
        handle
        vendor

        featuredImage {
          url
          altText
        }

        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

type ShopifySearchResponse = {
  data?: {
    products: {
      nodes: {
        id: string;
        title: string;
        handle: string;
        vendor: string;

        featuredImage: {
          url: string;
          altText: string | null;
        } | null;

        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
      }[];
    };
  };

  errors?: unknown;
};

function formatPrice(
  amount: string,
  currencyCode: string,
) {
  return new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: currencyCode,
    },
  ).format(Number(amount));
}

export async function searchProducts(
  query: string,
): Promise<SearchPCProduct[]> {
  if (
    !process.env.SHOPIFY_STORE_DOMAIN ||
    !process.env.SHOPIFY_STOREFRONT_TOKEN
  ) {
    return [];
  }

  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    SHOPIFY_ENDPOINT,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",

        "X-Shopify-Storefront-Access-Token":
          process.env
            .SHOPIFY_STOREFRONT_TOKEN,
      },

      body: JSON.stringify({
        query:
          SEARCH_PRODUCTS_QUERY,

        variables: {
          query,
        },
      }),

      cache: "no-store",
    },
  );

  if (!response.ok) {
    return [];
  }

  const json =
    (await response.json()) as ShopifySearchResponse;

  if (json.errors) {
    return [];
  }

  return (
    json.data?.products.nodes.map(
      (product) => ({
        id: product.id,
        title: product.title,
        handle: product.handle,
        vendor: product.vendor,

        image:
          product.featuredImage
            ?.url ?? null,

        price: formatPrice(
          product.priceRange
            .minVariantPrice.amount,

          product.priceRange
            .minVariantPrice
            .currencyCode,
        ),
      }),
    ) ?? []
  );
}