import Link from "next/link";
import type { SiteContent } from "@/content/site";
import { HeroAssistantPanel } from "@/components/sections/hero-assistant-panel";
import { HeroImageStrip } from "@/components/sections/hero-image-strip";

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
      height="18"
      viewBox="0 0 24 24"
      width="18"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] text-white transition-opacity hover:opacity-80 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
            href={`mailto:${content.email}`}
          >
            <MailIcon />
          </Link>
        </div>
      </div>

      <HeroAssistantPanel
        assistantButtonLabel={content.assistantButtonLabel}
        assistantDisclaimer={assistantDisclaimer}
      />

      <div className="relative z-10 mx-auto mt-[16px] w-full max-w-[1720px] px-0 pb-[124px] sm:mt-[20px] sm:pb-[140px]">
        <HeroImageStrip />
      </div>
    </header>
  );
}
