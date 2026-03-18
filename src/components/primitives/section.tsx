import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/primitives/container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  contentClassName?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-[var(--space-section)]", className)}
      id={id}
      {...props}
    >
      <Container>
        {(eyebrow ?? title ?? description) && (
          <header className="max-w-3xl">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="section-title mt-4 text-text">{title}</h2>}
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {description}
              </p>
            )}
          </header>
        )}
        <div className={cn("mt-10", contentClassName)}>{children}</div>
      </Container>
    </section>
  );
}
