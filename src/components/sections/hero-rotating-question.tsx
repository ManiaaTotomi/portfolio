"use client";

interface HeroRotatingQuestionProps {
  compact?: boolean;
}

export function HeroRotatingQuestion({
  compact = false,
}: HeroRotatingQuestionProps) {
  return (
    <h1
      className={`font-aeonik max-w-[1120px] text-center text-white transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${compact ? "text-[30px] leading-[1.18] sm:text-[38px] lg:text-[46px] lg:leading-[1.15]" : "text-[48px] font-normal leading-[1.08] sm:text-[64px] sm:leading-[73px]"}`}
    >
      <span className="block text-[44px] leading-[1.12] sm:text-[64px]">
        <span className="block text-white/88 md:whitespace-nowrap">Hey, I&apos;m Mania.</span>
        <span className="hidden text-white lg:mt-2 lg:block lg:whitespace-nowrap">
          Lead product designer focused on
        </span>
        <span className="mt-2 block text-white lg:hidden">Lead product</span>
        <span className="mt-2 block text-white lg:hidden">designer</span>
        <span className="mt-2 block text-white lg:hidden">focused on</span>
        <span className="hidden text-white lg:mt-2 lg:block lg:whitespace-nowrap">complex B2B systems</span>
        <span className="mt-2 block text-white lg:hidden">complex B2B</span>
        <span className="mt-2 block text-white lg:hidden">systems</span>
      </span>
    </h1>
  );
}
