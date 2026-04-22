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

export interface CaseStudyDetailGroup {
  title: string;
  items: string[];
}

export type ShowcaseType =
  | "pollfish-ai"
  | "pollfish-questionnaire"
  | "pollfish-audiences"
  | "tild"
  | "ctrleat"
  | "minddy";

export interface CaseStudyShowcase {
  type: ShowcaseType;
  title?: string;
  subtitle?: string;
  chips?: string[];
  listItems?: string[];
  secondaryList?: string[];
}

export interface CaseStudyEntry {
  id: string;
  tag?: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  details: CaseStudyDetailGroup[];
  ctaLabel?: string;
  imageLabel?: string;
  showcase?: CaseStudyShowcase;
}

export interface CaseStudy {
  id: string;
  navLabel: string;
  entries: CaseStudyEntry[];
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
  caseStudies: CaseStudy[];
}

export const siteContent: SiteContent = {
  name: "Mania Totomi",
  cvUrl: "/cv",
  role: "Lead Product Designer",
  heroKicker: "Hey, I’m Mania!",
  headline: "Product Designer building scalable B2B SaaS & AI experiences",
  intro:
    "I design and scale complex SaaS products, from foundational systems to AI-powered workflows.",
  heroBody: [
    "Currently Lead Designer at Pollfish, while collaborating on selected freelance product initiatives.",
  ],
  assistantDisclaimer:
    "This assistant is an in-progress AI experiment. At this stage, it’s meant to demonstrate the idea, not a complete working implementation.",
  assistantPrompts: [
    "How do you use AI in your day to day design workload?",
    "What is your current responsibilities in Pollfish?",
    "How do you work with engineers and PMs?",
  ],
  assistantPlaceholder:
    "Type a question about my design approach or experience…",
  assistantButtonLabel: "Ask me",
  location: "London, UK",
  availability: "Open for freelance projects and select full-time roles",
  email: "mania.totomi@gmail.com",
  nav: [
    { label: "Pollfish", href: "#pollfish" },
    { label: "Project alpha", href: "#tild" },
    { label: "CtrlEat", href: "#ctrleat" },
    { label: "Minddy", href: "#minddy" },
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
      title: "Loom Analytics",
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
    ogAlt: "A dark portfolio homepage with featured project highlights.",
  },
  caseStudies: [
    {
      id: "pollfish",
      navLabel: "Pollfish",
      entries: [
        {
          id: "pollfish-overview",
          title: "Pollfish",
          subtitle: "Market Research / SaaS platform",
          paragraphs: [
            "Pollfish is a global market research platform used by brands, agencies, and researchers to design surveys, target audiences, and analyze results at scale.",
            "I joined in 2018 as the first in-house designer and helped shape the product from early-stage startup to post-acquisition maturity. Over seven years, I designed and scaled the core survey builder, advanced audience targeting system, analytics dashboards, and most recently, AI-powered workflows.",
            "The challenge was building a flexible system capable of handling complex logic, quotas, and large-scale data while keeping the experience intuitive for both researchers and enterprise teams.",
          ],
          details: [],
        },
        {
          id: "pollfish-ai-builder",
          tag: "Pollfish",
          title: "AI Builder",
          paragraphs: [
            "The AI Builder brings natural-language survey creation directly into Pollfish’s core workflow. Users can generate, refine, and restructure questionnaires using AI, including support for complex research methods and advanced survey logic.",
            "I led the UX strategy and interaction design to ensure AI enhanced, rather than disrupted, complex survey logic and professional research standards.",
          ],
          details: [
            {
              title: "Role",
              items: ["Lead Product Designer"],
            },
            {
              title: "Scope",
              items: [
                "AI survey generation",
                "AI editing & refinement",
                "Survey builder logic integration",
              ],
            },
            {
              title: "Impact",
              items: [
                "Introduced AI-assisted survey creation",
                "Reduced friction in survey setup",
                "Established AI interaction patterns",
              ],
            },
          ],
          ctaLabel: "View case study",
          imageLabel: "AI BUILDER",
          showcase: {
            type: "pollfish-ai",
            title: "AI Builder",
            chips: ["Translate survey", "Set tone", "Rephrase"],
            listItems: [
              "Q1 Type your question here",
              "01 so inexpensive that you would question the quality",
              "02 is a bargain - a great buy for the money",
              "03 is getting expensive, but you still might consider it",
              "04 would you begin to think the item is too expensive",
            ],
            secondaryList: [
              "Help me find the right price for my product",
              "Welcome to AI Builder",
              "Create or improve your survey with AI…",
            ],
          },
        },
        {
          id: "pollfish-questionnaire",
          tag: "Pollfish",
          title: "Questionnaire Builder",
          paragraphs: [
            "The Questionnaire Builder is the core of Pollfish’s survey creation workflow, allowing users to design, structure, and manage surveys with support for complex logic and advanced configuration.",
            "I lead the design of the experience, structuring how questions, logic, and settings are created and managed within the builder. The focus is on making complex functionality easier to use, without limiting flexibility for advanced research needs.",
          ],
          details: [
            {
              title: "Role",
              items: ["Lead Product Designer"],
            },
            {
              title: "Scope",
              items: [
                "Survey creation workflows",
                "Survey structure and editing",
                "Logic configuration",
              ],
            },
            {
              title: "Impact",
              items: [
                "Designed the core product workflow",
                "Improved usability for complex survey logic",
                "Foundation for scalable features",
              ],
            },
          ],
          ctaLabel: "View case study",
          imageLabel: "Questionnaire builder",
          showcase: {
            type: "pollfish-questionnaire",
            title: "Questionnaire Builder",
            listItems: [
              "Survey creation workflows",
              "Survey structure and editing",
              "Logic configuration",
            ],
            secondaryList: [
              "Questionnaire builder",
              "Role: Lead Product Designer",
              "Designed the core product workflow",
            ],
          },
        },
        {
          id: "pollfish-audiences",
          tag: "Pollfish",
          title: "Multiple Audiences",
          paragraphs: [
            "Designing a system that allows researchers to run surveys across multiple audiences, each with different targeting, quotas, and constraints.",
            "I led the design of the experience, structuring how audiences are created, compared, and managed within a single project. The focus was on maintaining flexibility while ensuring feasibility and clarity at scale",
          ],
          details: [
            {
              title: "Role",
              items: ["Lead Product Designer"],
            },
            {
              title: "Scope",
              items: [
                "AI survey generation",
                "AI editing & refinement",
                "Survey builder logic integration",
              ],
            },
            {
              title: "Impact",
              items: [
                "Introduced AI-driven survey creation",
                "Faster survey setup workflows",
                "AI interaction patterns",
              ],
            },
          ],
          ctaLabel: "View case study",
          imageLabel: "Questionnaire created by AI",
          showcase: {
            type: "pollfish-audiences",
            title: "Multiple Audiences",
            listItems: [
              "Introduced AI-driven survey creation",
              "Faster survey setup workflows",
              "AI interaction patterns",
            ],
            secondaryList: [
              "Questionnaire created by AI",
              "Audience targeting",
              "Enterprise survey logic",
            ],
          },
        },
      ],
    },
    {
      id: "tild",
      navLabel: "Project alpha",
      entries: [
        {
          id: "tild-overview",
          title: "Project alpha",
          subtitle: "Construction planning / collaboration platform",
          paragraphs: [
            "Project Alpha (placeholder name) is a construction collaboration platform designed to help teams manage tasks, properties, and contractors in one place, improving coordination across complex projects.",
            "I joined as a product designer to help define the product from an early stage, shaping core workflows and structuring how different entities—tasks, properties, and stakeholders—connect and interact within the system.",
            "The challenge was designing a flexible yet clear system in a fragmented industry, where workflows are often inconsistent and difficult to standardize, while ensuring the product remains intuitive for everyday use.",
          ],
          details: [
            {
              title: "Role",
              items: ["Product Designer (0→1)"],
            },
            {
              title: "Scope",
              items: ["End-to-end product design"],
            },
            {
              title: "Focus",
              items: [
                "Workflow design, system structure, collaboration",
              ],
            },
            {
              title: "Context",
              items: ["Early-stage product"],
            },
          ],
          imageLabel: "build plan",
          showcase: {
            type: "tild",
            title: "Construction Overview",
            chips: [
              "Construction Overview",
              "All tasks",
              "As Built Plan",
              "Contractors",
              "Documents",
            ],
            listItems: [
              "A1 Install kitchen wiring",
              "A1 Living room lighting",
              "A2 Bricks for bedroom wall",
              "A2 Install sink",
            ],
            secondaryList: ["+ New Task", "In progress", "Completed", "Idle"],
          },
        },
      ],
    },
    {
      id: "ctrleat",
      navLabel: "CtrlEat",
      entries: [
        {
          id: "ctrleat-overview",
          title: "CtrlEat",
          subtitle: "Food discovery / mobile app concept",
          paragraphs: [
            "CtrlEat is a consumer mobile concept focused on personalized meal discovery based on dietary preferences and habits.",
            "I designed the onboarding and preference-selection flow, then shaped the restaurant browsing experience around quick, scannable decision making.",
            "The challenge was balancing rich recommendation context with a clean visual rhythm that still feels playful and approachable.",
          ],
          details: [
            {
              title: "Role",
              items: ["Product Designer"],
            },
            {
              title: "Scope",
              items: [
                "Onboarding & personalization",
                "Restaurant discovery",
                "Visual direction",
                "Localization-ready UI",
              ],
            },
            {
              title: "Impact",
              items: [
                "Clear preference-first entry experience",
                "Reusable mobile component patterns",
                "Strong concept narrative for MVP",
              ],
            },
          ],
          showcase: {
            type: "ctrleat",
            title: "CtrlEat.",
            subtitle:
              "Let’s personalize your meals. Are you vegan, vegetarian, or diabetic?",
            chips: ["Vegetarian", "Ξεκίνα!", "Featured-Restaurants"],
            listItems: [
              "Joshua-Tree-Cafe",
              "Min-order:-$6.00",
              "2,7-km  $$",
              "Το-Μαύρο-Πρόβατο",
              "40’",
              "Discover-more…",
            ],
            secondaryList: ["Τριβωνιανού 13"],
          },
        },
      ],
    },
    {
      id: "minddy",
      navLabel: "Minddy",
      entries: [
        {
          id: "minddy-overview",
          title: "Minddy",
          subtitle: "Habit building app",
          paragraphs: [
            "The product: Minddy is a wellness app designed to help users build sustainable habits through daily challenges and personalized goal-setting. It focuses on key areas like better sleep, fitness, focus, motivation, and healthy eating, encouraging small, consistent actions that lead to lasting behavior change.",
            "My role: This was my thesis project in 2018, where I designed the complete product from concept to final screens. I created the brand identity, custom illustrations, visual system, and user flows, exploring consumer-facing design, gamification, and onboarding psychology in ways I don't typically work on in my B2B role.",
          ],
          details: [
            {
              title: "Thesis project",
              items: [
                "Focus: Brand identity, illustrations, user flows, onboarding",
                "Stage: Concept & prototype",
              ],
            },
          ],
          showcase: {
            type: "minddy",
            title: "Choose your first challenge",
            subtitle: "Let’s start with one of these. You can add more later",
            chips: [
              "Better sleep",
              "Fitness",
              "Motivation",
              "Productivity",
              "Self-discipline",
              "Focus",
              "Anxiety",
              "Healthy diet",
            ],
            listItems: [
              "Meditate for 15 minutes",
              "Eat a healthy breakfast",
              "Drink 2L of water",
              "Exercise for 30 minutes",
              "Stay focused for 1h",
              "Read 50 pages of a book",
            ],
            secondaryList: [
              "Today’s challenges (2)",
              "Good morning Mania!",
              "Meditation",
              "Anxiety release",
              "7 days of calm",
              "Making happiness",
            ],
          },
        },
      ],
    },
  ],
};
