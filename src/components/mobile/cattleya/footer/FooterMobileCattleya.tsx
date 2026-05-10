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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_0%,rgba(214,188,145,0.16),transparent_62%)]" />

      <div className="relative mx-auto max-w-[430px]">
        <div className="border-t border-white/10 pt-10">
          <p className="text-[9px] uppercase tracking-[0.48em] text-[#d6bc91]/60">
            Maison Cattleya
          </p>

          <h2 className="mt-6 font-serif text-[58px] font-light leading-[0.82] tracking-[-0.105em]">
            L’art du sillage.
          </h2>

          <p className="mt-7 max-w-[310px] text-[14px] font-light leading-7 text-white/50">
            Parfums, rituels et objets d’ambiance pensés pour prolonger chaque
            instant avec justesse.
          </p>
        </div>

        <div className="mt-14 border-t border-white/10 pt-9">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/28">
            Collections
          </p>

          <div className="mt-6">
            {collections.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between border-b border-white/[0.08] py-5"
              >
                <span className="font-serif text-[30px] font-light tracking-[-0.07em] text-white/82">
                  {item.label}
                </span>

                <span className="text-[10px] uppercase tracking-[0.24em] text-[#d6bc91]/44">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 border-t border-white/10 pt-9">
          <div>
            <p className="text-[9px] uppercase tracking-[0.38em] text-white/28">
              Services
            </p>

            <div className="mt-6 space-y-4">
              {services.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-[13px] font-light text-white/52"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.38em] text-white/28">
              Social
            </p>

            <div className="mt-6 space-y-4">
              {["Instagram", "TikTok"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="flex items-center justify-between text-[13px] font-light text-white/52"
                >
                  {item}
                  <ArrowUpRight size={13} weight="thin" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-9">
          <p className="text-[9px] uppercase tracking-[0.38em] text-white/28">
            Lettre privée
          </p>

          <div className="mt-7 border-b border-white/14 pb-5">
            <p className="font-serif text-[28px] font-light leading-[1.02] tracking-[-0.07em] text-white/84">
              Recevoir les nouvelles signatures et éditions limitées.
            </p>

            <Link
              href="/mobile/account"
              className="mt-7 flex items-center justify-between"
            >
              <span className="text-[13px] font-light text-white/36">
                Votre email
              </span>

              <span className="text-[10px] uppercase tracking-[0.28em] text-[#d6bc91]/70">
                S’inscrire
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <p className="font-serif text-[54px] uppercase leading-none tracking-[0.18em] text-white">
            Cattleya
          </p>

          <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/26">
              © 2026
            </p>

            <p className="max-w-[135px] text-right text-[10px] uppercase leading-5 tracking-[0.2em] text-white/26">
              Paris — fragrance rituals
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}