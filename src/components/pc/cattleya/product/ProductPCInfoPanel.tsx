"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "phosphor-react";

type ProductPCInfoTab = "description" | "ingredients" | "environment";

type ProductPCInfoPanelProps = {
  open: boolean;
  activeTab: ProductPCInfoTab;
  onClose: () => void;
  onTabChange: (tab: ProductPCInfoTab) => void;
  description: string;
};

const tabs = [
  { label: "Description", value: "description" },
  { label: "Ingrédients", value: "ingredients" },
  { label: "Tri & Environnement", value: "environment" },
] as const;

export default function ProductPCInfoPanel({
  open,
  activeTab,
  onClose,
  onTabChange,
  description,
}: ProductPCInfoPanelProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[90]">
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/28 backdrop-blur-[6px]"
            aria-label="Fermer le panneau"
          />

          <motion.aside
            initial={{ x: "100%", opacity: 0.96 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.96 }}
            transition={{
              duration: 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-5 right-5 top-5 w-[540px] overflow-hidden rounded-[4px] bg-[#f8f8f7] text-black shadow-[-28px_0_90px_rgba(0,0,0,0.16)]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-8 top-7 z-10 text-black transition hover:opacity-45"
              aria-label="Fermer"
            >
              <X size={20} weight="light" />
            </button>

            <div className="px-16 pt-14">
              <div className="flex items-center gap-10 border-b border-black pb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => onTabChange(tab.value)}
                    className={`text-[15px] transition ${
                      activeTab === tab.value
                        ? "font-medium text-black"
                        : "font-normal text-black/72 hover:text-black"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[calc(100%-116px)] overflow-y-auto px-16 pb-16 pt-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {activeTab === "description" ? (
                <PanelText>
                  {description ||
                    "Une création pensée comme une présence. Un parfum qui habille la peau avec retenue, profondeur et caractère."}
                </PanelText>
              ) : null}

              {activeTab === "ingredients" ? (
                <div className="space-y-20">
                  <PanelText>
                    AVERTISSEMENT : LES LISTES D’INGRÉDIENTS ENTRANT DANS LA
                    COMPOSITION DES PRODUITS PARFUMS CATTLEYA SONT
                    RÉGULIÈREMENT MISES À JOUR. AVANT D’UTILISER UN PRODUIT,
                    VEUILLEZ LIRE LA LISTE D’INGRÉDIENTS SITUÉE SUR SON
                    EMBALLAGE AFIN DE VOUS ASSURER QUE LES INGRÉDIENTS SONT
                    ADAPTÉS À VOTRE UTILISATION PERSONNELLE.
                  </PanelText>

                  <PanelText>
                    ALCOHOL • PARFUM (FRAGRANCE) • AQUA (WATER) • LINALOOL •
                    LIMONENE • GERANIOL • CITRONELLOL • BENZYL SALICYLATE •
                    CITRAL • BENZYL ALCOHOL • COUMARIN.
                  </PanelText>
                </div>
              ) : null}

              {activeTab === "environment" ? (
                <PanelText>
                  FLACON ET EMBALLAGE À TRIER SELON LES CONSIGNES LOCALES.
                  CATTLEYA PRIVILÉGIE UNE EXPÉRIENCE SOIGNÉE ET RESPONSABLE,
                  AVEC DES MATÉRIAUX SÉLECTIONNÉS POUR LIMITER L’IMPACT.
                </PanelText>
              ) : null}
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PanelText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] font-normal uppercase leading-[1.55] tracking-[-0.015em] text-black">
      {children}
    </p>
  );
}