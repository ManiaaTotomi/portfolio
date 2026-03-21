import Image from "next/image";
import type { CaseStudy } from "@/content/site";

interface TildCaseStudySectionProps {
  study: CaseStudy;
}

const TILD_INTRO_TITLE = "Construction collaboration platform";
const TILD_INTRO_DESCRIPTION =
  "Tild is a construction collaboration platform that helps teams manage tasks, properties, and contractors. I’m designing the product from an early stage, structuring core workflows and how key entities interact. The focus is on bringing clarity to fragmented processes while maintaining flexibility.";
const TILD_INTRO_DETAILS = [
  "Founding Designer",
  "System Structure",
  "Product Foundations",
] as const;

const AS_BUILT_DESCRIPTION = [
  "Bridging spatial context and task management, enabling teams to navigate work directly through the construction plan.",
  "Structured how spaces, tasks, and updates connect, making project information easier to access, track, and manage.",
] as const;

const AI_INSIGHTS_DESCRIPTION = [
  "Designed an AI-powered workspace that combines conversational guidance with live operational feeds, helping teams detect risks and act early.",
  "Connected project updates, progress tracking, and cost signals into one collaborative view to support faster, better-informed decisions.",
] as const;

function ProjectDivider() {
  return (
    <div className="flex h-[40px] w-full items-center">
      <div className="h-px flex-1 bg-white/10" />
      <div className="mx-8 inline-flex items-center gap-3">
        <span className="h-[7px] w-[7px] rounded-full bg-[#0CFF31]" />
        <p className="font-aeonik text-[16px] uppercase tracking-[1.28px] text-[#0CFF31]">
          TILD
        </p>
      </div>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function TildIntro() {
  return (
    <div className="mx-auto flex w-full max-w-[710px] flex-col items-center gap-8 text-center">
      <p className="font-figtree text-[18px] italic leading-[22px] text-[rgba(194,194,194,0.4)]">
        In progress
      </p>

      <div className="space-y-6">
        <p className="font-aeonik text-[34px] font-semibold leading-[1.12] text-[rgba(194,194,194,0.4)] sm:text-[42px] sm:leading-[45px]">
          {TILD_INTRO_TITLE}
        </p>
        <p className="font-aeonik text-[18px] leading-[1.5] text-[#b5b5b5] sm:text-[20px] sm:leading-[35px]">
          {TILD_INTRO_DESCRIPTION}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
        {TILD_INTRO_DETAILS.map((item, index) => (
          <div className="flex items-center gap-6 sm:gap-8" key={item}>
            <p className="font-figtree text-[15px] font-medium text-[#6d6c6c] sm:text-[16px]">
              {item}
            </p>
            {index < TILD_INTRO_DETAILS.length - 1 && (
              <span className="h-[2px] w-[2px] rounded-full bg-[#6d6c6c]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TildFeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  title: string;
  description: readonly string[];
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[20px] border border-white/[0.12] bg-[rgba(40,40,40,0.35)]">
      <div className="pointer-events-none absolute -left-[220px] top-[110px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(39,188,89,0.22)_0%,rgba(39,188,89,0.08)_42%,rgba(39,188,89,0)_72%)]" />
      <div className="pointer-events-none absolute -right-[260px] bottom-[-260px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(39,188,89,0.22)_0%,rgba(39,188,89,0.08)_42%,rgba(39,188,89,0)_72%)]" />

      <div className="relative grid lg:grid-cols-[1fr_1.25fr]">
        <div className="flex flex-col justify-end gap-8 px-6 pb-10 pt-10 sm:px-10 lg:pb-[56px] lg:pl-[96px] lg:pr-0 lg:pt-14">
          <div className="w-full lg:w-[355px]">
            <h3 className="font-aeonik text-[42px] font-semibold leading-[1.02] text-white lg:text-[52px] lg:leading-[57px]">
              {title}
            </h3>
            <div className="mt-8 space-y-4">
              {description.map((paragraph) => (
                <p
                  className="font-figtree text-[16px] leading-[1.5] text-white lg:text-[18px] lg:leading-[27px]"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[330px] overflow-hidden px-5 py-8 sm:px-8 sm:py-12 lg:min-h-[676px] lg:px-[53px] lg:py-[82px]">
          <div className="relative h-full min-h-[255px] w-full lg:min-h-[510px]">
            <Image
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 95vw"
              src={imageSrc}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function TildCaseStudySection({ study }: TildCaseStudySectionProps) {
  return (
    <section className="relative bg-[#040404]" id={study.id}>
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <ProjectDivider />

        <div className="py-[120px]">
          <TildIntro />
        </div>

        <div className="space-y-12 lg:space-y-[100px]">
          <TildFeatureCard
            description={AS_BUILT_DESCRIPTION}
            imageAlt="Tild as-built plan workspace"
            imageSrc="/images/tild-asbuilt.png"
            title="As Built Plan"
          />

          <TildFeatureCard
            description={AI_INSIGHTS_DESCRIPTION}
            imageAlt="Tild AI insights and live updates interface"
            imageSrc="/images/tild-ai.png"
            title="AI insights & Live updates"
          />
        </div>
      </div>
    </section>
  );
}
