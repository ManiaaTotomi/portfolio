"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type StripSize = "wide" | "portrait" | "phone" | "phoneLarge";

interface StripItem {
  id: string;
  thumbSrc: string;
  fullSrc: string;
  alt: string;
  size: StripSize;
}

const STRIP_ITEMS: StripItem[] = [
  {
    id: "owiwi-redesign",
    thumbSrc: "/images/owiwi-redesign.png",
    fullSrc: "/images/owiwi-redesign.png",
    alt: "OWIWI dashboard redesign",
    size: "wide",
  },
  {
    id: "playtime-mobile-a",
    thumbSrc: "/images/playtime-perks-small.png",
    fullSrc: "/images/playtime-perks-big.png",
    alt: "Playtime perks mobile app dashboard",
    size: "phone",
  },
  {
    id: "portrait-dark",
    thumbSrc: "/images/portrait-2.png",
    fullSrc: "/images/portrait-2.png",
    alt: "Digital portrait in deep blue tones",
    size: "portrait",
  },
  {
    id: "premium-demand-a",
    thumbSrc: "/images/prodege-perks.png",
    fullSrc: "/images/prodege-perks.png",
    alt: "Premium demand product showcase",
    size: "wide",
  },
  {
    id: "portrait-cyan",
    thumbSrc: "/images/portrait-1.png",
    fullSrc: "/images/portrait-1.png",
    alt: "Turquoise portrait study",
    size: "portrait",
  },
  {
    id: "playtime-mobile-b",
    thumbSrc: "/images/playtime-perksb.png",
    fullSrc: "/images/playtime-perksb.png",
    alt: "Playtime perks event screen",
    size: "phoneLarge",
  },
  {
    id: "loyalty-header",
    thumbSrc: "/images/prodege-loyalty-header.png",
    fullSrc: "/images/prodege-loyalty-header.png",
    alt: "Loyalty programs web hero",
    size: "wide",
  },
  {
    id: "portrait-grayscale",
    thumbSrc: "/images/portrait-3.png",
    fullSrc: "/images/portrait-3.png",
    alt: "Black and white portrait sketch",
    size: "portrait",
  },
  {
    id: "premium-demand-b",
    thumbSrc: "/images/prodege-perks.png",
    fullSrc: "/images/prodege-perks.png",
    alt: "Premium demand product showcase, alternate view",
    size: "wide",
  },
  {
    id: "playtime-mobile-c",
    thumbSrc: "/images/playtime-perks-small.png",
    fullSrc: "/images/playtime-perks-big.png",
    alt: "Playtime perks mobile app dashboard, alternate view",
    size: "phone",
  },
];

const SIZE_CLASS: Record<StripSize, string> = {
  wide:
    "h-[88px] w-[132px] sm:h-[98px] sm:w-[148px] lg:h-[114px] lg:w-[170px]",
  portrait:
    "h-[106px] w-[75px] sm:h-[118px] sm:w-[84px] lg:h-[138px] lg:w-[98px]",
  phone:
    "h-[116px] w-[64px] sm:h-[130px] sm:w-[72px] lg:h-[152px] lg:w-[84px]",
  phoneLarge:
    "h-[128px] w-[70px] sm:h-[144px] sm:w-[78px] lg:h-[168px] lg:w-[92px]",
};

export function HeroImageStrip() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = useMemo(
    () => (activeIndex === null ? null : STRIP_ITEMS[activeIndex]),
    [activeIndex],
  );

  useEffect(() => {
    if (activeItem === null) {
      return;
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    }

    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [activeItem]);

  return (
    <>
      <section
        aria-label="Featured project previews"
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      >
        <div className="hero-strip-marquee flex w-max items-start">
          {[0, 1].map((loop) => (
            <div
              className="flex shrink-0 items-start gap-[58px] pr-[58px] sm:gap-[64px] sm:pr-[64px] lg:gap-[72px] lg:pr-[72px]"
              key={`loop-${loop}`}
            >
              {STRIP_ITEMS.map((item, index) => (
                <button
                  className={cn(
                    "group relative shrink-0 overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b55cb5]",
                    SIZE_CLASS[item.size],
                  )}
                  key={`${item.id}-${loop}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <Image
                    alt={item.alt}
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                    fill
                    sizes="(min-width: 1280px) 170px, (min-width: 640px) 148px, 132px"
                    src={item.thumbSrc}
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {activeItem && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
        >
          <button
            aria-label="Close preview"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/45 text-[28px] leading-none text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            onClick={() => setActiveIndex(null)}
            type="button"
          >
            ×
          </button>

          <div
            className="relative w-full max-w-[1200px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative max-h-[86vh] overflow-hidden rounded-[18px] border border-white/15 bg-black/45 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <Image
                alt={activeItem.alt}
                className="h-auto max-h-[86vh] w-full object-contain"
                height={1300}
                priority
                src={activeItem.fullSrc}
                width={1700}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
