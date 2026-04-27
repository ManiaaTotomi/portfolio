"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { HeroRotatingQuestion } from "@/components/sections/hero-rotating-question";
import { HeroSplashLayer } from "@/components/sections/hero-splash-layer";

interface HeroAssistantPanelProps {
  assistantButtonLabel: string;
  assistantDisclaimer: string;
  assistantPlaceholder: string;
  assistantPrompts: string[];
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

function saveStoredVisibility(key: string, value: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify({ value }));
  } catch {}
}

function waitForNextPaint() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

function AskMeBorderButton({
  label,
  stackOnMobile = false,
  className = "",
}: {
  label: string;
  stackOnMobile?: boolean;
  className?: string;
}) {
  const buttonSize = "h-[40px] w-[40px]";

  return (
    <button
      aria-label={label}
      className={`font-figtree inline-flex ${buttonSize} shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent p-0 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a2ff] ${
        stackOnMobile
          ? "relative sm:absolute sm:right-[25px] sm:top-1/2 sm:-translate-y-1/2"
          : "absolute right-[14px] top-1/2 -translate-y-1/2 sm:right-[25px]"
      } ${className}`}
      type="submit"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#8C318A_0deg,#FFFFFF_140deg,#5E0160_250deg,#8C318A_360deg)] animate-[spin_2.4s_linear_infinite]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1.5px] rounded-full bg-[#2e082e]"
      />

      <span
        className="relative z-[1] inline-flex h-full items-center justify-center rounded-full bg-transparent text-white"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 19V5M12 5L6 11M12 5L18 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </span>
    </button>
  );
}

function AiAssistantOrbitText() {
  const orbitPathId = useId();

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full overflow-visible"
      fill="none"
      viewBox="-10 -10 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          d="M50 50m-41 0a41 41 0 1 1 82 0a41 41 0 1 1 -82 0"
          id={orbitPathId}
        />
      </defs>
      <text
        fill="currentColor"
        fontFamily="Figtree, system-ui, sans-serif"
        fontSize="16.2"
        fontWeight="400"
        letterSpacing="0.28"
      >
        <textPath href={`#${orbitPathId}`} startOffset="0%" textAnchor="start">
          Chat • with • my • AI • assistant •
        </textPath>
      </text>
    </svg>
  );
}

function AiAssistantIcon({ className = "h-full w-full" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center ${className}`}
    >
      <span className="relative h-full w-full overflow-hidden rounded-full">
        <Image
          alt=""
          className="object-cover [mix-blend-mode:luminosity]"
          fill
          loading="eager"
          sizes="48px"
          src="/images/footer-avatar.png"
          unoptimized
        />
      </span>
    </span>
  );
}

export function HeroAssistantPanel({
  assistantButtonLabel,
  assistantDisclaimer,
  assistantPlaceholder,
  assistantPrompts,
}: HeroAssistantPanelProps) {
  const placeholderText = assistantPlaceholder;
  const overlayTextareaId = useId();
  const [inputValue, setInputValue] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAwaitingReply, setIsAwaitingReply] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [overlayGlow, setOverlayGlow] = useState<OverlayGlowConfig>(
    DEFAULT_OVERLAY_GLOW,
  );
  const [overlayKnobsVisible, setOverlayKnobsVisible] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const emptyStateTextareaRef = useRef<HTMLTextAreaElement>(null);
  const footerBlockRef = useRef<HTMLDivElement>(null);
  const showTuner = false;
  const hasMessages = messages.length > 0;

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
  }, [footerHeight, isOverlayOpen, messages]);

  useEffect(() => {
    saveStoredVisibility(OVERLAY_KNOBS_VISIBLE_STORAGE_KEY, overlayKnobsVisible);
  }, [overlayKnobsVisible]);

  useEffect(() => {
    const textarea = emptyStateTextareaRef.current;
    if (!textarea || hasMessages || !isOverlayOpen) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.max(20, textarea.scrollHeight)}px`;

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    window.requestAnimationFrame(() => {
      textarea.focus({ preventScroll: true });
    });
  }, [hasMessages, inputValue, isOverlayOpen]);

  useEffect(() => {
    if (!isOverlayOpen || !hasMessages) {
      setFooterHeight(0);
      return;
    }

    const footer = footerBlockRef.current;
    if (!footer) {
      return;
    }

    const updateHeight = () => {
      setFooterHeight(footer.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(footer);

    return () => observer.disconnect();
  }, [hasMessages, inputValue, isOverlayOpen]);

  async function submitQuestion(question: string) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    const questionMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedQuestion,
    };

    flushSync(() => {
      setMessages((prev) => [...prev, questionMessage]);
      setIsAwaitingReply(true);
      setInputValue("");
      setIsOverlayOpen(true);
    });
    await waitForNextPaint();

    try {
      const response = await fetch("/api/clone-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedQuestion }),
      });

      const result = await response.json();
      const assistantText =
        response.ok && typeof result.reply === "string"
          ? result.reply
          : "The AI assistant is unavailable right now. Please try again in a moment.";

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "assistant",
        text: assistantText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "assistant",
        text: "The AI assistant is unavailable right now. Please try again in a moment.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsAwaitingReply(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(inputValue);
  }

  function closeOverlay() {
    setIsOverlayOpen(false);
    setMessages([]);
    setIsAwaitingReply(false);
    setInputValue("");
  }

  function openOverlay() {
    flushSync(() => {
      setIsOverlayOpen(true);
    });
  }

  function handleAssistantTriggerPointerDown(
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") {
      return;
    }

    event.preventDefault();
    openOverlay();
  }

  return (
    <>
      <div className="relative z-20 mx-auto flex min-h-[660px] w-full max-w-[1600px] flex-col px-5 py-12 text-center sm:min-h-[720px] sm:px-8 lg:h-[896px] lg:min-h-0 lg:px-10 lg:pb-[280px] lg:pt-[290px]">
        <HeroSplashLayer />

        <div className="flex w-full flex-1 items-center justify-center lg:min-h-[219px] lg:flex-none">
          <div className="flex w-full flex-col items-center">
            <HeroRotatingQuestion />
            <p className="font-aeonik mt-6 max-w-[360px] text-balance text-center text-[18px] font-normal leading-[1.45] text-white/72 sm:max-w-[620px] sm:text-[20px] lg:max-w-[980px]">
              8+ years designing end-to-end B2B products, with recent focus on AI-powered features
            </p>
            <div className="mt-16 flex w-full items-center justify-center">
              <button
                aria-expanded={isOverlayOpen}
                aria-label="Open assistant chat"
                className="group relative z-20 inline-flex h-[110px] w-[110px] cursor-pointer touch-manipulation items-center justify-center rounded-full text-[#d336ee] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d336ee]/55"
                onClick={openOverlay}
                onPointerDown={handleAssistantTriggerPointerDown}
                onTouchStart={openOverlay}
                type="button"
              >
                <span className="pointer-events-none absolute inset-0 inline-flex scale-[0.94] items-center justify-center motion-safe:animate-[spin_11s_linear_infinite] motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-visible:[animation-play-state:paused]">
                  <AiAssistantOrbitText />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <AiAssistantIcon className="h-12 w-12" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!isOverlayOpen}
        className={`fixed inset-0 z-[220] overflow-hidden bg-[rgba(0,0,0,0.62)] transition-opacity duration-100 ${
          isOverlayOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        data-assistant-overlay={isOverlayOpen ? "open" : "closed"}
      >
          <div className="absolute inset-0 overflow-hidden bg-[#330C33] shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:inset-x-[88px] lg:inset-y-[32px] lg:rounded-[28px] lg:border lg:border-white/10">
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute left-1/2 top-1/2 h-[793px] w-[838px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,14,255,0.34) 0%, rgba(255,14,255,0.16) 42%, rgba(51,12,51,0) 72%)",
                  opacity: overlayGlow.blurOpacity,
                  transform: `translate(-50%, -50%) scale(${overlayGlow.glowSpread})`,
                }}
              />
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
              className="absolute right-6 top-6 z-10 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-[24px] leading-none text-white/90 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              onClick={closeOverlay}
              type="button"
            >
              ×
            </button>

            <div className="relative mx-auto flex h-full w-full max-w-[650px] flex-col px-6 pb-10 pt-[100px] lg:max-w-[602px] lg:px-0">
              {hasMessages ? (
                <>
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div
                      className="hero-chat-scroll min-h-0 flex-1 overflow-y-auto"
                      ref={scrollContainerRef}
                      style={{
                        paddingBottom: footerHeight > 0 ? `${footerHeight + 24}px` : undefined,
                      }}
                    >
                      <div className="mx-auto flex w-full max-w-[602px] flex-col gap-4 pb-2">
                        {messages.map((message) =>
                          message.role === "user" ? (
                            <div className="flex w-full justify-end" key={message.id}>
                              <div className="max-w-[86%] rounded-[12px] border border-[#9b2692] bg-[rgba(155,38,146,0.2)] px-4 py-3 text-[15px] leading-[23px] text-white">
                                {message.text}
                              </div>
                            </div>
                          ) : (
                            <div className="flex w-full justify-start" key={message.id}>
                              <p className="max-w-[86%] py-1 text-[15px] leading-[23px] text-white/75">
                                {message.text}
                              </p>
                            </div>
                          ),
                        )}
                        {isAwaitingReply ? (
                          <div className="flex w-full justify-start">
                            <div className="inline-flex items-center gap-2 py-1 text-[15px] leading-[23px] text-white/55">
                              <span>Thinking</span>
                              <span className="inline-flex gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/45 motion-safe:animate-[pulse_1.2s_ease-in-out_infinite]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-white/45 motion-safe:animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-white/45 motion-safe:animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 w-full shrink-0" ref={footerBlockRef}>
                    <div className="mx-auto flex w-full flex-col items-center gap-3 lg:gap-8">
                      <form
                        className="relative flex min-h-[128px] w-full max-w-[602px] flex-col justify-between gap-4 rounded-[18px] border border-[rgba(155,38,146,0.35)] bg-[#2e082e] px-4 pb-4 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] lg:min-h-0 lg:gap-6 lg:pb-6 lg:pt-5"
                        onSubmit={handleSubmit}
                      >
                        <div className="relative w-full">
                          {!inputValue && (
                            <label
                              className="font-figtree pointer-events-none absolute left-[2px] right-14 top-0 text-left text-[14px] font-medium leading-5 tracking-[0.01px] text-[rgba(255,255,255,0.6)] lg:right-20 lg:text-[16px] lg:leading-[24px]"
                              htmlFor={overlayTextareaId}
                            >
                              {placeholderText}
                            </label>
                          )}
                          <textarea
                            aria-label="Ask another question"
                            className="font-figtree min-h-5 w-full resize-none overflow-hidden bg-transparent p-0 text-[14px] leading-5 font-medium tracking-[0.01px] text-white outline-none lg:text-[16px] lg:leading-[24px]"
                            id={overlayTextareaId}
                            onChange={(event) => {
                              setInputValue(event.currentTarget.value);
                              event.currentTarget.style.height = "0px";
                              event.currentTarget.style.height = `${Math.max(
                                20,
                                event.currentTarget.scrollHeight,
                              )}px`;
                            }}
                            placeholder=""
                            rows={1}
                            value={inputValue}
                          />
                        </div>

                        <div className="flex w-full justify-end">
                          <AskMeBorderButton
                            className="!relative !right-auto !top-auto !translate-y-0"
                            label={assistantButtonLabel}
                            stackOnMobile={false}
                          />
                        </div>
                      </form>

                      <p className="font-figtree w-full text-center text-[12px] leading-[1.55] text-[rgba(181,181,181,0.8)] lg:text-[14px] lg:leading-[23px] lg:whitespace-nowrap">
                        {assistantDisclaimer}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex min-h-0 flex-1 items-center justify-center pb-[86px] pt-8">
                    <div className="flex w-full max-w-[602px] flex-col items-center gap-3 lg:gap-6">
                      <form
                        className="relative flex min-h-[128px] w-full flex-col justify-between gap-4 rounded-[18px] border border-[rgba(155,38,146,0.35)] bg-[#2e082e] px-4 pb-4 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] lg:min-h-0 lg:gap-6 lg:pb-6 lg:pt-5"
                        onSubmit={handleSubmit}
                      >
                        <div className="relative w-full">
                          {!inputValue && (
                            <label
                              className="font-figtree pointer-events-none absolute left-[2px] right-14 top-0 text-left text-[14px] font-medium leading-5 tracking-[0.01px] text-[rgba(255,255,255,0.6)] lg:right-20 lg:text-[16px] lg:leading-[24px]"
                              htmlFor={overlayTextareaId}
                            >
                              {placeholderText}
                            </label>
                          )}
                          <textarea
                            aria-label="Ask your first question"
                            className="font-figtree min-h-5 w-full resize-none overflow-hidden bg-transparent p-0 text-[14px] font-medium leading-5 tracking-[0.01px] text-white outline-none lg:text-[16px] lg:leading-[24px]"
                            id={overlayTextareaId}
                            onChange={(event) => {
                              setInputValue(event.currentTarget.value);
                              event.currentTarget.style.height = "0px";
                              event.currentTarget.style.height = `${Math.max(
                                20,
                                event.currentTarget.scrollHeight,
                              )}px`;
                            }}
                            placeholder=""
                            ref={emptyStateTextareaRef}
                            rows={1}
                            value={inputValue}
                          />
                        </div>

                        <div className="flex w-full justify-end">
                          <AskMeBorderButton
                            className="!relative !right-auto !top-auto !translate-y-0"
                            label={assistantButtonLabel}
                            stackOnMobile={false}
                          />
                        </div>
                      </form>

                      <div className="grid w-full grid-cols-2 gap-3 lg:flex lg:gap-2">
                        {assistantPrompts.map((prompt, index) => (
                          <button
                            className={`font-figtree flex min-h-[88px] cursor-pointer items-start rounded-[10px] bg-[rgba(255,255,255,0.04)] px-4 py-4 text-left text-[12px] font-light leading-[1.55] text-[rgba(255,255,255,0.8)] transition-colors hover:bg-[rgba(255,255,255,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 lg:min-h-[44px] lg:flex-1 lg:px-4 lg:py-3 lg:text-[14px] lg:leading-[19px] ${index === 2 ? "col-span-2" : ""}`}
                            key={prompt}
                            onClick={() => submitQuestion(prompt)}
                            type="button"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute bottom-3 left-6 right-6 lg:left-1/2 lg:right-auto lg:w-[min(1400px,calc(100vw-120px))] lg:-translate-x-1/2">
                    <p className="font-figtree mx-auto w-full text-center text-[12px] font-normal leading-[1.55] text-[rgba(255,255,255,0.5)] lg:text-[14px] lg:leading-[23px] lg:whitespace-nowrap">
                      {assistantDisclaimer}
                    </p>
                  </div>
                </>
              )}
            </div>

            {showTuner && overlayKnobsVisible && (
              <div className="font-figtree absolute bottom-4 right-4 z-[240] hidden w-[310px] rounded-xl border border-white/20 bg-[#0a0a0a]/95 p-4 text-white shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-sm lg:block">
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
                  className="mt-4 inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-white/30 px-3 text-xs font-medium transition-colors hover:bg-white/10"
                  onClick={() => setOverlayGlow(DEFAULT_OVERLAY_GLOW)}
                  type="button"
                >
                  Reset Overlay Defaults
                </button>
              </div>
            )}
            {showTuner && (
              <button
                className="font-figtree absolute left-4 top-4 z-[250] hidden cursor-pointer rounded-full border border-white/25 bg-[#0e0e0e]/95 px-4 py-2 text-[13px] font-medium text-white shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:border-white/40 hover:bg-[#151515]/95 lg:inline-flex"
                onClick={() => setOverlayKnobsVisible((current) => !current)}
                type="button"
              >
                {overlayKnobsVisible ? "Hide knobs" : "Show knobs"}
              </button>
            )}
          </div>
      </div>
    </>
  );
}
