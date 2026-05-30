import HeaderPC from "@/components/pc/header/HeaderPC";

export default function LayoutPC({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#080604] text-white">
      <HeaderPC />

      <div className="relative">
        {children}
      </div>
    </div>
  );
}