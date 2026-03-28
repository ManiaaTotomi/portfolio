"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";

interface SplashConfig {
  scale: number;
  top: number;
  x: number;
  opacity: number;
}

const DEFAULT_SPLASH: SplashConfig = {
  scale: 1.52,
  top: -201,
  x: -33,
  opacity: 0.3,
};
const SPLASH_KNOBS_VISIBLE_STORAGE_KEY = "home:hero-splash:knobs-visible";

function saveStoredVisibility(key: string, value: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify({ value }));
  } catch {}
}

const StaticFigmaSplash = memo(function StaticFigmaSplash() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: "50%",
        top: "-222px",
        width: "838px",
        height: "793px",
        transform: "translateX(-50%) scale(1.28)",
        transformOrigin: "center center",
        opacity: 1,
      }}
    >
      <div className="absolute inset-[-70.62%_-66.83%]">
        <Image
          alt=""
          aria-hidden="true"
          src="/images/hero-blur-color.svg"
          fill
          className="object-fill"
        />
      </div>
    </div>
  );
});

export function HeroSplashLayer() {
  const [config, setConfig] = useState<SplashConfig>(DEFAULT_SPLASH);
  const showTuner = process.env.NODE_ENV !== "production";
  const [knobsVisible, setKnobsVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hero-splash-scale", String(config.scale));
    root.style.setProperty("--hero-splash-top", `${config.top}px`);
    root.style.setProperty("--hero-splash-x", `${config.x}px`);
    root.style.setProperty("--hero-splash-opacity", String(config.opacity));
  }, [config]);

  useEffect(() => {
    saveStoredVisibility(SPLASH_KNOBS_VISIBLE_STORAGE_KEY, knobsVisible);
  }, [knobsVisible]);

  return (
    <>
      <StaticFigmaSplash />

      <div
        className="pointer-events-none absolute -translate-x-1/2"
        style={{
          left: `calc(50% + ${config.x}px)`,
          top: `${config.top}px`,
          width: `${980 * config.scale}px`,
          height: `${900 * config.scale}px`,
          opacity: config.opacity,
        }}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,14,255,0.38)_0%,rgba(255,14,255,0.2)_34%,rgba(255,14,255,0.08)_62%,rgba(255,14,255,0)_84%)] blur-[76px]" />
      </div>

      {showTuner && knobsVisible && (
        <div className="font-figtree fixed bottom-4 right-4 z-50 w-[290px] rounded-xl border border-white/20 bg-[#0a0a0a]/95 p-4 text-white shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <p className="text-sm font-semibold tracking-[0.04em]">Splash Tuner</p>
          <p className="mt-1 text-xs text-white/70">Visible in local dev mode.</p>

          <label className="mt-4 block text-xs text-white/80">
            Spread: {config.scale.toFixed(2)}
            <input
              className="mt-1 w-full accent-[#d336ee]"
              max={2}
              min={0.5}
              onChange={(event) => {
                const value = Number(event.currentTarget.value);
                setConfig((prev) => ({
                  ...prev,
                  scale: value,
                }));
              }}
              step={0.01}
              type="range"
              value={config.scale}
            />
          </label>

          <label className="mt-3 block text-xs text-white/80">
            Vertical: {Math.round(config.top)}px
            <input
              className="mt-1 w-full accent-[#d336ee]"
              max={120}
              min={-520}
              onChange={(event) => {
                const value = Number(event.currentTarget.value);
                setConfig((prev) => ({
                  ...prev,
                  top: value,
                }));
              }}
              step={1}
              type="range"
              value={config.top}
            />
          </label>

          <label className="mt-3 block text-xs text-white/80">
            Horizontal: {Math.round(config.x)}px
            <input
              className="mt-1 w-full accent-[#d336ee]"
              max={300}
              min={-300}
              onChange={(event) => {
                const value = Number(event.currentTarget.value);
                setConfig((prev) => ({
                  ...prev,
                  x: value,
                }));
              }}
              step={1}
              type="range"
              value={config.x}
            />
          </label>

          <label className="mt-3 block text-xs text-white/80">
            Opacity: {config.opacity.toFixed(2)}
            <input
              className="mt-1 w-full accent-[#d336ee]"
              max={1}
              min={0}
              onChange={(event) => {
                const value = Number(event.currentTarget.value);
                setConfig((prev) => ({
                  ...prev,
                  opacity: value,
                }));
              }}
              step={0.01}
              type="range"
              value={config.opacity}
            />
          </label>

          <button
            className="mt-4 inline-flex h-8 items-center justify-center rounded-md border border-white/30 px-3 text-xs font-medium transition-colors hover:bg-white/10"
            onClick={() => setConfig(DEFAULT_SPLASH)}
            type="button"
          >
            Reset To Figma Defaults
          </button>
        </div>
      )}
      {showTuner && (
        <button
          className="font-figtree fixed right-4 top-4 z-[60] rounded-full border border-white/25 bg-[#0e0e0e]/95 px-4 py-2 text-[13px] font-medium text-white shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:border-white/40 hover:bg-[#151515]/95"
          onClick={() => setKnobsVisible((current) => !current)}
          type="button"
        >
          {knobsVisible ? "Hide knobs" : "Show knobs"}
        </button>
      )}
    </>
  );
}
