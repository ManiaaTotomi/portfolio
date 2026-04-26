"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  className?: string;
  delayMs?: number;
  children: React.ReactNode;
}

export function Reveal({ className, delayMs = 0, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const isNearViewport = rect.top <= window.innerHeight * 1.25;
    if (isNearViewport) {
      return;
    }

    node.classList.add("is-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove("is-hidden");
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 18% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn("reveal", className)}
      ref={ref}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
