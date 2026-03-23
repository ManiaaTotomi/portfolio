import Image from "next/image";
import type { CaseStudy, CaseStudyEntry } from "@/content/site";

interface PollfishCaseStudySectionProps {
  study: CaseStudy;
}

const POLLFISH_INTRO_TITLE = "Market Research / SaaS platform";
const POLLFISH_INTRO_DESCRIPTION =
  "Pollfish is a global market research platform used to design surveys, target audiences, and analyze results at scale. I lead the design of the whole survey’s experience. The challenge is building a flexible system for complex logic and large-scale data, while keeping the experience intuitive.";
const POLLFISH_INTRO_DETAILS = [
  "Lead Product Designer",
  "Cross-functional leadership",
  "Scalable product foundation",
] as const;

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="10"
      viewBox="0 0 14 10"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5H12.5M12.5 5L8.5 1M12.5 5L8.5 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ProjectDivider() {
  return (
    <div className="flex h-[40px] w-full items-center">
      <div className="h-px flex-1 bg-white/10" />
      <div className="inline-flex items-center gap-4 px-8 py-[10px]">
        <span className="h-[7px] w-[7px] rounded-full bg-[#f70eff]" />
        <p className="font-aeonik text-[16px] uppercase tracking-[1.28px] text-[#f70eff]">
          Pollfish
        </p>
      </div>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function PollfishIntro() {
  return (
    <div className="mx-auto flex w-full max-w-[710px] flex-col items-center gap-8 text-center">
      <div className="space-y-6">
        <p className="font-aeonik text-[34px] font-semibold leading-[1.12] text-[rgba(194,194,194,0.4)] sm:text-[42px] sm:leading-[45px]">
          {POLLFISH_INTRO_TITLE}
        </p>
        <p className="font-aeonik text-[18px] leading-[1.5] text-[#ededed] sm:text-[20px] sm:leading-[35px]">
          {POLLFISH_INTRO_DESCRIPTION}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
        {POLLFISH_INTRO_DETAILS.map((item, index) => (
          <div className="flex items-center gap-6 sm:gap-8" key={item}>
            <p className="font-figtree text-[15px] font-medium text-[#6d6c6c] sm:text-[16px]">
              {item}
            </p>
            {index < POLLFISH_INTRO_DETAILS.length - 1 && (
              <span className="h-[2px] w-[2px] rounded-full bg-[#6d6c6c]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PollfishFeatureCard({
  entry,
  id,
  gradient,
  imageSrc,
}: {
  entry: CaseStudyEntry;
  id: string;
  gradient: string;
  imageSrc: string;
}) {
  return (
    <article
      className="grid overflow-hidden rounded-[20px] bg-white lg:grid-cols-[1fr_1.25fr]"
      id={id}
    >
      <div className="flex flex-col justify-end gap-8 px-6 pb-10 pt-10 sm:px-10 lg:pb-[56px] lg:pl-[96px] lg:pr-0 lg:pt-14">
        <div className="w-full lg:w-[355px]">
          <h3 className="font-aeonik text-[42px] font-semibold leading-[0.98] text-[#222] lg:text-[48px]">
            {entry.title}
          </h3>

          <div className="mt-8 space-y-3">
            {entry.paragraphs.slice(0, 2).map((paragraph) => (
              <p
                className="font-figtree text-[16px] leading-[1.5] text-[#222] lg:text-[18px] lg:leading-[27px]"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <a
            className="font-figtree mt-8 inline-flex items-center gap-3 text-[16px] font-bold text-[#222] transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#222]/35"
            href="#"
          >
            View case study
            <ArrowRightIcon />
          </a>
        </div>
      </div>

      <div className={`relative min-h-[330px] overflow-hidden px-5 py-8 sm:px-8 sm:py-12 lg:min-h-[676px] lg:px-[53px] lg:py-[82px] ${gradient}`}>
        <div className="relative h-full min-h-[255px] w-full rounded-[9px] shadow-[0_2px_31px_rgba(14,46,63,0.11)] lg:min-h-[510px]">
          <Image
            alt={`${entry.title} interface preview`}
            fill
            className="object-contain"
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 95vw"
            src={imageSrc}
          />
        </div>
      </div>
    </article>
  );
}

function AiBuilderFeature({ entry }: { entry: CaseStudyEntry }) {
  return (
    <article className="relative min-h-[760px] py-8 lg:py-[86px]" id="pollfish-ai-builder">
      <div className="pointer-events-none absolute -inset-x-[14%] -inset-y-[34%] bg-[radial-gradient(42%_48%_at_46%_52%,rgba(215,39,189,0.66)_0%,rgba(215,39,189,0.26)_34%,rgba(215,39,189,0)_78%)]" />
      <div className="pointer-events-none absolute -left-[260px] bottom-[-330px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(58,36,146,0.72)_0%,rgba(58,36,146,0.28)_44%,rgba(58,36,146,0)_78%)] blur-[110px]" />
      <div className="pointer-events-none absolute right-[-220px] top-[-220px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(173,30,175,0.58)_0%,rgba(173,30,175,0.22)_46%,rgba(173,30,175,0)_80%)] blur-[115px]" />

      <div className="relative z-10 grid gap-10 px-6 sm:px-10 lg:grid-cols-[430px_1fr] lg:gap-[80px] lg:px-[96px]">
        <div className="self-center space-y-8 lg:w-[355px]">
          <h3 className="font-aeonik text-[42px] font-semibold leading-[0.98] text-white lg:text-[48px]">
            AI Builder
          </h3>

          <div className="space-y-3">
            {entry.paragraphs.slice(0, 2).map((paragraph) => (
              <p
                className="font-figtree text-[17px] leading-[1.45] text-white sm:text-[18px] sm:leading-[27px]"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <a
            className="font-figtree inline-flex items-center gap-3 text-[16px] font-bold text-white transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            href="/pollfish/ai-builder"
          >
            View case study
            <ArrowRightIcon />
          </a>
        </div>

        <div className="relative min-h-[420px] lg:min-h-[730px]">
          <div className="absolute left-0 top-[70px] w-[66%] space-y-3 lg:w-[440px] lg:space-y-[17px]">
            {[
              "Q1  At what price ($USD) would you consider the product to be...",
              "01 so inexpensive that you would question the quality and not consider it?",
              "02 is a bargain - a great buy for the money?",
              "03 is getting expensive, but you still might consider it?",
              "04 would you begin to think the item is too expensive to consider?",
              "Q3  What is the minimum amount you would be willing to spend on this product/service?",
              "Q5  How would you rate the value for money of similar services you have purchased in the past?",
            ].map((line, index) => (
              <div
                className="rounded-[11px] border border-white/15 bg-[rgba(255,255,255,0.08)] px-4 py-3 text-white/95 backdrop-blur-[1px] lg:px-[22px] lg:py-[16px]"
                key={line}
                style={{
                  opacity: index < 5 ? 1 : 0.9,
                }}
              >
                <p className="font-roboto text-[12px] leading-[1.45] lg:text-[13px]">{line}</p>
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-0 w-[52%] overflow-hidden rounded-[13px] bg-white shadow-[0_4px_22px_rgba(59,35,111,0.2)] lg:w-[404px]">
            <Image
              alt="AI Builder chat interface"
              className="h-auto w-full object-cover"
              height={1648}
              sizes="(min-width: 1024px) 404px, 52vw"
              src="/images/AI-builder/mobile-screen/AI-chat.png"
              width={908}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function PollfishCaseStudySection({ study }: PollfishCaseStudySectionProps) {
  const questionnaireEntry =
    study.entries.find((entry) => entry.id === "pollfish-questionnaire") ??
    study.entries.find((entry) => entry.title.toLowerCase().includes("questionnaire")) ??
    study.entries[0];

  const aiEntry =
    study.entries.find((entry) => entry.id === "pollfish-ai-builder") ??
    study.entries.find((entry) => entry.title.toLowerCase().includes("ai builder")) ??
    questionnaireEntry;

  const audiencesEntry =
    study.entries.find((entry) => entry.id === "pollfish-audiences") ??
    study.entries.find((entry) => entry.title.toLowerCase().includes("audiences")) ??
    study.entries[1] ??
    questionnaireEntry;

  if (!questionnaireEntry || !audiencesEntry) {
    return null;
  }

  return (
    <section className="relative bg-[#040404]" id={study.id}>
      <div
        className="pointer-events-none absolute left-1/2 top-[-470px] z-0 -translate-x-1/2"
        style={{
          left: "calc(50% + var(--hero-splash-x, -33px))",
          width: "calc(980px * var(--hero-splash-scale, 1.52))",
          height: "calc(900px * var(--hero-splash-scale, 1.52))",
          opacity: "var(--hero-splash-opacity, 0.3)",
        }}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,14,255,0.38)_0%,rgba(255,14,255,0.2)_34%,rgba(255,14,255,0.08)_62%,rgba(255,14,255,0)_84%)] blur-[76px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <ProjectDivider />

        <div className="py-[120px]">
          <PollfishIntro />
        </div>

        <div className="space-y-12 lg:space-y-[100px]">
          <PollfishFeatureCard
            entry={questionnaireEntry}
            gradient="bg-[linear-gradient(128deg,#eff4f9_12%,#e7ebf4_49%,#e9d4f3_100%)]"
            id="pollfish-questionnaire-builder"
            imageSrc="/images/pollfish-questionnaire.png"
          />

          <AiBuilderFeature entry={aiEntry} />

          <PollfishFeatureCard
            entry={audiencesEntry}
            gradient="bg-[linear-gradient(138deg,#93c3dd_22%,#9dcbb9_66%,#dbede5_88%)]"
            id="pollfish-ai-report"
            imageSrc="/images/pollfish-questionnaire.png"
          />
        </div>
      </div>
    </section>
  );
}
