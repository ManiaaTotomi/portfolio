import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/content/site";

interface SiteFooterProps {
  content: SiteContent;
  showTopBorder?: boolean;
}

const FOOTER_CLOSURE_TEXT =
  "I’ve spent the last few years designing products that deal with complexity. Sometimes visible, sometimes not. If you’re working on something like that, feel free to reach out.";
const FOOTER_EMAIL = "mania.totomi@gmail.com";

export function SiteFooter({ content, showTopBorder = true }: SiteFooterProps) {
  return (
    <footer className="bg-[#040404]">
      <div
        className={`mx-auto w-full max-w-[1600px] px-5 pb-[50px] pt-[120px] sm:px-8 lg:px-[72px] ${
          showTopBorder ? "border-t border-white/10" : ""
        }`}
      >
        <div className="flex flex-col items-center gap-[120px]">
          <div className="flex flex-col items-center gap-8">
            <p className="font-figtree w-full max-w-[672px] text-center text-[20px] font-bold leading-[1.7] text-[#666666] sm:text-[24px] sm:leading-[42px]">
              {FOOTER_CLOSURE_TEXT}
            </p>

            <a
              aria-label={`Email ${content.name}`}
              className="font-aeonik text-center text-[16px] leading-6 tracking-[1.28px] !text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              href={`mailto:${FOOTER_EMAIL}`}
            >
              {FOOTER_EMAIL}
            </a>

            <div className="relative h-[33.95px] w-[33.123px]">
              <Image
                alt={`${content.name} portrait`}
                className="absolute left-[1.52px] top-[3.37px] h-[29.685px] w-[29.685px] rotate-[0.36deg] rounded-[14.749px] object-cover"
                height={600}
                src="/images/footer-avatar.png"
                width={600}
              />
              <Image
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full"
                height={35}
                src="/images/footer-photo-frame.svg"
                width={35}
              />
            </div>
          </div>

          <Link
            className="font-aeonik text-center text-[12px] tracking-[0.6px] text-[#666666] transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
            href="#top"
          >
            back to the top
          </Link>
        </div>
      </div>
    </footer>
  );
}
