"use client";

import { useState } from "react";

import {
  signInAction,
  signUpAction,
} from "@/app/(mobile)/mobile/sign-in/actions";

export default function SignInFormMobileCattleya() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const isSignIn = mode === "signin";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f3ec] px-5 pb-24 pt-28 text-[#15120f]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[44%] bg-[linear-gradient(180deg,#efe2d1_0%,rgba(247,243,236,0)_100%)]" />
        <div className="absolute -right-28 top-24 h-[340px] w-[340px] rounded-full bg-[#d7b88e]/20 blur-3xl" />
        <div className="absolute -left-28 bottom-10 h-[300px] w-[300px] rounded-full bg-[#b99674]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[420px]">
        <div className="flex items-start justify-between gap-5">
          <p className="pt-2 text-[10px] uppercase tracking-[0.48em] text-black/34 [writing-mode:vertical-rl]">
            Espace privé
          </p>

          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.52em] text-black/32">
              Maison Cattleya
            </p>

            <h1 className="mt-6 text-[64px] font-light leading-[0.78] tracking-[-0.12em] text-black">
              {isSignIn ? "Connexion." : "Créer un compte."}
            </h1>

            <p className="mt-6 max-w-[292px] text-[14px] font-light leading-7 text-black/52">
              Accédez à vos commandes, vos favoris et vos rituels personnels.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white/64 p-4 shadow-[0_30px_80px_rgba(50,35,20,0.08)] backdrop-blur-xl">
          <div className="mb-7 flex border-b border-black/8">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`h-11 flex-1 text-[10px] uppercase tracking-[0.28em] transition-colors ${
                isSignIn ? "text-black" : "text-black/30"
              }`}
            >
              Connexion
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`h-11 flex-1 text-[10px] uppercase tracking-[0.28em] transition-colors ${
                !isSignIn ? "text-black" : "text-black/30"
              }`}
            >
              Inscription
            </button>
          </div>

          <form
            action={isSignIn ? signInAction : signUpAction}
            className="space-y-4"
          >
            <label className="block bg-[#f8f4ee] px-5 pb-4 pt-5">
              <span className="mb-3 block text-[10px] uppercase tracking-[0.32em] text-black/28">
                Adresse e-mail
              </span>

              <input
                type="email"
                name="email"
                required
                placeholder="vous@exemple.com"
                className="w-full bg-transparent text-[16px] font-light tracking-[-0.03em] text-black outline-none placeholder:text-black/24"
              />
            </label>

            <label className="block bg-[#f8f4ee] px-5 pb-4 pt-5">
              <span className="mb-3 block text-[10px] uppercase tracking-[0.32em] text-black/28">
                Mot de passe
              </span>

              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-transparent text-[16px] font-light tracking-[-0.03em] text-black outline-none placeholder:text-black/24"
              />
            </label>

            <button
              type="submit"
              className="mt-3 flex h-[60px] w-full items-center justify-between bg-[#15120f] px-6 text-white transition-transform active:scale-[0.985]"
            >
              <span className="text-[10px] uppercase tracking-[0.32em] text-white/72">
                {isSignIn ? "Se connecter" : "Créer le compte"}
              </span>

              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                01
              </span>
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">
          <p className="max-w-[190px] text-[12px] font-light leading-5 text-black/42">
            {isSignIn
              ? "Pas encore de compte Cattleya ?"
              : "Vous avez déjà un compte ?"}
          </p>

          <button
            type="button"
            onClick={() => setMode(isSignIn ? "signup" : "signin")}
            className="text-[10px] uppercase tracking-[0.28em] text-black/56"
          >
            {isSignIn ? "S’inscrire" : "Connexion"}
          </button>
        </div>
      </div>
    </div>
  );
}