"use client";

import { useEffect, useState } from "react";
import { CvContent } from "@/components/cv/cv-content";

const OPEN_CV_OVERLAY_EVENT = "open-cv-overlay";

export function openCvOverlay() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(OPEN_CV_OVERLAY_EVENT));
}

export function CvOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener(OPEN_CV_OVERLAY_EVENT, handleOpen);

    return () => {
      window.removeEventListener(OPEN_CV_OVERLAY_EVENT, handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[260] overflow-y-auto bg-[rgba(0,0,0,0.72)] px-4 py-4 sm:px-8 sm:py-8">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="w-full rounded-[28px] bg-[#040404] p-4 sm:p-8">
          <CvContent onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
}
