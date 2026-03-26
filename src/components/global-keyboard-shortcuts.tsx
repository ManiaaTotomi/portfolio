"use client";

import { useEffect } from "react";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  const tagName = target.tagName;
  if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
    return true;
  }

  return Boolean(target.closest('[contenteditable="true"], [role="textbox"]'));
}

export function GlobalKeyboardShortcuts() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) {
        return;
      }

      if (!event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      const scrollingElement = document.scrollingElement ?? document.documentElement;
      if (!scrollingElement) {
        return;
      }

      event.preventDefault();

      const top =
        event.key === "ArrowUp"
          ? 0
          : Math.max(scrollingElement.scrollHeight - window.innerHeight, 0);

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
