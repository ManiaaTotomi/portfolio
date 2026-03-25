import { AiBuilderApproachSections } from "@/components/sections/ai-builder-approach-sections";
import { AiBuilderInternalHeaderSection } from "@/components/sections/ai-builder-internal-header";
import { InternalCaseStudyNav } from "@/components/sections/internal-case-study-nav";
import { SiteFooter } from "@/components/sections/site-footer";
import { siteContent } from "@/content/site";

export default function AiBuilderCaseStudyPage() {
  return (
    <>
      <main className="bg-[#040404]">
        <AiBuilderInternalHeaderSection content={siteContent} />
        <AiBuilderApproachSections />
        <InternalCaseStudyNav
          previous={{
            href: "/pollfish/questionnaire-builder",
            label: "Previous: Questionnaire Builder",
          }}
        />
      </main>
      <SiteFooter content={siteContent} />
    </>
  );
}
