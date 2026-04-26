"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FIRST_APPROACH_TITLE = "First approach 2022";
const FIRST_APPROACH_COPY =
  "In 2022, we introduced AI survey generation in two places: on the homepage to attract users, and in the My Surveys page where they could describe their research goal and have AI build a complete questionnaire. The AI would generate questions based on their input, show a preview (user had to decline or accept), and create the survey.";

const PAIN_POINTS_TITLE = "Pain points of this approach";
const PAIN_POINTS_COPY =
  "We knew this approach had limitations, but we deliberately kept it simple. We wanted to ship quickly, test user adoption, and validate whether AI-powered survey creation had real value before investing in a more complex solution.";

const PAIN_POINT_ITEMS = [
  "There were no ongoing AI support after creation.",
  "There were no collaboration with AI once the survey was built.",
  "Had to start completely over if they changed direction.",
  "It was only a one time generator.",
] as const;

const NEW_APPROACH_TITLE = "New approach, 2024";
const NEW_APPROACH_OPPORTUNITY_TITLE = "The opportunity";
const NEW_APPROACH_OPPORTUNITY_COPY =
  "Revisiting the AI Builder in 2024 gave us the opportunity to evolve it from a one-time generator into a continuous research advisor, supporting users from the first question to final refinement and enabling advanced research methods without requiring specialized expertise.";
const NEW_APPROACH_ROLE_TITLE = "My role";
const NEW_APPROACH_ROLE_COPY =
  "I led early cross-functional workshops with business, product, engineering, and data to define the role AI should play in Pollfish.";
const NEW_APPROACH_ROLE_BULLETS = [
  "Identified core user pain points and operational constraints.",
  "Aligned on where AI could create genuine researcher value.",
  "Translated insights into clear design principles that shaped the product direction.",
] as const;
const WORKSHOP_CAPTION =
  "Workshop outcomes that shaped AI Builder's constraints, user needs, and product direction.";

const EXECUTION_TITLE = "From principles to execution";
const EXECUTION_COPY =
  "Once the strategic direction was defined, I drove its execution by:";
const EXECUTION_STEPS = [
  "Drove iterative exploration of the AI direction",
  "Built cross-functional alignment through recurring stakeholder reviews",
  "Partnered with engineering to ensure technical feasibility",
  "Translated early insights into tangible experience concepts",
  "Worked closely with data team to validate AI capabilities within strict-time constraints",
  "Facilitated fast feedback loops to accelerate decision-making",
] as const;

const VISUAL_EXPLORATION_SECTION_TITLE = "Visual Exploration";
const VISUAL_EXPLORATION_TITLE = "Exploration";
const VISUAL_EXPLORATION_PARAGRAPHS = [
  "I led the end-to-end design direction for the AI Builder, from early problem framing through execution and refinement.",
  "I translated workshop outcomes into clear design principles, guiding exploration across interaction models, visual identity, and system behavior. I drove rapid iteration cycles, presenting work regularly to stakeholders, incorporating feedback, and refining solutions as constraints became clearer.",
] as const;

const ALIGN_INTENT_TITLE = "Align intent with constraints";
const ALIGN_INTENT_PARAGRAPHS = [
  "Throughout the process, I worked closely with engineering and the data team to ensure feasibility, validate AI capabilities, and align design intent with response-time and technical constraints.",
  "The interface itself went through multiple iterations. I explored different color palettes (green, magenta, dark, gradients), various layouts, and different ways to structure the welcome experience. Each iteration was presented to the broader team, product, engineering, and business stakeholders, gathering feedback that shaped the next round of designs.",
  "The back-and-forth was constant, but it ensured we were building something that worked for users and aligned with business goals.",
] as const;

const VISUAL_IDENTITY_TITLE = "Visual identity & branding";
const VISUAL_IDENTITY_PARAGRAPHS = [
  "Through this process, the design evolved from a simple chat panel to a task-oriented system with the \"What do you want to do today?\" framework. Working with the support team's insights about common survey types, we shifted from general topic categories to specific use case cards.",
  "I designed all the iconography and visual elements to create a cohesive AI brand within Pollfish. The purple/magenta color palette distinguishes AI features while complementing the main Pollfish blue. Each of the eight icons (for survey types and AI actions) follows the same visual language, simple, recognizable, and clearly connected to the AI brand.",
  "I even designed a subtle animation for the gradient header bar, creating specs for the development team that showed how I wanted it to move smoothly rather than remain static. These details mattered, they make AI feel premium and intentional, not tacked on.",
] as const;

const POSITIONING_AI_TITLE = "Positioning AI as a tool, not a chatbot";
const FIRST_DECISIONS_TITLE = "First desicions";
const FIRST_DECISIONS_PARAGRAPHS = [
  "My first decision was placement. A floating bottom-right button felt like a support chatbot and conflicted with our existing help chat. I needed AI to feel like a creation tool, not assistance.",
  "I explored placing \"Ask AI\" next to \"Add question.\" It worked well in the empty state and remains available at the bottom of the survey - close to where users actively build.",
  "However, as surveys grow longer, that placement alone isn't sufficient. To ensure consistent access, I also introduced a persistent entry point in the top-right corner alongside preview and versioning controls.",
  "This multi-entry approach keeps AI contextual during creation, while also making it globally accessible - reinforcing that it's a core tool, not an afterthought.",
] as const;
const EXPLORING_CTA_CAPTION = "Exploring CTA placements";
const ACTIVE_QUESTIONNAIRE_CAPTION = "Final placement in an active questionnaire";
const EMPTY_QUESTIONNAIRE_CAPTION = "Final placement in an empty questionnaire";
const MAKING_GUIDED_TITLE = "Making AI feel guided, not over-whelming";
const MAKING_GUIDED_PARAGRAPHS = [
  "Using the insights from our support team about common survey types, I designed specific starting points: \"Create a survey,\" \"Brand feedback,\" \"Product feedback,\" \"The right pricing,\" \"Conjoint analysis,\" and \"Max Diff analysis.\"",
  "This gave users a clear place to begin while still allowing free-form requests through the text input below. The \"What do you want to do today?\" framing made AI feel helpful rather than intimidating.",
] as const;
const ADAPTING_TITLE = "Adapting to context";
const ADAPTING_PARAGRAPH_PREFIX = "The AI interface changes ";
const ADAPTING_PARAGRAPH_EMPHASIS =
  "based on whether you're starting fresh or editing an existing survey";
const ADAPTING_PARAGRAPH_SUFFIX =
  '. In an empty state, it offers creation tasks. When a survey already exists, different options appear: "Translate survey," "Set tone," "Rephrase."';
const ADAPTING_PARAGRAPH_SECONDARY =
  "This contextual awareness makes AI feel like a true collaborator that understands where you are in the process.";

const PROGRESSIVE_DISCLOSURE_TITLE = "Progressive disclosure";
const PROGRESSIVE_DISCLOSURE_PARAGRAPHS = [
  "I wanted to give users control without overwhelming them. When someone selects an option like \"Translate survey,\" a follow-up appears with language choices rather than showing everything at once.",
  "This contextual awareness makes AI feel like a true collaborator that understands where you are in the process.",
] as const;

const QUESTION_ASSISTANCE_TITLE = "Question & answer level assistance";
const QUESTION_ASSISTANCE_PARAGRAPHS = [
  "Beyond the main AI Builder interface, I designed AI assistance at the micro level for every individual question and answer. Users can click an AI icon next to any question or answer to access options like \"Generate answers,\" \"Rephrase,\" \"Set tone,\" or \"Translate.\"",
] as const;

const IMPACT_TITLE = "Business & personal impact";
const IMPACT_ROWS = [
  {
    title: "Results",
    paragraphs: [
      "The redesigned AI Builder has seen strong adoption, with the majority of Pollfish users now using it, especially first-time users who rely on AI to create their research from scratch. Support tickets related to question quality have decreased, and direct communication around survey structure has been significantly reduced.",
      "More importantly, AI has become part of the natural workflow. Users don't just generate a survey and move on, they collaborate with AI throughout the process, from initial creation to final refinements.",
    ],
  },
  {
    title: "What I learnt",
    paragraphs: [
      "This project reinforced that designing AI features isn't about showcasing technical capability, it's about defining where AI adds real value. Even the most powerful tool is ineffective if users don't know where to start or how to use it.",
      "Working under constraints, tight timelines, no formal user research, and multiple stakeholder needs, taught me to be resourceful. Collaborating closely with the support team to understand user patterns proved just as valuable as formal research, and in many cases allowed for faster iteration.",
    ],
  },
  {
    title: "What I would change",
    paragraphs: [
      "If I were to approach this again, I would push harder for early user testing, even through informal sessions. While internal feedback helped shape a strong product, direct input from users earlier in the process would have accelerated our learning.",
    ],
  },
] as const;

const PAIN_GLOW_DEFAULTS = {
  intensity: 0.9,
  spread: 1.1,
  opacity: 0.2,
  x: 16,
  y: 25,
} as const;

const EXECUTION_GLOW_DEFAULTS = {
  intensity: 1.13,
  spread: 1.43,
  opacity: 0.32,
  blur: 28,
  glow1X: 0,
  glow1Y: 0,
  glow2X: -38,
  glow2Y: 25,
} as const;

const PAIN_GLOW_STORAGE_KEY = "ai-builder:pain-glow:v6";
const EXECUTION_GLOW_STORAGE_KEY = "ai-builder:execution-glow:v3";
const KNOBS_VISIBLE_STORAGE_KEY = "ai-builder:knobs-visible";

type PainGlowState = {
  intensity: number;
  spread: number;
  opacity: number;
  x: number;
  y: number;
};

type PainGlowField = keyof PainGlowState;

type ExecutionGlowState = {
  intensity: number;
  spread: number;
  opacity: number;
  blur: number;
  glow1X: number;
  glow1Y: number;
  glow2X: number;
  glow2Y: number;
};

type ExecutionGlowField = keyof ExecutionGlowState;

function loadStoredState<T extends Record<string, unknown>>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return fallback;
    }

    return {
      ...fallback,
      ...parsed,
    } as T;
  } catch {
    return fallback;
  }
}

function saveStoredState(key: string, value: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function PainPointCell({ text }: { text: string }) {
  return (
    <div className="relative flex min-h-[178px] flex-col gap-4 p-6 sm:min-h-[198px] sm:p-8">
      <span className="relative h-[10px] w-[10px] rounded-full bg-[#f2ab47]">
        <span className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(242,171,71,0.5)_0%,rgba(242,171,71,0)_72%)]" />
      </span>
      <p className="font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">{text}</p>
    </div>
  );
}

function ExecutionStepCell({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  return (
    <div className={`flex min-h-[194px] flex-col gap-4 p-8 text-left ${className ?? ""}`}>
      <Image
        alt=""
        aria-hidden="true"
        className="h-[30px] w-[30px]"
        height={30}
        src="/images/AI-builder/icons/execution-point.svg"
        width={30}
      />
      <p className="font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">{text}</p>
    </div>
  );
}

function getExecutionStepDividerClasses(index: number) {
  const classes = ["border-white/[0.07]"];

  // Mobile: one column stack.
  if (index > 0) {
    classes.push("border-t");
  }

  // Large screens: two columns.
  if (index >= 2) {
    classes.push("lg:border-t");
  } else {
    classes.push("lg:border-t-0");
  }
  if (index % 2 === 1) {
    classes.push("lg:border-l");
  }

  // Extra-large screens: three columns.
  if (index >= 3) {
    classes.push("xl:border-t");
  } else {
    classes.push("xl:border-t-0");
  }
  if (index % 3 !== 0) {
    classes.push("xl:border-l");
  } else {
    classes.push("xl:border-l-0");
  }

  return classes.join(" ");
}

export function AiBuilderApproachSections() {
  const painCardRef = useRef<HTMLDivElement | null>(null);
  const executionCardRef = useRef<HTMLDivElement | null>(null);
  const [painGlow, setPainGlow] = useState<PainGlowState>(() =>
    loadStoredState(PAIN_GLOW_STORAGE_KEY, { ...PAIN_GLOW_DEFAULTS }),
  );
  const [executionGlow, setExecutionGlow] = useState<ExecutionGlowState>(() =>
    loadStoredState(EXECUTION_GLOW_STORAGE_KEY, { ...EXECUTION_GLOW_DEFAULTS }),
  );
  const showGlowTuner = false;
  const [knobsVisible, setKnobsVisible] = useState<boolean>(() => {
    const storedVisibility = loadStoredState(KNOBS_VISIBLE_STORAGE_KEY, {
      value: true,
    });
    return Boolean(storedVisibility.value);
  });

  function parseSliderValue(value: string, fallback: number, min: number, max: number) {
    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }
    return Math.min(max, Math.max(min, parsed));
  }

  function applyGlowVars(next: PainGlowState) {
    const card = painCardRef.current;
    if (!card) {
      return;
    }

    const glowSizeX = (48 + (next.intensity - 1) * 16) * next.spread;
    const glowSizeY = (62 + (next.intensity - 1) * 16) * next.spread;
    const alpha1 = Math.min(1, Math.max(0, next.opacity * next.intensity));
    const alpha2 = Math.min(1, Math.max(0, next.opacity * 0.45 * next.intensity));
    const alpha3 = Math.min(1, Math.max(0, next.opacity * 0.16 * next.intensity));

    card.style.setProperty("--pain-glow-x", `${next.x}%`);
    card.style.setProperty("--pain-glow-y", `${next.y}%`);
    card.style.setProperty("--pain-glow-size-x", `${glowSizeX}%`);
    card.style.setProperty("--pain-glow-size-y", `${glowSizeY}%`);
    card.style.setProperty("--pain-glow-a1", `${alpha1}`);
    card.style.setProperty("--pain-glow-a2", `${alpha2}`);
    card.style.setProperty("--pain-glow-a3", `${alpha3}`);
  }

  function updateGlowField(
    field: PainGlowField,
    value: string,
    min: number,
    max: number,
  ) {
    setPainGlow((current) => {
      const parsed = parseSliderValue(value, current[field], min, max);
      return {
        ...current,
        [field]: parsed,
      };
    });
  }

  function applyExecutionGlowVars(next: ExecutionGlowState) {
    const card = executionCardRef.current;
    if (!card) {
      return;
    }

    const alpha1 = Math.min(1, Math.max(0, next.opacity * next.intensity));
    const alpha2 = Math.min(1, Math.max(0, next.opacity * 0.45 * next.intensity));
    const alpha3 = Math.min(1, Math.max(0, next.opacity * 0.18 * next.intensity));

    card.style.setProperty("--execution-glow-a1", `${alpha1}`);
    card.style.setProperty("--execution-glow-a2", `${alpha2}`);
    card.style.setProperty("--execution-glow-a3", `${alpha3}`);
    card.style.setProperty("--execution-glow-scale", `${next.spread}`);
    card.style.setProperty("--execution-glow-blur", `${next.blur}px`);
    card.style.setProperty("--execution-glow-1-x", `${next.glow1X}px`);
    card.style.setProperty("--execution-glow-1-y", `${next.glow1Y}px`);
    card.style.setProperty("--execution-glow-2-x", `${next.glow2X}px`);
    card.style.setProperty("--execution-glow-2-y", `${next.glow2Y}px`);
  }

  function updateExecutionGlowField(
    field: ExecutionGlowField,
    value: string,
    min: number,
    max: number,
  ) {
    setExecutionGlow((current) => {
      const parsed = parseSliderValue(value, current[field], min, max);
      return {
        ...current,
        [field]: parsed,
      };
    });
  }

  useEffect(() => {
    applyGlowVars(painGlow);
    saveStoredState(PAIN_GLOW_STORAGE_KEY, painGlow);
  }, [painGlow]);

  useEffect(() => {
    applyExecutionGlowVars(executionGlow);
    saveStoredState(EXECUTION_GLOW_STORAGE_KEY, executionGlow);
  }, [executionGlow]);

  useEffect(() => {
    saveStoredState(KNOBS_VISIBLE_STORAGE_KEY, { value: knobsVisible });
  }, [knobsVisible]);

  return (
    <>
      <section className="bg-[#141314]">
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-[132px] pt-[132px] sm:px-8 lg:px-[84px]">
          <div className="mx-auto grid w-full max-w-[1100px] gap-14 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-10 xl:grid-cols-[400px_1fr] xl:gap-[112px]">
            <div className="w-full max-w-[400px] space-y-8 pt-12 text-left sm:pt-16 lg:pt-20 xl:pt-[148px]">
              <h2 className="w-full font-aeonik text-[48px] font-semibold leading-[55px] text-[#5F5F5F]">
                {FIRST_APPROACH_TITLE}
              </h2>
              <p className="w-full font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                {FIRST_APPROACH_COPY}
              </p>
            </div>

            <div
              className="flex flex-col"
              style={{
                gap: "12px",
              }}
            >
              <Image
                alt="Early AI survey generation entry on Pollfish homepage"
                className="block h-auto w-full rounded-[16px]"
                height={2000}
                sizes="(min-width: 1024px) 562px, 100vw"
                src="/images/AI-builder/images/old-1-clean.png"
                width={3200}
              />
              <Image
                alt="2022 My Surveys AI builder workflow"
                className="block h-auto w-full rounded-[16px]"
                height={2000}
                sizes="(min-width: 1024px) 562px, 100vw"
                src="/images/AI-builder/images/old-2-clean.png"
                width={3200}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#141314] pb-0">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[84px]">
          <div
            className="relative overflow-hidden rounded-[20px] border border-white/[0.05] bg-white/[0.02] px-6 py-12 shadow-[0_4px_84px_rgba(82,62,35,0.1)] sm:px-10 lg:px-[88px] lg:py-[88px]"
            ref={painCardRef}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(var(--pain-glow-size-x,48%) var(--pain-glow-size-y,62%) at var(--pain-glow-x,11%) var(--pain-glow-y,12%), rgba(183,127,59,var(--pain-glow-a1,0.36)) 0%, rgba(183,127,59,var(--pain-glow-a2,0.16)) 38%, rgba(183,127,59,var(--pain-glow-a3,0.06)) 58%, rgba(183,127,59,0) 80%)",
              }}
            />

            <div className="mx-auto grid w-full max-w-[1100px] gap-10 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-center lg:gap-10 xl:grid-cols-[400px_1fr] xl:gap-[112px]">
              <div className="w-full max-w-[400px] space-y-6 text-left">
                <h3 className="w-full font-aeonik text-[48px] font-semibold leading-[55px] text-white">
                  {PAIN_POINTS_TITLE}
                </h3>
                <p className="w-full font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                  {PAIN_POINTS_COPY}
                </p>
              </div>

              <div className="overflow-hidden rounded-[16px] border border-white/[0.07]">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {PAIN_POINT_ITEMS.map((item) => (
                    <div
                      className="border-b border-white/[0.07] sm:border-r sm:[&:nth-child(2n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0"
                      key={item}
                    >
                      <PainPointCell text={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {showGlowTuner && knobsVisible && (
              <div className="font-figtree absolute bottom-4 right-4 z-20 w-[290px] rounded-xl border border-white/20 bg-[#0e0e0e]/95 p-4 text-white shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <p className="text-sm font-semibold tracking-[0.04em]">
                  Pain Points Glow
                </p>
                <p className="mt-1 text-xs text-white/70">Visible in local dev mode.</p>

                <label className="mt-4 block text-xs text-white/80">
                  X Position
                  <input
                    className="mt-1 w-full accent-[#b77f3b]"
                    value={painGlow.x}
                    max={50}
                    min={0}
                    onInput={(event) =>
                      updateGlowField("x", event.currentTarget.value, 0, 50)
                    }
                    step={0.5}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Y Position
                  <input
                    className="mt-1 w-full accent-[#b77f3b]"
                    value={painGlow.y}
                    max={50}
                    min={0}
                    onInput={(event) =>
                      updateGlowField("y", event.currentTarget.value, 0, 50)
                    }
                    step={0.5}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Intensity
                  <input
                    className="mt-1 w-full accent-[#b77f3b]"
                    value={painGlow.intensity}
                    max={1.8}
                    min={0.6}
                    onInput={(event) =>
                      updateGlowField("intensity", event.currentTarget.value, 0.6, 1.8)
                    }
                    step={0.01}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Spread
                  <input
                    className="mt-1 w-full accent-[#b77f3b]"
                    value={painGlow.spread}
                    max={1.8}
                    min={0.6}
                    onInput={(event) =>
                      updateGlowField("spread", event.currentTarget.value, 0.6, 1.8)
                    }
                    step={0.01}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Opacity
                  <input
                    className="mt-1 w-full accent-[#b77f3b]"
                    value={painGlow.opacity}
                    max={1}
                    min={0}
                    onInput={(event) =>
                      updateGlowField("opacity", event.currentTarget.value, 0, 1)
                    }
                    step={0.01}
                    type="range"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#141314] pb-0 pt-[120px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[1100px] text-white">
            <h3 className="font-aeonik text-[48px] font-semibold leading-[55px] text-[#e7e7e7]">
              {NEW_APPROACH_TITLE}
            </h3>

            <div className="mt-14 flex flex-col gap-14 sm:mt-20 sm:gap-[56px]">
              <div className="grid gap-5 sm:gap-8 md:grid-cols-[133px_1fr] md:gap-10 lg:gap-[125px]">
                <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                  {NEW_APPROACH_OPPORTUNITY_TITLE}
                </p>
                <p className="font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                  {NEW_APPROACH_OPPORTUNITY_COPY}
                </p>
              </div>

              <div className="grid gap-5 sm:gap-8 md:grid-cols-[133px_1fr] md:gap-10 lg:gap-[125px]">
                <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                  {NEW_APPROACH_ROLE_TITLE}
                </p>
                <div className="font-figtree space-y-6 text-[20px] leading-[32px] text-[#d0d0d0]">
                  <p>{NEW_APPROACH_ROLE_COPY}</p>
                  <div className="space-y-4">
                    <p>Together, we:</p>
                    <ul className="m-0 list-none space-y-[14px] p-0">
                      {NEW_APPROACH_ROLE_BULLETS.map((item) => (
                        <li className="flex items-start gap-3" key={item}>
                          <span
                            aria-hidden="true"
                            className="mt-[11px] h-[4px] w-[4px] rounded-full bg-[#f5f5f5]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1442px] pb-[80px] pt-[80px]">
            <p className="font-ibm text-[11px] font-medium uppercase tracking-[0.05em] text-[#959595] sm:text-[14px]">
              {WORKSHOP_CAPTION}
            </p>
            <div className="mt-4 overflow-hidden rounded-[16px] border border-white/[0.08]">
              <Image
                alt="Workshop board used to define constraints, pain points, and opportunities"
                className="block h-auto w-full"
                height={1140}
                sizes="(min-width: 1536px) 1442px, (min-width: 1024px) calc(100vw - 168px), 100vw"
                src="/images/AI-builder/images/workshop.png"
                width={2884}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#141314] pb-0">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[84px]">
          <div
            className="relative isolate overflow-hidden rounded-[20px] border border-white/[0.1] bg-[#111111] px-6 py-[64px] sm:px-10 lg:px-[84px] lg:py-[120px]"
            ref={executionCardRef}
          >
            <div
              className="pointer-events-none absolute -left-[320px] -top-[292px] h-[711px] w-[711px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,170,112,var(--execution-glow-a1,0.44)) 0%, rgba(0,170,112,var(--execution-glow-a2,0.24)) 28%, rgba(0,170,112,var(--execution-glow-a3,0.12)) 48%, rgba(0,170,112,0.04) 64%, rgba(0,170,112,0) 82%)",
                transform:
                  "translate(var(--execution-glow-1-x,0px), var(--execution-glow-1-y,0px)) scale(var(--execution-glow-scale,1))",
                filter: "blur(var(--execution-glow-blur,28px))",
                opacity: 0.96,
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-[318px] -right-[338px] h-[711px] w-[711px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,170,112,var(--execution-glow-a1,0.44)) 0%, rgba(0,170,112,var(--execution-glow-a2,0.24)) 28%, rgba(0,170,112,var(--execution-glow-a3,0.12)) 48%, rgba(0,170,112,0.04) 64%, rgba(0,170,112,0) 82%)",
                transform:
                  "translate(var(--execution-glow-2-x,0px), var(--execution-glow-2-y,0px)) scale(var(--execution-glow-scale,1))",
                filter: "blur(var(--execution-glow-blur,28px))",
                opacity: 0.96,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(17,17,17,0.55)_62%,rgba(17,17,17,1)_100%)]" />

            <div className="relative z-10 mx-auto w-full max-w-[1100px] text-left">
              <div className="w-full max-w-[681px] space-y-6">
                <h3 className="font-aeonik text-[48px] font-semibold leading-[55px] text-[#e7e7e7]">
                  {EXECUTION_TITLE}
                </h3>
                <p className="font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                  {EXECUTION_COPY}
                </p>
              </div>

              <div className="mt-10 w-full overflow-hidden rounded-[16px] border border-white/[0.07]">
                <div className="grid grid-cols-1 text-left lg:grid-cols-2 xl:grid-cols-3">
                  {EXECUTION_STEPS.map((step, index) => (
                    <ExecutionStepCell
                      key={step}
                      className={getExecutionStepDividerClasses(index)}
                      text={step}
                    />
                  ))}
                </div>
              </div>
            </div>

            {showGlowTuner && knobsVisible && (
              <div className="font-figtree absolute bottom-4 left-4 z-20 w-[290px] rounded-xl border border-white/20 bg-[#0e0e0e]/95 p-4 text-white shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <p className="text-sm font-semibold tracking-[0.04em]">
                  Execution Card Glow
                </p>
                <p className="mt-1 text-xs text-white/70">Visible in local dev mode.</p>

                <label className="mt-4 block text-xs text-white/80">
                  Intensity
                  <input
                    className="mt-1 w-full accent-[#12965f]"
                    value={executionGlow.intensity}
                    max={1.8}
                    min={0.4}
                    onInput={(event) =>
                      updateExecutionGlowField(
                        "intensity",
                        event.currentTarget.value,
                        0.4,
                        1.8,
                      )
                    }
                    step={0.01}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Spread
                  <input
                    className="mt-1 w-full accent-[#12965f]"
                    value={executionGlow.spread}
                    max={1.5}
                    min={0.7}
                    onInput={(event) =>
                      updateExecutionGlowField(
                        "spread",
                        event.currentTarget.value,
                        0.7,
                        1.5,
                      )
                    }
                    step={0.01}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Opacity
                  <input
                    className="mt-1 w-full accent-[#12965f]"
                    value={executionGlow.opacity}
                    max={1}
                    min={0}
                    onInput={(event) =>
                      updateExecutionGlowField("opacity", event.currentTarget.value, 0, 1)
                    }
                    step={0.01}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Blur
                  <input
                    className="mt-1 w-full accent-[#12965f]"
                    value={executionGlow.blur}
                    max={60}
                    min={0}
                    onInput={(event) =>
                      updateExecutionGlowField("blur", event.currentTarget.value, 0, 60)
                    }
                    step={0.5}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Top Glow X
                  <input
                    className="mt-1 w-full accent-[#12965f]"
                    value={executionGlow.glow1X}
                    max={520}
                    min={-520}
                    onInput={(event) =>
                      updateExecutionGlowField(
                        "glow1X",
                        event.currentTarget.value,
                        -520,
                        520,
                      )
                    }
                    step={1}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Top Glow Y
                  <input
                    className="mt-1 w-full accent-[#12965f]"
                    value={executionGlow.glow1Y}
                    max={520}
                    min={-520}
                    onInput={(event) =>
                      updateExecutionGlowField(
                        "glow1Y",
                        event.currentTarget.value,
                        -520,
                        520,
                      )
                    }
                    step={1}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Bottom Glow X
                  <input
                    className="mt-1 w-full accent-[#12965f]"
                    value={executionGlow.glow2X}
                    max={520}
                    min={-520}
                    onInput={(event) =>
                      updateExecutionGlowField(
                        "glow2X",
                        event.currentTarget.value,
                        -520,
                        520,
                      )
                    }
                    step={1}
                    type="range"
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Bottom Glow Y
                  <input
                    className="mt-1 w-full accent-[#12965f]"
                    value={executionGlow.glow2Y}
                    max={520}
                    min={-520}
                    onInput={(event) =>
                      updateExecutionGlowField(
                        "glow2Y",
                        event.currentTarget.value,
                        -520,
                        520,
                      )
                    }
                    step={1}
                    type="range"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#141314] pb-[120px] pt-[120px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 text-white sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <h3 className="font-aeonik text-[48px] font-semibold leading-[55px] text-[#e7e7e7]">
              {VISUAL_EXPLORATION_SECTION_TITLE}
            </h3>
            <div className="mt-14 grid gap-5 sm:mt-20 sm:gap-8 md:grid-cols-[133px_1fr] md:gap-10 lg:gap-[125px]">
              <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                {VISUAL_EXPLORATION_TITLE}
              </p>
              <div className="space-y-6 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                {VISUAL_EXPLORATION_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-20 w-full max-w-[842px] space-y-6">
              <div className="overflow-hidden rounded-[16px] border border-white/[0.08]">
                <Image
                  alt="AI button visual exploration states"
                  className="block h-auto w-full"
                  height={222}
                  quality={60}
                  sizes="(min-width: 1024px) 842px, 100vw"
                  src="/images/AI-builder/images/ai-buttons.png"
                  width={1684}
                />
              </div>
              <div className="overflow-hidden rounded-[16px] border border-white/[0.08]">
                <Image
                  alt="AI iconography visual exploration states"
                  className="block h-auto w-full"
                  height={222}
                  quality={60}
                  sizes="(min-width: 1024px) 842px, 100vw"
                  src="/images/AI-builder/images/ai-logos.png"
                  width={1684}
                />
              </div>
            </div>

            <div className="mt-20 grid gap-5 sm:gap-8 md:grid-cols-[133px_1fr] md:gap-10 lg:gap-[125px]">
              <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                {ALIGN_INTENT_TITLE}
              </p>
              <div className="space-y-6 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                {ALIGN_INTENT_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141314] pb-[120px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 text-white sm:px-8 lg:px-[75px]">
          <div className="mx-auto w-full max-w-[1449px] overflow-hidden rounded-[20px] border border-white/[0.08]">
            <Image
              alt="Evolution of AI Builder panel concepts"
              className="block h-auto w-full"
              height={1188}
              quality={60}
              sizes="(min-width: 1536px) 1449px, (min-width: 1024px) calc(100vw - 150px), 100vw"
              src="/images/AI-builder/images/panel-exploring.png"
              width={3014}
            />
          </div>

          <div className="mx-auto mt-[120px] w-full max-w-[1100px]">
            <div className="grid gap-5 sm:gap-8 md:grid-cols-[133px_1fr] md:gap-8 lg:gap-[85px]">
              <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                {VISUAL_IDENTITY_TITLE}
              </p>
              <div className="space-y-6 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                {VISUAL_IDENTITY_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-[120px] w-full max-w-[866px]">
            <div className="relative overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#1b1b1d] px-6 py-8 sm:px-8 sm:py-12">
              <div className="pointer-events-none absolute left-[6%] top-[20%] h-[280px] w-[280px] rounded-full bg-[#d830d0]/25 blur-[74px]" />
              <div className="pointer-events-none absolute right-[12%] top-[8%] h-[240px] w-[240px] rounded-full bg-[#6938ff]/25 blur-[74px]" />
              <div className="pointer-events-none absolute inset-x-[26%] top-0 h-[160px] rounded-full bg-[#be2eff]/20 blur-[64px]" />
              <div className="relative mx-auto w-full max-w-[508px]">
                <Image
                  alt="Refined AI Builder interface with branded actions and capability cards"
                  className="block h-auto w-full rounded-[16px]"
                  height={1047}
                  quality={60}
                  sizes="(min-width: 1024px) 508px, 100vw"
                  src="/images/AI-builder/images/builder-elements.png"
                  width={1016}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141314] pb-[48px] pt-[32px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 text-white sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <h3 className="font-aeonik text-[48px] font-semibold leading-[55px] text-white">
              {POSITIONING_AI_TITLE}
            </h3>

            <div className="mt-20 grid gap-5 sm:gap-8 md:grid-cols-[133px_1fr] md:gap-10 lg:gap-[125px]">
              <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                {FIRST_DECISIONS_TITLE}
              </p>
              <div className="space-y-6 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                {FIRST_DECISIONS_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-20 w-full max-w-[1454px] rounded-[20px] border border-white/[0.08] bg-[#1a1a1a] p-4 sm:p-8 lg:p-10">
            <p className="font-ibm text-[11px] font-medium uppercase tracking-[0.05em] text-[#959595] sm:text-[14px]">
              {EXPLORING_CTA_CAPTION}
            </p>
            <div className="mt-5 overflow-hidden rounded-[16px] border border-white/[0.08]">
              <Image
                alt="Exploring different AI call-to-action placements in the questionnaire builder"
                className="block h-auto w-full"
                height={654}
                quality={60}
                sizes="(min-width: 1536px) 1272px, (min-width: 1024px) calc(100vw - 168px), 100vw"
                src="/images/AI-builder/images/cta-placements.png"
                width={2593}
              />
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <p className="font-ibm text-[11px] font-medium uppercase tracking-[0.05em] text-[#959595] sm:text-[14px]">
                  {ACTIVE_QUESTIONNAIRE_CAPTION}
                </p>
                <div className="mt-4 overflow-hidden rounded-[16px] border border-white/[0.08]">
                  <Image
                    alt="AI placement in an active questionnaire with existing questions"
                    className="block h-auto w-full"
                    height={957}
                    quality={60}
                    sizes="(min-width: 1280px) 600px, 100vw"
                    src="/images/AI-builder/images/final-plc-1.png"
                    width={1252}
                  />
                </div>
              </div>

              <div>
                <p className="font-ibm text-[11px] font-medium uppercase tracking-[0.05em] text-[#959595] sm:text-[14px]">
                  {EMPTY_QUESTIONNAIRE_CAPTION}
                </p>
                <div className="mt-4 overflow-hidden rounded-[16px] border border-white/[0.08]">
                  <Image
                    alt="AI placement in an empty questionnaire state"
                    className="block h-auto w-full"
                    height={1110}
                    quality={60}
                    sizes="(min-width: 1280px) 600px, 100vw"
                    src="/images/AI-builder/images/final-plc-2.png"
                    width={1406}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141314] pb-[48px] pt-[24px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 text-white sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="grid gap-5 sm:gap-8 md:grid-cols-[134px_1fr] md:gap-10 lg:gap-[125px]">
              <p className="font-figtree text-[20px] font-bold leading-[1.2] text-[#dcdcdc]">
                {MAKING_GUIDED_TITLE}
              </p>
              <div className="space-y-3 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                {MAKING_GUIDED_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-20 w-full max-w-[1298px] overflow-hidden rounded-[16px] border border-white/[0.08]">
            <Image
              alt="AI Builder panel with guided survey creation options"
              className="mx-auto block h-auto w-full object-contain"
              height={1774}
              quality={60}
              sizes="(min-width: 1536px) 1298px, (min-width: 1024px) calc(100vw - 168px), 100vw"
              src="/images/AI-builder/images/chat-empty-screen.png"
              width={2756}
            />
          </div>

          <div className="mx-auto mt-20 w-full max-w-[1100px]">
            <div className="grid gap-5 sm:gap-8 md:grid-cols-[134px_1fr] md:gap-10 lg:gap-[125px]">
              <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                {ADAPTING_TITLE}
              </p>
              <div className="space-y-3 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                <p>
                  <span>{ADAPTING_PARAGRAPH_PREFIX}</span>
                  <span className="font-bold">{ADAPTING_PARAGRAPH_EMPHASIS}</span>
                  <span>{ADAPTING_PARAGRAPH_SUFFIX}</span>
                </p>
                <p>{ADAPTING_PARAGRAPH_SECONDARY}</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-20 w-full max-w-[1298px] overflow-hidden rounded-[16px] border border-white/[0.08]">
            <Image
              alt="AI Builder adapting options to an existing questionnaire context"
              className="mx-auto block h-auto w-full object-contain"
              height={2079}
              quality={60}
              sizes="(min-width: 1536px) 1298px, (min-width: 1024px) calc(100vw - 168px), 100vw"
              src="/images/AI-builder/images/questions.png"
              width={3200}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#141314] pb-[120px] pt-[32px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 text-white sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="grid gap-5 sm:gap-8 md:grid-cols-[134px_1fr] md:gap-10 lg:gap-[125px]">
              <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                {PROGRESSIVE_DISCLOSURE_TITLE}
              </p>
              <div className="space-y-3 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                {PROGRESSIVE_DISCLOSURE_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-[1142px] overflow-hidden rounded-[16px] border border-white/[0.06] bg-[#222222] p-5 sm:p-8">
            <Image
              alt="Progressive disclosure states for AI actions"
              className="block h-auto w-full"
              height={384}
              quality={60}
              sizes="(min-width: 1280px) 1002px, 100vw"
              src="/images/AI-builder/images/quick-actions.png"
              width={2004}
            />
          </div>

          <div className="mx-auto mt-[72px] w-full max-w-[1100px]">
            <div className="grid gap-5 sm:gap-8 md:grid-cols-[134px_1fr] md:gap-10 lg:gap-[125px]">
              <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                {QUESTION_ASSISTANCE_TITLE}
              </p>
              <div className="space-y-3 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                {QUESTION_ASSISTANCE_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-[1142px] overflow-hidden rounded-[16px] border border-white/[0.06] bg-[#222222] p-5 sm:p-10">
            <div className="relative flex justify-center overflow-hidden">
              <Image
                alt="Question and answer level AI assistance options"
                className="relative left-1/2 block h-auto w-[112%] max-w-none -translate-x-1/2"
                height={1299}
                quality={60}
                sizes="(min-width: 1280px) 1122px, 112vw"
                src="/images/AI-builder/images/ai-question-answer.png"
                width={1573}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141314] pb-[160px] pt-0">
        <div className="mx-auto w-full max-w-[1600px] px-5 text-white sm:px-8 lg:px-[84px]">
          <div className="relative left-1/2 mb-[120px] w-dvw -translate-x-1/2">
            <div className="h-px w-full bg-white/[0.1]" />
          </div>
          <div className="mx-auto w-full max-w-[1100px]">
            <h3 className="font-aeonik text-[48px] font-semibold leading-[55px] text-white">
              {IMPACT_TITLE}
            </h3>

            <div className="mt-20 space-y-10">
              {IMPACT_ROWS.map((row) => (
                <div className="grid gap-5 sm:gap-8 md:grid-cols-[134px_1fr] md:gap-10 lg:gap-[125px]" key={row.title}>
                  <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                    {row.title}
                  </p>
                  <div className="space-y-3 font-figtree text-[20px] leading-[32px] text-[#d0d0d0]">
                    {row.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showGlowTuner && (
        <button
          className="font-figtree fixed right-4 top-4 z-[120] rounded-full border border-white/25 bg-[#0e0e0e]/95 px-4 py-2 text-[13px] font-medium text-white shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:border-white/40 hover:bg-[#151515]/95"
          onClick={() => setKnobsVisible((current) => !current)}
          type="button"
        >
          {knobsVisible ? "Hide knobs" : "Show knobs"}
        </button>
      )}
    </>
  );
}
