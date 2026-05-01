import { shopifyClient } from "./client";
import { GET_PRODUCT_BY_HANDLE } from "./queries";
export async function getProductByHandle(handle: string) {
  const res = await shopifyClient.request(GET_PRODUCT_BY_HANDLE, { variables: { handle } });
  return res.data.product;
}
