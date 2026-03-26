"use client";

import { useEffect, useState } from "react";

const QUESTION_ENDINGS = [
  "bridge design and engineering?",
  "turn ambiguity into clear product direction?",
  "balance speed, quality, and business impact?",
  "lead end-to-end design in fast-moving teams?",
  "shape product systems that scale over time?",
];

interface HeroRotatingQuestionProps {
  compact?: boolean;
}

export function HeroRotatingQuestion({
  compact = false,
}: HeroRotatingQuestionProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    const intervalMs = reducedMotion ? 4600 : 4000;
    const interval = window.setInterval(() => {
      setQuestionIndex((index) => (index + 1) % QUESTION_ENDINGS.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <h1
      className={`font-aeonik max-w-[980px] text-white transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${compact ? "text-[30px] leading-[1.18] sm:text-[38px] lg:text-[46px] lg:leading-[1.15]" : "text-[64px] font-normal leading-[73px]"}`}
    >
      How does Mania{" "}
      <span
        className={reducedMotion ? "text-[rgba(255,255,255,0.64)]" : "hero-question-fade text-[rgba(255,255,255,0.64)]"}
        key={QUESTION_ENDINGS[questionIndex]}
      >
        {QUESTION_ENDINGS[questionIndex]}
      </span>
    </h1>
  );
}
