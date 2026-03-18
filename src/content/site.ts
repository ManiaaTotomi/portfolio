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
  cvUrl: string;
  role: string;
  heroKicker: string;
  headline: string;
  intro: string;
  heroBody: string[];
  assistantDisclaimer: string;
  assistantPrompts: string[];
  assistantPlaceholder: string;
  assistantButtonLabel: string;
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
  cvUrl: "#",
  role: "Lead Product Designer",
  heroKicker: "Hey, I’m Mania!",
  headline: "Lead Product Designer building scalable B2B SaaS & AI experiences",
  intro:
    "I design and scale complex SaaS products, from foundational systems to AI-powered workflows.",
  heroBody: [
    "Currently Lead Designer at Pollfish, while collaborating on selected freelance product initiatives.",
  ],
  assistantDisclaimer:
    "This assistant is a personal experiment. It can answer questions about my experience, process and work but it can make mistakes.",
  assistantPrompts: [
    "Find balance between empathy and constraints",
    "How do use AI in your work?",
    "How do you work with engineers and PMs?",
  ],
  assistantPlaceholder:
    "Type a question about my design approach or experience…",
  assistantButtonLabel: "Ask AI",
  location: "London, UK",
  availability: "Open for freelance projects and select full-time roles",
  email: "hello@ilanlevy.dev",
  nav: [
    { label: "Pollfish", href: "#projects" },
    { label: "TILD", href: "#projects" },
    { label: "CtrlEat", href: "#projects" },
    { label: "Minddy", href: "#projects" },
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
