"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type MemberExclusiveMedia = {
  type: "image" | "video";
  url: string;
  alt?: string | null;
};

type SignatureMobileCattleyaProps = {
  media?: MemberExclusiveMedia | null;
};

const SUPABASE_EXCLUSIVE_IMAGE =
  "https://TON-PROJET.supabase.co/storage/v1/object/public/exclusive/membre.png";

export default function SignatureMobileCattleya({
  media,
}: SignatureMobileCattleyaProps) {
  const resolvedMedia: MemberExclusiveMedia = media ?? {
    type: "image",
    url: SUPABASE_EXCLUSIVE_IMAGE,
    alt: "Exclusivité membres Cattleya",
  };

  const isVideo = resolvedMedia.type === "video";

  return (
    <section className="bg-[#f7f6f2] px-5 py-24 text-black">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[420px]"
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden bg-[#eae6df]">
          <div className="h-[480px] w-full">
            {isVideo ? (
              <video
                src={resolvedMedia.url}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={resolvedMedia.url}
                alt={resolvedMedia.alt ?? ""}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>

        {/* TEXT BLOCK */}
        <div className="mt-10">
          <p className="text-[9px] uppercase tracking-[0.42em] text-black/35">
            Exclusivité membres
          </p>

          <h2 className="mt-4 text-[40px] font-light leading-[0.9] tracking-[-0.06em]">
            Accès privé aux créations.
          </h2>

          <p className="mt-5 text-[14px] leading-7 text-black/55">
            Une sélection confidentielle, réservée aux membres de la maison.
          </p>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-6">
            <Link
              href="/mobile/account"
              className="text-[11px] uppercase tracking-[0.24em] underline underline-offset-4"
            >
              Devenir membre
            </Link>

            <Link
              href="/mobile/sign-in"
              className="text-[11px] uppercase tracking-[0.24em] text-black/50"
            >
              Connexion
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}