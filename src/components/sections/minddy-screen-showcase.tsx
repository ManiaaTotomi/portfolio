import Image from "next/image";
import { CTRLEAT_LIQUID_MOTION } from "@/components/sections/ctrleat-motion-config";

export type MinddySplashTone = "violetForest" | "sunsetIris" | "fuchsiaCyan";

interface MinddyScreenShowcaseProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  sizes: string;
  splashTone: MinddySplashTone;
  driftX: number;
  driftY: number;
  blobResponseMs?: number;
  isActive?: boolean;
}

interface SplashBlobConfig {
  className: string;
  moveXFactor: number;
  moveYFactor: number;
  scaleFactor: number;
  cornerFactor: number;
  glow?: string;
}

const SPLASH_BLOBS: Record<MinddySplashTone, SplashBlobConfig[]> = {
  violetForest: [
    {
      className:
        "absolute left-[8%] top-[9%] h-[204px] w-[204px] rounded-full bg-[radial-gradient(circle,rgba(147,114,239,0.66)_0%,rgba(147,114,239,0.24)_50%,rgba(147,114,239,0)_84%)] blur-[30px]",
      moveXFactor: -0.56,
      moveYFactor: 0.82,
      scaleFactor: 0.24,
      cornerFactor: -0.9,
      glow: "drop-shadow(0 0 36px rgba(147,114,239,0.34)) drop-shadow(0 0 16px rgba(147,114,239,0.22))",
    },
    {
      className:
        "absolute right-[10%] bottom-[8%] h-[216px] w-[216px] rounded-full bg-[radial-gradient(circle,rgba(74,189,106,0.62)_0%,rgba(74,189,106,0.2)_52%,rgba(74,189,106,0)_84%)] blur-[30px]",
      moveXFactor: 0.54,
      moveYFactor: 0.98,
      scaleFactor: 0.25,
      cornerFactor: 0.88,
      glow: "drop-shadow(0 0 34px rgba(74,189,106,0.3)) drop-shadow(0 0 14px rgba(74,189,106,0.2))",
    },
    {
      className:
        "absolute left-[34%] top-[56%] h-[152px] w-[152px] rounded-full bg-[radial-gradient(circle,rgba(96,176,235,0.44)_0%,rgba(96,176,235,0.14)_54%,rgba(96,176,235,0)_84%)] blur-[24px]",
      moveXFactor: -0.24,
      moveYFactor: 0.7,
      scaleFactor: 0.17,
      cornerFactor: -0.48,
    },
    {
      className:
        "absolute right-[22%] top-[18%] h-[114px] w-[114px] rounded-full bg-[radial-gradient(circle,rgba(169,132,247,0.46)_0%,rgba(169,132,247,0.14)_54%,rgba(169,132,247,0)_84%)] blur-[20px]",
      moveXFactor: 0.26,
      moveYFactor: 0.58,
      scaleFactor: 0.13,
      cornerFactor: 0.42,
    },
    {
      className:
        "absolute left-[12%] bottom-[22%] h-[126px] w-[126px] rounded-full bg-[radial-gradient(circle,rgba(86,194,127,0.48)_0%,rgba(86,194,127,0.16)_54%,rgba(86,194,127,0)_84%)] blur-[22px]",
      moveXFactor: -0.34,
      moveYFactor: 0.78,
      scaleFactor: 0.15,
      cornerFactor: -0.54,
    },
  ],
  sunsetIris: [
    {
      className:
        "absolute left-[10%] top-[11%] h-[196px] w-[196px] rounded-full bg-[radial-gradient(circle,rgba(145,118,238,0.6)_0%,rgba(145,118,238,0.2)_52%,rgba(145,118,238,0)_84%)] blur-[28px]",
      moveXFactor: -0.56,
      moveYFactor: 0.82,
      scaleFactor: 0.22,
      cornerFactor: -0.88,
      glow: "drop-shadow(0 0 34px rgba(145,118,238,0.3)) drop-shadow(0 0 14px rgba(145,118,238,0.2))",
    },
    {
      className:
        "absolute right-[12%] top-[23%] h-[168px] w-[168px] rounded-full bg-[radial-gradient(circle,rgba(252,160,118,0.6)_0%,rgba(252,160,118,0.22)_50%,rgba(252,160,118,0)_84%)] blur-[26px]",
      moveXFactor: 0.46,
      moveYFactor: 0.7,
      scaleFactor: 0.2,
      cornerFactor: 0.76,
      glow: "drop-shadow(0 0 34px rgba(252,160,118,0.3)) drop-shadow(0 0 14px rgba(252,160,118,0.2))",
    },
    {
      className:
        "absolute left-[36%] bottom-[8%] h-[182px] w-[182px] rounded-full bg-[radial-gradient(circle,rgba(106,210,246,0.56)_0%,rgba(106,210,246,0.2)_52%,rgba(106,210,246,0)_84%)] blur-[28px]",
      moveXFactor: 0.3,
      moveYFactor: 1,
      scaleFactor: 0.22,
      cornerFactor: 0.62,
      glow: "drop-shadow(0 0 34px rgba(106,210,246,0.26)) drop-shadow(0 0 14px rgba(106,210,246,0.18))",
    },
    {
      className:
        "absolute left-[18%] top-[61%] h-[122px] w-[122px] rounded-full bg-[radial-gradient(circle,rgba(84,188,114,0.48)_0%,rgba(84,188,114,0.16)_54%,rgba(84,188,114,0)_84%)] blur-[22px]",
      moveXFactor: -0.32,
      moveYFactor: 0.78,
      scaleFactor: 0.14,
      cornerFactor: -0.54,
    },
    {
      className:
        "absolute right-[24%] bottom-[16%] h-[104px] w-[104px] rounded-full bg-[radial-gradient(circle,rgba(178,139,249,0.46)_0%,rgba(178,139,249,0.14)_54%,rgba(178,139,249,0)_84%)] blur-[20px]",
      moveXFactor: 0.2,
      moveYFactor: 0.86,
      scaleFactor: 0.12,
      cornerFactor: 0.46,
    },
  ],
  fuchsiaCyan: [
    {
      className:
        "absolute left-[13%] top-[12%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(212,77,250,0.66)_0%,rgba(212,77,250,0.24)_50%,rgba(212,77,250,0)_84%)] blur-[32px]",
      moveXFactor: -0.6,
      moveYFactor: 0.82,
      scaleFactor: 0.24,
      cornerFactor: -0.9,
      glow: "drop-shadow(0 0 38px rgba(212,77,250,0.34)) drop-shadow(0 0 16px rgba(212,77,250,0.22))",
    },
    {
      className:
        "absolute left-[19%] bottom-[9%] h-[224px] w-[224px] rounded-full bg-[radial-gradient(circle,rgba(34,204,255,0.68)_0%,rgba(34,204,255,0.24)_50%,rgba(34,204,255,0)_84%)] blur-[32px]",
      moveXFactor: -0.46,
      moveYFactor: 1.02,
      scaleFactor: 0.25,
      cornerFactor: -0.76,
      glow: "drop-shadow(0 0 38px rgba(34,204,255,0.32)) drop-shadow(0 0 16px rgba(34,204,255,0.2))",
    },
    {
      className:
        "absolute right-[12%] top-[50%] h-[148px] w-[148px] rounded-full bg-[radial-gradient(circle,rgba(92,180,255,0.44)_0%,rgba(92,180,255,0.14)_54%,rgba(92,180,255,0)_84%)] blur-[24px]",
      moveXFactor: 0.4,
      moveYFactor: 0.68,
      scaleFactor: 0.15,
      cornerFactor: 0.6,
    },
    {
      className:
        "absolute right-[24%] top-[16%] h-[112px] w-[112px] rounded-full bg-[radial-gradient(circle,rgba(207,92,250,0.44)_0%,rgba(207,92,250,0.14)_54%,rgba(207,92,250,0)_84%)] blur-[20px]",
      moveXFactor: 0.28,
      moveYFactor: 0.56,
      scaleFactor: 0.12,
      cornerFactor: 0.44,
    },
    {
      className:
        "absolute right-[14%] bottom-[18%] h-[130px] w-[130px] rounded-full bg-[radial-gradient(circle,rgba(61,211,255,0.46)_0%,rgba(61,211,255,0.16)_54%,rgba(61,211,255,0)_84%)] blur-[22px]",
      moveXFactor: 0.3,
      moveYFactor: 0.9,
      scaleFactor: 0.14,
      cornerFactor: 0.5,
    },
  ],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function MinddyScreenShowcase({
  alt,
  src,
  width,
  height,
  sizes,
  splashTone,
  driftX,
  driftY,
  blobResponseMs = CTRLEAT_LIQUID_MOTION.blobResponseMs,
  isActive = false,
}: MinddyScreenShowcaseProps) {
  const boundedDriftX = clamp(driftX, -96, 96);
  const boundedDriftY = clamp(driftY, -96, 96);
  const liquidIntensity = clamp((Math.abs(boundedDriftX) + Math.abs(boundedDriftY)) / 170, 0, 1);
  const cornerTravel =
    Math.sign(boundedDriftY) * Math.pow(clamp(Math.abs(boundedDriftY) / 96, 0, 1), 1.35);
  const blurPx = Math.round(20 + liquidIntensity * 10);

  return (
    <div className="relative isolate">
      <div className="relative p-[24px]">
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[56px] border border-white/24 bg-[linear-gradient(155deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.07)_42%,rgba(255,255,255,0.03)_100%)]"
          style={{
            boxShadow: isActive
              ? "0 30px 74px rgba(0,0,0,0.58), inset 0 0 0 1px rgba(255,255,255,0.14)"
              : "0 22px 58px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.1)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.01)_55%,rgba(255,255,255,0)_100%)]" />
          {SPLASH_BLOBS[splashTone].map((blob) => (
            <div
              className={blob.className}
              key={blob.className}
              style={{
                transform: `translate3d(${boundedDriftX * blob.moveXFactor + cornerTravel * blob.cornerFactor * CTRLEAT_LIQUID_MOTION.cornerTravelPixels}px, ${boundedDriftY * blob.moveYFactor}px, 0) scale(${1 + liquidIntensity * blob.scaleFactor})`,
                transition: `transform ${blobResponseMs}ms cubic-bezier(0.16, 0.84, 0.22, 1)`,
                filter: blob.glow
                  ? `${blob.glow} blur(${blurPx}px) saturate(1.48) contrast(1.2) brightness(1.12)`
                  : `blur(${blurPx}px) saturate(1.48) contrast(1.2) brightness(1.12)`,
                mixBlendMode: "screen",
                opacity: 0.96,
                willChange: "transform",
              }}
            />
          ))}
        </div>
        <Image
          alt={alt}
          className="relative z-10 h-auto w-[295px] sm:w-[330px] lg:w-[392px]"
          height={height}
          sizes={sizes}
          src={src}
          width={width}
        />
      </div>
    </div>
  );
}
