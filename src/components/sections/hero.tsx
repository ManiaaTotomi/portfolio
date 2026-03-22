import Link from "next/link";
import type { SiteContent } from "@/content/site";
import { HeroImageStrip } from "@/components/sections/hero-image-strip";
import { HeroSplashLayer } from "@/components/sections/hero-splash-layer";

interface HeroSectionProps {
  content: SiteContent;
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
        width="18"
        x="3"
        y="5"
      />
      <path
        d="M3 8L10.6 13.2C11.44 13.77 12.56 13.77 13.4 13.2L21 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function HeroSection({ content }: HeroSectionProps) {
  const assistantDisclaimer =
    "This assistant is a personal experiment. Ask questions about my experience, process and work. It can make mistakes.";

  return (
    <header className="relative overflow-visible bg-[#040404]" id="top">
      <div className="relative z-10 mx-auto flex h-[79px] w-full max-w-[1600px] items-center justify-between px-5 pb-[30px] pt-[44px] min-[900px]:px-[50px]">
        <Link
          className="font-figtree text-[16px] font-bold tracking-[0.64px] text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
          href="#top"
        >
          {content.name}
        </Link>

        <nav
          aria-label="Featured projects"
          className="hidden items-center gap-[clamp(34px,7vw,140px)] min-[900px]:flex"
        >
          {content.nav.map((item, index) => (
            <a
              className="font-figtree inline-flex items-center gap-[10px] text-[16px] font-normal text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              href={item.href}
              key={`${item.label}-${item.href}`}
            >
              {item.label}
              {index === 0 && <ChevronDownIcon />}
            </a>
          ))}
        </nav>

        <div className="flex h-[14px] items-center justify-end gap-[clamp(18px,2.2vw,32px)]">
          <a
            className="font-figtree text-[16px] font-bold tracking-[0.32px] text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
            href={content.cvUrl}
          >
            CV
          </a>
          <Link
            aria-label={`Email ${content.name}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
            href={`mailto:${content.email}`}
          >
            <MailIcon />
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[899px] flex-col items-center px-5 pb-[250px] pt-[160px] text-center sm:px-8 lg:pb-[280px] lg:pt-[290px]">
        <h1 className="font-aeonik max-w-[899px] text-[40px] leading-[1.1] text-white sm:text-[52px] lg:text-[64px] lg:leading-[73px]">
          How does Mania bridge <span className="text-[rgba(255,255,255,0.6)]">design </span>
          <span className="text-[rgba(255,255,255,0.5)]">& engineering?|</span>
        </h1>

        <div className="relative mt-[32px] flex w-full max-w-[772px] flex-col items-center gap-[32px]">
          <HeroSplashLayer />

          <div className="relative h-[70px] w-full max-w-[763px] overflow-hidden rounded-[9999px] border border-[rgba(140,49,138,0.25)] bg-transparent">
            <div className="pointer-events-none absolute right-2 top-1/2 h-[74px] w-[248px] -translate-y-1/2 rounded-[9999px] bg-gradient-to-r from-[rgba(22,61,4,0.12)] to-[rgba(70,255,135,0.12)] opacity-50 blur-[8px]" />
            <p className="font-figtree pointer-events-none absolute left-[22px] top-1/2 -translate-y-1/2 text-left text-[14px] font-light tracking-[0.0105px] text-[rgba(195,189,189,0.62)] sm:left-[35px] sm:text-[18px]">
              Ask your question about my work or experience...
            </p>
            <button
              className="font-figtree absolute right-[14px] top-1/2 inline-flex h-[43px] -translate-y-1/2 items-center justify-center rounded-[91.548px] border border-[#8c318a] px-5 text-[16px] font-semibold text-white transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b55cb5] sm:right-[25px] sm:px-[33.29px]"
              type="button"
            >
              {content.assistantButtonLabel}
            </button>
          </div>

          <p className="font-figtree w-full max-w-[554px] text-[13px] leading-[1.5] text-[rgba(181,181,181,0.8)] sm:text-[14px] sm:leading-[23px]">
            {assistantDisclaimer}
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-[16px] w-full max-w-[1720px] px-0 pb-[124px] sm:mt-[20px] sm:pb-[140px]">
        <HeroImageStrip />
      </div>
    </header>
  );
}
