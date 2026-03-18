import type { SiteContent } from "@/content/site";
import { Container } from "@/components/primitives/container";

interface SiteFooterProps {
  content: SiteContent;
}

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-border/80 bg-surface/70 py-8">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {content.name}. Built with Next.js and
          Tailwind CSS.
        </p>
        <ul className="flex flex-wrap gap-2">
          {content.socialLinks.map((link) => (
            <li key={link.label}>
              <a
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
