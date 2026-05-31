"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "phosphor-react";
import { AnimatePresence, motion } from "framer-motion";

import type { ShopifyMenuItem } from "@/lib/shopify/menu/get-shopify-menu";

import HeaderPCActions from "./HeaderPCActions";
import HeaderPCLogo from "./HeaderPCLogo";
import SearchPCOverlay from "@/components/pc/search/SearchPCOverlay";
import CartPCPanel from "@/components/pc/cattleya/cart/CartPCPanel";

type HeaderPCClientProps = {
  menuItems: ShopifyMenuItem[];
};

export default function HeaderPCClient({ menuItems }: HeaderPCClientProps) {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeItem, setActiveItem] = useState<ShopifyMenuItem | null>(
    menuItems[0] ?? null,
  );

  const [activeChild, setActiveChild] = useState<ShopifyMenuItem | null>(null);

  const isHomePage = pathname === "/pc" || pathname === "/pc/";

  const previewTarget = activeChild ?? activeItem;

  const previewImage =
    previewTarget?.image?.url ??
    activeItem?.image?.url ??
    menuItems[0]?.image?.url ??
    null;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparentHeader = isHomePage && !scrolled && !menuOpen;
  const forceColor = transparentHeader ? "white" : "black";

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          transparentHeader
            ? "bg-transparent text-white"
            : "border-b border-black/10 bg-white text-black shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
        }`}
      >
        <div
          className={`mx-auto grid w-full max-w-[1900px] grid-cols-[1fr_auto_1fr] items-center px-12 transition-all duration-500 ${
            transparentHeader ? "h-[92px]" : "h-[74px]"
          }`}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.36em] text-current/80 transition-opacity hover:opacity-60"
          >
            <List size={18} />
            Menu
          </button>

          <HeaderPCLogo forceColor={forceColor} />

          <HeaderPCActions
            forceColor={forceColor}
            onSearchOpen={() => setSearchOpen(true)}
            onCartOpen={() => setCartOpen(true)}
            onAccountOpen={() => {}}
          />
        </div>
      </header>

      <AnimatePresence mode="wait">
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[90] overflow-hidden bg-[#120d08] text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex h-[92px] items-center justify-between px-12">
              <p className="text-[10px] uppercase tracking-[0.42em] text-white/45">
                Maison Cattleya
              </p>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 text-[10px] uppercase tracking-[0.36em] text-white/70 transition-opacity hover:opacity-60"
              >
                Fermer
                <X size={18} />
              </button>
            </div>

            <div className="grid h-[calc(100vh-92px)] grid-cols-[1fr_1fr]">
              <div className="flex flex-col justify-center px-16">
                <nav className="space-y-5">
                  {menuItems.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveItem(item);
                        setActiveChild(null);
                      }}
                      className="group flex items-end gap-8 text-left"
                    >
                      <span className="mb-4 text-[11px] text-white/28">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-serif text-[86px] font-light leading-[0.9] tracking-[-0.09em] text-white/60 transition-colors group-hover:text-white">
                        {item.title}
                      </span>

                      <span className="mb-6 h-px w-0 bg-white/40 transition-all duration-500 group-hover:w-20" />
                    </button>
                  ))}
                </nav>
              </div>

              <div className="relative overflow-hidden border-l border-white/10 bg-[#17110b]">
                {previewImage ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={previewImage}
                      src={previewImage}
                      alt={
                        previewTarget?.image?.altText ??
                        previewTarget?.title ??
                        ""
                      }
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 0.32, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/85" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,185,135,0.22),transparent_40%)]" />

                <div className="relative z-10 flex h-full flex-col justify-between p-12">
                  <div>
                    <p className="mb-8 text-[10px] uppercase tracking-[0.42em] text-white/38">
                      Sélection
                    </p>

                    <h2 className="max-w-[520px] font-serif text-[72px] font-light leading-[0.88] tracking-[-0.085em]">
                      {previewTarget?.title ?? "Cattleya"}
                    </h2>
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-[1px] bg-white/10">
                      {(activeItem?.items ?? []).slice(0, 6).map((child) => {
                        const hasSubLinks = child.items.length > 0;
                        const active = activeChild?.id === child.id;

                        return (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => {
                              if (hasSubLinks) {
                                setActiveChild(child);
                                return;
                              }

                              window.location.href = child.href;
                            }}
                            className={`min-h-[92px] px-6 py-5 text-left transition-colors ${
                              active
                                ? "bg-white text-black"
                                : "bg-[#17110b]/85 text-white hover:bg-white hover:text-black"
                            }`}
                          >
                            <p className="text-[11px] uppercase tracking-[0.26em]">
                              {child.title}
                            </p>

                            {hasSubLinks ? (
                              <p className="mt-3 text-[11px] opacity-45">
                                Voir les sous-collections
                              </p>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      {activeChild && activeChild.items.length > 0 ? (
                        <motion.div
                          key={activeChild.id}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 18 }}
                          transition={{
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mt-8 border border-white/10 bg-[#120d08]/70 p-6"
                        >
                          <p className="mb-5 text-[10px] uppercase tracking-[0.36em] text-white/35">
                            {activeChild.title}
                          </p>

                          <div className="grid grid-cols-2 gap-3">
                            {activeChild.items.map((subChild) => (
                              <Link
                                key={subChild.id}
                                href={subChild.href}
                                onClick={() => setMenuOpen(false)}
                                className="border border-white/10 px-5 py-4 text-[12px] text-white/55 transition-all hover:border-white/30 hover:bg-white hover:text-black"
                              >
                                {subChild.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchPCOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <CartPCPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}