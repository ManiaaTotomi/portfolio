import type { SiteContent } from "@/content/site";
import { HeroAssistantPanel } from "@/components/sections/hero-assistant-panel";
import { HeroImageStrip } from "@/components/sections/hero-image-strip";
import { SiteTopBar } from "@/components/sections/site-top-bar";

interface HeroSectionProps {
  content: SiteContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <header className="relative overflow-visible bg-[#040404]" id="top">
      <SiteTopBar content={content} />

      <HeroAssistantPanel
        assistantButtonLabel={content.assistantButtonLabel}
        assistantDisclaimer={content.assistantDisclaimer}
        assistantPlaceholder={content.assistantPlaceholder}
        assistantPrompts={content.assistantPrompts}
      />

      <div className="relative z-10 mx-auto mt-20 w-full max-w-[1720px] px-0 pb-24 sm:mt-[108px] sm:pb-[140px]">
        <HeroImageStrip />
      </div>
    </header>
  );
}
