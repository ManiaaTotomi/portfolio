export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  summary: string;
  impact: string;
  href: string;
  image: string;
  year: string;
  tags: string[];
}

export interface AboutHighlight {
  label: string;
  value: string;
}

export interface AboutContent {
  title: string;
  description: string;
  paragraphs: string[];
  highlights: AboutHighlight[];
}

export interface ContactContent {
  title: string;
  description: string;
  submitLabel: string;
}

export interface SeoContent {
  siteName: string;
  description: string;
  url: string;
  keywords: string[];
  ogAlt: string;
}

export interface SiteContent {
  name: string;
  role: string;
  headline: string;
  intro: string;
  location: string;
  availability: string;
  email: string;
  nav: NavItem[];
  socialLinks: SocialLink[];
  about: AboutContent;
  projects: Project[];
  contact: ContactContent;
  seo: SeoContent;
}

export const siteContent: SiteContent = {
  name: "Mania Totomi",
  role: "Product Designer + Frontend Engineer",
  headline: "I build expressive, conversion-focused websites for founders and brands.",
  intro:
    "From concept to production, I merge interaction design and engineering to ship digital experiences that feel premium and perform in the real world.",
  location: "London, UK",
  availability: "Open for freelance projects and select full-time roles",
  email: "hello@ilanlevy.dev",
  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
  about: {
    title: "Crafting design systems that are as strategic as they are beautiful.",
    description:
      "I partner with teams that care about clarity, speed, and craftsmanship.",
    paragraphs: [
      "Over the last decade, I have helped startups and enterprise teams turn complex products into interfaces people can trust instantly.",
      "My workflow blends product thinking, motion-aware UI design, and robust frontend architecture, so teams can iterate quickly without design drift.",
    ],
    highlights: [
      { label: "Years in Product", value: "9+" },
      { label: "Projects Shipped", value: "42" },
      { label: "Average Lighthouse", value: "96+" },
    ],
  },
  projects: [
    {
      title: "Aurora Commerce",
      summary:
        "A premium ecommerce rebrand with a modular editorial system and personalized product journeys.",
      impact: "Lifted conversion rate by 24% in the first quarter after launch.",
      href: "https://example.com",
      image: "/projects/aurora.svg",
      year: "2025",
      tags: ["Next.js", "Design System", "Experimentation"],
    },
    {
      title: "Atlas Health",
      summary:
        "Patient-facing care platform redesigned for accessibility and lower support load across booking flows.",
      impact: "Reduced form abandonment by 31% and support tickets by 18%.",
      href: "https://example.com",
      image: "/projects/atlas.svg",
      year: "2024",
      tags: ["UX Architecture", "A11y", "Data-informed Design"],
    },
    {
      title: "Loom Analyticls",
      summary:
        "Marketing site and product launch experience for a B2B data intelligence startup.",
      impact: "Improved qualified lead volume by 2.1x over the prior launch.",
      href: "https://example.com",
      image: "/projects/loom.svg",
      year: "2023",
      tags: ["Motion", "Brand Systems", "Growth"],
    },
  ],
  contact: {
    title: "Let’s build your next release.",
    description:
      "Share your timeline, goals, and the product challenge you are facing. I usually respond within one business day.",
    submitLabel: "Send Message",
  },
  seo: {
    siteName: "Mania Totomi Portfolio",
    description:
      "Portfolio website for Mania Totomi: product designer and frontend engineer creating modern, high-performing digital experiences.",
    url: "https://example.com",
    keywords: [
      "portfolio",
      "product designer",
      "frontend engineer",
      "next.js",
      "web design",
    ],
    ogAlt: "A warm-toned portfolio homepage with featured project highlights.",
  },
};
