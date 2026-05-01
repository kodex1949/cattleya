import HeaderMobileCattleya from "@/components/mobile/cattleya/header/HeaderMobileCattleya";

type LayoutMobileProps = {
  children: React.ReactNode;
};

export default function LayoutMobile({ children }: LayoutMobileProps) {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <HeaderMobileCattleya />

      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
}