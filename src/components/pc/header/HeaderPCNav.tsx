import type { ShopifyMenuItem } from "@/lib/shopify/menu/get-shopify-menu";
import HeaderPCMegaItem from "./HeaderPCMegaItem";

type HeaderPCNavProps = {
  items: ShopifyMenuItem[];
  hovered: string | null;
  setHovered: (value: string | null) => void;
};

export default function HeaderPCNav({
  items,
  hovered,
  setHovered,
}: HeaderPCNavProps) {
  const safeItems = items ?? [];

  return (
    <nav className="flex items-center gap-9">
      {safeItems.map((item) => (
        <HeaderPCMegaItem
          key={item.id}
          item={item}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </nav>
  );
}