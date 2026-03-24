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

const PAIN_GLOW_DEFAULTS = {
  intensity: 1,
  spread: 1,
  opacity: 0.36,
  x: 11,
  y: 12,
} as const;

const EXECUTION_GLOW_DEFAULTS = {
  intensity: 1,
  spread: 1,
  opacity: 0.44,
  blur: 28,
  glow1X: 0,
  glow1Y: 0,
  glow2X: 0,
  glow2Y: 0,
} as const;

const PAIN_GLOW_STORAGE_KEY = "ai-builder:pain-glow";
const EXECUTION_GLOW_STORAGE_KEY = "ai-builder:execution-glow";
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
      <p className="font-figtree text-[16px] leading-[1.56] text-white">{text}</p>
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
    <div className={`flex min-h-[194px] flex-col gap-4 p-8 ${className ?? ""}`}>
      <Image
        alt=""
        aria-hidden="true"
        className="h-[30px] w-[30px]"
        height={30}
        src="/images/AI-builder/icons/pain-point.svg"
        width={30}
      />
      <p className="font-figtree text-[16px] leading-[1.75] text-[#f1f1f1]">{text}</p>
    </div>
  );
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
  const showGlowTuner = process.env.NODE_ENV !== "production";
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

  function getExecutionStepBorders(index: number) {
    const isLast = index === EXECUTION_STEPS.length - 1;
    const mobileBorder = isLast ? "" : "border-b border-white/[0.07]";
    const desktopBottom = index < 3 ? "lg:border-b lg:border-white/[0.07]" : "lg:border-b-0";
    const desktopRight = index % 3 !== 2 ? "lg:border-r lg:border-white/[0.07]" : "lg:border-r-0";

    return `${mobileBorder} ${desktopBottom} ${desktopRight}`;
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
      <section className="bg-[#181818]">
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-[132px] pt-[132px] sm:px-8 lg:px-[84px]">
          <div className="mx-auto grid w-full max-w-[1029px] gap-14 lg:grid-cols-[355px_562px] lg:gap-[112px]">
            <div className="w-full max-w-[355px] space-y-8 pt-12 text-left sm:pt-16 lg:pt-[148px]">
              <h2 className="w-full font-aeonik text-[44px] font-semibold leading-[1.02] text-[rgba(194,194,194,0.4)] sm:text-[52px] sm:leading-[55px]">
                {FIRST_APPROACH_TITLE}
              </h2>
              <p className="w-full font-figtree text-[18px] leading-[27px] text-white">
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
                className="block h-auto w-full rounded-[8px]"
                height={2000}
                sizes="(min-width: 1024px) 562px, 100vw"
                src="/images/AI-builder/images/old-1-clean.png"
                width={3200}
              />
              <Image
                alt="2022 My Surveys AI builder workflow"
                className="block h-auto w-full rounded-[8px]"
                height={2000}
                sizes="(min-width: 1024px) 562px, 100vw"
                src="/images/AI-builder/images/old-2-clean.png"
                width={3200}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#181818] pb-0">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[84px]">
          <div
            className="relative overflow-hidden rounded-tl-[20px] rounded-tr-[20px] border border-white/[0.05] bg-white/[0.02] px-6 py-12 shadow-[0_4px_84px_rgba(82,62,35,0.1)] sm:px-10 lg:px-[88px] lg:py-[88px]"
            ref={painCardRef}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(var(--pain-glow-size-x,48%) var(--pain-glow-size-y,62%) at var(--pain-glow-x,11%) var(--pain-glow-y,12%), rgba(183,127,59,var(--pain-glow-a1,0.36)) 0%, rgba(183,127,59,var(--pain-glow-a2,0.16)) 38%, rgba(183,127,59,var(--pain-glow-a3,0.06)) 58%, rgba(183,127,59,0) 80%)",
              }}
            />

            <div className="mx-auto grid w-full max-w-[1029px] gap-10 lg:grid-cols-[355px_1fr] lg:items-center lg:gap-[112px]">
              <div className="w-full max-w-[355px] space-y-6 text-left">
                <h3 className="w-full font-figtree text-[40px] font-bold leading-[1.12] text-white">
                  {PAIN_POINTS_TITLE}
                </h3>
                <p className="w-full font-figtree text-[20px] leading-[31px] text-[#f6f6f6]">
                  {PAIN_POINTS_COPY}
                </p>
              </div>

              <div className="overflow-hidden rounded-[10px] border border-white/[0.07]">
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.18]" />
      </section>

      <section className="bg-[#181818] pb-0 pt-[120px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[986px] text-white">
            <h3 className="font-figtree text-[40px] font-semibold leading-[1.1] text-[#e7e7e7] sm:text-[52px]">
              {NEW_APPROACH_TITLE}
            </h3>

            <div className="mt-14 flex flex-col gap-14 sm:mt-20 sm:gap-[56px]">
              <div className="grid gap-5 sm:gap-8 md:grid-cols-[133px_1fr] md:gap-[125px]">
                <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                  {NEW_APPROACH_OPPORTUNITY_TITLE}
                </p>
                <p className="font-figtree text-[18px] leading-[28px] text-[#f5f5f5]">
                  {NEW_APPROACH_OPPORTUNITY_COPY}
                </p>
              </div>

              <div className="grid gap-5 sm:gap-8 md:grid-cols-[133px_1fr] md:gap-[125px]">
                <p className="font-figtree text-[20px] font-bold leading-[1.2] text-white">
                  {NEW_APPROACH_ROLE_TITLE}
                </p>
                <div className="font-figtree space-y-6 text-[18px] leading-[28px] text-[#f5f5f5]">
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
            <div className="mt-4 overflow-hidden rounded-[10px] border border-white/[0.08]">
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

      <section className="bg-[#181818] pb-[120px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[75px]">
          <div
            className="relative overflow-hidden rounded-[20px] border border-white/[0.1] bg-[#111111] px-6 py-[64px] sm:px-10 lg:px-[120px] lg:py-[120px] xl:px-[233px]"
            ref={executionCardRef}
          >
            <div
              className="pointer-events-none absolute -left-[320px] -top-[292px] h-[711px] w-[711px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,145,96,var(--execution-glow-a1,0.44)) 0%, rgba(0,145,96,var(--execution-glow-a2,0.2)) 38%, rgba(0,145,96,var(--execution-glow-a3,0.08)) 56%, rgba(0,145,96,0) 76%)",
                filter: "blur(var(--execution-glow-blur,28px))",
                transform:
                  "translate3d(var(--execution-glow-1-x,0px), var(--execution-glow-1-y,0px), 0) scale(var(--execution-glow-scale,1))",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-[318px] -right-[338px] h-[711px] w-[711px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,145,96,var(--execution-glow-a1,0.44)) 0%, rgba(0,145,96,var(--execution-glow-a2,0.2)) 38%, rgba(0,145,96,var(--execution-glow-a3,0.08)) 56%, rgba(0,145,96,0) 76%)",
                filter: "blur(var(--execution-glow-blur,28px))",
                transform:
                  "translate3d(var(--execution-glow-2-x,0px), var(--execution-glow-2-y,0px), 0) scale(var(--execution-glow-scale,1))",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(17,17,17,0.55)_62%,rgba(17,17,17,1)_100%)]" />

            <div className="relative z-10">
              <div className="w-full max-w-[681px]">
                <h3 className="font-figtree text-[40px] font-bold leading-[1.08] text-[#e7e7e7] sm:text-[52px]">
                  {EXECUTION_TITLE}
                </h3>
                <p className="mt-6 font-figtree text-[20px] leading-[30px] text-[#f1f1f1]">
                  {EXECUTION_COPY}
                </p>
              </div>

              <div className="mt-10 w-full overflow-hidden rounded-[20px] border border-white/[0.07]">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {EXECUTION_STEPS.map((step, index) => (
                    <ExecutionStepCell
                      className={getExecutionStepBorders(index)}
                      key={step}
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
