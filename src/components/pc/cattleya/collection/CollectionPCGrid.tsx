import CollectionPCCard from "./CollectionPCCard";
import CollectionPCEditorialBlock from "./CollectionPCEditorialBlock";

import type { CollectionEditorialBlock } from "@/lib/cattleya/collection/get-collection-editorial-blocks";

type Product = {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string;
};

type CollectionPCGridProps = {
  products: Product[];
  editorialBlocks: CollectionEditorialBlock[];
};

export default function CollectionPCGrid({
  products,
  editorialBlocks,
}: CollectionPCGridProps) {
  const firstBlock = editorialBlocks[0];

  return (
    <section className="bg-[#f4eee5] px-8 py-8">
      <div
        data-collection-grid
        className="grid grid-cols-4 gap-[1px] bg-black/10"
      >
        {products.map((product, index) => (
          <div key={product.id} className="contents">
            <CollectionPCCard product={product} />

            {index === 1 && firstBlock ? (
              <CollectionPCEditorialBlock block={firstBlock} />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}