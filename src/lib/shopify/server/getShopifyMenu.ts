import { shopifyServerFetch } from "@/lib/shopify/server-client";

export type ShopifyMenuItem = {
  id: string;
  title: string;
  url: string;
  type?: string;
  items?: ShopifyMenuItem[];
};

type ShopifyMenuResponse = {
  menu: {
    items: ShopifyMenuItem[];
  } | null;
};

const GET_SHOPIFY_MENU = `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        id
        title
        url
        type
        items {
          id
          title
          url
          type
        }
      }
    }
  }
`;

function normalizeShopifyUrl(url: string) {
  try {
    const parsed = new URL(url);

    // collections
    if (parsed.pathname.startsWith("/collections/")) {
      return parsed.pathname;
    }

    // products → route mobile
    if (parsed.pathname.startsWith("/products/")) {
      const handle = parsed.pathname.replace("/products/", "");
      return `/mobile/product/${handle}`;
    }

    // pages
    if (parsed.pathname.startsWith("/pages/")) {
      return parsed.pathname;
    }

    // fallback
    return parsed.pathname || "/";
  } catch {
    return url;
  }
}

function mapItems(items: ShopifyMenuItem[]): ShopifyMenuItem[] {
  return items.map((item) => ({
    ...item,
    url: normalizeShopifyUrl(item.url),
    items: item.items ? mapItems(item.items) : undefined,
  }));
}

export async function getShopifyMenu(handle = "main-menu") {
  const data = await shopifyServerFetch<
    ShopifyMenuResponse,
    { handle: string }
  >({
    query: GET_SHOPIFY_MENU,
    variables: { handle },
    revalidate: 300,
  });

  if (!data.menu) {
    console.warn("Shopify menu not found:", handle);
    return [];
  }

  return mapItems(data.menu.items);
}