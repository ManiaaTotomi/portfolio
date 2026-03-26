import type { SiteContent } from "@/content/site";
import { HeroAssistantPanel } from "@/components/sections/hero-assistant-panel";
import { HeroImageStrip } from "@/components/sections/hero-image-strip";
import { SiteTopBar } from "@/components/sections/site-top-bar";

interface HeroSectionProps {
  content: SiteContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const assistantDisclaimer =
    "This assistant is an in-progress AI experiment. At this stage, it’s meant to demonstrate the idea, not a complete working implementation.";

  return (
    <header className="relative overflow-visible bg-[#040404]" id="top">
      <SiteTopBar content={content} />

      <HeroAssistantPanel
        assistantButtonLabel={content.assistantButtonLabel}
        assistantDisclaimer={assistantDisclaimer}
      />

      <div className="relative z-10 mx-auto mt-[40px] w-full max-w-[1720px] px-0 pb-[124px] sm:mt-[48px] sm:pb-[140px]">
        <HeroImageStrip />
      </div>
    </header>
  );
}
