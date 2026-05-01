import HeaderMobileCattleya from "@/components/mobile/cattleya/header/HeaderMobileCattleya";
import { getShopifyMenu } from "@/lib/shopify/server/getShopifyMenu";

type LayoutMobileProps = {
  children: React.ReactNode;
};

export default async function LayoutMobile({ children }: LayoutMobileProps) {
  const menuItems = await getShopifyMenu("main-menu");

  return (
    <div className="relative min-h-screen bg-white text-black">
      <HeaderMobileCattleya menuItems={menuItems} />
      <main className="min-h-screen">{children}</main>
    </div>
  );
}