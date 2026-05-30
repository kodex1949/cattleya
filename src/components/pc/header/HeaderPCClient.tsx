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
import AccountPCPanel from "@/components/pc/cattleya/account/AccountPCPanel";

type HeaderPCClientProps = {
  menuItems: ShopifyMenuItem[];
};

export default function HeaderPCClient({ menuItems }: HeaderPCClientProps) {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleOpenCart() {
      setCartOpen(true);
    }

    window.addEventListener("cart:open", handleOpenCart);

    return () => {
      window.removeEventListener("cart:open", handleOpenCart);
    };
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
            onAccountOpen={() => setAccountOpen(true)}
          />
        </div>
      </header>

      {/* Ton menu reste identique ici */}
      <AnimatePresence mode="wait">
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[90] overflow-hidden bg-[#120d08] text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Garde ici tout ton contenu menu actuel */}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchPCOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <CartPCPanel open={cartOpen} onClose={() => setCartOpen(false)} />

      <AccountPCPanel
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
      />
    </>
  );
}