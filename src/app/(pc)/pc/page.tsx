export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import HeroPC from "@/components/pc/hero/HeroPC";
import ManifestPCCattleya from "@/components/pc/cattleya/manifest/ManifestPCCattleya";
import MaisonCattleyaPC from "@/components/pc/cattleya/home/maison/MaisonCattleyaPC";
import MaterialsCattleyaPC from "@/components/pc/cattleya/home/materials/MaterialsCattleyaPC";
import EditorialCollectionPC from "@/components/pc/cattleya/home/editorial/EditorialCollectionPC";
import FooterEditorialPC from "@/components/pc/cattleya/footer/FooterEditorialPC";
import ScrollToTopPC from "@/components/pc/ui/ScrollToTopPC";

import { getActiveHeroPCContent } from "@/lib/cattleya/hero/pc/get-active-hero-pc-content";
import { getManifestProducts } from "@/lib/shopify/manifest/get-manifest-products";
import { getMaisonCattleya } from "@/lib/cattleya/maison/get-maison-cattleya";
import { getCattleyaMaterials } from "@/lib/cattleya/materials/get-cattleya-materials";
import { getEditorialCollection } from "@/lib/cattleya/editorial/get-editorial-collection";

export default async function PCHomePage() {
  const [
    hero,
    manifestProducts,
    maison,
    materials,
    editorialItems,
  ] = await Promise.all([
    getActiveHeroPCContent(),
    getManifestProducts(),
    getMaisonCattleya(),
    getCattleyaMaterials(),
    getEditorialCollection(),
  ]);

  return (
    <main className="min-h-screen bg-[#080604] text-white">
      {hero ? (
        <HeroPC data={hero} />
      ) : (
        <div className="flex min-h-screen items-center justify-center px-10 text-sm text-white/50">
          Aucun hero PC actif trouvé dans Supabase.
        </div>
      )}

      <ManifestPCCattleya products={manifestProducts} />

      <EditorialCollectionPC items={editorialItems} />

      {maison ? <MaisonCattleyaPC data={maison} /> : null}

      <MaterialsCattleyaPC materials={materials} />

      <FooterEditorialPC />

      <ScrollToTopPC />
    </main>
  );
}