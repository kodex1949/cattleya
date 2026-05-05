"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown, Handbag, MagnifyingGlass } from "phosphor-react";
import MobileMenuButton from "./MobileMenuButton";
import type { ShopifyMenuItem } from "@/lib/shopify/types";

type HeaderAmbiance = "light" | "dark";

type HeaderMobileCattleyaProps = {
  menuItems?: ShopifyMenuItem[];
};

export default function HeaderMobileCattleya({
  menuItems = [],
}: HeaderMobileCattleyaProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [ambiance, setAmbiance] = useState<HeaderAmbiance>("dark");

  const featuredItems = useMemo(() => menuItems.slice(0, 6), [menuItems]);

  const isDarkHeader = !scrolled && ambiance === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleAmbiance(event: Event) {
      const customEvent = event as CustomEvent<HeaderAmbiance>;

      if (customEvent.detail === "light" || customEvent.detail === "dark") {
        setAmbiance(customEvent.detail);
      }
    }

    window.addEventListener("header:ambiance", handleAmbiance);

    return () => {
      window.removeEventListener("header:ambiance", handleAmbiance);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "px-3 pt-3" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto flex h-[70px] items-center justify-between transition-all duration-500 ${
            scrolled
              ? "rounded-[22px] border border-black/[0.06] bg-white/78 px-3 text-black shadow-[0_18px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
              : isDarkHeader
                ? "border-b border-white/[0.10] bg-black/5 px-4 text-white backdrop-blur-[2px]"
                : "border-b border-black/[0.06] bg-white/20 px-4 text-black backdrop-blur-md"
          }`}
        >
          <div className="flex w-[84px] items-center justify-start">
            <MobileMenuButton
              open={menuOpen}
              dark={isDarkHeader}
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          </div>

          <Link
            href="/mobile"
            onClick={() => setMenuOpen(false)}
            className="text-[14px] font-medium uppercase tracking-[0.32em]"
          >
            CATTLEYA
          </Link>

          <div className="flex w-[84px] items-center justify-end gap-2">
            <Link
              href="/mobile/search"
              aria-label="Search"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
                isDarkHeader
                  ? "border-white/15 bg-white/8 text-white"
                  : "border-black/[0.08] bg-white/60 text-black"
              }`}
            >
              <MagnifyingGlass size={16} weight="thin" />
            </Link>

            <Link
              href="/mobile/cart"
              aria-label="Cart"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
                isDarkHeader
                  ? "border-white/15 bg-white/8 text-white"
                  : "border-black/[0.08] bg-white/60 text-black"
              }`}
            >
              <Handbag size={16} weight="thin" />
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer le menu"
              className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              className="fixed inset-x-3 top-[86px] z-50 max-h-[calc(100dvh-104px)] overflow-y-auto rounded-[32px] border border-white/10 bg-[#0d0d0d] text-white shadow-[0_34px_90px_rgba(0,0,0,0.38)]"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden px-6 pb-8 pt-8">
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-4 h-44 w-44 rounded-full bg-[#c9b38c]/15 blur-3xl" />

                <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-white/42">
                  Menu Cattleya
                </p>

                <nav className="relative flex flex-col">
                  {featuredItems.length > 0 ? (
                    featuredItems.map((item, index) => {
                      const hasChildren =
                        Array.isArray(item.items) && item.items.length > 0;
                      const isOpen = openItemId === item.id;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.055 }}
                          className="border-b border-white/10"
                        >
                          <div className="flex items-end justify-between py-4">
                            <Link
                              href={item.url}
                              onClick={() => {
                                if (!hasChildren) setMenuOpen(false);
                              }}
                              className="min-w-0 flex-1 text-[30px] leading-[0.98] tracking-[-0.05em] text-white"
                            >
                              {item.title}
                            </Link>

                            {hasChildren ? (
                              <button
                                type="button"
                                aria-label={`Ouvrir ${item.title}`}
                                onClick={() =>
                                  setOpenItemId(isOpen ? null : item.id)
                                }
                                className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
                              >
                                <motion.span
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  <CaretDown size={15} weight="thin" />
                                </motion.span>
                              </button>
                            ) : (
                              <span className="mb-1 text-[10px] text-white/35">
                                0{index + 1}
                              </span>
                            )}
                          </div>

                          <AnimatePresence initial={false}>
                            {hasChildren && isOpen ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.32,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pb-5 pl-1">
                                  {item.items?.map((child, childIndex) => (
                                    <motion.div
                                      key={child.id}
                                      initial={{ opacity: 0, y: 6 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: childIndex * 0.04,
                                        duration: 0.24,
                                      }}
                                    >
                                      <Link
                                        href={child.url}
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center justify-between rounded-2xl px-1 py-3 text-[14px] uppercase tracking-[0.16em] text-white/58"
                                      >
                                        <span>{child.title}</span>
                                        <span className="text-[10px] text-white/25">
                                          0{childIndex + 1}
                                        </span>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-white/50">
                      Aucun menu Shopify trouvé
                    </p>
                  )}
                </nav>

                <div className="mt-7 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                    Signature
                  </p>
                  <p className="mt-3 max-w-[240px] text-[13px] leading-5 text-white/68">
                    Des parfums pensés comme des rituels. Élégants, profonds,
                    mémorables.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/52">
                  <Link href="/mobile/account" onClick={() => setMenuOpen(false)}>
                    Account
                  </Link>
                  <Link href="/mobile/search" onClick={() => setMenuOpen(false)}>
                    Search
                  </Link>
                  <Link href="/mobile/cart" onClick={() => setMenuOpen(false)}>
                    Cart
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}