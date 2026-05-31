import Link from "next/link";

type HeaderPCLogoProps = {
  forceColor?: string;
};

export default function HeaderPCLogo({
  forceColor = "black",
}: HeaderPCLogoProps) {
  return (
    <Link
      href="/pc"
      style={{ color: forceColor }}
      className="text-center font-serif text-[28px] font-light uppercase tracking-[0.32em] transition-colors duration-500"
    >
      Cattleya
    </Link>
  );
}