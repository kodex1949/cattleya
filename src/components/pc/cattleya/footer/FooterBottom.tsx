import Link from "next/link";
import { footerSocialLinks } from "./footer.data";

export default function FooterBottom() {
  return (
    <div className="grid grid-cols-3 items-end">
      <div className="flex items-center gap-4 text-[13px]">
        <span>Suivez-nous :</span>

        {footerSocialLinks.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="text-center font-serif text-[34px] leading-none tracking-[-0.07em]">
        CATTLEYA
      </div>

      <div className="text-right text-[13px]">
        France — Français <span className="ml-2 text-[20px]">›</span>
      </div>
    </div>
  );
}