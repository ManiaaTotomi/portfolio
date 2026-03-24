import { AiBuilderApproachSections } from "@/components/sections/ai-builder-approach-sections";
import { AiBuilderInternalHeaderSection } from "@/components/sections/ai-builder-internal-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { siteContent } from "@/content/site";

export default function AiBuilderCaseStudyPage() {
  return (
    <>
      <main className="bg-[#040404]">
        <AiBuilderInternalHeaderSection content={siteContent} />
        <AiBuilderApproachSections />
      </main>
      <SiteFooter content={siteContent} />
    </>
  );
}
