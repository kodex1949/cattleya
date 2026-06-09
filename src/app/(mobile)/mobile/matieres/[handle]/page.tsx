export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { notFound } from "next/navigation";

import MaterialCollectionHeroMobile from "@/components/mobile/cattleya/materials/MaterialCollectionHeroMobile";
import MaterialProductsMobile from "@/components/mobile/cattleya/materials/MaterialProductsMobile";
import RelatedMaterialsMobile from "@/components/mobile/cattleya/materials/RelatedMaterialsMobile";

import { getCattleyaMaterialByHandle } from "@/lib/cattleya/materials/get-cattleya-material-by-handle";

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function MaterialPage({ params }: PageProps) {
  const { handle } = await params;

  const material = await getCattleyaMaterialByHandle(handle);

  if (!material) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080604] text-white">
      <MaterialCollectionHeroMobile handle={material.handle} />

      <MaterialProductsMobile handle={material.handle} />

      <RelatedMaterialsMobile currentHandle={material.handle} />
    </main>
  );
}