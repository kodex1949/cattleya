import { getProductByHandle } from "@/lib/shopify/products";

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const p = await getProductByHandle(handle);

  return <div>PC: {p?.title}</div>;
}