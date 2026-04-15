"use client";

interface HeroRotatingQuestionProps {
  compact?: boolean;
}

export function HeroRotatingQuestion({
  compact = false,
}: HeroRotatingQuestionProps) {
  return (
    <h1
      className={`font-aeonik max-w-[980px] text-center text-white transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${compact ? "text-[30px] leading-[1.18] sm:text-[38px] lg:text-[46px] lg:leading-[1.15]" : "text-[48px] font-normal leading-[1.08] sm:text-[64px] sm:leading-[73px]"}`}
    >
      <span className="block text-[30px] leading-[1.4] text-white/50">Hey, I&apos;m Mania!</span>
      <span className="mt-2 block text-[64px] leading-[76px] text-[rgba(255,255,255,0.64)]">
        Lead Product Designer with <span className="text-white">8+ years</span>{" "}
        designing <span className="text-white">complex</span> systems and{" "}
        <span className="text-white">AI-powered</span> B2B products
      </span>
    </h1>
  );
}
