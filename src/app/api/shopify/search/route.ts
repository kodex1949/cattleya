import { NextResponse } from "next/server";

const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;

const query = `
query SearchProducts($query: String!) {
  products(first: 12, query: $query) {
    nodes {
      id
      title
      handle
      vendor
      productType

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("q");

  if (!search) {
    return NextResponse.json({
      products: [],
    });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_TOKEN || "",
      },

      body: JSON.stringify({
        query,

        variables: {
          query: search,
        },
      }),

      cache: "no-store",
    });

    const json = await response.json();

    const products =
      json?.data?.products?.nodes ?? [];

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        products: [],
      },
      {
        status: 500,
      }
    );
  }
}