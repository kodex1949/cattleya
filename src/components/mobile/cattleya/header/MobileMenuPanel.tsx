"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaretDown,
  MagnifyingGlass,
  User,
  Handbag,
  X,
  ArrowUpRight,
} from "phosphor-react";

import type { ShopifyMenuItem } from "@/lib/shopify/types";

type MobileMenuPanelProps = {
  open: boolean;
  menuItems: ShopifyMenuItem[];
  openItemId: string | null;
  setOpenItemId: (id: string | null) => void;
  onClose: () => void;
  onOpenSearch: () => void;
};

function resolveMobileMenuHref(url?: string | null) {
  if (!url) return "/mobile";

  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;

    if (path.startsWith("/collections/")) {
      const handle = path.split("/collections/")[1]?.split("/")[0];
      return handle ? `/mobile/collection/${handle}` : "/mobile";
    }

    if (path.startsWith("/products/")) {
      const handle = path.split("/products/")[1]?.split("/")[0];
      return handle ? `/mobile/product/${handle}` : "/mobile";
    }

    return path || "/mobile";
  } catch {
    if (url.startsWith("/collections/")) {
      const handle = url.split("/collections/")[1]?.split("/")[0];
      return handle ? `/mobile/collection/${handle}` : "/mobile";
    }

    if (url.startsWith("/products/")) {
      const handle = url.split("/products/")[1]?.split("/")[0];
      return handle ? `/mobile/product/${handle}` : "/mobile";
    }

    return url;
  }
}

export default function MobileMenuPanel({
  open,
  menuItems,
  openItemId,
  setOpenItemId,
  onClose,
  onOpenSearch,
}: MobileMenuPanelProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Fermer le menu"
          />

          <motion.aside
            className="fixed inset-x-3 top-[86px] z-50 max-h-[calc(100dvh-104px)] overflow-hidden rounded-[30px] border border-white/10 bg-[#0c0b09] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6bc91]/70 to-transparent" />

              <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#d6bc91]/10 blur-3xl" />

              <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
            </div>

            <div className="relative flex max-h-[calc(100dvh-104px)] flex-col overflow-hidden px-5 pb-5 pt-5">
              <header className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.42em] text-[#d6bc91]/70">
                    Maison Cattleya
                  </p>

                  <h2 className="mt-2 font-serif text-[36px] font-light leading-[0.9] tracking-[-0.08em]">
                    Menu
                  </h2>

                  <p className="mt-3 max-w-[235px] text-[12px] font-light leading-5 text-white/42">
                    Collections, signatures et rituels de la maison.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition active:scale-95"
                  aria-label="Fermer le menu"
                >
                  <X size={16} weight="thin" />
                </button>
              </header>

              <nav className="mt-6 flex-1 overflow-y-auto pr-1">
                {menuItems.length > 0 ? (
                  <div className="border-t border-white/10">
                    {menuItems.map((item, index) => {
                      const hasChildren =
                        Array.isArray(item.items) && item.items.length > 0;

                      const isOpen = openItemId === item.id;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04 }}
                          className="border-b border-white/10"
                        >
                          <div className="flex items-center gap-4 py-5">
                            <span className="w-7 shrink-0 text-[10px] uppercase tracking-[0.24em] text-[#d6bc91]/48">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <Link
                              href={resolveMobileMenuHref(item.url)}
                              onClick={() => {
                                if (!hasChildren) onClose();
                              }}
                              className="min-w-0 flex-1 font-serif text-[31px] font-light leading-none tracking-[-0.07em] text-white"
                            >
                              {item.title}
                            </Link>

                            {hasChildren ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenItemId(isOpen ? null : item.id)
                                }
                                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.035]"
                                aria-label={`Ouvrir ${item.title}`}
                              >
                                <motion.span
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.24 }}
                                >
                                  <CaretDown size={15} weight="thin" />
                                </motion.span>
                              </button>
                            ) : (
                              <ArrowUpRight
                                size={15}
                                weight="thin"
                                className="shrink-0 text-white/28"
                              />
                            )}
                          </div>

                          <AnimatePresence initial={false}>
                            {hasChildren && isOpen ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.28,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pb-5 pl-11">
                                  {item.items?.map((child, childIndex) => (
                                    <Link
                                      key={child.id}
                                      href={resolveMobileMenuHref(child.url)}
                                      onClick={onClose}
                                      className="group flex items-center justify-between border-t border-white/[0.06] py-4 text-[11px] uppercase tracking-[0.22em] text-white/52 transition active:text-white"
                                    >
                                      <span>{child.title}</span>

                                      <span className="text-[10px] text-white/22 transition group-active:translate-x-1">
                                        {String(childIndex + 1).padStart(
                                          2,
                                          "0"
                                        )}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5">
                    <p className="font-serif text-[26px] font-light tracking-[-0.06em]">
                      Aucun menu trouvé.
                    </p>

                    <p className="mt-3 text-[12px] leading-5 text-white/44">
                      Connecte ton menu Shopify pour afficher tes collections.
                    </p>
                  </div>
                )}
              </nav>

              <footer className="mt-5 grid grid-cols-3 gap-2">
                <Link
                  href="/mobile/account"
                  onClick={onClose}
                  className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.035] px-2 py-4 transition active:scale-[0.96]"
                  aria-label="Compte"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <User
                      size={18}
                      weight="thin"
                      className="text-white/72"
                    />

                    <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
                      Compte
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="group relative overflow-hidden rounded-[20px] border border-[#d6bc91]/25 bg-[#d6bc91]/[0.08] px-2 py-4 transition active:scale-[0.96]"
                  aria-label="Recherche"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <MagnifyingGlass
                      size={18}
                      weight="thin"
                      className="text-[#d6bc91]"
                    />

                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#d6bc91]/70">
                      Recherche
                    </span>
                  </div>
                </button>

                <Link
                  href="/mobile/cart"
                  onClick={onClose}
                  className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.035] px-2 py-4 transition active:scale-[0.96]"
                  aria-label="Panier"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Handbag
                      size={18}
                      weight="thin"
                      className="text-white/72"
                    />

                    <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
                      Panier
                    </span>
                  </div>
                </Link>
              </footer>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}