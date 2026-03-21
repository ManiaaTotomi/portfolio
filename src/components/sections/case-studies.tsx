import type { CaseStudy, CaseStudyEntry, CaseStudyShowcase } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { PollfishCaseStudySection } from "@/components/sections/pollfish-case-study";
import { TildCaseStudySection } from "@/components/sections/tild-case-study";
import { cn } from "@/lib/cn";

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
}

function DetailsColumn({ details }: Pick<CaseStudyEntry, "details">) {
  if (!details.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {details.map((group) => (
        <div key={group.title}>
          <p className="font-figtree text-[13px] font-medium uppercase tracking-[0.12em] text-[#8d8d8d]">
            {group.title}
          </p>
          <ul className="mt-2 space-y-1.5">
            {group.items.map((item) => (
              <li
                className="font-figtree text-[15px] leading-[1.45] text-[#d4d4d4]"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PanelWrap({
  imageLabel,
  className,
  labelClassName,
  disableGlow,
  children,
}: {
  imageLabel?: string;
  className?: string;
  labelClassName?: string;
  disableGlow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-white/[0.12] bg-[#1f1f1f] p-6 sm:p-8 lg:p-10",
        className,
      )}
    >
      {!disableGlow && (
        <div className="pointer-events-none absolute -right-24 -top-20 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(211,54,238,0.3)_0%,rgba(211,54,238,0)_72%)]" />
      )}
      {!disableGlow && (
        <div className="pointer-events-none absolute -left-20 bottom-[-120px] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(118,88,255,0.25)_0%,rgba(118,88,255,0)_72%)]" />
      )}
      {imageLabel && (
        <p
          className={cn(
            "font-figtree relative z-10 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#909090]",
            labelClassName,
          )}
        >
          {imageLabel}
        </p>
      )}
      <div className="relative z-10 mt-5">{children}</div>
    </div>
  );
}

function renderPollfishAi(showcase: CaseStudyShowcase) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
      <div className="rounded-[18px] border border-white/[0.12] bg-black/20 p-5 sm:p-6">
        <p className="font-figtree text-sm font-medium text-[#d5d5d5]">
          {showcase.title}
        </p>
        <div className="mt-4 space-y-2">
          {showcase.listItems?.map((item) => (
            <div
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
              key={item}
            >
              <p className="font-ibm text-[13px] leading-[1.45] text-[#cdcdcd]">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[18px] border border-white/[0.12] bg-black/20 p-5 sm:p-6">
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {showcase.chips?.map((chip) => (
            <div
              className="rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-3 py-2"
              key={chip}
            >
              <p className="font-ibm text-[12px] text-[#d7d7d7]">{chip}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[12px] border border-white/[0.08] bg-[#2c2c2c]/75 p-4">
          {showcase.secondaryList?.map((item) => (
            <p className="font-figtree text-[13px] leading-[1.5] text-[#cfcfcf]" key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderPollfishQuestionnaire(showcase: CaseStudyShowcase) {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="rounded-[16px] border border-white/[0.12] bg-black/20 p-5">
        <p className="font-figtree text-[13px] uppercase tracking-[0.1em] text-[#9d9d9d]">
          Survey System
        </p>
        <ul className="mt-4 space-y-2.5">
          {showcase.listItems?.map((item) => (
            <li className="font-figtree text-[14px] text-[#d8d8d8]" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[16px] border border-white/[0.12] bg-black/25 p-4 sm:p-6">
        <p className="font-figtree text-sm font-medium text-[#e7e7e7]">Questionnaire builder</p>
        <div className="mt-4 space-y-3">
          {showcase.secondaryList?.map((row) => (
            <div
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
              key={row}
            >
              <p className="font-ibm text-[13px] text-[#cdcdcd]">{row}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderPollfishAudiences(showcase: CaseStudyShowcase) {
  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="rounded-[16px] border border-white/[0.12] bg-black/20 p-5">
        <p className="font-figtree text-sm font-medium text-[#e3e3e3]">Impact Highlights</p>
        <ul className="mt-4 space-y-2.5">
          {showcase.listItems?.map((item) => (
            <li className="font-figtree text-[14px] leading-[1.45] text-[#d1d1d1]" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {showcase.secondaryList?.map((item) => (
          <div
            className="rounded-[14px] border border-white/[0.11] bg-white/[0.04] p-4"
            key={item}
          >
            <p className="font-ibm text-[13px] leading-[1.5] text-[#d7d7d7]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderTild(showcase: CaseStudyShowcase) {
  const tasks = showcase.listItems ?? [];
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#d9d9e3] bg-[#f4f4f8] text-[#1a1a1f]">
      <div className="grid min-h-[460px] lg:grid-cols-[84px_1fr]">
        <aside className="border-b border-r border-[#d6d6df] bg-[#ebebf2] px-4 py-5 lg:border-b-0">
          <p className="font-figtree text-xs uppercase tracking-[0.18em] text-[#626272]">Logo</p>
          <div className="mt-8 space-y-3">
            <div className="h-3 w-3 rounded-sm bg-[#303041]" />
            <div className="h-3 w-3 rounded-sm bg-[#afb0be]" />
            <div className="h-3 w-3 rounded-sm bg-[#afb0be]" />
          </div>
        </aside>

        <div className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {showcase.chips?.map((chip) => (
              <span
                className="font-figtree rounded-full border border-[#c9cad8] bg-white/65 px-3 py-1 text-[12px] text-[#3b3c4a]"
                key={chip}
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-[#ced0de] bg-white px-4 py-3">
            <p className="font-figtree text-[13px] text-[#77788a]">Search posts, tags or people...</p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {tasks.map((task) => (
              <div
                className="rounded-xl border border-[#d9dae6] bg-white px-4 py-3"
                key={task}
              >
                <p className="font-ibm text-[13px] text-[#2a2b39]">{task}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {showcase.secondaryList?.map((item) => (
              <span
                className="font-figtree rounded-lg border border-[#ced0dd] bg-white/70 px-3 py-1.5 text-[12px] text-[#4c4d5c]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderCtrleat(showcase: CaseStudyShowcase) {
  const list = showcase.listItems ?? [];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-[18px] border border-white/[0.12] bg-[linear-gradient(180deg,#302522_0%,#201a19_100%)] p-5">
        <p className="font-aeonik text-xl font-semibold text-white">{showcase.title}</p>
        <p className="font-figtree mt-3 text-[13px] leading-[1.45] text-[#e0d7d3]">{showcase.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {showcase.chips?.map((chip) => (
            <span
              className="font-figtree rounded-full border border-white/20 px-3 py-1 text-[12px] text-white"
              key={chip}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-white/[0.12] bg-[linear-gradient(180deg,#272730_0%,#1e1f24_100%)] p-5">
        <p className="font-figtree text-sm font-semibold text-white">Featured-Restaurants</p>
        <ul className="mt-4 space-y-2.5">
          {list.slice(0, 4).map((item) => (
            <li className="font-ibm text-[13px] text-[#d7d7e2]" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[18px] border border-white/[0.12] bg-[linear-gradient(180deg,#223029_0%,#1a2420_100%)] p-5">
        <p className="font-figtree text-sm font-semibold text-white">Local context</p>
        {showcase.secondaryList?.map((item) => (
          <p className="font-ibm mt-3 text-[13px] text-[#c9d8cf]" key={item}>
            {item}
          </p>
        ))}
        <ul className="mt-4 space-y-2.5">
          {list.slice(4).map((item) => (
            <li className="font-ibm text-[13px] text-[#d1ddd5]" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function renderMinddy(showcase: CaseStudyShowcase) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[18px] border border-white/[0.12] bg-[#201f28] p-5 sm:p-6">
        <p className="font-aeonik text-2xl font-semibold text-white">{showcase.title}</p>
        <p className="font-figtree mt-2 text-[13px] text-[#cbc7dd]">{showcase.subtitle}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {showcase.chips?.map((chip) => (
            <span
              className="font-figtree rounded-full border border-white/[0.14] bg-white/[0.04] px-3 py-1 text-[12px] text-[#eceaf8]"
              key={chip}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-[18px] border border-white/[0.12] bg-[#181821] p-5 sm:p-6">
        <p className="font-figtree text-sm font-semibold text-[#f0f0f0]">Today’s flow</p>
        <ul className="mt-4 space-y-2.5">
          {showcase.listItems?.map((item) => (
            <li
              className="font-ibm rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-[#d5d5df]"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {showcase.secondaryList?.map((item) => (
            <span
              className="font-figtree rounded-md border border-white/[0.1] px-2.5 py-1 text-[11px] text-[#bdbdd1]"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Showcase({
  showcase,
  imageLabel,
}: {
  showcase?: CaseStudyShowcase;
  imageLabel?: string;
}) {
  if (!showcase) {
    return null;
  }

  let content: React.ReactNode = null;

  if (showcase.type === "pollfish-ai") {
    content = renderPollfishAi(showcase);
  }
  if (showcase.type === "pollfish-questionnaire") {
    content = renderPollfishQuestionnaire(showcase);
  }
  if (showcase.type === "pollfish-audiences") {
    content = renderPollfishAudiences(showcase);
  }
  if (showcase.type === "tild") {
    content = renderTild(showcase);
  }
  if (showcase.type === "ctrleat") {
    content = renderCtrleat(showcase);
  }
  if (showcase.type === "minddy") {
    content = renderMinddy(showcase);
  }

  if (!content) {
    return null;
  }

  const isLightPanel = showcase.type === "tild";

  return (
    <PanelWrap
      className={isLightPanel ? "border-[#dfe0e8] bg-[#f7f7fb]" : undefined}
      disableGlow={isLightPanel}
      imageLabel={imageLabel}
      labelClassName={isLightPanel ? "text-[#6d6f80]" : undefined}
    >
      {content}
    </PanelWrap>
  );
}

function EntryBlock({ entry, delayMs }: { entry: CaseStudyEntry; delayMs: number }) {
  return (
    <article className="space-y-8">
      <div
        className={cn(
          "grid gap-10 lg:gap-24",
          entry.details.length > 0
            ? "md:grid-cols-[minmax(400px,580px)_245px] md:items-start md:justify-between"
            : "max-w-[680px]",
        )}
      >
        <Reveal delayMs={delayMs}>
          {entry.tag && (
            <p className="font-figtree text-[14px] font-medium uppercase tracking-[0.08em] text-[#848484]">
              {entry.tag}
            </p>
          )}
          <h2 className="font-aeonik mt-2 text-[38px] font-semibold leading-[1.1] text-white sm:text-[44px] lg:text-[52px]">
            {entry.title}
          </h2>
          {entry.subtitle && (
            <p className="font-aeonik mt-2 max-w-[640px] text-[26px] font-semibold leading-[1.2] text-[#d6d6d6] sm:text-[31px]">
              {entry.subtitle}
            </p>
          )}
          <div className="mt-8 space-y-5">
            {entry.paragraphs.map((paragraph) => (
              <p
                className="font-figtree text-[17px] leading-[1.55] text-[#c4c4c4] sm:text-[18px]"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
          {entry.ctaLabel && (
            <a
              className="font-figtree mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
              href="#"
            >
              {entry.ctaLabel}
              <span aria-hidden>→</span>
            </a>
          )}
        </Reveal>

        {entry.details.length > 0 && (
          <Reveal className="hidden md:block md:w-[245px] md:flex-none" delayMs={delayMs + 80}>
            <DetailsColumn details={entry.details} />
          </Reveal>
        )}
      </div>

      {entry.showcase && (
        <Reveal delayMs={delayMs + 140}>
          <Showcase imageLabel={entry.imageLabel} showcase={entry.showcase} />
        </Reveal>
      )}
    </article>
  );
}

export function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  return (
    <main className="bg-[#1a1a1a]" id="main-content">
      {caseStudies.map((study, studyIndex) => {
        if (study.id === "pollfish") {
          return <PollfishCaseStudySection key={study.id} study={study} />;
        }
        if (study.id === "tild") {
          return <TildCaseStudySection key={study.id} study={study} />;
        }

        return (
          <section className="border-t border-white/10" id={study.id} key={study.id}>
            <div className="mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-[100px] lg:py-24">
              <div className={cn("space-y-[72px]", studyIndex === 0 ? "pt-2" : "")}>
                {study.entries.map((entry, entryIndex) => (
                  <EntryBlock
                    delayMs={entryIndex * 60}
                    entry={entry}
                    key={entry.id}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
