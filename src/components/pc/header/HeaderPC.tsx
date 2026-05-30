import { getShopifyMenu } from "@/lib/shopify/menu/get-shopify-menu";

import HeaderPCClient from "./HeaderPCClient";

export default async function HeaderPC() {
  const menuItems =
    await getShopifyMenu("main-menu");

  return (
    <HeaderPCClient
      menuItems={menuItems}
    />
  );
}