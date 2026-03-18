import type { ContactContent } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/reveal";

interface ContactSectionProps {
  contact: ContactContent;
  email: string;
  location: string;
  availability: string;
}

export function ContactSection({
  contact,
  email,
  location,
  availability,
}: ContactSectionProps) {
  return (
    <Section
      description={contact.description}
      eyebrow="Contact"
      id="contact"
      title={contact.title}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="space-y-6 rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-soft sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Project Intake
            </p>
            <p className="text-base leading-relaxed text-muted">
              Briefly include the challenge, your target launch timing, and what
              success looks like. I can support both design-only and end-to-end
              design + build engagements.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <p>
                <span className="font-semibold text-text">Email:</span>{" "}
                <a
                  className="text-accent underline-offset-4 transition hover:underline"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-text">Location:</span>{" "}
                {location}
              </p>
              <p>
                <span className="font-semibold text-text">Status:</span>{" "}
                {availability}
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delayMs={120}>
          <ContactForm submitLabel={contact.submitLabel} />
        </Reveal>
      </div>
    </Section>
  );
}
