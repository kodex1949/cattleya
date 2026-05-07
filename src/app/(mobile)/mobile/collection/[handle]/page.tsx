export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import CollectionMobileCattleya from "@/components/mobile/cattleya/collection/CollectionMobileCattleya";

import { getCollectionByHandle } from "@/lib/shopify/server/getCollectionByHandle";

type CollectionPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { handle } = await params;

  const collection =
    await getCollectionByHandle(handle);

  return (
    <CollectionMobileCattleya
      collection={collection}
    />
  );
}