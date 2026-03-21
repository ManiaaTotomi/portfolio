import Link from "next/link";
import type { SiteContent } from "@/content/site";
import { Reveal } from "@/components/reveal";

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
      height="20"
      viewBox="0 0 24 24"
      width="20"
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

function LabIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="14"
      viewBox="0 0 16 16"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 2.5V6.2L3.6 10.2C3 11.2 3.72 12.5 4.9 12.5H11.1C12.28 12.5 13 11.2 12.4 10.2L10 6.2V2.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
      <path
        d="M5 2.5H11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
      <path
        d="M6 8.4H10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function HeroSection({ content }: HeroSectionProps) {
  const glowOpacity = 0.23;
  const glowDiameter = 1040;
  const glowBlur = 135;

  return (
    <header className="relative bg-[#1a1a1a]" id="top">
      <div className="w-full border-b border-white/10">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-[50px] py-[30px]">
          <Link
            className="font-figtree text-base font-bold text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
            href="#top"
          >
            {content.name}
          </Link>

          <nav
            aria-label="Featured projects"
            className="hidden items-center gap-[140px] lg:flex"
          >
            {content.nav.map((item, index) => (
              <a
                className="font-figtree inline-flex items-center gap-[10px] text-sm font-normal text-[#c1c1c1] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                href={item.href}
                key={`${item.label}-${item.href}`}
              >
                {item.label}
                {index === 0 && <ChevronDownIcon />}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-6 sm:gap-8">
            <a
              className="font-figtree text-base font-bold tracking-[0.02em] text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              href={content.cvUrl}
            >
              CV
            </a>
            <a
              aria-label={`Email ${content.name}`}
              className="inline-flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              href={`mailto:${content.email}`}
            >
              <MailIcon />
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1600px]">
          <div className="relative grid lg:min-h-[945px] lg:grid-cols-[minmax(0,1fr)_548px]">
            <div
              className="pointer-events-none absolute left-[70%] top-[79%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(211,54,238,1)_0%,rgba(211,54,238,0.76)_24%,rgba(211,54,238,0.42)_52%,rgba(211,54,238,0.16)_68%,rgba(211,54,238,0)_84%)] lg:left-[calc(100%-274px)]"
              style={{
                width: `${glowDiameter}px`,
                height: `${glowDiameter}px`,
                opacity: glowOpacity,
                filter: `blur(${glowBlur}px)`,
              }}
            />

            <div className="relative z-10 flex items-center px-5 py-14 sm:px-10 sm:py-18 lg:py-0 lg:pl-[min(22vw,350px)] lg:pr-[72px] xl:pl-[347px] xl:pr-[80px]">
            <Reveal className="max-w-[580px]">
              <p className="font-aeonik text-[26px] font-semibold leading-[1.5] text-[#808080] sm:text-[28px] sm:leading-[57px]">
                {content.heroKicker}
              </p>
              <h1 className="font-aeonik mt-[15px] max-w-[580px] text-[34px] font-semibold leading-[1.2] text-white sm:text-[40px] lg:text-[44px] lg:leading-[58px]">
                {content.headline}
              </h1>
              <div className="mt-[26px] max-w-[580px] space-y-[18px]">
                <p className="font-figtree text-[17px] font-light leading-[1.6] text-white sm:text-[18px] sm:leading-[29px]">
                  {content.intro}
                </p>
                {content.heroBody.map((paragraph) => (
                  <p
                    className="font-figtree text-[17px] font-light leading-[1.6] text-white sm:text-[18px] sm:leading-[29px]"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
            </div>

            <aside className="relative z-10 border-t border-white/[0.06] bg-[rgba(30,30,30,0.2)] px-5 py-12 sm:px-10 sm:py-14 lg:border-l lg:border-t-0 lg:px-[50px] lg:py-0">
            <div className="relative flex h-full items-end lg:pb-[277px]">
              <Reveal className="ml-auto w-full max-w-[448px]" delayMs={120}>
                <div className="space-y-[40px]">
                  <div className="space-y-6">
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.13] text-[#d5d5d5]">
                      <LabIcon />
                    </div>
                    <p className="font-figtree text-center text-[12px] leading-[1.513] text-[#a0a0a0]">
                      {content.assistantDisclaimer}
                    </p>
                  </div>

                  <div className="space-y-[21px]">
                    <div className="grid gap-2 sm:grid-cols-3">
                      {content.assistantPrompts.map((prompt) => (
                        <button
                          className="font-ibm min-h-[92px] rounded-[10px] border border-[rgba(232,223,217,0.06)] bg-white/[0.04] px-3 py-4 text-left text-[12px] font-light leading-[20px] text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                          key={prompt}
                          type="button"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>

                    <div className="rounded-[8px] border border-[rgba(207,207,207,0.05)] bg-[rgba(59,58,58,0.6)] pb-4 pl-6 pr-4 pt-5">
                      <p className="font-figtree text-[14px] font-medium leading-[20px] text-[#b5b5b5]">
                        {content.assistantPlaceholder}
                      </p>
                      <div className="mt-[46px] flex justify-end">
                        <button
                          className="font-figtree inline-flex h-[31px] items-center justify-center rounded-[6px] border border-[#46423d] px-6 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                          type="button"
                        >
                          {content.assistantButtonLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            </aside>
          </div>
        </div>
      </div>
    </header>
  );
}
