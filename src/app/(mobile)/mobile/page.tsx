export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import HeroMobileCattleya from "@/components/mobile/cattleya/hero/HeroMobileCattleya";
import ManifestMobileCattleya from "@/components/mobile/cattleya/manifest/ManifestMobileCattleya";
import SignatureMobileCattleya from "@/components/mobile/cattleya/home/SignatureMobileCattleya";
import CategoriesAccordionMobileCattleya from "@/components/mobile/cattleya/home/CategoriesAccordionMobileCattleya";
import FeatureProductMobileCattleya from "@/components/mobile/cattleya/home/FeatureProductMobileCattleya";
import FooterMobileCattleya from "@/components/mobile/cattleya/footer/FooterMobileCattleya";
import MobileScrollReveal from "@/components/mobile/cattleya/animations/MobileScrollReveal";

import { getActiveHeroContent } from "@/lib/cattleya/hero/get-active-hero-content";
import { getMemberExclusive } from "@/lib/cattleya/member/get-member-exclusive";
import { getHomeCategories } from "@/lib/cattleya/categories/get-home-categories";

import { mapProductToManifest } from "@/lib/shopify/mappers/mapProductToManifest";
import { getCollectionProducts } from "@/lib/shopify/queries/getCollectionProducts";

type ManifestProduct = ReturnType<typeof mapProductToManifest>;

export default async function MobilePage() {
  const [
    hero,
    memberExclusive,
    shopifyResult,
    homeCategoriesResult,
  ] = await Promise.allSettled([
    getActiveHeroContent(),
    getMemberExclusive(),
    getCollectionProducts("manifest", 8),
    getHomeCategories(),
  ]);

  const heroData =
    hero.status === "fulfilled" ? hero.value : null;

  const memberExclusiveData =
    memberExclusive.status === "fulfilled"
      ? memberExclusive.value
      : null;

  const manifestProducts: ManifestProduct[] =
    shopifyResult.status === "fulfilled"
      ? shopifyResult.value.map(mapProductToManifest)
      : [];

  const categories =
    homeCategoriesResult.status === "fulfilled"
      ? homeCategoriesResult.value
      : [];

  const errorMessage =
    shopifyResult.status === "rejected"
      ? shopifyResult.reason instanceof Error
        ? shopifyResult.reason.message
        : "Erreur Shopify inconnue"
      : null;

  return (
    <>
      {heroData ? (
        <HeroMobileCattleya data={heroData} />
      ) : (
        <div className="px-5 py-10 text-sm text-neutral-500">
          Aucun hero actif trouvé dans Supabase.
        </div>
      )}

      <MobileScrollReveal>
        {errorMessage ? (
          <div className="px-5 py-10 text-red-600">
            {errorMessage}
          </div>
        ) : (
          <ManifestMobileCattleya
            products={manifestProducts}
          />
        )}
      </MobileScrollReveal>

      <MobileScrollReveal>
        <SignatureMobileCattleya
          media={
            memberExclusiveData
              ? {
                  type: memberExclusiveData.media_type,
                  url: memberExclusiveData.media_url,
                  alt: "Exclusivité membres Cattleya",
                }
              : null
          }
        />
      </MobileScrollReveal>

      <MobileScrollReveal>
        <CategoriesAccordionMobileCattleya
          categories={categories}
        />
      </MobileScrollReveal>

      {manifestProducts[0] && (
        <MobileScrollReveal>
          <FeatureProductMobileCattleya
            product={manifestProducts[0]}
          />
        </MobileScrollReveal>
      )}

      <MobileScrollReveal>
        <FooterMobileCattleya />
      </MobileScrollReveal>
    </>
  );
}