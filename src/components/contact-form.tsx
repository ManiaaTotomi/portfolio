"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/primitives/button";
import { cn } from "@/lib/cn";

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "submitting"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

interface ContactFormProps {
  submitLabel: string;
}

const fieldClasses =
  "w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text shadow-sm outline-none transition focus:border-accent/60 focus:ring-4 focus:ring-accent/20";

export function ContactForm({ submitLabel }: ContactFormProps) {
  const [state, setState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setState({ status: "submitting", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Could not send message.");
      }

      form.reset();
      setState({
        status: "success",
        message: result.message ?? "Thanks, your message is on the way.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not send message.";
      setState({ status: "error", message });
    }
  }

  return (
    <form
      className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-soft sm:p-8"
      onSubmit={onSubmit}
    >
      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-text" htmlFor="name">
            Name
          </label>
          <input
            autoComplete="name"
            className={fieldClasses}
            id="name"
            maxLength={80}
            name="name"
            placeholder="Your name"
            required
            type="text"
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-text"
            htmlFor="email"
          >
            Email
          </label>
          <input
            autoComplete="email"
            className={fieldClasses}
            id="email"
            maxLength={120}
            name="email"
            placeholder="you@company.com"
            required
            type="email"
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-text"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className={cn(fieldClasses, "min-h-36 resize-y")}
            id="message"
            maxLength={1600}
            name="message"
            placeholder="Project goals, timeline, and budget range..."
            required
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          disabled={state.status === "submitting"}
          size="lg"
          type="submit"
          variant="primary"
        >
          {state.status === "submitting" ? "Sending..." : submitLabel}
        </Button>
        <p
          aria-live="polite"
          className={cn(
            "text-sm",
            state.status === "success" && "text-accent-strong",
            state.status === "error" && "text-rose-700",
            state.status === "submitting" && "text-muted",
          )}
          role="status"
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
