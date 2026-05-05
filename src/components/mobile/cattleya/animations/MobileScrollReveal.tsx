"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MobileScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

export default function MobileScrollReveal({
  children,
  className = "",
}: MobileScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        {
          y: 72,
          opacity: 0,
          scale: 0.985,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 86%",
            end: "top 45%",
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}