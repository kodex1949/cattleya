import type { CollectionProduct } from "../collection.types";

import CollectionProductCard from "./CollectionProductCard";

type CollectionGridProps = {
  products: CollectionProduct[];
};

export default function CollectionGrid({
  products,
}: CollectionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 px-5 pb-14 pt-10">
      {products.map((product, index) => (
        <CollectionProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
}