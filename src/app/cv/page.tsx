import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmailButton } from "@/components/copy-email-button";
import { siteContent } from "@/content/site";

type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  summary?: string;
  bullets: string[];
};

const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    period: "2024 - today",
    company: "Pollfish",
    role: "Lead Product Designer",
    bullets: [
      "Leading design across core product areas",
      "Driving AI product direction",
      "Designed and launched AI-powered features",
      "Led key product initiatives across survey workflows",
      "Providing design direction across a small team",
      "Collaborating on product strategy with Product, Engineering, and Data teams",
    ],
  },
  {
    period: "2022 - 2024",
    company: "Pollfish",
    role: "Senior Product Designer",
    bullets: [
      "Redesigned the Pollfish platform",
      "Integrated new features after acquisition by Prodege",
      "Owned and evolved the end-to-end experience of the survey creation flow",
    ],
  },
  {
    period: "2018 - 2022",
    company: "Pollfish",
    role: "Product Designer",
    bullets: [
      "Designed the dashboard of the Publisher department of Pollfish",
      "Established and scaled the design system",
      "Collaborated with Product and Engineering in a fast-paced environment",
      "Led key product initiatives across survey workflows",
    ],
  },
  {
    period: "2016 - 2018",
    company: "BRAVE (ex Webjar)",
    role: "Digital Designer",
    bullets: [
      "Designed websites, branding, and digital products across industries.",
    ],
  },
  {
    period: "Additional\nExperience",
    company: "",
    role: "Product Designer",
    summary:
      "Working across early-stage products and client projects, focusing on structuring workflows, personalization, and operational tools.",
    bullets: [
      "TILD: Construction collaboration platform",
      "CtrlEat: Food discovery app based on nutrition preferences",
      "Cassiopeia: Hospitality management tool",
      "Digital Maturity Self Assessment Tool (DMSAT) / Eurobank: Web design and product design",
    ],
  },
];

export const metadata: Metadata = {
  title: "CV",
  description: "Resume and professional experience of Mania Totomi.",
};

const CV_EMAIL = "mania.totomi@gmail.com";

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

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <p className="font-figtree text-[14px] font-bold uppercase tracking-[0.7px] text-white/75">
        {label}
      </p>
      <div className="h-px w-full bg-white/14" />
    </div>
  );
}

export default function CvPage() {
  return (
    <main className="min-h-screen bg-[#040404]" id="top">
      <div className="relative z-20 mx-auto flex h-[79px] w-full max-w-[1600px] items-center justify-between px-5 pb-[30px] pt-[44px] min-[900px]:px-[50px]">
        <Link
          className="font-figtree text-[18px] font-bold tracking-[0.64px] text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
          href="/#top"
        >
          {siteContent.name}
        </Link>

        <div className="flex h-[14px] items-center justify-end gap-[clamp(18px,2.2vw,32px)]">
          <a
            className="font-figtree text-[18px] font-bold tracking-[0.32px] text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
            href={siteContent.cvUrl}
          >
            CV
          </a>
          <a
            aria-label={`Email ${siteContent.name}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] text-white transition-opacity hover:opacity-80 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
            href={`mailto:${CV_EMAIL}`}
          >
            <MailIcon />
          </a>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <article className="mx-auto w-full max-w-[1040px] rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,#111113_0%,#0d0d0f_100%)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-10 lg:p-[52px]">
          <header className="border-b border-white/12 pb-3">
            <div className="flex items-start justify-between gap-6">
              <p className="font-figtree text-[14px] font-bold uppercase tracking-[0.7px] text-white">
                Resume
              </p>
              <p className="font-figtree text-right text-[14px] leading-[20px]">
                <span className="block font-bold uppercase tracking-[0.7px] text-white">Contact</span>
                <span className="mt-3 inline-flex items-center justify-end gap-3 text-[#F275E9]">
                  <a
                    className="transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                    href={`mailto:${CV_EMAIL}`}
                  >
                    {CV_EMAIL}
                  </a>
                  <CopyEmailButton
                    className="h-6 w-6"
                    email={CV_EMAIL}
                  />
                </span>
              </p>
            </div>
          </header>

          <section className="pb-3 pt-[48px]">
            <h1 className="font-aeonik text-[46px] leading-[1.02] text-white sm:text-[52px]">
              Mania Totomi
            </h1>
            <p className="font-aeonik mt-1 text-[46px] leading-[1.02] text-white/28 sm:text-[52px]">
              Product Designer
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <SectionHeader label="About me" />
            <p className="font-figtree max-w-[980px] text-[16px] leading-[1.72] text-white/75">
              Product designer with 8+ years of experience designing complex B2B systems and
              AI-powered product capabilities. Currently leading design at Pollfish, redesigning a
              HR tool and experimenting with AI coding tools.
            </p>
          </section>

          <section className="mt-10 space-y-6">
            <SectionHeader label="Experience" />

            <div className="space-y-8">
              {EXPERIENCE_ENTRIES.map((entry) => (
                <div className="grid gap-3 lg:grid-cols-[190px_1fr] lg:gap-8" key={`${entry.period}-${entry.role}`}>
                  <div>
                    <p className="font-figtree whitespace-pre-line text-[16px] font-bold leading-[1.5] text-white/75">
                      {entry.period} /
                    </p>
                    {entry.company ? (
                      <p className="font-figtree text-[16px] leading-[1.5] text-white/75">{entry.company}</p>
                    ) : null}
                  </div>
                  <div>
                    <p className="font-figtree text-[16px] font-bold leading-[1.5] text-white/75">
                      {entry.role}
                    </p>
                    {entry.summary ? (
                      <p className="font-figtree mt-1 text-[16px] leading-[1.72] text-white/75">
                        {entry.summary}
                      </p>
                    ) : null}
                    <ul className="mt-2 space-y-0.5">
                      {entry.bullets.map((bullet) => (
                        <li
                          className="font-figtree text-[16px] leading-[1.72] text-white/75"
                          key={`${entry.role}-${bullet}`}
                        >
                          - {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <SectionHeader label="Tools" />
            <p className="font-figtree text-[16px] leading-[1.65] text-white/75">
              Figma · Figma Make · Cursor · React/Tailwind (basic)
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <SectionHeader label="Education" />
            <p className="font-figtree text-[16px] leading-[1.65] text-white/75">
              Graphic Design in University of West Attica
            </p>
          </section>

          <footer className="mt-14 flex flex-wrap items-end justify-between gap-3">
            <p className="font-figtree text-[26px] font-semibold leading-[1.1] text-white sm:text-[30px]">
              Thank you.
            </p>
            <div className="flex flex-col items-end gap-1">
              <p className="font-figtree inline-flex items-center gap-3 text-[14px] leading-[20px] text-[#F275E9]">
                <a
                  className="transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                  href={`mailto:${CV_EMAIL}`}
                >
                  {CV_EMAIL}
                </a>
                <CopyEmailButton
                  className="h-6 w-6"
                  email={CV_EMAIL}
                />
              </p>
              <Link
                className="font-figtree inline-flex items-center gap-1 text-[14px] font-semibold uppercase tracking-[0.7px] text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                href="/#top"
              >
                Back Home
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="12"
                  viewBox="0 0 16 16"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
