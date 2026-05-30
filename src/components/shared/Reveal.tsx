"use client";

import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  y = 80,
  delay = 0,
  className,
}: RevealProps) {
  const ref =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
        },
      },
    );
  }, [delay, y]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}