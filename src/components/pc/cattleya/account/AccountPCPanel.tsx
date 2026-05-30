"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "phosphor-react";

type AccountPCPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function AccountPCPanel({
  open,
  onClose,
}: AccountPCPanelProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[95] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed right-0 top-0 z-[100] h-screen w-[560px] overflow-hidden bg-[#faf7f2] text-black shadow-[-40px_0_120px_rgba(0,0,0,0.18)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative flex h-full flex-col">
              <div className="border-b border-black/8 px-10 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.38em] text-black/35">
                      Maison Cattleya
                    </p>

                    <h2 className="mt-4 font-serif text-[48px] font-light leading-none tracking-[-0.08em]">
                      Compte
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-11 w-11 items-center justify-center border border-black/10 transition hover:border-black/30"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-10 py-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                    Connexion
                  </p>

                  <h3 className="mt-4 font-serif text-[34px] font-light tracking-[-0.06em]">
                    Bienvenue
                  </h3>

                  <p className="mt-3 text-[14px] leading-7 text-black/55">
                    Connectez-vous pour accéder à vos commandes, adresses et
                    préférences.
                  </p>
                </div>

                <form className="mt-10">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.28em] text-black/40">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="nom@exemple.com"
                      className="mt-3 h-14 w-full border border-black/10 bg-white px-5 text-[14px] outline-none transition focus:border-black"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="text-[10px] uppercase tracking-[0.28em] text-black/40">
                      Mot de passe
                    </label>

                    <input
                      type="password"
                      placeholder="••••••••"
                      className="mt-3 h-14 w-full border border-black/10 bg-white px-5 text-[14px] outline-none transition focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-8 flex h-14 w-full items-center justify-center bg-[#17110b] text-[11px] uppercase tracking-[0.32em] text-white transition hover:bg-black"
                  >
                    Se connecter
                  </button>

                  <button
                    type="button"
                    className="mt-4 w-full text-center text-[11px] uppercase tracking-[0.24em] text-black/45 transition hover:text-black"
                  >
                    Mot de passe oublié
                  </button>
                </form>

                <div className="mt-14 border-t border-black/10 pt-10">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                    Nouveau client
                  </p>

                  <h3 className="mt-4 font-serif text-[30px] font-light tracking-[-0.06em]">
                    Créer un compte
                  </h3>

                  <p className="mt-3 text-[14px] leading-7 text-black/55">
                    Suivez vos commandes, sauvegardez vos adresses et profitez
                    d'une expérience personnalisée.
                  </p>

                  <button
                    type="button"
                    className="mt-8 flex h-14 w-full items-center justify-center border border-black bg-transparent text-[11px] uppercase tracking-[0.32em] text-black transition hover:bg-black hover:text-white"
                  >
                    Créer mon compte
                  </button>
                </div>
              </div>

              <div className="border-t border-black/8 px-10 py-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">
                  Cattleya Paris
                </p>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}