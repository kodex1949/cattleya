"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Handbag, MagnifyingGlass } from "phosphor-react";

import MobileMenuButton from "./MobileMenuButton";
import MobileMenuPanel from "./MobileMenuPanel";
import MobileSearchPanel from "./search/MobileSearchPanel";
import MobileCartPanel from "../cart/MobileCartPanel";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
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
    if (!menuOpen && !searchOpen && !cartOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, searchOpen, cartOpen]);

  useEffect(() => {
    async function refreshCartCount() {
      try {
        const response = await fetch("/api/cart", {
          cache: "no-store",
        });

        const data = (await response.json()) as {
          cart?: {
            totalQuantity?: number;
          } | null;
        };

        setCartCount(data.cart?.totalQuantity ?? 0);
      } catch {
        setCartCount(0);
      }
    }

    void refreshCartCount();

    window.addEventListener("cart:updated", refreshCartCount);

    return () => {
      window.removeEventListener("cart:updated", refreshCartCount);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "px-3 pt-3" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto flex h-[68px] items-center justify-between transition-all duration-500 ${
            scrolled
              ? "rounded-[22px] border border-black/[0.06] bg-[#f7f3ec]/86 px-3 text-black shadow-[0_18px_45px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : isDarkHeader
                ? "border-b border-white/[0.10] bg-black/[0.03] px-4 text-white backdrop-blur-[2px]"
                : "border-b border-black/[0.06] bg-[#f7f3ec]/35 px-4 text-black backdrop-blur-md"
          }`}
        >
          <div className="flex w-[82px] items-center justify-start">
            <MobileMenuButton
              open={menuOpen}
              dark={isDarkHeader}
              onClick={() => {
                setSearchOpen(false);
                setCartOpen(false);
                setMenuOpen((prev) => !prev);
              }}
            />
          </div>

          <Link
            href="/mobile"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(false);
              setCartOpen(false);
            }}
            className="relative text-[13px] font-medium uppercase tracking-[0.38em]"
          >
            CATTLEYA
          </Link>

          <div className="flex w-[82px] items-center justify-end gap-1.5">
            <button
              type="button"
              aria-label="Ouvrir la recherche"
              onClick={() => {
                setMenuOpen(false);
                setCartOpen(false);
                setSearchOpen(true);
              }}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 active:scale-95 ${
                isDarkHeader
                  ? "border-white/12 bg-white/[0.06] text-white"
                  : "border-black/[0.08] bg-white/50 text-black"
              }`}
            >
              <MagnifyingGlass size={16} weight="thin" />
            </button>

            <button
              type="button"
              aria-label="Ouvrir le panier"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(false);
                setCartOpen(true);
              }}
              className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 active:scale-95 ${
                isDarkHeader
                  ? "border-white/12 bg-white/[0.06] text-white"
                  : "border-black/[0.08] bg-white/50 text-black"
              }`}
            >
              <Handbag size={16} weight="thin" />

              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#d6bc91] px-1 text-[9px] font-semibold text-black shadow-[0_4px_12px_rgba(214,188,145,0.45)]">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <MobileSearchPanel
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <MobileCartPanel open={cartOpen} onClose={() => setCartOpen(false)} />

      <MobileMenuPanel
        open={menuOpen}
        menuItems={featuredItems}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        onClose={() => setMenuOpen(false)}
        onOpenSearch={() => {
          setMenuOpen(false);
          setCartOpen(false);
          setSearchOpen(true);
        }}
      />
    </>
  );
}