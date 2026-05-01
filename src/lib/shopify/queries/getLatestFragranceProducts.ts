import "server-only";

import { shopifyServerFetch } from "@/lib/shopify/server-client";

type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

type ShopifyImageNode = {
  url: string;
  altText: string | null;
};

type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  productType: string;
  createdAt: string;
  featuredImage: ShopifyImageNode | null;
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
  };
};

type ShopifyProductsQueryResponse = {
  products: {
    edges: Array<{
      node: ShopifyProductNode;
    }>;
  };
};

const GET_LATEST_FRAGRANCE_PRODUCTS_QUERY = `
  query GetLatestFragranceProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          productType
          createdAt
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
  }
`;

function isFragranceProduct(product: ShopifyProductNode): boolean {
  const value = product.productType.trim().toLowerCase();

  return (
    value.includes("fragrance") ||
    value.includes("parfum") ||
    value.includes("perfume")
  );
}

export async function getLatestFragranceProducts(
  first = 8,
): Promise<ShopifyProductNode[]> {
  const data = await shopifyServerFetch<
    ShopifyProductsQueryResponse,
    { first: number }
  >({
    query: GET_LATEST_FRAGRANCE_PRODUCTS_QUERY,
    variables: { first: Math.max(first, 1) * 3 },
    cache: "no-store",
    revalidate: 0,
  });

  const allProducts = data.products.edges.map((edge) => edge.node);

  const fragranceProducts = allProducts
    .filter(isFragranceProduct)
    .filter((product) => Boolean(product.featuredImage?.url))
    .slice(0, first);

  return fragranceProducts;
}

export type { ShopifyProductNode };