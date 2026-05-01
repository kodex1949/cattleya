import Link from "next/link";

export default function HeaderPC() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-black/10 px-8">
      <Link href="/pc" className="text-sm font-medium uppercase tracking-[0.28em]">
        Cattleya
      </Link>

      <nav className="flex items-center gap-8 text-xs uppercase tracking-[0.18em]">
        <Link href="/pc">Accueil</Link>
        <Link href="/pc/collection/parfums">Parfums</Link>
      </nav>
    </header>
  );
}