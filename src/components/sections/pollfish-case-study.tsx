import type { CaseStudy, CaseStudyDetailGroup, CaseStudyEntry } from "@/content/site";
import { cn } from "@/lib/cn";

interface PollfishCaseStudySectionProps {
  study: CaseStudy;
}

const POLLFISH_SUBMENU = [
  { label: "AI Builder", href: "#pollfish-ai-builder" },
  { label: "Questionnaire Builder", href: "#pollfish-questionnaire-builder" },
  { label: "AI Report", href: "#pollfish-ai-report" },
] as const;
const SHOW_POLLFISH_SUBMENU = false;

function DetailsColumn({ details }: { details: CaseStudyDetailGroup[] }) {
  return (
    <div className="space-y-6 pt-0 xl:pt-[67px]">
      {details.map((group) => (
        <div className="space-y-0.5" key={group.title}>
          <p className="font-figtree text-[14px] font-bold leading-[22px] text-[#737373]">
            {group.title}
          </p>
          <div className="space-y-0.5">
            {group.items.map((item) => (
              <p
                className="font-figtree text-[14px] font-medium leading-[22px] text-[#737373]"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TextButton({ label }: { label: string }) {
  return (
    <a
      className="font-figtree inline-flex items-center rounded-[5px] text-[16px] font-bold leading-normal text-[#363535] underline decoration-solid underline-offset-[2px] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#363535]/30"
      href="#"
    >
      {label}
    </a>
  );
}

function PollfishTitle({ suffix }: { suffix: string }) {
  return (
    <h3 className="font-aeonik flex flex-wrap items-start gap-3 text-[32px] font-semibold leading-[52px]">
      <span className="text-[#b7b3af]">Pollfish</span>
      <span className="text-[#363535]">{suffix}</span>
    </h3>
  );
}

function EntryIntro({ entry }: { entry: CaseStudyEntry }) {
  return (
    <div className="space-y-4">
      {entry.paragraphs.map((paragraph) => (
        <p
          className="font-figtree text-[18px] font-normal leading-[27px] text-[#363535]"
          key={paragraph}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function PollfishOverview({ entry }: { entry: CaseStudyEntry }) {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-8 lg:px-14 xl:px-[347px] xl:py-[80px]">
        <div className="w-full max-w-[580px] space-y-6">
          <div className="w-full max-w-[382px] space-y-[5px]">
            <h2 className="font-aeonik text-[44px] font-bold leading-[1] text-[#1b1b1b]">
              {entry.title}
            </h2>
            <p className="font-aeonik text-[44px] font-semibold leading-[49px] text-[#c2c2c2]">
              {entry.subtitle}
            </p>
          </div>
          <EntryIntro entry={entry} />
        </div>
      </div>
    </div>
  );
}

function PollfishStickySubmenu() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-[100px] hidden xl:block">
      <div className="h-full">
        <div className="pointer-events-auto sticky top-1/2 -translate-y-1/2">
          <nav aria-label="Pollfish sub menu">
            <div className="-rotate-90">
              <div className="flex items-start gap-7 rounded-[60px]">
                {POLLFISH_SUBMENU.map((item, index) => (
                  <a
                    className={cn(
                      "font-figtree whitespace-nowrap text-[16px] leading-[22px] transition-colors hover:text-[#363535] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#363535]/30",
                      index === 0
                        ? "font-semibold text-[#363535]"
                        : "font-medium text-[rgba(115,115,115,0.6)]",
                    )}
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

function PollfishInlineSubmenu() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-5 pt-8 sm:px-8 lg:px-14 xl:hidden">
      <nav aria-label="Pollfish sub menu">
        <div className="flex flex-wrap gap-4">
          {POLLFISH_SUBMENU.map((item, index) => (
            <a
              className={cn(
                "font-figtree text-[15px] leading-[22px] transition-colors hover:text-[#363535] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#363535]/30",
                index === 0
                  ? "font-semibold text-[#363535]"
                  : "font-medium text-[rgba(115,115,115,0.6)]",
              )}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

function PollfishTextRow({
  entry,
  className,
}: {
  entry: CaseStudyEntry;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1600px] flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-start md:justify-between md:gap-10 lg:px-14 lg:gap-16 xl:gap-[104px] xl:py-[80px]",
        className,
      )}
    >
      <div className="space-y-4 md:min-w-[400px] md:max-w-[580px] md:flex-1">
        <PollfishTitle suffix={entry.title} />
        <div className="space-y-12">
          <div className="w-full max-w-[580px]">
            <EntryIntro entry={entry} />
          </div>
          {entry.ctaLabel && <TextButton label={entry.ctaLabel} />}
        </div>
      </div>

      <div className="hidden md:block md:w-[245px] md:flex-none">
        <DetailsColumn details={entry.details} />
      </div>
    </div>
  );
}

function VisualLabel({
  label,
  dark,
  lineClassName,
}: {
  label: string;
  dark?: boolean;
  lineClassName?: string;
}) {
  return (
    <div className="flex items-center gap-[20.16px]">
      <p
        className={cn(
          "font-ibm text-[14px] font-medium uppercase leading-normal",
          dark ? "text-white" : "text-[#363535]",
        )}
      >
        {label}
      </p>
      <div
        className={cn(
          "h-px flex-1",
          dark ? "bg-[rgba(217,217,217,0.5)]" : "bg-[rgba(159,155,155,0.5)]",
          lineClassName,
        )}
      />
    </div>
  );
}

function PollfishAiVisual({ label }: { label: string }) {
  return (
    <div className="w-full bg-[#f5f5f5]">
      <div className="pt-8 xl:pt-[58px]">
        <VisualLabel dark label={label} lineClassName="bg-[rgba(217,217,217,0.3)]" />
      </div>

      <div className="relative mt-6 h-[620px] overflow-hidden bg-[#15011f] xl:mt-0 xl:h-[1063px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(133deg,#2a1125_0%,#2b0e35_26%,#3b0c4d_46%,#4a0e5a_62%,#210427_83%,#11001b_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_50%_at_56%_56%,rgba(217,68,188,0.72)_0%,rgba(217,68,188,0.36)_36%,rgba(217,68,188,0)_78%)]" />
        <div className="pointer-events-none absolute -left-[220px] bottom-[-220px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(113,37,210,0.82)_0%,rgba(113,37,210,0.42)_34%,rgba(113,37,210,0)_74%)] blur-[128px]" />
        <div className="pointer-events-none absolute right-[-150px] bottom-[-220px] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(64,140,212,0.55)_0%,rgba(64,140,212,0.2)_40%,rgba(64,140,212,0)_72%)] blur-[126px]" />
        <div className="pointer-events-none absolute -left-[190px] top-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(201,126,58,0.4)_0%,rgba(201,126,58,0)_72%)] blur-[116px]" />
        <div className="pointer-events-none absolute right-[-120px] top-[-100px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(171,30,175,0.55)_0%,rgba(171,30,175,0.15)_48%,rgba(171,30,175,0)_78%)] blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_50%,rgba(255,255,255,0)_56%,rgba(7,3,18,0.5)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background:repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_56px)]" />
      </div>
    </div>
  );
}

function QuestionnairePreview({ theme }: { theme: "light" | "purple" }) {
  const isPurple = theme === "purple";

  return (
    <div
      className={cn(
        "grid min-h-[560px] overflow-hidden rounded-[9.648px] border border-white/50 bg-white lg:grid-cols-[272px_1fr] xl:min-h-[875px]",
        isPurple && "border-white/20 bg-[#f5ecff]",
      )}
    >
      <aside
        className={cn(
          "border-b border-r border-[#ebebed] px-5 py-6 lg:border-b-0",
          isPurple && "border-[#d5b6f3] bg-[#efe3fc]",
        )}
      >
        <div className="space-y-2">
          <p className="font-aeonik text-[20px] font-semibold text-[#1b1b1b]">pollfish</p>
          <p className="font-figtree text-[13px] text-[#737373]">Questionnaire builder</p>
        </div>

        <div className="mt-8 space-y-3">
          {["Survey info", "Questions", "Logic", "Audience", "Summary"].map((item, index) => (
            <button
              className={cn(
                "font-figtree block w-full rounded-[8px] px-3 py-2 text-left text-[14px] font-medium",
                index === 1
                  ? isPurple
                    ? "bg-[#d7bef3] text-[#321b49]"
                    : "bg-[#f5f5fb] text-[#323945]"
                  : "text-[#6f7789]",
              )}
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex flex-col">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-3 border-b border-[#ebebed] px-5 py-4",
            isPurple && "border-[#d5b6f3] bg-[#f7efff]",
          )}
        >
          <div className="flex items-center gap-2">
            <span className="font-figtree rounded-full bg-[#f0edf5] px-3 py-1 text-[12px] font-semibold text-[#6f7789]">
              Draft
            </span>
            <p className="font-figtree text-[14px] font-medium text-[#6f7789]">Pricing strategy survey</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="font-figtree rounded-[8px] border border-[#dcdbe2] px-3 py-1.5 text-[13px] font-medium text-[#5f6676]"
              type="button"
            >
              Preview
            </button>
            <button
              className={cn(
                "font-figtree rounded-[8px] px-3 py-1.5 text-[13px] font-semibold text-white",
                isPurple ? "bg-[#6f2ba2]" : "bg-[#323945]",
              )}
              type="button"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="grid flex-1 gap-4 p-5 xl:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {["Q1", "Q2", "Q3", "Q4", "Q5"].map((id, index) => (
              <div
                className={cn(
                  "rounded-[10px] border border-[#ebebed] bg-white px-4 py-3",
                  isPurple && "border-[#d7c2ed] bg-[#fbf7ff]",
                )}
                key={id}
              >
                <p className="font-roboto text-[15px] font-bold text-[#323945]">{id}</p>
                <p className="font-roboto mt-1 text-[14px] leading-[20px] text-[#6f7789]">
                  {index === 0
                    ? "At what price ($USD) would you consider the product to be..."
                    : index === 1
                      ? "What is the maximum amount you would be willing to spend on this product/service?"
                      : index === 2
                        ? "What is the minimum amount you would be willing to spend on this product/service?"
                        : index === 3
                          ? "How important is price when you are considering purchasing a new product/service?"
                          : "How would you rate value for money of similar products you purchased in the past?"}
                </p>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "rounded-[10px] border border-[#ebebed] bg-[#f8f8fc] p-4",
              isPurple && "border-[#d7c2ed] bg-[#f2e7ff]",
            )}
          >
            <p className="font-figtree text-[14px] font-semibold text-[#323945]">Properties</p>
            <div className="mt-4 space-y-2">
              {["Question type", "Response format", "Required", "Randomize options"].map((item) => (
                <div
                  className={cn(
                    "rounded-[8px] border border-[#e7e7ef] bg-white px-3 py-2",
                    isPurple && "border-[#dfc7f5] bg-[#fbf7ff]",
                  )}
                  key={item}
                >
                  <p className="font-figtree text-[13px] text-[#6f7789]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PollfishImagePanel({
  background,
  label,
  dark,
  minHeightClassName,
}: {
  background: string;
  label: string;
  dark?: boolean;
  minHeightClassName: string;
}) {
  return (
    <div className={cn("w-full", background)}>
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-14 xl:px-[100px]">
        <div className="mx-auto w-full max-w-[1400px] space-y-[21.75px]">
          <VisualLabel dark={dark} label={label} />

          <div className={cn("rounded-[9.648px] shadow-[0_5.535px_35.316px_rgba(0,0,0,0.07)]", minHeightClassName)}>
            <QuestionnairePreview theme={dark ? "purple" : "light"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PollfishNarrativeBlock({
  entry,
  className,
}: {
  entry: CaseStudyEntry;
  className?: string;
}) {
  return <PollfishTextRow className={className} entry={entry} />;
}

export function PollfishCaseStudySection({ study }: PollfishCaseStudySectionProps) {
  const [overviewEntry, aiEntry, questionnaireEntry, audiencesEntry] = study.entries;

  if (!overviewEntry || !aiEntry || !questionnaireEntry || !audiencesEntry) {
    return null;
  }

  return (
    <section className="border-t border-white/10" id={study.id}>
      <div className="w-full bg-white">
        <PollfishOverview entry={overviewEntry} />

        <div className="relative">
          {SHOW_POLLFISH_SUBMENU && <PollfishStickySubmenu />}

          <div className="scroll-mt-24 bg-[#f5f5f5]" id="pollfish-ai-builder">
            {SHOW_POLLFISH_SUBMENU && <PollfishInlineSubmenu />}
            <PollfishNarrativeBlock
              entry={aiEntry}
              className="xl:px-[347px]"
            />
            <PollfishAiVisual label={aiEntry.imageLabel ?? "AI BUILDER"} />
          </div>

          <div className="scroll-mt-24 bg-white" id="pollfish-questionnaire-builder">
            <PollfishNarrativeBlock entry={questionnaireEntry} className="xl:px-[347px]" />
            <PollfishImagePanel
              background="bg-white"
              label={questionnaireEntry.imageLabel ?? "Questionnaire builder"}
              minHeightClassName="xl:min-h-[875px]"
            />
          </div>

          <div className="scroll-mt-24 bg-white" id="pollfish-ai-report">
            <PollfishNarrativeBlock entry={audiencesEntry} className="xl:px-[347px]" />
            <PollfishImagePanel
              background="bg-[#521c7d]"
              dark
              label={audiencesEntry.imageLabel ?? "Questionnaire created by AI"}
              minHeightClassName="xl:min-h-[903px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
