"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  CaretDown,
  MagnifyingGlass,
  User,
  Handbag,
  X,
} from "phosphor-react";

import type { ShopifyMenuItem } from "@/lib/shopify/types";

type MobileMenuPanelProps = {
  open: boolean;

  menuItems: ShopifyMenuItem[];

  openItemId: string | null;

  setOpenItemId: (
    id: string | null
  ) => void;

  onClose: () => void;

  onOpenSearch: () => void;
};

function resolveMobileMenuHref(
  url?: string | null
) {
  if (!url) {
    return "/mobile";
  }

  try {
    const parsedUrl = new URL(url);

    const path =
      parsedUrl.pathname;

    if (
      path.startsWith(
        "/collections/"
      )
    ) {
      const handle =
        path
          .split(
            "/collections/"
          )[1]
          ?.split("/")[0];

      return handle
        ? `/mobile/collection/${handle}`
        : "/mobile";
    }

    if (
      path.startsWith(
        "/products/"
      )
    ) {
      const handle =
        path
          .split("/products/")[1]
          ?.split("/")[0];

      return handle
        ? `/mobile/product/${handle}`
        : "/mobile";
    }

    return path || "/mobile";
  } catch {
    if (
      url.startsWith(
        "/collections/"
      )
    ) {
      const handle =
        url
          .split(
            "/collections/"
          )[1]
          ?.split("/")[0];

      return handle
        ? `/mobile/collection/${handle}`
        : "/mobile";
    }

    if (
      url.startsWith(
        "/products/"
      )
    ) {
      const handle =
        url
          .split("/products/")[1]
          ?.split("/")[0];

      return handle
        ? `/mobile/product/${handle}`
        : "/mobile";
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
      {open && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[4px]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            aria-label="Fermer le menu"
          />

          <motion.aside
            className="fixed inset-x-3 top-[86px] z-50 max-h-[calc(100dvh-104px)] overflow-y-auto rounded-[30px] border border-white/10 bg-[#101010] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            initial={{
              opacity: 0,
              y: -14,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.98,
            }}
            transition={{
              duration: 0.28,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
              <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#d6bc91]/10 blur-3xl" />

              <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
            </div>

            <div className="relative px-5 pb-7 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">
                    Cattleya Menu
                  </p>

                  <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.05em]">
                    Menu
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition active:scale-95"
                  aria-label="Fermer le menu"
                >
                  <X
                    size={16}
                    weight="bold"
                  />
                </button>
              </div>

              <nav className="mt-7 flex flex-col">
                {menuItems.length >
                0 ? (
                  menuItems.map(
                    (
                      item,
                      index
                    ) => {
                      const hasChildren =
                        Array.isArray(
                          item.items
                        ) &&
                        item.items
                          .length > 0;

                      const isOpen =
                        openItemId ===
                        item.id;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay:
                              index *
                              0.04,
                          }}
                          className="border-b border-white/10"
                        >
                          <div className="flex items-center justify-between py-5">
                            <Link
                              href={resolveMobileMenuHref(
                                item.url
                              )}
                              onClick={() => {
                                if (
                                  !hasChildren
                                ) {
                                  onClose();
                                }
                              }}
                              className="min-w-0 flex-1 text-[30px] font-semibold leading-none tracking-[-0.06em] text-white"
                            >
                              {
                                item.title
                              }
                            </Link>

                            {hasChildren ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenItemId(
                                    isOpen
                                      ? null
                                      : item.id
                                  )
                                }
                                className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.07]"
                                aria-label={`Ouvrir ${item.title}`}
                              >
                                <motion.span
                                  animate={{
                                    rotate:
                                      isOpen
                                        ? 180
                                        : 0,
                                  }}
                                  transition={{
                                    duration: 0.24,
                                  }}
                                >
                                  <CaretDown
                                    size={
                                      15
                                    }
                                    weight="thin"
                                  />
                                </motion.span>
                              </button>
                            ) : (
                              <span className="text-[10px] uppercase tracking-[0.22em] text-white/28">
                                {String(
                                  index +
                                    1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>
                            )}
                          </div>

                          <AnimatePresence initial={false}>
                            {hasChildren &&
                            isOpen ? (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height:
                                    "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.28,
                                  ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                  ],
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pb-5">
                                  {item.items?.map(
                                    (
                                      child,
                                      childIndex
                                    ) => (
                                      <Link
                                        key={
                                          child.id
                                        }
                                        href={resolveMobileMenuHref(
                                          child.url
                                        )}
                                        onClick={
                                          onClose
                                        }
                                        className="flex items-center justify-between rounded-[18px] px-3 py-3 text-[13px] uppercase tracking-[0.16em] text-white/58 transition active:bg-white/[0.06]"
                                      >
                                        <span>
                                          {
                                            child.title
                                          }
                                        </span>

                                        <span className="text-[10px] text-white/24">
                                          {String(
                                            childIndex +
                                              1
                                          ).padStart(
                                            2,
                                            "0"
                                          )}
                                        </span>
                                      </Link>
                                    )
                                  )}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }
                  )
                ) : (
                  <div className="rounded-[26px] bg-white/[0.07] p-5">
                    <p className="text-[18px] font-semibold tracking-[-0.04em]">
                      Aucun menu Shopify trouvé.
                    </p>

                    <p className="mt-2 text-[13px] leading-5 text-white/50">
                      Connecte ton menu Shopify pour afficher tes collections.
                    </p>
                  </div>
                )}
              </nav>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <Link
                  href="/mobile/account"
                  onClick={onClose}
                  className="flex h-14 items-center justify-center rounded-[20px] bg-white/[0.07] text-white/62"
                  aria-label="Compte"
                >
                  <User
                    size={17}
                    weight="thin"
                  />
                </Link>

                <button
                  type="button"
                  onClick={
                    onOpenSearch
                  }
                  className="flex h-14 items-center justify-center rounded-[20px] bg-white/[0.07] text-white/62"
                  aria-label="Recherche"
                >
                  <MagnifyingGlass
                    size={17}
                    weight="thin"
                  />
                </button>

                <Link
                  href="/mobile/cart"
                  onClick={onClose}
                  className="flex h-14 items-center justify-center rounded-[20px] bg-white/[0.07] text-white/62"
                  aria-label="Panier"
                >
                  <Handbag
                    size={17}
                    weight="thin"
                  />
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}