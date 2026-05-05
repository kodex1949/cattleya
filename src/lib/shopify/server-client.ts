import "server-only";

type ShopifyFetchParams<TVariables = Record<string, unknown>> = {
  query: string;
  variables?: TVariables;
  cache?: RequestCache;
  revalidate?: number;
};

type ShopifyResponse<TData> = {
  data?: TData;
  errors?: Array<{
    message: string;
  }>;
};

export async function shopifyServerFetch<
  TData,
  TVariables = Record<string, unknown>
>({
  query,
  variables,
  cache = "no-store",
  revalidate = 0,
}: ShopifyFetchParams<TVariables>): Promise<TData> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

  if (!domain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN");
  }

  if (!token) {
    throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN");
  }

  const endpoint = `https://${domain}/api/2025-10/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache,
    next: {
      revalidate,
    },
  });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `Shopify Storefront request failed: ${response.status} ${response.statusText} - ${body}`
    );
  }

  const json = (await response.json()) as ShopifyResponse<TData>;

  if (json.errors?.length) {
    const message = json.errors.map((error) => error.message).join(" | ");
    throw new Error(`Shopify GraphQL error: ${message}`);
  }

  if (!json.data) {
    throw new Error("Shopify GraphQL returned no data");
  }

  return json.data;
}