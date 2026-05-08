"use client";

import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";

const collections = [
  { label: "Parfums", href: "/mobile/collection/parfums" },
  { label: "Maison", href: "/mobile/collection/maison" },
  { label: "Bougies", href: "/mobile/collection/bougies" },
  { label: "Coffrets", href: "/mobile/collection/coffrets" },
];

const services = [
  { label: "Livraison", href: "/mobile/services/livraison" },
  { label: "Retours", href: "/mobile/services/retours" },
  { label: "Contact", href: "/mobile/contact" },
  { label: "Compte", href: "/mobile/account" },
];

export default function FooterMobileCattleya() {
  return (
    <footer className="relative overflow-hidden bg-[#080706] px-5 pb-32 pt-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%)]" />

      <div className="relative border-t border-white/10 pt-10">
        <p className="text-[10px] uppercase tracking-[0.56em] text-white/34">
          Maison Cattleya
        </p>

        <h2 className="mt-6 max-w-[350px] text-[56px] font-light leading-[0.82] tracking-[-0.105em]">
          L’art du sillage.
        </h2>

        <p className="mt-6 max-w-[305px] text-[14px] font-light leading-7 text-white/52">
          Parfums, rituels et objets d’ambiance pensés pour prolonger chaque
          instant avec justesse.
        </p>
      </div>

      <div className="relative mt-14 border-t border-white/10 pt-10">
        <div className="grid grid-cols-[1fr_auto] gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.38em] text-white/30">
              Collections
            </p>

            <div className="mt-6 space-y-5">
              {collections.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border-b border-white/8 pb-4"
                >
                  <span className="text-[18px] font-light tracking-[-0.045em] text-white/76">
                    {item.label}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/28">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-[0.42em] text-white/24 [writing-mode:vertical-rl]">
            Collections
          </p>
        </div>
      </div>

      <div className="relative mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.36em] text-white/30">
            Services
          </p>

          <div className="mt-6 space-y-4">
            {services.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-[13px] font-light text-white/58"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.36em] text-white/30">
            Social
          </p>

          <div className="mt-6 space-y-4">
            <Link
              href="#"
              className="flex items-center justify-between text-[13px] font-light text-white/58"
            >
              Instagram
              <ArrowUpRight size={13} />
            </Link>

            <Link
              href="#"
              className="flex items-center justify-between text-[13px] font-light text-white/58"
            >
              TikTok
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mt-14 border-t border-white/10 pt-10">
        <p className="text-[10px] uppercase tracking-[0.36em] text-white/30">
          Lettre privée
        </p>

        <div className="mt-7 border-b border-white/16 pb-4">
          <p className="text-[24px] font-light leading-[1.05] tracking-[-0.06em] text-white/82">
            Recevoir les nouvelles signatures, les éditions limitées et les
            rituels de la maison.
          </p>

          <div className="mt-7 flex items-center justify-between">
            <span className="text-[13px] font-light text-white/38">
              Votre email
            </span>

            <span className="text-[10px] uppercase tracking-[0.28em] text-white/68">
              S’inscrire
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-16">
        <p className="text-[42px] uppercase leading-none tracking-[0.32em] text-white">
          CATTLEYA
        </p>

        <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/28">
            © 2026
          </p>

          <p className="max-w-[135px] text-right text-[10px] uppercase leading-5 tracking-[0.2em] text-white/28">
            Paris — fragrance rituals
          </p>
        </div>
      </div>
    </footer>
  );
}