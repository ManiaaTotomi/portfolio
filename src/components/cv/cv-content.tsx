import { CopyEmailButton } from "@/components/copy-email-button";

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
      "Leading design across the end-to-end survey creation and results experience",
      "Shaping AI-driven product direction, from early concepts to shipped features",
      "Designed and launched AI-powered survey creation workflows and conversational interfaces",
      "Introduced AI-assisted prototyping practices within the team (Figma + Cursor and code-based prototyping), improving speed and validation of ideas",
      "Hands-on in prototyping interactions using code and AI tools to explore complex flows and edge cases",
      "Providing design direction and raising quality across a small design team",
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
      "Project Alpha (confidential codename): Construction collaboration platform",
      "CtrlEat: Food discovery app based on nutrition preferences",
      "Cassiopeia: Hospitality management tool",
      "Digital Maturity Self Assessment Tool (DMSAT) / Eurobank: Web design and product design",
    ],
  },
];

const CV_EMAIL = "mania.totomi@gmail.com";
const WHITE_CV_DOWNLOAD_HREF = "/CV_Mania_Totomi.pdf";

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V14M12 14L8 10M12 14L16 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M5 18H19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
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

interface CvContentProps {
  onClose?: (() => void) | undefined;
}

export function CvContent({ onClose }: CvContentProps) {
  const emailContent = (
    <div className="flex flex-wrap items-center justify-end gap-3 text-[#F275E9]">
      <a
        className="font-figtree text-[14px] leading-[20px] transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
        href={`mailto:${CV_EMAIL}`}
      >
        {CV_EMAIL}
      </a>
      <CopyEmailButton
        className="h-6 w-6 border-[rgba(255,255,255,0.12)] text-white/35"
        email={CV_EMAIL}
      />
    </div>
  );

  return (
    <article className="relative mx-auto w-full max-w-[1040px] rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,#111113_0%,#0d0d0f_100%)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-10 lg:p-[52px]">
      {onClose ? (
        <button
          aria-label="Close CV overlay"
          className="absolute right-0 top-0 z-40 inline-flex h-8 w-8 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[#0f0f10]/95 text-white transition-opacity hover:opacity-80 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>
      ) : null}

      <header className="border-b border-white/12 pb-3">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <p className="font-figtree text-[14px] font-bold uppercase leading-[20px] tracking-[0.35px] text-white">
              RESUME
            </p>
            {WHITE_CV_DOWNLOAD_HREF ? (
              <a
                aria-label="Download CV as PDF"
                className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] text-white transition-opacity hover:opacity-80 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                download
                href={WHITE_CV_DOWNLOAD_HREF}
                title="Download CV as PDF"
              >
                <DownloadIcon />
              </a>
            ) : (
              <button
                aria-label="White PDF download not available yet"
                className="inline-flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] text-white/35"
                title="Add a white PDF file to enable download"
                type="button"
              >
                <DownloadIcon />
              </button>
            )}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="min-w-0 text-right">{emailContent}</div>
          </div>
        </div>
      </header>

      <section className="pb-3 pt-[48px]">
        <h1 className="font-aeonik text-[46px] leading-[1.02] text-white sm:text-[52px]">
          Mania Totomi
        </h1>
        <p className="font-aeonik mt-1 text-[46px] leading-[1.02] text-white/28 sm:text-[52px]">
          Lead Product Designer
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <SectionHeader label="About me" />
        <div className="font-figtree max-w-[980px] space-y-4 text-[16px] leading-[1.62] text-white/75">
          <p>
            Product designer with 8+ years of experience shaping complex B2B systems, with a focus
            on turning ambiguous product spaces into clear, usable workflows.
          </p>
          <p>
            I joined Pollfish at an early stage and helped evolve it into a mature research platform
            through to its acquisition in 2022. I now lead design across the end-to-end survey
            lifecycle, working closely with Product, Engineering, and Data to define and ship
            AI-driven capabilities, while actively using code and AI tools to prototype and validate
            ideas.
          </p>
          <p>
            My approach combines structured thinking with hands-on execution, using prototyping
            (primarily with coding and AI tools) to explore, test, and refine solutions in complex
            systems.
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <SectionHeader label="Experience" />

        <div className="space-y-8">
          {EXPERIENCE_ENTRIES.map((entry) => (
            <div
              className="grid gap-3 lg:grid-cols-[190px_1fr] lg:gap-8"
              key={`${entry.period}-${entry.role}`}
            >
              <div>
                <p className="font-figtree whitespace-pre-line text-[16px] font-bold leading-[1.5] text-white/75">
                  {entry.period} /
                </p>
                {entry.company ? (
                  <p className="font-figtree text-[16px] leading-[1.5] text-white/75">
                    {entry.company}
                  </p>
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
          {emailContent}
        </div>
      </footer>
    </article>
  );
}
