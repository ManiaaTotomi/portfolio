import Link from "next/link";
import type { SiteContent } from "@/content/site";
import { buttonClasses } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/reveal";

interface HeroSectionProps {
  content: SiteContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <header className="relative pb-20 pt-8 sm:pb-24 sm:pt-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] border border-border/70 bg-surface/80 px-4 py-3 backdrop-blur-sm sm:px-6">
          <Link
            className="text-base font-semibold tracking-tight text-text transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            href="#top"
          >
            {content.name}
          </Link>
          <nav aria-label="Primary" className="flex flex-wrap gap-2 sm:gap-3">
            {content.nav.map((item) => (
              <a
                className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft/70 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <Reveal className="max-w-4xl pt-14 sm:pt-16">
          <p className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
            {content.role}
          </p>
          <h1 className="mt-6 text-[var(--text-hero)] leading-[0.95] tracking-[-0.04em] text-text">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {content.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              className={buttonClasses({ variant: "primary", size: "lg" })}
              href="#projects"
            >
              View Projects
            </a>
            <a
              className={buttonClasses({ variant: "secondary", size: "lg" })}
              href="#contact"
            >
              Start a Conversation
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-5 text-sm text-muted">
            <li className="rounded-full border border-border bg-surface px-4 py-2">
              {content.location}
            </li>
            <li className="rounded-full border border-border bg-surface px-4 py-2">
              {content.availability}
            </li>
            {content.socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="rounded-full border border-border bg-surface px-4 py-2 text-text transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </header>
  );
}
