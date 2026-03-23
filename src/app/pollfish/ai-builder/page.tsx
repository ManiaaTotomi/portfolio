import { AiBuilderInternalHeaderSection } from "@/components/sections/ai-builder-internal-header";
import { siteContent } from "@/content/site";

export default function AiBuilderCaseStudyPage() {
  return (
    <main className="bg-[#040404]">
      <AiBuilderInternalHeaderSection content={siteContent} />
    </main>
  );
}
