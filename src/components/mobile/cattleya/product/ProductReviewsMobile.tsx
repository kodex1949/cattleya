"use client";

import { AnimatePresence, motion } from "framer-motion";

type ProductReviewsMobileProps = {
  open: boolean;
  onClose: () => void;
};

const reviews = [
  {
    id: "1",
    name: "Nora",
    city: "Paris",
    text: "Le parfum tient vraiment toute la journée sans devenir lourd.",
  },
  {
    id: "2",
    name: "Inès",
    city: "Lyon",
    text: "Le packaging est magnifique. Très premium.",
  },
  {
    id: "3",
    name: "Samira",
    city: "Marseille",
    text: "On me demande le nom à chaque fois que je le porte.",
  },
];

function getInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

export default function ProductReviewsMobile({
  open,
  onClose,
}: ProductReviewsMobileProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              bottom-0
              left-0
              right-0
              z-[100]
              h-[82vh]
              overflow-hidden
              border-t
              border-black/10
              bg-[#f8f5ef]
            "
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-black/35">
                  Avis clients
                </p>

                <h2 className="mt-2 text-[28px] font-light tracking-[-0.06em]">
                  5.0 — Validé.
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-[28px] font-light text-black/45"
              >
                ×
              </button>
            </div>

            <div className="h-full overflow-y-auto px-5 pb-32 pt-6">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="
                      border
                      border-black/10
                      bg-white/45
                      p-4
                      backdrop-blur
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1b1713] text-[14px] text-white">
                        {getInitial(review.name)}
                      </div>

                      <div>
                        <p className="text-[13px] text-black">
                          {review.name}
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-black/35">
                          {review.city} · Achat vérifié
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-[11px] tracking-[0.16em]">
                        ★★★★★
                      </p>

                      <p className="mt-4 text-[16px] font-light leading-7 tracking-[-0.03em] text-black/72">
                        “{review.text}”
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}