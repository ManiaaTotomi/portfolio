import type { AboutContent } from "@/content/site";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/reveal";

interface AboutSectionProps {
  about: AboutContent;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <Section
      description={about.description}
      eyebrow="About"
      id="about"
      title={about.title}
    >
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Reveal className="space-y-5">
          {about.paragraphs.map((paragraph) => (
            <p className="text-lg leading-relaxed text-muted" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {about.highlights.map((highlight, index) => (
            <Reveal className="h-full" delayMs={index * 80} key={highlight.label}>
              <article className="h-full rounded-2xl border border-border/80 bg-surface p-5 shadow-soft">
                <p className="text-sm uppercase tracking-[0.16em] text-muted">
                  {highlight.label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-text">
                  {highlight.value}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
