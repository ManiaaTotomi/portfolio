import Link from "next/link";
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
  "Scalable product foundation",
  "Design systems",
  "AI workflows",
  "2018 - Today",
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
        <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#f70eff]">
          <span
            aria-hidden="true"
            className="absolute -inset-[5px] rounded-full bg-[radial-gradient(circle,rgba(247,14,255,0.48)_0%,rgba(247,14,255,0)_72%)]"
          />
        </span>
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
        <p className="font-aeonik text-[48px] font-semibold leading-[55px] text-[#5F5F5F]">
          {POLLFISH_INTRO_TITLE}
        </p>
        <p className="mx-auto max-w-[68ch] font-figtree text-[20px] leading-[32px] text-[#f1f1f1]">
          {POLLFISH_INTRO_DESCRIPTION}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
        {POLLFISH_INTRO_DETAILS.map((item, index) => (
          <div className="flex items-center gap-4 sm:gap-5" key={item}>
            <p className="font-figtree text-[15px] font-medium text-[#6d6c6c] sm:text-[16px]">
              {item}
            </p>
            {index < POLLFISH_INTRO_DETAILS.length - 1 && (
              <span className="relative inline-flex h-[2px] w-[2px] rounded-full bg-[#6d6c6c]">
                <span
                  aria-hidden="true"
                  className="absolute -inset-[4px] rounded-full bg-[radial-gradient(circle,rgba(109,108,108,0.45)_0%,rgba(109,108,108,0)_72%)]"
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PollfishFeatureCard({
  entry,
  href = "#",
  id,
  gradient,
  imageSrc,
  imageClassName = "object-contain",
  removeImageWrapper = false,
  isComingSoon = false,
}: {
  entry: CaseStudyEntry;
  href?: string;
  id: string;
  gradient: string;
  imageSrc: string;
  imageClassName?: string;
  removeImageWrapper?: boolean;
  isComingSoon?: boolean;
}) {
  return (
    <article
      className="grid overflow-hidden rounded-[20px] bg-white lg:grid-cols-[1fr_1.25fr]"
      id={id}
    >
      <div className="flex flex-col justify-end gap-8 px-6 pb-10 pt-10 sm:px-10 lg:pb-[56px] lg:pl-[96px] lg:pr-0 lg:pt-14">
        <div className="w-full lg:w-[440px]">
          <h3 className="font-aeonik text-[48px] font-semibold leading-[55px] text-[#222]">
            {entry.title}
          </h3>

          <div className="mt-8 space-y-3">
            {entry.paragraphs.slice(0, 2).map((paragraph) => (
              <p
                className="max-w-[70ch] font-figtree text-[20px] leading-[32px] text-[#222]"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {isComingSoon ? (
            <p className="font-figtree mt-8 text-[16px] italic text-[#222]">Coming soon</p>
          ) : (
            <Link
              className="font-figtree mt-9 inline-flex items-center gap-2 rounded-full border border-[#222]/12 bg-[#222] px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(34,34,34,0.18)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-[1px] hover:bg-[#171717] hover:shadow-[0_10px_24px_rgba(34,34,34,0.14),8px_10px_24px_rgba(242,117,233,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#222]/35"
              href={href}
            >
              {entry.ctaLabel ?? "View case study"}
              <ArrowRightIcon />
            </Link>
          )}
        </div>
      </div>

      <div
        className={`relative min-h-[330px] overflow-hidden px-5 py-8 sm:px-8 sm:py-12 lg:min-h-[676px] lg:px-[53px] lg:py-[82px] ${removeImageWrapper ? "flex flex-col justify-center" : ""} ${gradient}`}
      >
        {removeImageWrapper ? (
          <Image
            alt={`${entry.title} interface preview`}
            className={`h-auto w-full ${imageClassName}`}
            height={1379}
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 95vw"
            src={imageSrc}
            width={2208}
          />
        ) : (
          <div className="relative h-full min-h-[255px] w-full rounded-[9px] shadow-[0_2px_31px_rgba(14,46,63,0.11)] lg:min-h-[510px]">
            <Image
              alt={`${entry.title} interface preview`}
              fill
              className={imageClassName}
              sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 95vw"
              src={imageSrc}
            />
          </div>
        )}
      </div>
    </article>
  );
}

function AiBuilderFeature({ entry }: { entry: CaseStudyEntry }) {
  const aiQuestionCards = [
    {
      id: "Q1",
      prompt: "At what price ($USD) would you consider the product to be...",
      answers: [
        "so inexpensive that you would question the quality and not consider it?",
        "is a bargain - a great buy for the money?",
        "is getting expensive, but you still might consider it?",
        "would you begin to think the item is too expensive to consider?",
      ],
    },
    {
      id: "Q2",
      prompt:
        "What is the maximum amount you would be willing to spend on this product/service?",
    },
    {
      id: "Q3",
      prompt:
        "What is the minimum amount you would be willing to spend on this product/service?",
    },
    {
      id: "Q4",
      prompt:
        "How important is price when you are considering purchasing a new product/service?",
    },
    {
      id: "Q5",
      prompt:
        "How would you rate the value for money of similar products/services you have purchased in the past?",
    },
  ] as const;

  return (
    <article className="relative min-h-[760px] py-8 lg:py-[86px]" id="pollfish-ai-builder">
      <div className="pointer-events-none absolute -inset-x-[14%] -inset-y-[34%] bg-[radial-gradient(42%_48%_at_46%_52%,rgba(215,39,189,0.66)_0%,rgba(215,39,189,0.26)_34%,rgba(215,39,189,0)_78%)]" />
      <div className="pointer-events-none absolute -left-[260px] bottom-[-330px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(58,36,146,0.72)_0%,rgba(58,36,146,0.28)_44%,rgba(58,36,146,0)_78%)] blur-[72px]" />
      <div className="pointer-events-none absolute right-[-220px] top-[-220px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(173,30,175,0.58)_0%,rgba(173,30,175,0.22)_46%,rgba(173,30,175,0)_80%)] blur-[76px]" />

      <div className="relative z-10 grid gap-10 px-6 sm:px-10 lg:px-[96px] xl:grid-cols-[470px_1fr] xl:gap-[80px]">
        <div className="self-center space-y-8 xl:w-[440px]">
          <h3 className="font-aeonik text-[48px] font-semibold leading-[55px] text-white">
            AI Builder
          </h3>

          <div className="space-y-3">
            {entry.paragraphs.slice(0, 2).map((paragraph) => (
              <p
                className="max-w-[70ch] font-figtree text-[20px] leading-[32px] text-[#f1f1f1]"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            className="font-figtree inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2.5 text-[14px] font-semibold text-[#171717] shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-[1px] hover:bg-[#f2f2f2] hover:shadow-[0_12px_28px_rgba(0,0,0,0.22),8px_10px_24px_rgba(242,117,233,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
            href="/pollfish/ai-builder"
          >
            View case study
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="relative min-h-[760px] min-[834px]:min-h-[900px] xl:min-h-[730px]">
          <div className="absolute left-0 top-[70px] hidden w-[58%] max-w-[440px] space-y-3 xl:block lg:space-y-[17px]">
            {aiQuestionCards.map((questionCard) => (
              <div
                className="rounded-[11px] border border-white/15 bg-[rgba(255,255,255,0.08)] px-4 py-3 text-white/95 backdrop-blur-[1px] lg:px-[22px] lg:py-[16px]"
                key={questionCard.id}
              >
                <div className="flex items-start gap-2.5">
                  <p className="font-roboto text-[13px] font-bold leading-[20px] text-white">
                    {questionCard.id}
                  </p>
                  <p className="font-roboto text-[12px] leading-[1.45] text-white lg:text-[13px]">
                    {questionCard.prompt}
                  </p>
                </div>

                {"answers" in questionCard && (
                  <div className="mt-4 space-y-2.5">
                    {questionCard.answers.map((answer, answerIndex) => (
                      <div className="flex items-start gap-2" key={answer}>
                        <p className="font-roboto text-[12px] leading-[1.45] text-white/50 lg:text-[13px]">
                          {String(answerIndex + 1).padStart(2, "0")}
                        </p>
                        <p className="font-roboto text-[12px] leading-[1.45] text-white lg:text-[13px]">
                          {answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 w-[72%] max-w-[404px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[13px] bg-white shadow-[0_4px_22px_rgba(59,35,111,0.2)] xl:left-auto xl:right-0 xl:top-0 xl:w-[404px] xl:max-w-[404px] xl:translate-x-0 xl:translate-y-0">
            <Image
              alt="AI Builder chat interface"
              className="h-auto w-full object-cover"
              height={1648}
              quality={60}
              sizes="(min-width: 1280px) 404px, (min-width: 834px) 62vw, 72vw"
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
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,14,255,0.38)_0%,rgba(255,14,255,0.2)_34%,rgba(255,14,255,0.08)_62%,rgba(255,14,255,0)_84%)] blur-[56px]" />
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
            href="/pollfish/questionnaire-builder"
            id="pollfish-questionnaire-builder"
            removeImageWrapper
            imageSrc="/images/Homepage/images/questionnaire-builder.png"
          />

          <AiBuilderFeature entry={aiEntry} />

          <PollfishFeatureCard
            entry={audiencesEntry}
            gradient="bg-[linear-gradient(138deg,#93c3dd_22%,#9dcbb9_66%,#dbede5_88%)]"
            id="pollfish-ai-report"
            isComingSoon
            removeImageWrapper
            imageSrc="/images/Homepage/images/audiences-new.png"
          />
        </div>
      </div>
    </section>
  );
}
