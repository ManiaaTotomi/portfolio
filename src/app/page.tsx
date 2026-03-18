import { siteContent } from "@/content/site";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <HeroSection content={siteContent} />
      <main id="main-content">
        <AboutSection about={siteContent.about} />
        <ProjectsSection projects={siteContent.projects} />
        <ContactSection
          contact={siteContent.contact}
          email={siteContent.email}
          availability={siteContent.availability}
          location={siteContent.location}
        />
      </main>
      <SiteFooter content={siteContent} />
    </>
  );
}
