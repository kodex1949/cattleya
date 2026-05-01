export default function HeaderPC() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-8">
        <div>Menu</div>
        <div className="text-sm font-semibold uppercase tracking-[0.28em]">
          CATTLEYA
        </div>
        <div>Cart</div>
      </div>
    </header>
  );
}