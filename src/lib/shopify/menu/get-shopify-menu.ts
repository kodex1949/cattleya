import "server-only";

export type ShopifyMenuItem = {
  id: string;
  title: string;
  href: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
  items: ShopifyMenuItem[];
};

const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

const MENU_QUERY = `
  query MenuByHandle($handle: String!) {
    menu(handle: $handle) {
      items {
        id
        title
        url
        type
        resource {
          ... on Collection {
            image {
              url
              altText
            }
          }
        }
        items {
          id
          title
          url
          type
          resource {
            ... on Collection {
              image {
                url
                altText
              }
            }
          }
          items {
            id
            title
            url
            type
            resource {
              ... on Collection {
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

type ShopifyRawMenuItem = {
  id: string;
  title: string;
  url: string | null;
  type: string;
  resource?: {
    image?: {
      url: string;
      altText: string | null;
    } | null;
  } | null;
  items?: ShopifyRawMenuItem[];
};

type ShopifyMenuResponse = {
  data?: {
    menu: {
      items: ShopifyRawMenuItem[];
    } | null;
  };
  errors?: unknown;
};

function normalizeShopifyUrl(url: string | null) {
  if (!url) return "/pc";

  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;

    if (pathname.startsWith("/collections/")) {
      const handle = pathname.replace("/collections/", "");
      return `/pc/collection/${handle}`;
    }

    if (pathname.startsWith("/products/")) {
      const handle = pathname.replace("/products/", "");
      return `/pc/product/${handle}`;
    }

    if (pathname === "/") return "/pc";

    return `/pc${pathname}`;
  } catch {
    return url;
  }
}

function mapMenuItem(item: ShopifyRawMenuItem): ShopifyMenuItem {
  return {
    id: item.id,
    title: item.title,
    href: normalizeShopifyUrl(item.url),
    image: item.resource?.image ?? null,
    items: item.items?.map(mapMenuItem) ?? [],
  };
}

export async function getShopifyMenu(
  handle = "main-menu"
): Promise<ShopifyMenuItem[]> {
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
      query: MENU_QUERY,
      variables: { handle },
    }),
    cache: "no-store",
  });

  if (!response.ok) return [];

  const json = (await response.json()) as ShopifyMenuResponse;

  if (json.errors) {
    console.error("Shopify menu errors:", json.errors);
    return [];
  }

  return json.data?.menu?.items.map(mapMenuItem) ?? [];
}