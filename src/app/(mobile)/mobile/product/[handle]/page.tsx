import { getProductByHandle } from "@/lib/shopify/server/getProductByHandle";
import ProductMobileCattleya from "@/components/mobile/cattleya/product/ProductMobileCattleya";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const product = await getProductByHandle(handle);

  if (!product) return <div className="p-5">Produit introuvable</div>;

  return <ProductMobileCattleya product={product} />;
}