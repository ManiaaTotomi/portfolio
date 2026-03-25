import { SiteFooter } from "@/components/sections/site-footer";
import { InternalCaseStudyNav } from "@/components/sections/internal-case-study-nav";
import { QuestionnaireBuilderInternalHeaderSection } from "@/components/sections/questionnaire-builder-internal-header";
import { QuestionnaireBuilderContentSections } from "@/components/sections/questionnaire-builder-content-sections";
import { siteContent } from "@/content/site";

export default function QuestionnaireBuilderCaseStudyPage() {
  return (
    <>
      <main className="bg-[#040404]">
        <QuestionnaireBuilderInternalHeaderSection content={siteContent} />
        <QuestionnaireBuilderContentSections />
        <InternalCaseStudyNav
          next={{
            href: "/pollfish/ai-builder",
            label: "Next: AI Builder",
          }}
        />
      </main>
      <SiteFooter content={siteContent} />
    </>
  );
}
