"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface FlowStep {
  id: string;
  title: string;
  src: string;
  alt: string;
  holdMs: number;
  clickX?: number;
  clickY?: number;
}

const RIPPLE_LEAD_MS = 280;

const FLOW_STEPS: FlowStep[] = [
  {
    id: "empty",
    title: "Empty page",
    src: "/images/Questionnaire-Builder/animations/first-flow/01-empty-page.png",
    alt: "Empty questionnaire page with Add question and Ask AI actions",
    holdMs: 1400,
    clickX: 15,
    clickY: 10,
  },
  {
    id: "modal",
    title: "Modal opens",
    src: "/images/Questionnaire-Builder/animations/first-flow/02-modal-opens.png",
    alt: "Question type modal opened in the center of questionnaire builder",
    holdMs: 1700,
    clickX: 39,
    clickY: 39,
  },
  {
    id: "q1-empty",
    title: "First empty question",
    src: "/images/Questionnaire-Builder/animations/first-flow/03-q1-empty.png",
    alt: "First question added with empty question text field",
    holdMs: 1450,
    clickX: 34,
    clickY: 13,
  },
  {
    id: "question-written",
    title: "Question written",
    src: "/images/Questionnaire-Builder/animations/first-flow/04-question-written.png",
    alt: "Question text written in the first question card",
    holdMs: 1500,
  },
  {
    id: "q1-ready",
    title: "Q1 ready",
    src: "/images/Questionnaire-Builder/animations/first-flow/05-q1-ready.png",
    alt: "First question completed with answers in questionnaire builder",
    holdMs: 1550,
    clickX: 90,
    clickY: 33,
  },
  {
    id: "q2-ready",
    title: "Q2 ready",
    src: "/images/Questionnaire-Builder/animations/first-flow/06-q2-ready.png",
    alt: "Second question added and ready below first question",
    holdMs: 2000,
  },
];

export function QuestionnaireBuilderFlowAnimation() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showClickRipple, setShowClickRipple] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const activeStep = FLOW_STEPS[activeStepIndex];
    const canShowRipple =
      activeStep.clickX !== undefined && activeStep.clickY !== undefined;
    const rippleStartMs = Math.max(0, activeStep.holdMs - RIPPLE_LEAD_MS);

    let rippleTimeout: number | undefined;
    if (canShowRipple) {
      rippleTimeout = window.setTimeout(() => {
        setShowClickRipple(true);
      }, rippleStartMs);
    }

    const stepTimeout = window.setTimeout(() => {
      setShowClickRipple(false);
      setActiveStepIndex((currentStep) => (currentStep + 1) % FLOW_STEPS.length);
    }, activeStep.holdMs);

    return () => {
      if (rippleTimeout !== undefined) {
        window.clearTimeout(rippleTimeout);
      }
      window.clearTimeout(stepTimeout);
    };
  }, [activeStepIndex, prefersReducedMotion]);

  const activeStep = FLOW_STEPS[activeStepIndex];

  return (
    <div className="space-y-4">
      <p className="font-figtree text-[16px] text-black/60">
        In-page flow animation: empty state to first two questions (add question,
        pick type, write, and continue building).
      </p>

      <div className="overflow-hidden rounded-[10px] border border-[#e2e2e2] bg-[#f4f4f4] p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-[8px] border border-black/10 bg-white shadow-[0_18px_36px_rgba(13,17,25,0.1)]">
          <div className="relative aspect-[1024/636] w-full">
            {FLOW_STEPS.map((step, stepIndex) => (
              <Image
                alt={step.alt}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  stepIndex === activeStepIndex ? "opacity-100" : "opacity-0"
                }`}
                height={636}
                key={step.id}
                priority={stepIndex <= 1}
                sizes="(min-width: 1440px) 1439px, (min-width: 640px) 90vw, 100vw"
                src={step.src}
                width={1024}
              />
            ))}
            {!prefersReducedMotion &&
            showClickRipple &&
            activeStep.clickX !== undefined &&
            activeStep.clickY !== undefined ? (
              <div
                className="pointer-events-none absolute z-20"
                key={`ripple-${activeStep.id}-${activeStepIndex}-active`}
                style={{
                  left: `${activeStep.clickX}%`,
                  top: `${activeStep.clickY}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span
                  className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#89ddff] bg-[#89ddff]/25"
                  style={{
                    animation:
                      "questionnaire-click-wave 620ms cubic-bezier(0.16,1,0.3,1) 1 forwards",
                    boxShadow: "0 0 16px rgba(137,221,255,0.45)",
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a7e9ff]/90"
                  style={{
                    animation:
                      "questionnaire-click-wave-echo 700ms cubic-bezier(0.2,0.8,0.2,1) 70ms 1 forwards",
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5f5ff]"
                  style={{
                    animation: "questionnaire-click-core 340ms cubic-bezier(0.22,0.85,0.32,1) 1 forwards",
                    boxShadow: "0 0 12px rgba(184,237,255,0.78)",
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
          <p className="font-figtree text-[14px] font-medium text-black/70">
            Step {activeStepIndex + 1} of {FLOW_STEPS.length}: {activeStep.title}
          </p>
          <div className="flex items-center gap-2">
            {FLOW_STEPS.map((step, stepIndex) => (
              <button
                aria-label={`Show flow step ${stepIndex + 1}`}
                className={`h-[6px] w-[28px] rounded-full transition-colors duration-300 ${
                  stepIndex === activeStepIndex ? "bg-[#0e68f9]" : "bg-black/15"
                }`}
                key={step.id}
                onClick={() => {
                  setShowClickRipple(false);
                  setActiveStepIndex(stepIndex);
                }}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
