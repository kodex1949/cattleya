"use client";

import { motion } from "framer-motion";

type MobileMenuButtonProps = {
  open: boolean;
  dark?: boolean;
  onClick: () => void;
};

export default function MobileMenuButton({
  open,
  dark = false,
  onClick,
}: MobileMenuButtonProps) {
  const lineClass = dark ? "bg-white" : "bg-black";

  return (
    <button
      type="button"
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={open}
      onClick={onClick}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300 ${
        dark
          ? "border-white/15 bg-white/10 text-white"
          : "border-black/[0.08] bg-white/60 text-black"
      }`}
    >
      <div className="relative h-4 w-5">
        <motion.span
          className={`absolute left-0 block h-[1.25px] w-5 origin-center rounded-full ${lineClass}`}
          animate={open ? { top: 7, rotate: 45 } : { top: 2, rotate: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        />

        <motion.span
          className={`absolute left-0 block h-[1.25px] w-5 origin-center rounded-full ${lineClass}`}
          animate={open ? { top: 7, rotate: -45 } : { top: 11, rotate: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        />
      </div>
    </button>
  );
}