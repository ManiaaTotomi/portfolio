"use client";

import type { SiteContent } from "@/content/site";
import { useEffect, useId, useRef, useState } from "react";
import { openCvOverlay } from "@/components/cv/cv-overlay";
import { cn } from "@/lib/cn";

interface SiteTopBarProps {
  content: Pick<SiteContent, "name" | "cvUrl" | "email" | "nav">;
  anchorBasePath?: string;
  mode?: "home" | "case-study";
  className?: string;
}

interface PollfishMenuItem {
  label: string;
  href: string;
}

const POLLFISH_MENU_ITEMS: PollfishMenuItem[] = [
  { label: "Questionnaire Builder", href: "/pollfish/questionnaire-builder" },
  { label: "AI Builder", href: "/pollfish/ai-builder" },
];

const INTERNAL_CASE_STUDY_NAV_ITEMS: PollfishMenuItem[] = [
  { label: "Questionnaire Builder", href: "/pollfish/questionnaire-builder" },
  { label: "AI Builder", href: "/pollfish/ai-builder" },
] as const;

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
        width="18"
        x="3"
        y="5"
      />
      <path
        d="M3 8L10.6 13.2C11.44 13.77 12.56 13.77 13.4 13.2L21 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function resolveNavHref(href: string, anchorBasePath: string) {
  if (!href.startsWith("#")) {
    return href;
  }

  if (!anchorBasePath) {
    return href;
  }

  return `${anchorBasePath}${href}`;
}

export function SiteTopBar({
  content,
  anchorBasePath = "",
  mode = "home",
  className,
}: SiteTopBarProps) {
  const [isPollfishMenuOpen, setIsPollfishMenuOpen] = useState(false);
  const pollfishMenuRef = useRef<HTMLDivElement | null>(null);
  const pollfishMenuId = useId().replace(/:/g, "");

  useEffect(() => {
    if (!isPollfishMenuOpen) {
      return;
    }

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (pollfishMenuRef.current?.contains(target)) {
        return;
      }

      setIsPollfishMenuOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPollfishMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPollfishMenuOpen]);

  return (
    <div
      className={cn(
        "top-0 z-[210] mx-auto flex h-[79px] w-full max-w-[1600px] items-center justify-between px-5 pb-[30px] pt-[44px] min-[900px]:sticky min-[900px]:px-[50px]",
        className,
      )}
    >
      <a
        className="font-figtree text-[16px] font-bold tracking-[0.64px] text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
        href={anchorBasePath ? "/#top" : "#top"}
      >
        {content.name}
      </a>

      <nav
        aria-label={mode === "case-study" ? "Case study pages" : "Featured projects"}
        className="hidden items-center gap-[100px] min-[900px]:flex"
      >
        {mode === "case-study" &&
          INTERNAL_CASE_STUDY_NAV_ITEMS.map((item) => (
            <a
              className="font-figtree inline-flex items-center gap-[10px] text-[16px] font-normal text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              href={item.href}
              key={`${item.label}-${item.href}`}
            >
              {item.label}
            </a>
          ))}

        {mode === "home" &&
          content.nav.map((item) => {
            if (item.label !== "Pollfish") {
              return (
                <a
                  className="font-figtree inline-flex items-center gap-[10px] text-[16px] font-normal text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                  href={resolveNavHref(item.href, anchorBasePath)}
                  key={`${item.label}-${item.href}`}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <div
                className="relative flex items-center gap-2"
                key={`${item.label}-${item.href}`}
                ref={pollfishMenuRef}
              >
                <a
                  className="font-figtree inline-flex items-center gap-[10px] text-[16px] font-normal text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                  href={resolveNavHref(item.href, anchorBasePath)}
                >
                  {item.label}
                </a>

                <button
                  aria-controls={`pollfish-menu-${pollfishMenuId}`}
                  aria-expanded={isPollfishMenuOpen}
                  aria-label="Toggle Pollfish menu"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/92 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                  onClick={() => setIsPollfishMenuOpen((prev) => !prev)}
                  type="button"
                >
                  <span
                    className={cn(
                      "transition-transform duration-200",
                      isPollfishMenuOpen && "rotate-180",
                    )}
                  >
                    <ChevronDownIcon />
                  </span>
                </button>

                <div
                  className={cn(
                    "absolute left-0 top-full z-[80] mt-3 w-[230px] rounded-[14px] border border-white/10 bg-[#111111]/72 p-2 shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-[9px] transition duration-200",
                    isPollfishMenuOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0",
                  )}
                  id={`pollfish-menu-${pollfishMenuId}`}
                  role="menu"
                >
                  {POLLFISH_MENU_ITEMS.map((menuItem) => (
                    <a
                      className="font-figtree block rounded-[10px] px-3 py-2.5 text-[16px] text-white/82 transition-colors hover:bg-[rgba(155,38,146,0.28)] hover:text-[#f8e6f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                      href={menuItem.href}
                      key={menuItem.label}
                      onClick={() => setIsPollfishMenuOpen(false)}
                      role="menuitem"
                    >
                      {menuItem.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
      </nav>

      <div className="flex h-[14px] items-center justify-end gap-[clamp(18px,2.2vw,32px)]">
        <button
          className="font-figtree cursor-pointer text-[16px] font-bold tracking-[0.32px] text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
          onClick={openCvOverlay}
          type="button"
        >
          CV
        </button>
        <a
          aria-label={`Email ${content.name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] text-white transition-opacity hover:opacity-80 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
          href={`mailto:${content.email}`}
        >
          <MailIcon />
        </a>
      </div>
    </div>
  );
}
