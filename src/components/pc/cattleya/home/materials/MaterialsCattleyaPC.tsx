"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { CattleyaMaterial } from "@/lib/cattleya/materials/get-cattleya-materials";

gsap.registerPlugin(ScrollTrigger);

type MaterialsCattleyaPCProps = {
  materials: CattleyaMaterial[];
};

export default function MaterialsCattleyaPC({
  materials,
}: MaterialsCattleyaPCProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          delay: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        },
      );

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 90, scale: 1.04 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.25,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (materials.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-[#080604] px-10 py-28 text-white"
    >
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-16 grid grid-cols-[320px_1fr] gap-20">
          <div>
            <p
              ref={eyebrowRef}
              className="text-[10px] uppercase tracking-[0.38em] text-white/35"
            >
              Les matières
            </p>
          </div>

          <h2
            ref={titleRef}
            className="max-w-[900px] font-serif text-[92px] font-light leading-[0.86] tracking-[-0.085em] text-white"
          >
            Choisir une fragrance par instinct.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-4 gap-4">
          {materials.map((item) => (
            <Link
              key={item.id}
              href={`/pc/matieres/${item.handle}`}
              className="group relative h-[640px] overflow-hidden bg-black"
            >
              {item.media_type === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-[1.035]"
                >
                  <source src={item.media_url} />
                </video>
              ) : (
                <img
                  src={item.media_url}
                  alt={item.label}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-[1.035]"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />

              <div className="absolute left-7 top-7">
                <p className="text-[10px] uppercase tracking-[0.34em] text-white/60">
                  {item.label}
                </p>
              </div>

              <div className="absolute bottom-8 left-7 right-7">
                <h3 className="font-serif text-[48px] font-light leading-[0.86] tracking-[-0.07em] text-white">
                  {item.title}
                </h3>

                <p className="mt-6 max-w-[280px] text-[14px] leading-relaxed text-white/65">
                  {item.description}
                </p>

                <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-white/45 transition group-hover:text-white">
                  Explorer
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}