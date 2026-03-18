import Image from "next/image";
import type { Project } from "@/content/site";
import { Card } from "@/components/primitives/card";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/reveal";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section
      description="Each project combines a clear product story, an intentional visual language, and measurable business outcomes."
      eyebrow="Selected Work"
      id="projects"
      title="Recent portfolio projects."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal delayMs={index * 90} key={project.title}>
            <Card className="h-full">
              <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-card)-0.35rem)] border border-border bg-surface-alt">
                <Image
                  alt={`${project.title} preview`}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 768px) 45vw, 100vw"
                  src={project.image}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight text-text">
                  {project.title}
                </h3>
                <span className="text-sm font-medium text-muted">{project.year}</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {project.summary}
              </p>
              <p className="mt-4 rounded-xl bg-accent-soft/70 px-3 py-2 text-sm text-accent-strong">
                {project.impact}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <a
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-strong focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                href={project.href}
                rel="noreferrer"
                target="_blank"
              >
                View case study
                <span aria-hidden>→</span>
              </a>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
