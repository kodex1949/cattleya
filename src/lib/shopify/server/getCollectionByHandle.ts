import type { CollectionData } from "@/components/mobile/cattleya/collection/collection.types";

const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

type ShopifyCollectionResponse = {
  collection: {
    title: string;
    description: string | null;
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
        variants: {
          nodes: {
            title: string;
            selectedOptions: {
              name: string;
              value: string;
            }[];
          }[];
        };
      }[];
    };
  } | null;
};

const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      title
      description

      products(first: 24) {
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

          variants(first: 8) {
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

function getProductVariantValues(
  variants: ShopifyCollectionResponse["collection"]["products"]["nodes"][number]["variants"]
) {
  const values = variants.nodes
    .flatMap((variant) =>
      variant.selectedOptions.map((option) => option.value)
    )
    .filter(Boolean);

  return Array.from(new Set(values));
}

export async function getCollectionByHandle(
  handle: string
): Promise<CollectionData | null> {
  if (
    !process.env.SHOPIFY_STORE_DOMAIN ||
    !process.env.SHOPIFY_STOREFRONT_TOKEN
  ) {
    throw new Error("Missing Shopify environment variables");
  }

  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: COLLECTION_BY_HANDLE_QUERY,
      variables: { handle },
    }),
    cache: "no-store",
  });

  const json = (await response.json()) as {
    data?: ShopifyCollectionResponse;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "Shopify collection error");
  }

  const collection = json.data?.collection;

  if (!collection) return null;

  return {
    title: collection.title,
    description: collection.description,
    products: collection.products.nodes.map((product) => ({
      id: product.id,
      handle: product.handle,
      title: product.title,
      vendor: product.vendor,
      image: product.featuredImage?.url ?? "",
      price: product.priceRange.minVariantPrice,
      variants: getProductVariantValues(product.variants),
    })),
  };
}