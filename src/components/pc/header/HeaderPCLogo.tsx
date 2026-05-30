import Link from "next/link";

export default function HeaderPCLogo() {
  return (
    <Link
      href="/pc"
      className="text-center font-serif text-[28px] font-light uppercase tracking-[0.32em]"
    >
      Cattleya
    </Link>
  );
}