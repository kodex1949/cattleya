import Link from "next/link";
import { Plus } from "phosphor-react";

import { footerTopCards } from "./footer.data";

export default function FooterTopCards() {
  return (
    <div className="grid grid-cols-3 border-b border-black/12 pb-6">
      {footerTopCards.map((card, index) => (
        <Link
          key={card.title}
          href={card.href}
          className={[
            "group relative flex min-h-[96px] items-start justify-between overflow-hidden transition",
            index === 0 &&
              "border-r border-black/12 pr-8",
            index === 1 &&
              "border-r border-black/12 px-8",
            index === 2 && "pl-8",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="relative z-[2]">
            <h3 className="text-[15px] font-semibold tracking-[-0.02em]">
              {card.title}
            </h3>

            <p className="mt-1 max-w-[520px] text-[15px] leading-[1.35] text-black/80">
              {card.text}
            </p>
          </div>

          <div className="relative z-[2] flex pt-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] transition-all duration-500 group-hover:border-black/20 group-hover:bg-black group-hover:text-white">
              <Plus
                size={18}
                weight="regular"
                className="transition-all duration-500 group-hover:rotate-90"
              />
            </span>
          </div>

          <div className="absolute inset-0 bg-black/[0.02] opacity-0 transition duration-500 group-hover:opacity-100" />
        </Link>
      ))}
    </div>
  );
}