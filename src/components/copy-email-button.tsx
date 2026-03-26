"use client";

import { useEffect, useState } from "react";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  copiedLabel?: string;
  copyLabel?: string;
}

export function CopyEmailButton({
  email,
  className,
  copiedLabel = "Copied",
  copyLabel = "Copy",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        aria-label={`Copy email address ${email}`}
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-white/70 transition-opacity hover:opacity-80 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 ${className ?? ""}`}
        onClick={handleCopy}
        title={copied ? copiedLabel : copyLabel}
        type="button"
      >
        {copied ? (
          <svg
            aria-hidden="true"
            fill="none"
            height="12"
            viewBox="0 0 24 24"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12.5L9.5 17L19 7.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            fill="none"
            height="12"
            viewBox="0 0 24 24"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
              width="10"
              x="9"
              y="9"
            />
            <rect
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
              width="10"
              x="5"
              y="3"
            />
          </svg>
        )}
      </button>
      {copied ? (
        <span aria-live="polite" className="font-figtree text-[12px] italic leading-none text-current">
          {copiedLabel}
        </span>
      ) : null}
    </span>
  );
}
