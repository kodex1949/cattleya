export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import CollectionPCHero from "@/components/pc/cattleya/collection/CollectionPCHero";
import CollectionPCFilters from "@/components/pc/cattleya/collection/CollectionPCFilters";
import CollectionPCGrid from "@/components/pc/cattleya/collection/CollectionPCGrid";
import CollectionPCMotion from "@/components/pc/cattleya/collection/CollectionPCMotion";

import { getCollection } from "@/lib/shopify/collection/get-collection";
import { getCollectionEditorialBlocks } from "@/lib/cattleya/collection/get-collection-editorial-blocks";

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function CollectionPage({
  params,
}: PageProps) {
  const { handle } = await params;

  const [collection, editorialBlocks] =
    await Promise.all([
      getCollection(handle),
      getCollectionEditorialBlocks(handle),
    ]);

  if (!collection) {
    return (
      <main className="min-h-screen bg-[#f4eee5] px-16 pt-40 text-black">
        <h1 className="font-serif text-[72px] font-light">
          Collection introuvable
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4eee5] text-black">
      <CollectionPCMotion>
        <CollectionPCHero
          title={collection.title}
          description={collection.description}
          image={collection.image}
        />

        <CollectionPCFilters
          total={collection.products.length}
        />

        <CollectionPCGrid
          products={collection.products}
          editorialBlocks={editorialBlocks}
        />
      </CollectionPCMotion>
    </main>
  );
}