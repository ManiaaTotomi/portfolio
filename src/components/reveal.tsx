"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  className?: string;
  delayMs?: number;
  children: React.ReactNode;
}

export function Reveal({ className, delayMs = 0, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn("reveal", visible && "is-visible", className)}
      ref={ref}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
