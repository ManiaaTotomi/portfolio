import Image from "next/image";
import type { CaseStudy } from "@/content/site";
import { CtrlEatScreensMotionGrid } from "@/components/sections/ctrleat-screens-motion-grid";

interface CtrlEatCaseStudySectionProps {
  study: CaseStudy;
}

const CTRLEAT_INTRO_TITLE = "Nutrition - Aware Food Delivery";
const CTRLEAT_INTRO_DESCRIPTION =
  "Designing an MVP for a food discovery app that tailors recommendations based on users’ dietary preferences. I worked as the sole designer, structuring how preferences are captured and translated into meaningful suggestions. The focus was on turning diverse user needs into a clear and usable system.";
const CTRLEAT_INTRO_DETAILS = [
  "Sole Designer",
  "System Structure",
  "Mobile Experience",
  "Illustrations & Icons design",
  "2020",
] as const;

const ICONS = [
  {
    src: "/images/Ctrleat/icons/souvlaki.svg",
    alt: "Souvlaki icon",
    desktopOffset: "lg:mt-10",
    width: 160,
  },
  {
    src: "/images/Ctrleat/icons/bread.svg",
    alt: "Bread icon",
    desktopOffset: "lg:mt-0",
    width: 160,
  },
  {
    src: "/images/Ctrleat/icons/donut.svg",
    alt: "Donut icon",
    desktopOffset: "lg:mt-28",
    width: 160,
  },
  {
    src: "/images/Ctrleat/icons/pasta.svg",
    alt: "Pasta icon",
    desktopOffset: "lg:mt-[71px]",
    width: 160,
  },
  {
    src: "/images/Ctrleat/icons/ice-cream.svg",
    alt: "Ice cream icon",
    desktopOffset: "lg:mt-3",
    width: 160,
  },
  {
    src: "/images/Ctrleat/icons/coffee.svg",
    alt: "Coffee icon",
    desktopOffset: "lg:mt-12",
    width: 166,
  },
] as const;

const MOBILE_SCREENS = [
  {
    src: "/images/Ctrleat/screens/choose-nutrition-v2.png",
    alt: "CtrlEat choose nutrition preference screen",
    desktopOffset: "lg:mt-3",
    height: 1399,
    width: 703,
    isShowcase: true,
    splashTone: "purpleGreen",
  },
  {
    src: "/images/Ctrleat/screens/Next-v2.png",
    alt: "CtrlEat onboarding welcome screen",
    desktopOffset: "lg:pt-[140px]",
    height: 1400,
    width: 706,
    isShowcase: true,
    splashTone: "greenGold",
  },
  {
    src: "/images/Ctrleat/screens/First-screen-v2.png",
    alt: "CtrlEat featured restaurants screen",
    desktopOffset: "lg:mt-5",
    height: 1399,
    width: 703,
    isShowcase: true,
    splashTone: "cyanRose",
  },
] as const;

function ProjectDivider() {
  return (
    <div className="flex h-[40px] w-full items-center">
      <div className="h-px flex-1 bg-white/10" />
      <div className="inline-flex items-center gap-4 px-8 py-[10px]">
        <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#31f7ff]">
          <span
            aria-hidden="true"
            className="absolute -inset-[5px] rounded-full bg-[radial-gradient(circle,rgba(49,247,255,0.42)_0%,rgba(49,247,255,0)_72%)]"
          />
        </span>
        <p className="font-aeonik text-[16px] tracking-[1.28px] text-[#31f7ff]">CtrlEat</p>
      </div>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function CtrlEatIntro() {
  return (
    <div className="mx-auto flex w-full max-w-[848px] flex-col items-center gap-8 text-center">
      <div className="space-y-6">
        <p className="font-aeonik text-[48px] font-semibold leading-[55px] text-[#5F5F5F]">
          {CTRLEAT_INTRO_TITLE}
        </p>
        <p className="mx-auto max-w-[68ch] font-figtree text-[20px] leading-[32px] text-[#d0d0d6]">
          {CTRLEAT_INTRO_DESCRIPTION}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
        {CTRLEAT_INTRO_DETAILS.map((item, index) => (
          <div className="flex items-center gap-4 sm:gap-5" key={item}>
            <p className="font-figtree text-[15px] font-medium text-[#737373] sm:text-[16px]">
              {item}
            </p>
            {index < CTRLEAT_INTRO_DETAILS.length - 1 && (
              <span className="relative inline-flex h-[2px] w-[2px] rounded-full bg-[#737373]">
                <span
                  aria-hidden="true"
                  className="absolute -inset-[4px] rounded-full bg-[radial-gradient(circle,rgba(115,115,115,0.45)_0%,rgba(115,115,115,0)_72%)]"
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CtrlEatCaseStudySection({ study }: CtrlEatCaseStudySectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#040404]" id={study.id}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[55%] h-[1180px] w-[1260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(11,49,45,0.6)_0%,rgba(11,49,45,0.28)_28%,rgba(8,17,23,0.1)_56%,rgba(4,4,4,0)_80%)] blur-[72px]" />
        <div className="absolute left-[26%] top-[74%] h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(68,185,117,0.18)_0%,rgba(68,185,117,0.08)_45%,rgba(68,185,117,0)_78%)] blur-[60px]" />
        <div className="absolute left-1/2 top-[75%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(197,167,84,0.16)_0%,rgba(197,167,84,0.08)_40%,rgba(197,167,84,0)_76%)] blur-[58px]" />
        <div className="absolute right-[22%] top-[74%] h-[480px] w-[480px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,172,118,0.18)_0%,rgba(88,172,118,0.1)_44%,rgba(88,172,118,0)_80%)] blur-[62px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-[72px] lg:py-24">
        <ProjectDivider />

        <div className="py-[96px] lg:py-[102px]">
          <CtrlEatIntro />
        </div>

        <div className="mx-auto flex w-full max-w-[1301px] flex-wrap items-start justify-center gap-x-6 gap-y-8 lg:flex-nowrap lg:justify-between lg:gap-0">
          {ICONS.map((icon) => (
            <div className={icon.desktopOffset} key={icon.src}>
              <Image
                alt={icon.alt}
                className="h-auto w-[140px] sm:w-[154px] lg:w-auto"
                height={160}
                src={icon.src}
                width={icon.width}
              />
            </div>
          ))}
        </div>

        <CtrlEatScreensMotionGrid screens={MOBILE_SCREENS} />
      </div>
    </section>
  );
}
