import HeaderPC from "@/components/pc/header/HeaderPC";

export default function LayoutPC({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <HeaderPC />
      <div className="pt-20">{children}</div>
    </div>
  );
}