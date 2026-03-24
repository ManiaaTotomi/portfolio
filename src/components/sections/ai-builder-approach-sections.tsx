"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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

const PAIN_GLOW_DEFAULTS = {
  intensity: 1,
  spread: 1,
  opacity: 0.36,
  x: 11,
  y: 12,
} as const;

type PainGlowState = {
  intensity: number;
  spread: number;
  opacity: number;
  x: number;
  y: number;
};

type PainGlowField = keyof PainGlowState;

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

export function AiBuilderApproachSections() {
  const painCardRef = useRef<HTMLDivElement | null>(null);
  const glowStateRef = useRef<PainGlowState>({ ...PAIN_GLOW_DEFAULTS });
  const showGlowTuner = process.env.NODE_ENV !== "production";

  function parseSliderValue(value: string, fallback: number, min: number, max: number) {
    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }
    return Math.min(max, Math.max(min, parsed));
  }

  function applyGlowVars(next: PainGlowState) {
    glowStateRef.current = next;

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
    const current = glowStateRef.current;
    const parsed = parseSliderValue(value, current[field], min, max);
    applyGlowVars({
      ...current,
      [field]: parsed,
    });
  }

  useEffect(() => {
    applyGlowVars(glowStateRef.current);
  }, []);

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

      <section className="bg-[#181818] pb-[154px]">
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

            {showGlowTuner && (
              <div className="font-figtree absolute bottom-4 right-4 z-20 w-[290px] rounded-xl border border-white/20 bg-[#0e0e0e]/95 p-4 text-white shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <p className="text-sm font-semibold tracking-[0.04em]">
                  Pain Points Glow
                </p>
                <p className="mt-1 text-xs text-white/70">Visible in local dev mode.</p>

                <label className="mt-4 block text-xs text-white/80">
                  X Position
                  <input
                    className="mt-1 w-full accent-[#b77f3b]"
                    defaultValue={PAIN_GLOW_DEFAULTS.x}
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
                    defaultValue={PAIN_GLOW_DEFAULTS.y}
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
                    defaultValue={PAIN_GLOW_DEFAULTS.intensity}
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
                    defaultValue={PAIN_GLOW_DEFAULTS.spread}
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
                    defaultValue={PAIN_GLOW_DEFAULTS.opacity}
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
    </>
  );
}
