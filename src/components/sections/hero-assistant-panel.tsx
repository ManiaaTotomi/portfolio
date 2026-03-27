"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { HeroRotatingQuestion } from "@/components/sections/hero-rotating-question";
import { HeroSplashLayer } from "@/components/sections/hero-splash-layer";

interface HeroAssistantPanelProps {
  assistantButtonLabel: string;
  assistantDisclaimer: string;
}

interface OverlayGlowConfig {
  blurOpacity: number;
  glowOpacity: number;
  glowSpread: number;
  glowY: number;
  darkBottom: number;
  darkTop: number;
}

const DEFAULT_OVERLAY_GLOW: OverlayGlowConfig = {
  blurOpacity: 0.95,
  darkBottom: 0.78,
  darkTop: 0.62,
  glowOpacity: 0.22,
  glowSpread: 1,
  glowY: 65,
};
const OVERLAY_KNOBS_VISIBLE_STORAGE_KEY = "home:overlay-chat:knobs-visible";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function loadStoredVisibility(key: string, fallback: boolean) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || typeof parsed.value !== "boolean") {
      return fallback;
    }

    return parsed.value;
  } catch {
    return fallback;
  }
}

function saveStoredVisibility(key: string, value: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify({ value }));
  } catch {}
}

function buildAssistantReply(question: string) {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("process") || lowerQuestion.includes("workflow")) {
    return "Mania typically starts by clarifying product goals and constraints, then maps user flows, aligns stakeholders, and iterates quickly with testable UI decisions.";
  }

  if (
    lowerQuestion.includes("team") ||
    lowerQuestion.includes("collaborat") ||
    lowerQuestion.includes("engineer")
  ) {
    return "Mania works cross-functionally with PMs and engineers from early concept through delivery, keeping communication clear and decisions tied to measurable product outcomes.";
  }

  if (
    lowerQuestion.includes("design system") ||
    lowerQuestion.includes("scale")
  ) {
    return "Mania focuses on scalable systems by defining reusable foundations, consistent patterns, and practical documentation that supports both design quality and development speed.";
  }

  return "Mania has a user-centered design philosophy, values collaboration and clear communication.";
}

function AskMeBorderButton({ label }: { label: string }) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <button
      className="font-figtree !absolute right-[14px] top-1/2 inline-flex h-[43px] w-fit shrink-0 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-transparent px-[20px] whitespace-nowrap transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a2ff] sm:right-[25px]"
      type="submit"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 43"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="100"
            y1="21.5"
            y2="21.5"
          >
            <stop offset="0%" stopColor="#8C318A" />
            <stop offset="65%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#5E0160" />
            <animateTransform
              attributeName="gradientTransform"
              dur="6s"
              from="0 50 21.5"
              repeatCount="indefinite"
              to="360 50 21.5"
              type="rotate"
            />
          </linearGradient>
        </defs>
        <rect
          height="41.5"
          rx="20.75"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          width="98.5"
          x="0.75"
          y="0.75"
        />
      </svg>

      <span className="relative z-[1] inline-flex h-full items-center justify-center rounded-full bg-transparent text-[16px] font-semibold text-white">
        {label}
      </span>
    </button>
  );
}

export function HeroAssistantPanel({
  assistantButtonLabel,
  assistantDisclaimer,
}: HeroAssistantPanelProps) {
  const placeholderText = "Ask your question about my work or experience...";
  const topInputId = useId();
  const overlayInputId = useId();
  const [inputValue, setInputValue] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [overlayGlow, setOverlayGlow] = useState<OverlayGlowConfig>(
    DEFAULT_OVERLAY_GLOW,
  );
  const [overlayKnobsVisible, setOverlayKnobsVisible] = useState<boolean>(() =>
    loadStoredVisibility(OVERLAY_KNOBS_VISIBLE_STORAGE_KEY, true),
  );
  const topInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const showTuner = process.env.NODE_ENV !== "production";

  useEffect(() => {
    topInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOverlayOpen]);

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOverlayOpen(false);
        setMessages([]);
        setInputValue("");
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOverlayOpen]);

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [isOverlayOpen, messages]);

  useEffect(() => {
    saveStoredVisibility(OVERLAY_KNOBS_VISIBLE_STORAGE_KEY, overlayKnobsVisible);
  }, [overlayKnobsVisible]);

  function submitQuestion(question: string) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    const questionMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedQuestion,
    };

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: "assistant",
      text: buildAssistantReply(trimmedQuestion),
    };

    setMessages((prev) => [...prev, questionMessage, assistantMessage]);
    setInputValue("");
    setIsOverlayOpen(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(inputValue);
  }

  function closeOverlay() {
    setIsOverlayOpen(false);
    setMessages([]);
    setInputValue("");
  }

  return (
    <>
      <div className="relative z-10 mx-auto flex h-[calc(100svh-79px)] min-h-[663px] w-full max-w-[980px] flex-col items-center px-5 pb-[26px] pt-[136px] text-center sm:px-8 lg:h-[896px] lg:pb-[280px] lg:pt-[290px]">
        <div className="flex min-h-[188px] w-full items-center justify-center lg:min-h-[219px]">
          <HeroRotatingQuestion />
        </div>

        <div className="absolute inset-x-5 bottom-[max(18px,env(safe-area-inset-bottom))] mx-auto flex w-auto max-w-[772px] flex-col items-center gap-[18px] sm:inset-x-8 lg:relative lg:inset-auto lg:bottom-auto lg:mt-[32px] lg:w-full lg:gap-[32px]">
          <HeroSplashLayer />

          <form
            className="relative h-[70px] w-full max-w-[763px] rounded-[9999px] border border-[rgba(255,255,255,0.2)] bg-transparent"
            onSubmit={handleSubmit}
          >
            {!inputValue && (
              <label
                className="font-figtree absolute left-[22px] top-1/2 -translate-y-1/2 cursor-text text-left text-[12px] font-light tracking-[0.0105px] text-[rgba(195,189,189,0.62)] sm:left-[35px] sm:text-[18px]"
                htmlFor={topInputId}
              >
                <span aria-hidden className="hero-input-caret">
                  |
                </span>
                {placeholderText}
              </label>
            )}
            <input
              aria-label="Ask a question"
              className={`font-figtree h-full w-full rounded-[9999px] bg-transparent pl-[22px] pr-[170px] text-[13px] font-light tracking-[0.0105px] text-[rgba(240,240,240,0.88)] outline-none sm:pl-[35px] sm:text-[18px] ${inputValue ? "caret-white" : "caret-transparent"}`}
              id={topInputId}
              onChange={(event) => setInputValue(event.currentTarget.value)}
              placeholder=""
              ref={topInputRef}
              type="text"
              value={inputValue}
            />
            <AskMeBorderButton label={assistantButtonLabel} />
          </form>

          <p className="font-figtree w-full max-w-[554px] text-[13px] leading-[1.5] text-[rgba(181,181,181,0.8)] sm:text-[14px] sm:leading-[23px]">
            {assistantDisclaimer}
          </p>
        </div>
      </div>

      {isOverlayOpen && (
        <div className="fixed inset-0 z-[220] overflow-hidden bg-[rgba(0,0,0,0.62)]">
          <div className="absolute inset-y-[32px] inset-x-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#330C33] shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:inset-x-[88px]">
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute left-1/2 top-1/2 h-[793px] w-[838px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(-50%, -50%) scale(${overlayGlow.glowSpread})`,
                }}
              >
                <Image
                  alt=""
                  aria-hidden
                  className="object-fill"
                  fill
                  src="/images/hero-blur-color.svg"
                  style={{ opacity: overlayGlow.blurOpacity }}
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% ${overlayGlow.glowY}%, rgba(255,14,255,${overlayGlow.glowOpacity}) 0%, rgba(255,14,255,${(overlayGlow.glowOpacity * 0.68).toFixed(3)}) 30%, rgba(51,12,51,0) 65%)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, rgba(51,12,51,${overlayGlow.darkTop}) 0%, rgba(51,12,51,${overlayGlow.darkBottom}) 100%)`,
                }}
              />
            </div>

            <button
              aria-label="Close chat"
              className="absolute right-6 top-6 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,255,255,0.22)] bg-[#352532] text-[24px] leading-none text-white/90 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              onClick={closeOverlay}
              type="button"
            >
              ×
            </button>

            <div className="relative mx-auto flex h-full w-full max-w-[762px] flex-col px-5 pb-10 pt-[100px] sm:px-8">
              <div className="flex min-h-0 flex-1 flex-col">
                <div
                  className="hero-chat-scroll min-h-0 flex-1 overflow-y-auto pr-2"
                  ref={scrollContainerRef}
                >
                  <div className="flex flex-col gap-4 pb-2 pr-5">
                    {messages.map((message) =>
                      message.role === "user" ? (
                        <div className="flex w-full justify-end" key={message.id}>
                          <div className="max-w-[68%] rounded-[12px] border border-[#9b2692] bg-[rgba(155,38,146,0.2)] px-4 py-3 text-[18px] leading-[28px] text-white">
                            {message.text}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex w-full justify-start pr-[100px] sm:pr-[160px]"
                          key={message.id}
                        >
                          <p className="w-full px-1 py-1 text-[18px] leading-[28px] text-white/75">
                            {message.text}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex w-full flex-col items-center gap-6">
                <form
                  className="relative h-[70px] w-full rounded-[9999px] border border-[rgba(231,231,231,0.2)] bg-transparent"
                  onSubmit={handleSubmit}
                >
                  {!inputValue && (
                    <label
                      className="font-figtree absolute left-[25px] top-1/2 -translate-y-1/2 cursor-text text-left text-[12px] font-light tracking-[0.0105px] text-[rgba(195,189,189,0.62)] sm:text-[18px]"
                      htmlFor={overlayInputId}
                    >
                      <span aria-hidden className="hero-input-caret">
                        |
                      </span>
                      {placeholderText}
                    </label>
                  )}
                  <input
                    aria-label="Ask another question"
                    autoFocus
                    className={`font-figtree h-full w-full rounded-[9999px] bg-transparent pl-[25px] pr-[170px] text-[13px] font-light tracking-[0.0105px] text-[rgba(240,240,240,0.9)] outline-none sm:text-[18px] ${inputValue ? "caret-white" : "caret-transparent"}`}
                    id={overlayInputId}
                    onChange={(event) => setInputValue(event.currentTarget.value)}
                    placeholder=""
                    type="text"
                    value={inputValue}
                  />
                  <AskMeBorderButton label={assistantButtonLabel} />
                </form>

                <p className="font-figtree w-full max-w-[554px] text-center text-[14px] leading-[23px] text-[rgba(181,181,181,0.8)]">
                  {assistantDisclaimer}
                </p>
              </div>
            </div>

            {showTuner && overlayKnobsVisible && (
              <div className="font-figtree absolute bottom-4 right-4 z-[240] w-[310px] rounded-xl border border-white/20 bg-[#0a0a0a]/95 p-4 text-white shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <p className="text-sm font-semibold tracking-[0.04em]">
                  Overlay Tuner
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Visible in local dev mode.
                </p>

                <label className="mt-4 block text-xs text-white/80">
                  Glow Strength: {overlayGlow.glowOpacity.toFixed(2)}
                  <input
                    className="mt-1 w-full accent-[#d336ee]"
                    max={0.6}
                    min={0}
                    onChange={(event) => {
                      const value = Number(event.currentTarget.value);
                      setOverlayGlow((prev) => ({
                        ...prev,
                        glowOpacity: value,
                      }));
                    }}
                    step={0.01}
                    type="range"
                    value={overlayGlow.glowOpacity}
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Glow Spread: {overlayGlow.glowSpread.toFixed(2)}
                  <input
                    className="mt-1 w-full accent-[#d336ee]"
                    max={1.8}
                    min={0.6}
                    onChange={(event) => {
                      const value = Number(event.currentTarget.value);
                      setOverlayGlow((prev) => ({
                        ...prev,
                        glowSpread: value,
                      }));
                    }}
                    step={0.01}
                    type="range"
                    value={overlayGlow.glowSpread}
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Glow Vertical: {overlayGlow.glowY}%
                  <input
                    className="mt-1 w-full accent-[#d336ee]"
                    max={90}
                    min={30}
                    onChange={(event) => {
                      const value = Number(event.currentTarget.value);
                      setOverlayGlow((prev) => ({
                        ...prev,
                        glowY: value,
                      }));
                    }}
                    step={1}
                    type="range"
                    value={overlayGlow.glowY}
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Blur Opacity: {overlayGlow.blurOpacity.toFixed(2)}
                  <input
                    className="mt-1 w-full accent-[#d336ee]"
                    max={1}
                    min={0}
                    onChange={(event) => {
                      const value = Number(event.currentTarget.value);
                      setOverlayGlow((prev) => ({
                        ...prev,
                        blurOpacity: value,
                      }));
                    }}
                    step={0.01}
                    type="range"
                    value={overlayGlow.blurOpacity}
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Dark Top: {overlayGlow.darkTop.toFixed(2)}
                  <input
                    className="mt-1 w-full accent-[#d336ee]"
                    max={1}
                    min={0}
                    onChange={(event) => {
                      const value = Number(event.currentTarget.value);
                      setOverlayGlow((prev) => ({
                        ...prev,
                        darkTop: value,
                      }));
                    }}
                    step={0.01}
                    type="range"
                    value={overlayGlow.darkTop}
                  />
                </label>

                <label className="mt-3 block text-xs text-white/80">
                  Dark Bottom: {overlayGlow.darkBottom.toFixed(2)}
                  <input
                    className="mt-1 w-full accent-[#d336ee]"
                    max={1}
                    min={0}
                    onChange={(event) => {
                      const value = Number(event.currentTarget.value);
                      setOverlayGlow((prev) => ({
                        ...prev,
                        darkBottom: value,
                      }));
                    }}
                    step={0.01}
                    type="range"
                    value={overlayGlow.darkBottom}
                  />
                </label>

                <button
                  className="mt-4 inline-flex h-8 items-center justify-center rounded-md border border-white/30 px-3 text-xs font-medium transition-colors hover:bg-white/10"
                  onClick={() => setOverlayGlow(DEFAULT_OVERLAY_GLOW)}
                  type="button"
                >
                  Reset Overlay Defaults
                </button>
              </div>
            )}
            {showTuner && (
              <button
                className="font-figtree absolute left-4 top-4 z-[250] rounded-full border border-white/25 bg-[#0e0e0e]/95 px-4 py-2 text-[13px] font-medium text-white shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:border-white/40 hover:bg-[#151515]/95"
                onClick={() => setOverlayKnobsVisible((current) => !current)}
                type="button"
              >
                {overlayKnobsVisible ? "Hide knobs" : "Show knobs"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
