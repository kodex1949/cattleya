"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "phosphor-react";

export default function ScrollToTopPC() {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 700);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    setClicked(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setClicked(false);
    }, 900);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{
            opacity: 0,
            y: 24,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: clicked ? 0.92 : 1,
          }}
          exit={{
            opacity: 0,
            y: 24,
            scale: 0.9,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group fixed bottom-8 right-8 z-[80] flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white/88 text-black shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-black hover:text-white"
        >
          <motion.div
            animate={{
              scale: clicked ? [1, 1.8, 2.4] : 1,
              opacity: clicked ? [0.18, 0.1, 0] : 0,
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full bg-black"
          />

          <motion.div
            animate={{
              y: clicked ? [-1, -12, -26] : 0,
              opacity: clicked ? [1, 1, 0] : 1,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            <ArrowUp
              size={18}
              weight="bold"
            />
          </motion.div>

          <motion.div
            animate={{
              opacity: clicked ? [0, 1, 0] : 0,
              scale: clicked ? [0.7, 1, 1.4] : 0.7,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border border-black/20"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

