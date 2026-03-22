import Image from "next/image";
import { CTRLEAT_LIQUID_MOTION } from "@/components/sections/ctrleat-motion-config";

export type SplashTone = "purpleGreen" | "greenGold" | "cyanRose";

interface CtrlEatScreenShowcaseProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  sizes: string;
  splashTone: SplashTone;
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

const SPLASH_BLOBS: Record<SplashTone, SplashBlobConfig[]> = {
  purpleGreen: [
    {
      className:
        "absolute left-[7%] top-[9%] h-[194px] w-[194px] rounded-full bg-[radial-gradient(circle,rgba(162,123,243,0.62)_0%,rgba(162,123,243,0.22)_50%,rgba(162,123,243,0)_82%)] blur-[28px]",
      moveXFactor: -0.54,
      moveYFactor: 0.8,
      scaleFactor: 0.22,
      cornerFactor: -0.88,
      glow: "drop-shadow(0 0 34px rgba(162,123,243,0.32)) drop-shadow(0 0 14px rgba(162,123,243,0.2))",
    },
    {
      className:
        "absolute right-[11%] top-[33%] h-[152px] w-[152px] rounded-full bg-[radial-gradient(circle,rgba(118,216,148,0.56)_0%,rgba(118,216,148,0.2)_52%,rgba(118,216,148,0)_82%)] blur-[24px]",
      moveXFactor: 0.44,
      moveYFactor: 0.74,
      scaleFactor: 0.17,
      cornerFactor: 0.92,
      glow: "drop-shadow(0 0 32px rgba(118,216,148,0.3)) drop-shadow(0 0 12px rgba(118,216,148,0.2))",
    },
    {
      className:
        "absolute left-[61%] bottom-[8%] h-[176px] w-[176px] rounded-full bg-[radial-gradient(circle,rgba(114,214,144,0.52)_0%,rgba(114,214,144,0.18)_50%,rgba(114,214,144,0)_82%)] blur-[26px]",
      moveXFactor: 0.34,
      moveYFactor: 0.94,
      scaleFactor: 0.2,
      cornerFactor: 0.62,
      glow: "drop-shadow(0 0 34px rgba(114,214,144,0.3)) drop-shadow(0 0 14px rgba(114,214,144,0.2))",
    },
    {
      className:
        "absolute left-[32%] top-[18%] h-[108px] w-[108px] rounded-full bg-[radial-gradient(circle,rgba(118,216,146,0.44)_0%,rgba(118,216,146,0.14)_54%,rgba(118,216,146,0)_84%)] blur-[20px]",
      moveXFactor: -0.26,
      moveYFactor: 0.58,
      scaleFactor: 0.13,
      cornerFactor: -0.52,
    },
    {
      className:
        "absolute right-[24%] bottom-[12%] h-[126px] w-[126px] rounded-full bg-[radial-gradient(circle,rgba(165,126,244,0.46)_0%,rgba(165,126,244,0.16)_54%,rgba(165,126,244,0)_84%)] blur-[22px]",
      moveXFactor: 0.18,
      moveYFactor: 0.86,
      scaleFactor: 0.16,
      cornerFactor: 0.46,
    },
    {
      className:
        "absolute left-[10%] bottom-[21%] h-[98px] w-[98px] rounded-full bg-[radial-gradient(circle,rgba(168,128,245,0.44)_0%,rgba(168,128,245,0.14)_54%,rgba(168,128,245,0)_84%)] blur-[18px]",
      moveXFactor: -0.32,
      moveYFactor: 0.68,
      scaleFactor: 0.12,
      cornerFactor: -0.5,
    },
    {
      className:
        "absolute left-[74%] top-[15%] h-[86px] w-[86px] rounded-full bg-[radial-gradient(circle,rgba(120,217,147,0.4)_0%,rgba(120,217,147,0.12)_56%,rgba(120,217,147,0)_84%)] blur-[18px]",
      moveXFactor: 0.26,
      moveYFactor: 0.62,
      scaleFactor: 0.1,
      cornerFactor: 0.42,
    },
  ],
  greenGold: [
    {
      className:
        "absolute left-[8%] top-[24%] h-[186px] w-[186px] rounded-full bg-[radial-gradient(circle,rgba(120,217,148,0.6)_0%,rgba(120,217,148,0.22)_50%,rgba(120,217,148,0)_82%)] blur-[28px]",
      moveXFactor: -0.56,
      moveYFactor: 0.86,
      scaleFactor: 0.22,
      cornerFactor: -0.86,
      glow: "drop-shadow(0 0 34px rgba(120,217,148,0.32)) drop-shadow(0 0 14px rgba(120,217,148,0.2))",
    },
    {
      className:
        "absolute right-[9%] top-[8%] h-[152px] w-[152px] rounded-full bg-[radial-gradient(circle,rgba(222,199,109,0.56)_0%,rgba(222,199,109,0.2)_52%,rgba(222,199,109,0)_82%)] blur-[24px]",
      moveXFactor: 0.52,
      moveYFactor: 0.7,
      scaleFactor: 0.19,
      cornerFactor: 0.9,
      glow: "drop-shadow(0 0 32px rgba(222,199,109,0.3)) drop-shadow(0 0 12px rgba(222,199,109,0.2))",
    },
    {
      className:
        "absolute left-[36%] bottom-[8%] h-[172px] w-[172px] rounded-full bg-[radial-gradient(circle,rgba(111,199,130,0.5)_0%,rgba(111,199,130,0.18)_54%,rgba(111,199,130,0)_84%)] blur-[26px]",
      moveXFactor: 0.32,
      moveYFactor: 0.98,
      scaleFactor: 0.2,
      cornerFactor: 0.58,
      glow: "drop-shadow(0 0 34px rgba(111,199,130,0.28)) drop-shadow(0 0 14px rgba(111,199,130,0.18))",
    },
    {
      className:
        "absolute left-[16%] top-[8%] h-[114px] w-[114px] rounded-full bg-[radial-gradient(circle,rgba(169,130,245,0.42)_0%,rgba(169,130,245,0.14)_54%,rgba(169,130,245,0)_84%)] blur-[20px]",
      moveXFactor: -0.28,
      moveYFactor: 0.58,
      scaleFactor: 0.13,
      cornerFactor: -0.6,
    },
    {
      className:
        "absolute right-[20%] bottom-[13%] h-[128px] w-[128px] rounded-full bg-[radial-gradient(circle,rgba(226,201,110,0.46)_0%,rgba(226,201,110,0.14)_54%,rgba(226,201,110,0)_84%)] blur-[22px]",
      moveXFactor: 0.2,
      moveYFactor: 0.9,
      scaleFactor: 0.16,
      cornerFactor: 0.5,
    },
    {
      className:
        "absolute left-[9%] top-[58%] h-[108px] w-[108px] rounded-full bg-[radial-gradient(circle,rgba(118,215,146,0.44)_0%,rgba(118,215,146,0.14)_54%,rgba(118,215,146,0)_84%)] blur-[20px]",
      moveXFactor: -0.34,
      moveYFactor: 0.7,
      scaleFactor: 0.12,
      cornerFactor: -0.5,
    },
    {
      className:
        "absolute right-[33%] top-[44%] h-[92px] w-[92px] rounded-full bg-[radial-gradient(circle,rgba(172,132,246,0.42)_0%,rgba(172,132,246,0.12)_56%,rgba(172,132,246,0)_84%)] blur-[18px]",
      moveXFactor: 0.3,
      moveYFactor: 0.64,
      scaleFactor: 0.1,
      cornerFactor: 0.44,
    },
  ],
  cyanRose: [
    {
      className:
        "absolute left-[6%] top-[11%] h-[188px] w-[188px] rounded-full bg-[radial-gradient(circle,rgba(173,132,246,0.62)_0%,rgba(173,132,246,0.22)_50%,rgba(173,132,246,0)_82%)] blur-[28px]",
      moveXFactor: -0.62,
      moveYFactor: 0.84,
      scaleFactor: 0.22,
      cornerFactor: -0.9,
      glow: "drop-shadow(0 0 34px rgba(173,132,246,0.32)) drop-shadow(0 0 14px rgba(173,132,246,0.2))",
    },
    {
      className:
        "absolute right-[10%] top-[16%] h-[154px] w-[154px] rounded-full bg-[radial-gradient(circle,rgba(116,216,148,0.54)_0%,rgba(116,216,148,0.2)_52%,rgba(116,216,148,0)_82%)] blur-[24px]",
      moveXFactor: 0.56,
      moveYFactor: 0.74,
      scaleFactor: 0.18,
      cornerFactor: 0.88,
      glow: "drop-shadow(0 0 32px rgba(116,216,148,0.28)) drop-shadow(0 0 12px rgba(116,216,148,0.18))",
    },
    {
      className:
        "absolute left-[44%] bottom-[9%] h-[178px] w-[178px] rounded-full bg-[radial-gradient(circle,rgba(226,199,108,0.56)_0%,rgba(226,199,108,0.2)_52%,rgba(226,199,108,0)_82%)] blur-[26px]",
      moveXFactor: 0.34,
      moveYFactor: 0.98,
      scaleFactor: 0.21,
      cornerFactor: 0.58,
      glow: "drop-shadow(0 0 34px rgba(226,199,108,0.28)) drop-shadow(0 0 14px rgba(226,199,108,0.18))",
    },
    {
      className:
        "absolute left-[18%] top-[6%] h-[112px] w-[112px] rounded-full bg-[radial-gradient(circle,rgba(117,216,147,0.42)_0%,rgba(117,216,147,0.14)_54%,rgba(117,216,147,0)_84%)] blur-[20px]",
      moveXFactor: -0.28,
      moveYFactor: 0.62,
      scaleFactor: 0.14,
      cornerFactor: -0.6,
    },
    {
      className:
        "absolute right-[22%] bottom-[12%] h-[132px] w-[132px] rounded-full bg-[radial-gradient(circle,rgba(175,134,247,0.46)_0%,rgba(175,134,247,0.16)_54%,rgba(175,134,247,0)_84%)] blur-[22px]",
      moveXFactor: 0.22,
      moveYFactor: 0.88,
      scaleFactor: 0.16,
      cornerFactor: 0.48,
    },
    {
      className:
        "absolute left-[8%] top-[57%] h-[106px] w-[106px] rounded-full bg-[radial-gradient(circle,rgba(227,202,110,0.44)_0%,rgba(227,202,110,0.14)_54%,rgba(227,202,110,0)_84%)] blur-[20px]",
      moveXFactor: -0.32,
      moveYFactor: 0.72,
      scaleFactor: 0.13,
      cornerFactor: -0.52,
    },
    {
      className:
        "absolute right-[32%] top-[42%] h-[94px] w-[94px] rounded-full bg-[radial-gradient(circle,rgba(119,217,149,0.4)_0%,rgba(119,217,149,0.12)_56%,rgba(119,217,149,0)_84%)] blur-[18px]",
      moveXFactor: 0.28,
      moveYFactor: 0.66,
      scaleFactor: 0.11,
      cornerFactor: 0.42,
    },
  ],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function CtrlEatScreenShowcase({
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
}: CtrlEatScreenShowcaseProps) {
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
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[56px] border border-white/28 bg-[linear-gradient(155deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.07)_40%,rgba(255,255,255,0.03)_100%)]"
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
                  ? `${blob.glow} blur(${blurPx}px) saturate(1.45) contrast(1.18) brightness(1.1)`
                  : `blur(${blurPx}px) saturate(1.45) contrast(1.18) brightness(1.1)`,
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
