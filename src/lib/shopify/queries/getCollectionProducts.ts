import "server-only";

import { shopifyServerFetch } from "@/lib/shopify/server-client";

type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

type ShopifyMetafield = {
  value: string | null;
};

type ShopifyProductVariantNode = {
  id: string;
  title: string;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

type ShopifyVideoSource = {
  url: string;
  mimeType: string | null;
  format: string | null;
};

type ShopifyProductMediaNode = {
  mediaContentType: string;
  sources?: ShopifyVideoSource[];
};

type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  media: {
    edges: Array<{
      node: ShopifyProductMediaNode;
    }>;
  };
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariantNode;
    }>;
  };
  manifestSubtitle: ShopifyMetafield | null;
  manifestTag: ShopifyMetafield | null;
};

type ShopifyCollectionProductsResponse = {
  collection: {
    products: {
      edges: Array<{
        node: ShopifyProductNode;
      }>;
    };
  } | null;
};

const GET_COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first, sortKey: CREATED, reverse: true) {
        edges {
          node {
            id
            title
            handle

            featuredImage {
              url
              altText
            }

            media(first: 5) {
              edges {
                node {
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
            }

            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }

            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }

            manifestSubtitle: metafield(namespace: "custom", key: "manifest_subtitle") {
              value
            }

            manifestTag: metafield(namespace: "custom", key: "manifest_tag") {
              value
            }
          }
        }
      }
    }
  }
`;

export async function getCollectionProducts(
  handle: string,
  first = 6,
): Promise<ShopifyProductNode[]> {
  const data = await shopifyServerFetch<
    ShopifyCollectionProductsResponse,
    { handle: string; first: number }
  >({
    query: GET_COLLECTION_PRODUCTS_QUERY,
    variables: {
      handle,
      first,
    },
    cache: "no-store",
    revalidate: 0,
  });

  if (!data.collection || !data.collection.products.edges.length) {
    return [];
  }

  return data.collection.products.edges
    .map((edge) => edge.node)
    .filter((product) => Boolean(product.featuredImage?.url));
}

export type { ShopifyProductNode };