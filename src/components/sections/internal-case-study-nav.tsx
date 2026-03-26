import Link from "next/link";

interface CaseStudyNavItem {
  href: string;
  label: string;
}

interface InternalCaseStudyNavProps {
  previous?: CaseStudyNavItem;
  next?: CaseStudyNavItem;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const rotateClassName = direction === "left" ? "rotate-180" : "";

  return (
    <span className={`inline-flex ${rotateClassName}`}>
      <svg
        aria-hidden="true"
        fill="none"
        height="10"
        viewBox="0 0 14 10"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5H12.5M12.5 5L8.5 1M12.5 5L8.5 9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    </span>
  );
}

function stripDirectionPrefix(label: string) {
  return label.replace(/^(Previous|Next):\s*/i, "").trim();
}

export function InternalCaseStudyNav({
  previous,
  next,
}: InternalCaseStudyNavProps) {
  const rightLink = next ?? previous;
  const rightLinkDirection = next ? "right" : "left";

  return (
    <section className="border-b border-white/[0.15] bg-[#141314]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-[84px]">
        <Link
          className="font-figtree inline-flex items-center gap-3 text-[14px] text-white/60 transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
          href="/#pollfish"
        >
          <ArrowIcon direction="left" />
          All Case Studies
        </Link>

        <div className="flex min-w-[220px] justify-end">
          {rightLink ? (
            <Link
              className="font-figtree inline-flex items-center gap-3 text-[14px] text-white/60 transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              href={rightLink.href}
            >
              {rightLinkDirection === "left" ? <ArrowIcon direction="left" /> : null}
              <span>{stripDirectionPrefix(rightLink.label)}</span>
              {rightLinkDirection === "right" ? <ArrowIcon direction="right" /> : null}
            </Link>
          ) : (
            <span className="font-figtree text-[16px] text-white/35">End of case study</span>
          )}
        </div>
      </div>
    </section>
  );
}
