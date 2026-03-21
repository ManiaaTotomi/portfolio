import { siteContent } from "@/content/site";
import { HeroSection } from "@/components/sections/hero";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <HeroSection content={siteContent} />
      <CaseStudiesSection caseStudies={siteContent.caseStudies} />
      <SiteFooter content={siteContent} />
    </>
  );
}
