import type { SiteContent } from "@/content/site";
import { Container } from "@/components/primitives/container";

interface SiteFooterProps {
  content: SiteContent;
}

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#1a1a1a] py-8">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-figtree text-sm text-[#a8a8a8]">
          © {new Date().getFullYear()} {content.name}. Built with Next.js and
          Tailwind CSS.
        </p>
        <ul className="flex flex-wrap gap-2">
          {content.socialLinks.map((link) => (
            <li key={link.label}>
              <a
                className="font-figtree rounded-full border border-white/16 bg-white/[0.03] px-3 py-1.5 text-sm text-[#ececec] transition-colors hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
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
