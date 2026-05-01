export default function HeaderPC() {
  return (
    <header className="h-20 border-b border-black/10 px-8 flex items-center justify-between">
      <div className="text-sm font-medium tracking-[0.28em] uppercase">
        Cattleya
      </div>

      <nav className="flex items-center gap-8 text-xs uppercase tracking-[0.18em]">
        <a href="/pc">Accueil</a>
        <a href="/pc/collection/parfums">Parfums</a>
      </nav>
    </header>
  );
}