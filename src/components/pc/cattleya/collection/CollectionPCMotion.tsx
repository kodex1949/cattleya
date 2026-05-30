"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CollectionPCMotionProps = {
  children: ReactNode;
};

export default function CollectionPCMotion({
  children,
}: CollectionPCMotionProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-collection-hero='eyebrow']", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from("[data-collection-hero='title']", {
        y: 46,
        opacity: 0,
        duration: 1.15,
        delay: 0.08,
        ease: "power4.out",
      });

      gsap.from("[data-collection-hero='description']", {
        y: 28,
        opacity: 0,
        duration: 1,
        delay: 0.18,
        ease: "power3.out",
      });

      gsap.from("[data-collection-card]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-collection-grid]",
          start: "top 82%",
        },
      });

      gsap.from("[data-collection-editorial]", {
        y: 80,
        opacity: 0,
        scale: 0.96,
        duration: 1.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-collection-editorial]",
          start: "top 82%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}