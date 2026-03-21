import type {
  CaseStudy,
  CaseStudyDetailGroup,
  CaseStudyEntry,
} from "@/content/site";
import Image from "next/image";

interface TildCaseStudySectionProps {
  study: CaseStudy;
}

function TildDetailsColumn({ details }: { details: CaseStudyDetailGroup[] }) {
  return (
    <div className="space-y-6">
      {details.map((group) => (
        <div className="space-y-0.5" key={group.title}>
          <p className="font-figtree text-[14px] font-bold leading-[22px] text-[#bbbbbb]">
            {group.title}
          </p>
          <div className="space-y-0.5">
            {group.items.map((item) => (
              <p
                className="font-figtree text-[14px] font-medium leading-[22px] text-[#bbbbbb]"
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

function TildIntro({ entry }: { entry: CaseStudyEntry }) {
  return (
    <div className="space-y-4">
      {entry.paragraphs.map((paragraph) => (
        <p
          className="font-figtree text-[18px] font-normal leading-[27px] text-[#e5e5e5]"
          key={paragraph}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function TildInProgressIndicator() {
  return (
    <p className="font-figtree inline-flex items-center rounded-[5px] text-[16px] font-bold leading-normal text-[#e5e5e5]">
      In progress
    </p>
  );
}

function TildTextBlock({ entry }: { entry: CaseStudyEntry }) {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-8 lg:px-14 xl:px-[347px] xl:py-[120px]">
      <div className="space-y-[30px]">
        <div className="space-y-[5px]">
          <h2 className="font-aeonik text-[44px] font-bold leading-normal text-[#dddddd]">
            {entry.title}
          </h2>
          {entry.subtitle && (
            <p className="font-aeonik w-full max-w-[580px] text-[44px] font-semibold leading-[49px] text-[#6d6d6d]">
              {entry.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12 xl:gap-[142px]">
          <div className="md:min-w-[400px] md:max-w-[580px] md:flex-1">
            <div className="space-y-12">
              <TildIntro entry={entry} />
              <TildInProgressIndicator />
            </div>
          </div>
          <div className="hidden md:block md:w-[185px] md:flex-none">
            <TildDetailsColumn details={entry.details} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildPlanPreview() {
  return (
    <div className="relative aspect-[2048/1363] w-full overflow-hidden">
      <Image
        alt="Tild build plan interface"
        className="object-cover"
        fill
        priority={false}
        sizes="(min-width: 1280px) 1400px, 100vw"
        src="/images/as-built.png"
      />
    </div>
  );
}

function TildVisualBlock({
  imageLabel,
}: {
  imageLabel?: string;
}) {
  return (
    <div className="w-full py-14 sm:py-16 xl:py-[80px]">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-[100px]">
        <div className="space-y-[21.75px]">
          <div className="flex items-center gap-[20.16px]">
            <p className="font-ibm text-[14px] font-medium uppercase leading-normal text-white">
              {imageLabel ?? "build plan"}
            </p>
            <div className="h-px flex-1 bg-[rgba(159,155,155,0.5)]" />
          </div>

          <BuildPlanPreview />
        </div>
      </div>
    </div>
  );
}

export function TildCaseStudySection({ study }: TildCaseStudySectionProps) {
  const [entry] = study.entries;

  if (!entry) {
    return null;
  }

  return (
    <section className="border-t border-white/10 bg-[#1a1a1a]" id={study.id}>
      <TildTextBlock entry={entry} />
      <TildVisualBlock imageLabel={entry.imageLabel} />
    </section>
  );
}
