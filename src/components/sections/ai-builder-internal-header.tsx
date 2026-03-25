import Image from "next/image";
import type { SiteContent } from "@/content/site";
import { SiteTopBar } from "@/components/sections/site-top-bar";

interface AiBuilderInternalHeaderSectionProps {
  content: Pick<SiteContent, "name" | "cvUrl" | "email" | "nav">;
}

const TITLE = "AI Survey Builder";
const INTRO =
  "I led the redesign of Pollfish’s AI Survey Builder, evolving it from a one-time generator into an intelligent research collaborator. My work focused on redefining the AI experience across the entire survey creation flow: making AI feel like a true partner rather than a tool.";
const DETAILS =
  "I was responsible for UX strategy, interaction design, and visual identity, collaborating closely with product, data, and engineering teams.";
const AI_BUILDER_CHIPS = [
  "AI survey generation",
  "AI editing & refinement",
  "2022 - Present",
] as const;

export function AiBuilderInternalHeaderSection({
  content,
}: AiBuilderInternalHeaderSectionProps) {
  return (
    <header className="relative overflow-hidden bg-[#040404]" id="top">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_44%_at_50%_46%,rgba(115,24,132,0.4)_0%,rgba(45,10,62,0.24)_42%,rgba(4,4,4,0)_78%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[520px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,47,191,0.38)_0%,rgba(118,45,176,0.2)_40%,rgba(4,4,4,0)_78%)] blur-[34px]" />

      <SiteTopBar anchorBasePath="/" content={content} mode="case-study" />

      <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-[1600px] items-center justify-center px-5 sm:min-h-[460px] lg:min-h-[500px]">
        <div className="relative top-[64px] w-full max-w-[710px] text-center sm:top-[68px]">
          <h1 className="font-aeonik text-[44px] font-semibold leading-[1.05] text-white sm:text-[56px]">
            {TITLE}
          </h1>

          <p className="mx-auto mt-7 max-w-[68ch] font-figtree text-[20px] leading-[32px] text-[#e7e3eb]">
            {INTRO}
          </p>
          <p className="mx-auto mt-5 max-w-[68ch] font-figtree text-[20px] leading-[32px] text-[#dfdae4]">
            {DETAILS}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {AI_BUILDER_CHIPS.map((chip, index) => (
              <div className="flex items-center gap-3" key={chip}>
                <span className="rounded-[30px] border border-[#2b2b2b] bg-[rgba(47,47,47,0.24)] px-4 py-2 font-figtree text-[16px] text-[#c2c2c2]">
                  {chip}
                </span>
                {index < AI_BUILDER_CHIPS.length - 1 && (
                  <span className="relative inline-flex h-[3px] w-[3px] rounded-full bg-[#c2c2c2]">
                    <span
                      aria-hidden="true"
                      className="absolute -inset-[4px] rounded-full bg-[radial-gradient(circle,rgba(194,194,194,0.42)_0%,rgba(194,194,194,0)_72%)]"
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-0 pb-0">
        <div className="relative mx-auto w-full max-w-[1600px]">
          <Image
            alt="AI Survey Builder interface preview"
            className="h-auto w-full object-contain"
            height={1573}
            priority
            sizes="(min-width: 1600px) 1600px, 100vw"
            src="/images/AI-builder/images/AI-builder-new.png"
            width={2519}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.18]" />
    </header>
  );
}
