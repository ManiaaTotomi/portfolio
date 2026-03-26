import Image from "next/image";
import type { CaseStudy } from "@/content/site";
import { MinddyScreensMotionGrid } from "@/components/sections/minddy-screens-motion-grid";

interface MinddyCaseStudySectionProps {
  study: CaseStudy;
}

interface MinddyIconCard {
  src: string;
  alt: string;
  desktopX: number;
  desktopY: number;
  canvas: number;
  offsetX: number;
  offsetY: number;
}

const MINDDY_DETAILS = [
  "Thesis Project",
  "Habit Formation",
  "Behavioral Design",
  "Mobile Experience",
  "Icons & Illustrations Design",
] as const;
const MINDDY_INTRO_TITLE = "Habit Building App";
const MINDDY_INTRO_DESCRIPTION =
  "Designing a habit and wellbeing app exploring how users build routines and track progress over time. As part of my thesis, I defined the core experience, structuring how habits are created, tracked, and supported through guided sessions and reminders- translating behavior-driven concepts into a clear and usable system.";

const ICONS: readonly MinddyIconCard[] = [
  {
    src: "/images/Minddy/icons/motivation.svg",
    alt: "Motivation card",
    desktopX: 0,
    desktopY: 0,
    canvas: 281,
    offsetX: 45,
    offsetY: 38,
  },
  {
    src: "/images/Minddy/icons/fitness.svg",
    alt: "Fitness card",
    desktopX: 280,
    desktopY: 100,
    canvas: 281,
    offsetX: 45,
    offsetY: 38,
  },
  {
    src: "/images/Minddy/icons/better-sleep.svg",
    alt: "Better sleep card",
    desktopX: 558,
    desktopY: 0,
    canvas: 281,
    offsetX: 45,
    offsetY: 38,
  },
  {
    src: "/images/Minddy/icons/productivity.svg",
    alt: "Productivity card",
    desktopX: 836,
    desktopY: 100,
    canvas: 281,
    offsetX: 45,
    offsetY: 38,
  },
  {
    src: "/images/Minddy/icons/anxiety.svg",
    alt: "Anxiety card",
    desktopX: 0,
    desktopY: 290,
    canvas: 281,
    offsetX: 45,
    offsetY: 38,
  },
  {
    src: "/images/Minddy/icons/focus.svg",
    alt: "Focus card",
    desktopX: 280,
    desktopY: 390,
    canvas: 281,
    offsetX: 45,
    offsetY: 38,
  },
  {
    src: "/images/Minddy/icons/self-discipline.svg",
    alt: "Self discipline card",
    desktopX: 558,
    desktopY: 290,
    canvas: 281,
    offsetX: 45,
    offsetY: 38,
  },
  {
    src: "/images/Minddy/icons/healthy-diet.svg",
    alt: "Healthy diet card",
    desktopX: 836,
    desktopY: 390,
    canvas: 281,
    offsetX: 45,
    offsetY: 38,
  },
] as const;

const ICON_BASE_SIZE = 190;
const ICON_MOBILE_SIZE = 190;
const ICON_DESKTOP_SIZE = 190;
const ICON_DESKTOP_CANVAS_HEIGHT = 580;

function MinddyIconTile({
  icon,
  size,
}: {
  icon: MinddyIconCard;
  size: number;
}) {
  const scale = size / ICON_BASE_SIZE;

  return (
    <div className="relative" style={{ height: size, width: size }}>
      <Image
        alt={icon.alt}
        className="absolute max-w-none"
        height={icon.canvas}
        src={icon.src}
        style={{
          height: icon.canvas * scale,
          left: -(icon.offsetX * scale),
          top: -(icon.offsetY * scale),
          width: icon.canvas * scale,
        }}
        width={icon.canvas}
      />
    </div>
  );
}

const MOBILE_SCREENS = [
  {
    src: "/images/Minddy/images/first-challenge.png",
    alt: "Minddy first challenge screen",
    desktopOffset: "lg:mt-0",
    height: 1338,
    width: 709,
    isShowcase: true,
    splashTone: "violetForest",
  },
  {
    src: "/images/Minddy/images/homepage.png",
    alt: "Minddy homepage challenges screen",
    desktopOffset: "lg:mt-[110px]",
    height: 2010,
    width: 1062,
    isShowcase: true,
    splashTone: "sunsetIris",
  },
  {
    src: "/images/Minddy/images/meditation-screen.png",
    alt: "Minddy meditation screen",
    desktopOffset: "lg:mt-0",
    height: 1398,
    width: 702,
    isShowcase: true,
    splashTone: "fuchsiaCyan",
  },
] as const;

function ProjectDivider() {
  return (
    <div className="flex h-[40px] w-full items-center">
      <div className="h-px flex-1 bg-white/10" />
      <div className="inline-flex items-center gap-4 px-8 py-[10px]">
        <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#044bff]">
          <span
            aria-hidden="true"
            className="absolute -inset-[5px] rounded-full bg-[radial-gradient(circle,rgba(4,75,255,0.45)_0%,rgba(4,75,255,0)_72%)]"
          />
        </span>
        <p className="font-aeonik text-[18px] tracking-[1.28px] text-[#044bff]">Minddy</p>
      </div>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function MinddyIntro() {
  return (
    <div className="mx-auto flex w-full max-w-[848px] flex-col items-center gap-8 text-center">
      <div className="space-y-6">
        <p className="font-aeonik text-[48px] font-semibold leading-[55px] text-[#5F5F5F]">
          {MINDDY_INTRO_TITLE}
        </p>
        <p className="mx-auto max-w-[68ch] font-figtree text-[20px] leading-[32px] text-[#d0d0d6]">
          {MINDDY_INTRO_DESCRIPTION}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
        {MINDDY_DETAILS.map((item, index) => (
          <div className="flex items-center gap-4 sm:gap-5" key={item}>
            <p className="font-figtree text-[15px] font-medium text-[#787390] sm:text-[16px]">
              {item}
            </p>
            {index < MINDDY_DETAILS.length - 1 && (
              <span className="relative inline-flex h-[2px] w-[2px] rounded-full bg-[#787390]">
                <span
                  aria-hidden="true"
                  className="absolute -inset-[4px] rounded-full bg-[radial-gradient(circle,rgba(120,115,144,0.45)_0%,rgba(120,115,144,0)_72%)]"
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MinddyCaseStudySection({ study }: MinddyCaseStudySectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#040404]" id={study.id}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[58%] h-[1480px] w-[1560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(32,21,93,0.65)_0%,rgba(19,15,56,0.44)_30%,rgba(6,8,24,0.15)_60%,rgba(4,4,4,0)_82%)] blur-[72px]" />
        <div className="absolute left-1/2 top-[58%] h-[1120px] w-[1260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,59,222,0.32)_0%,rgba(30,46,165,0.18)_44%,rgba(4,4,4,0)_76%)] blur-[86px]" />
        <div className="absolute left-[21%] top-[74%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(116,71,228,0.2)_0%,rgba(116,71,228,0.08)_46%,rgba(116,71,228,0)_78%)] blur-[64px]" />
        <div className="absolute right-[17%] top-[74%] h-[520px] w-[520px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(77,202,124,0.2)_0%,rgba(77,202,124,0.09)_46%,rgba(77,202,124,0)_78%)] blur-[64px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-[72px] lg:py-24">
        <ProjectDivider />

        <div className="pb-[44px] pt-[84px] lg:pb-[36px] lg:pt-[92px]">
          <MinddyIntro />
        </div>

        <div className="mt-[72px] mb-[72px] lg:my-[150px]">
          <div className="mx-auto grid w-full max-w-[1028px] grid-cols-2 justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:hidden">
            {ICONS.map((icon) => (
              <MinddyIconTile icon={icon} key={icon.src} size={ICON_MOBILE_SIZE} />
            ))}
          </div>
          <div
            className="relative mx-auto hidden w-full max-w-[1028px] lg:block"
            style={{ height: ICON_DESKTOP_CANVAS_HEIGHT }}
          >
            {ICONS.map((icon) => (
              <div
                className="absolute"
                key={`${icon.src}-desktop`}
                style={{ left: `${icon.desktopX}px`, top: `${icon.desktopY}px` }}
              >
                <MinddyIconTile icon={icon} size={ICON_DESKTOP_SIZE} />
              </div>
            ))}
          </div>
        </div>

        <MinddyScreensMotionGrid screens={MOBILE_SCREENS} />
      </div>
    </section>
  );
}
