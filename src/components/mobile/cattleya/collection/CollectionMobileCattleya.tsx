import CollectionEmptyState from "./components/CollectionEmptyState";
import CollectionFilterBar from "./components/CollectionFilterBar";
import CollectionGrid from "./components/CollectionGrid";
import CollectionHeader from "./components/CollectionHeader";

import type { CollectionData } from "./collection.types";

type CollectionMobileCattleyaProps = {
  collection: CollectionData | null;
};

export default function CollectionMobileCattleya({
  collection,
}: CollectionMobileCattleyaProps) {
  if (!collection) {
    return (
      <main className="min-h-screen bg-white">
        <CollectionEmptyState />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <CollectionHeader
        title={collection.title}
        description={collection.description}
      />

      <CollectionFilterBar />

      {collection.products.length > 0 ? (
        <CollectionGrid
          products={collection.products}
        />
      ) : (
        <CollectionEmptyState />
      )}
    </main>
  );
}