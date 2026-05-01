import { createStorefrontApiClient } from "@shopify/storefront-api-client";
export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2024-10",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN!,
});
