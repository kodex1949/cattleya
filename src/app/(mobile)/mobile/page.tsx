import HeroMobileCattleya from "@/components/mobile/cattleya/hero/HeroMobileCattleya";
import ManifestMobileCattleya from "@/components/mobile/cattleya/manifest/ManifestMobileCattleya";
import SignatureMobileCattleya from "@/components/mobile/cattleya/home/SignatureMobileCattleya";
import VideoSectionMobileCattleya from "@/components/mobile/cattleya/home/VideoSectionMobileCattleya";
import FeatureProductMobileCattleya from "@/components/mobile/cattleya/home/FeatureProductMobileCattleya";

import { getActiveHeroContent } from "@/lib/cattleya/hero/get-active-hero-content";
import { mapProductToManifest } from "@/lib/shopify/mappers/mapProductToManifest";
import { getCollectionProducts } from "@/lib/shopify/queries/getCollectionProducts";

type ManifestProduct = ReturnType<typeof mapProductToManifest>;

export default async function MobilePage() {
  const hero = await getActiveHeroContent();

  let manifestProducts: ManifestProduct[] = [];
  let errorMessage: string | null = null;

  try {
    const shopifyProducts = await getCollectionProducts("manifest", 6);
    manifestProducts = shopifyProducts.map(mapProductToManifest);
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Erreur Shopify inconnue";
  }

  return (
    <>
      {/* HERO */}
      {hero ? (
        <HeroMobileCattleya data={hero} />
      ) : (
        <div className="px-5 py-10 text-sm text-neutral-500">
          Aucun hero actif trouvé dans Supabase.
        </div>
      )}

      {/* MANIFEST */}
      {errorMessage ? (
        <div className="px-5 py-10 text-red-600">{errorMessage}</div>
      ) : (
        <ManifestMobileCattleya products={manifestProducts} />
      )}

      {/* SIGNATURE */}
      <SignatureMobileCattleya />

      {/* VIDEO */}
      <VideoSectionMobileCattleya />

      {/* FEATURE PRODUCT */}
      <FeatureProductMobileCattleya
        product={manifestProducts[0]}
      />
    </>
  );
}