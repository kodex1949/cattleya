import { shopifyServerFetch } from "@/lib/shopify/server-client";
import { mapCollectionProducts } from "./map-collection-products";

const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description

      image {
        url
        altText
      }

      products(first: 24) {
        nodes {
          id
          handle
          title
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

type ShopifyCollectionResponse = {
  collection: {
    id: string;
    title: string;
    description: string | null;
    image: {
      url: string;
      altText: string | null;
    } | null;
    products: {
      nodes: ShopifyProductNode[];
    };
  } | null;
};

export type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
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
};

export async function getCollection(handle: string) {
  const data = await shopifyServerFetch<ShopifyCollectionResponse>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: {
      handle,
    },
  });

  if (!data.collection) {
    return null;
  }

  return {
    id: data.collection.id,
    title: data.collection.title,
    description: data.collection.description,
    image: data.collection.image,
    products: mapCollectionProducts(data.collection.products.nodes),
  };
}