export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { notFound } from "next/navigation";
import ProductPCCattleya from "@/components/pc/cattleya/product/ProductPCCattleya";
import { getProductByHandle } from "@/lib/shopify/product/get-product-by-handle";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return <ProductPCCattleya product={product} />;
}