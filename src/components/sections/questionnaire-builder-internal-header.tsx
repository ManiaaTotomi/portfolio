import Image from "next/image";
import type { SiteContent } from "@/content/site";
import { SiteTopBar } from "@/components/sections/site-top-bar";

interface QuestionnaireBuilderInternalHeaderSectionProps {
  content: Pick<SiteContent, "name" | "cvUrl" | "email" | "nav">;
}

const TITLE = "Questionnaire Builder";
const STATUS_NOTE = "CASE STUDY IN PROGRESS";
const INTRO =
  "I led the evolution of Pollfish’s core survey creation system, from quick validation surveys to complex research studies. I introduced advanced methods, logic, and dynamic structures while keeping the builder intuitive for both new and expert researchers.";
const CHIPS = [
  "Survey creation system",
  "Advanced Survey Logic",
  "2018 - Present",
] as const;

export function QuestionnaireBuilderInternalHeaderSection({
  content,
}: QuestionnaireBuilderInternalHeaderSectionProps) {
  return (
    <header
      className="relative overflow-hidden border-b border-white/[0.15] bg-[#141314]"
      id="top"
    >
      <SiteTopBar anchorBasePath="/" content={content} mode="case-study" />

      <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-[1600px] items-center justify-center px-5 sm:min-h-[460px] lg:min-h-[500px]">
        <div className="relative top-[32px] w-full max-w-[710px] text-center sm:top-[36px]">
          <p className="font-figtree mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-white/45 sm:mb-4 sm:text-[13px]">
            {STATUS_NOTE}
          </p>

          <h1 className="font-aeonik text-[44px] font-semibold leading-[1.05] text-white sm:text-[56px]">
            {TITLE}
          </h1>

          <p className="mx-auto mt-7 max-w-[68ch] font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
            {INTRO}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
            {CHIPS.map((chip, index) => (
              <div className="flex items-center gap-4 sm:gap-5" key={chip}>
                <p className="font-figtree text-[15px] font-medium text-[#6d6c6c] sm:text-[16px]">
                  {chip}
                </p>
                {index < CHIPS.length - 1 && (
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
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-0 pb-0">
        <div className="relative mx-auto w-full max-w-[1360px]">
          <Image
            alt="Questionnaire Builder interface preview"
            className="h-auto w-full object-contain"
            height={689}
            priority
            sizes="(min-width: 1380px) 1360px, 100vw"
            src="/images/Questionnaire-Builder/images/questionnaire-header-v2.png"
            width={1104}
          />
        </div>
      </div>
    </header>
  );
}
