import Link from "next/link";

export default function HeaderPC() {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b border-black/10 bg-white px-8">
      <Link href="/pc" className="text-sm font-medium uppercase tracking-[0.28em]">
        CATTLEYA
      </Link>

      <nav className="flex items-center gap-8 text-xs uppercase tracking-[0.18em]">
        <Link href="/pc">Accueil</Link>
        <Link href="/pc/collection/parfums">Parfums</Link>
      </nav>
    </header>
  );
}