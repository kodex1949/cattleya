// src/components/pc/cattleya/footer/FooterEditorialPC.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const footerColumns = [
  {
    title: "Trouver un point de vente",
    links: [
      { label: "Boutiques Cattleya", href: "/pc/boutiques" },
      {
        label: "Nos parfums",
        href: "/pc/collection/manifest",
      },
    ],
  },
  {
    title: "Service client",
    links: [
      { label: "Contact", href: "/pc/contact" },
      {
        label: "Livraison",
        href: "/pc/services/livraison",
      },
      {
        label: "Retours",
        href: "/pc/services/retours",
      },
      { label: "FAQ", href: "/pc/faq" },
    ],
  },
  {
    title: "La Maison Cattleya",
    links: [
      {
        label: "Notre univers",
        href: "/pc/maison",
      },
      {
        label: "Les matières",
        href: "/pc/matieres",
      },
      {
        label: "Journal",
        href: "/pc/journal",
      },
      {
        label: "Accessoires",
        href: "/pc/accessoires",
      },
    ],
  },
  {
    title: "Légal",
    links: [
      {
        label: "Mentions légales",
        href: "/pc/legal",
      },
      {
        label: "Politique de vie privée",
        href: "/pc/confidentialite",
      },
      {
        label:
          "Conditions générales de vente",
        href: "/pc/cgv",
      },
      {
        label: "Sitemap",
        href: "/pc/sitemap",
      },
    ],
  },
];

const regions = [
  {
    title: "Europe",
    countries: [
      "France — Français",
      "Belgique — Français",
      "Suisse — Français",
      "Luxembourg — Français",
      "Italie — Italiano",
      "Espagne — Español",
      "Allemagne — Deutsch",
      "Royaume-Uni — English",
    ],
  },
  {
    title: "Moyen-Orient",
    countries: [
      "Émirats arabes unis — English",
      "Arabie Saoudite — English",
      "Qatar — English",
      "Koweït — English",
    ],
  },
  {
    title: "Amérique",
    countries: [
      "États-Unis — English",
      "Canada — English",
      "Canada — Français",
    ],
  },
];

export default function FooterEditorialPC() {
  const [highContrast, setHighContrast] =
    useState(false);

  const [regionOpen, setRegionOpen] =
    useState(false);

  const [selectedRegion, setSelectedRegion] =
    useState("France — Français");

  useEffect(() => {
    const savedValue =
      localStorage.getItem(
        "cattleya-high-contrast"
      ) === "true";

    const savedRegion =
      localStorage.getItem(
        "cattleya-region"
      ) ?? "France — Français";

    setHighContrast(savedValue);
    setSelectedRegion(savedRegion);

    document.documentElement.classList.toggle(
      "cattleya-high-contrast",
      savedValue
    );
  }, []);

  function toggleContrast() {
    const nextValue = !highContrast;

    setHighContrast(nextValue);

    localStorage.setItem(
      "cattleya-high-contrast",
      String(nextValue)
    );

    document.documentElement.classList.toggle(
      "cattleya-high-contrast",
      nextValue
    );
  }

  function selectRegion(country: string) {
    setSelectedRegion(country);

    localStorage.setItem(
      "cattleya-region",
      country
    );

    setRegionOpen(false);
  }

  return (
    <footer className="relative bg-[#d8d1c5] px-5 py-5 text-black">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px),
              linear-gradient(45deg, transparent 49.6%, black 50%, transparent 50.4%),
              linear-gradient(-45deg, transparent 49.6%, black 50%, transparent 50.4%)
            `,
            backgroundSize: "132px 132px",
          }}
        />
      </div>

      <div className="relative rounded-[6px] bg-[#f8f7f4] px-8 pb-6 pt-6">
        <div className="grid grid-cols-3 border-b border-black/12 pb-5">
          <FooterTopCard
            href="/pc/services"
            title="Avantages e-boutique"
            text="Livraison offerte pour les membres, échantillons et miniatures offerts."
            className="border-r border-black/12 pr-8"
          />

          <FooterTopCard
            href="/pc/membre"
            title="Offre Membre"
            text="Devenez membre et découvrez en avant-première les nouvelles éditions Cattleya."
            className="border-r border-black/12 px-8"
          />

          <FooterTopCard
            href="/pc/carte-cadeau"
            title="Carte Cadeau"
            text="Disponible en ligne et dans l’univers Cattleya."
            className="pl-8"
          />
        </div>

        <div className="grid grid-cols-[1.15fr_2fr] gap-14 py-10">
          <div>
            <p className="font-serif text-[20px] font-light tracking-[-0.04em]">
              Inscrivez-vous pour bénéficier de
              toutes les exclusivités
            </p>

            <form className="mt-7 flex max-w-[560px] gap-2">
              <input
                type="email"
                placeholder="Renseignez un e-mail"
                className="h-[52px] flex-1 rounded-[4px] border border-black/80 bg-transparent px-4 text-[13px] outline-none placeholder:text-black/60"
              />

              <button
                type="submit"
                className="h-[52px] rounded-[4px] bg-[#30363a] px-5 text-[13px] font-semibold text-white transition hover:bg-black"
              >
                Confirmer
              </button>
            </form>

            <button
              type="button"
              onClick={toggleContrast}
              aria-pressed={highContrast}
              className="mt-14 flex items-center gap-4 text-[13px] font-medium"
            >
              <span>
                Accessibilité : meilleur contraste
              </span>

              <span
                className={[
                  "relative h-6 w-11 rounded-full transition-all duration-300",
                  highContrast
                    ? "bg-black"
                    : "bg-[#30363a]",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300",
                    highContrast
                      ? "right-1"
                      : "left-1",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-10">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-7 font-serif text-[19px] font-light tracking-[-0.04em]">
                  {column.title}
                </h3>

                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] leading-[1.25] text-black/85 transition hover:text-black hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 items-end border-t border-black/10 pt-5">
          <div className="flex items-center gap-4 text-[13px]">
            <span>Suivez-nous :</span>

            <Link href="https://instagram.com">
              Instagram
            </Link>

            <Link href="https://tiktok.com">
              TikTok
            </Link>

            <Link href="https://pinterest.com">
              Pinterest
            </Link>
          </div>

          <div className="text-center font-serif text-[34px] leading-none tracking-[-0.07em]">
            CATTLEYA
          </div>

          <div className="relative justify-self-end">
            <button
              type="button"
              onClick={() => setRegionOpen(true)}
              className="group text-right text-[13px]"
              aria-expanded={regionOpen}
            >
              <span className="text-black/70 transition group-hover:text-black">
                {selectedRegion}
              </span>

              <span className="ml-2 inline-block text-[20px] transition group-hover:translate-x-1">
                ›
              </span>
            </button>
          </div>
        </div>
      </div>

      {regionOpen ? (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Fermer le panneau de région"
            onClick={() => setRegionOpen(false)}
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
          />

          <aside className="absolute right-5 top-5 flex h-[calc(100vh-40px)] w-[500px] flex-col overflow-hidden rounded-[10px] border border-white/25 bg-[#f7f2ea] text-black shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, black 1px, transparent 1px),
                    linear-gradient(to bottom, black 1px, transparent 1px)
                  `,
                  backgroundSize: "72px 72px",
                }}
              />
            </div>

            <div className="relative flex items-start justify-between border-b border-black/10 px-9 py-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-black/45">
                  Cattleya international
                </p>

                <h2 className="mt-4 font-serif text-[38px] font-light leading-[0.95] tracking-[-0.075em]">
                  Choisir votre pays
                </h2>

                <p className="mt-4 max-w-[340px] text-[13px] leading-[1.55] text-black/58">
                  Ajustez la langue, les services
                  et l’expérience de navigation
                  selon votre région.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setRegionOpen(false)
                }
                className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/45 text-[22px] transition duration-300 hover:border-black hover:bg-black hover:text-white"
                aria-label="Fermer"
              >
                <span className="transition duration-300 group-hover:rotate-90">
                  ×
                </span>
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-9 py-7">
              <div className="space-y-9">
                {regions.map((region) => (
                  <div key={region.title}>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-[10px] uppercase tracking-[0.28em] text-black/45">
                        {region.title}
                      </h3>

                      <span className="ml-5 h-px flex-1 bg-black/10" />
                    </div>

                    <div className="overflow-hidden rounded-[8px] border border-black/10 bg-white/35">
                      {region.countries.map(
                        (country) => {
                          const active =
                            selectedRegion ===
                            country;

                          return (
                            <button
                              key={country}
                              type="button"
                              onClick={() =>
                                selectRegion(
                                  country
                                )
                              }
                              className={[
                                "group flex w-full items-center justify-between px-5 py-4 text-left text-[14px] transition duration-300",
                                active
                                  ? "bg-black text-white"
                                  : "text-black/72 hover:bg-black/[0.045] hover:text-black",
                              ].join(" ")}
                            >
                              <span className="tracking-[-0.01em]">
                                {country}
                              </span>

                              <span
                                className={[
                                  "flex h-7 w-7 items-center justify-center rounded-full border text-[14px] transition duration-300",
                                  active
                                    ? "border-white/25 bg-white text-black"
                                    : "border-black/10 bg-white/40 text-black/35 group-hover:rotate-90 group-hover:border-black/20 group-hover:text-black",
                                ].join(" ")}
                              >
                                {active
                                  ? "✓"
                                  : "+"}
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative border-t border-black/10 bg-[#efe8dd]/80 px-9 py-5">
              <div className="flex items-center justify-between gap-6">
                <p className="max-w-[300px] text-[12px] leading-[1.45] text-black/50">
                  Votre préférence est
                  enregistrée sur cet appareil.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setRegionOpen(false)
                  }
                  className="rounded-full bg-black px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#30363a]"
                >
                  Valider
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </footer>
  );
}

function FooterTopCard({
  href,
  title,
  text,
  className,
}: {
  href: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex min-h-[86px] items-start justify-between overflow-hidden ${className ?? ""}`}
    >
      <div className="relative z-[2] pr-6">
        <h3 className="text-[15px] font-semibold tracking-[-0.02em]">
          {title}
        </h3>

        <p className="mt-1 max-w-[520px] text-[15px] leading-[1.35] text-black/80">
          {text}
        </p>
      </div>

      <span className="relative z-[2] mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-[22px] font-light leading-none transition-all duration-500 group-hover:rotate-90 group-hover:border-black group-hover:bg-black group-hover:text-white">
        +
      </span>

      <span className="absolute inset-0 bg-black/[0.025] opacity-0 transition duration-500 group-hover:opacity-100" />
    </Link>
  );
}