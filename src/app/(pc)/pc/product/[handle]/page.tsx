import { getProductByHandle } from "@/lib/shopify/products";
export default async function Page({ params }: { params: { handle: string } }) {
  const p = await getProductByHandle(params.handle);
  return <div>PC: {p?.title}</div>;
}
