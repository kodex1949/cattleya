"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
} from "phosphor-react";

import type { MaisonCattleyaData } from "@/lib/cattleya/maison/get-maison-cattleya";

gsap.registerPlugin(ScrollTrigger);

type MaisonCattleyaPCProps = {
  data: MaisonCattleyaData;
};

export default function MaisonCattleyaPC({
  data,
}: MaisonCattleyaPCProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        },
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 66%",
          },
        },
      );

      gsap.fromTo(
        mediaRef.current,
        { opacity: 0, scale: 1.08 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );

      gsap.fromTo(
        bottomRef.current?.children ?? [],
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 48%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = muted;

    if (playing) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [muted, playing]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f6f1ea] text-black"
    >
      <div className="grid min-h-screen grid-cols-[42%_58%]">
        <div className="flex flex-col justify-between px-16 py-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.38em] text-black/35">
              {data.eyebrow}
            </p>

            <h2
              ref={titleRef}
              className="mt-10 max-w-[620px] font-serif text-[88px] font-light leading-[0.86] tracking-[-0.085em]"
            >
              {data.title}
            </h2>
          </div>

          <div ref={contentRef} className="max-w-[420px]">
            <p className="text-[15px] leading-relaxed text-black/55">
              {data.description}
            </p>

            <Link
              href={data.button_href}
              className="mt-10 inline-flex border border-black/15 px-7 py-4 text-[10px] uppercase tracking-[0.34em] text-black/55 transition hover:border-black hover:text-black"
            >
              {data.button_label}
            </Link>
          </div>
        </div>

        <div
          ref={mediaRef}
          className="group relative min-h-screen overflow-hidden bg-black"
        >
          {data.media_type === "video" ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-[1.02]"
              >
                <source src={data.media_url} />
              </video>

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 opacity-0 transition duration-500 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => setPlaying((prev) => !prev)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                >
                  {playing ? (
                    <Pause size={18} weight="fill" />
                  ) : (
                    <Play size={18} weight="fill" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setMuted((prev) => !prev)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                >
                  {muted ? (
                    <SpeakerSlash size={18} weight="fill" />
                  ) : (
                    <SpeakerHigh size={18} weight="fill" />
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                src={data.media_url}
                alt={data.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-black/15" />
            </>
          )}

          <div
            ref={bottomRef}
            className="absolute bottom-14 left-14 right-14 z-10 grid grid-cols-2 gap-6 text-white"
          >
            <div className="border-t border-white/20 pt-6">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                {data.left_title}
              </p>

              <p className="mt-5 font-serif text-[42px] font-light leading-[0.88] tracking-[-0.06em]">
                {data.left_content}
              </p>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                {data.right_title}
              </p>

              <p className="mt-5 font-serif text-[42px] font-light leading-[0.88] tracking-[-0.06em]">
                {data.right_content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}