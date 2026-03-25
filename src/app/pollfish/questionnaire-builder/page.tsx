import Image from "next/image";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteTopBar } from "@/components/sections/site-top-bar";
import { siteContent } from "@/content/site";

const QUESTIONNAIRE_TITLE = "Questionnaire Builder";
const QUESTIONNAIRE_DESCRIPTION =
  "I led the evolution of Pollfish’s core survey creation system, from quick validation surveys to complex research studies. I introduced advanced methods, logic, and dynamic structures while keeping the builder intuitive for both new and expert researchers.";
const QUESTIONNAIRE_CHIPS = [
  "Survey creation system",
  "Advanced Survey Logic",
  "2018 - Present",
] as const;

function getQuestionnaireEntry() {
  const pollfishCaseStudy = siteContent.caseStudies.find(
    (study) => study.id === "pollfish",
  );
  return pollfishCaseStudy?.entries.find(
    (entry) => entry.id === "pollfish-questionnaire",
  );
}

export default function QuestionnaireBuilderCaseStudyPage() {
  const questionnaireEntry = getQuestionnaireEntry();
  const details = questionnaireEntry?.details ?? [];

  return (
    <>
      <main className="bg-[#040404]">
        <header
          className="relative overflow-hidden border-b border-white/[0.15] bg-[#141314]"
          id="top"
        >
          <SiteTopBar anchorBasePath="/" content={siteContent} />

          <div className="mx-auto mt-[120px] w-full max-w-[1600px] px-5 sm:px-8 lg:px-[84px]">
            <div className="mx-auto w-full max-w-[710px] text-center">
              <h1 className="font-aeonik text-[44px] font-semibold leading-[1.05] text-white sm:text-[56px]">
                {QUESTIONNAIRE_TITLE}
              </h1>

              <p className="mx-auto mt-7 max-w-[68ch] font-figtree text-[20px] leading-[32px] text-[#e7e3eb]">
                {QUESTIONNAIRE_DESCRIPTION}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                {QUESTIONNAIRE_CHIPS.map((chip, index) => (
                  <div className="flex items-center gap-3" key={chip}>
                    <span className="rounded-[30px] border border-[#2b2b2b] bg-[rgba(47,47,47,0.24)] px-4 py-2 font-figtree text-[16px] text-[#c2c2c2]">
                      {chip}
                    </span>
                    {index < QUESTIONNAIRE_CHIPS.length - 1 && (
                      <span className="relative inline-flex h-[3px] w-[3px] rounded-full bg-[#c2c2c2]">
                        <span
                          aria-hidden="true"
                          className="absolute -inset-[4px] rounded-full bg-[radial-gradient(circle,rgba(194,194,194,0.42)_0%,rgba(194,194,194,0)_72%)]"
                        />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-[120px] w-full max-w-[1600px] px-5 sm:px-8 lg:px-0">
            <div className="mx-auto w-full max-w-[1133px]">
              <Image
                alt="Questionnaire Builder interface preview"
                className="h-auto w-full object-contain"
                height={720}
                priority
                sizes="(min-width: 1200px) 1133px, 100vw"
                src="/images/pollfish-questionnaire.png"
                width={1133}
              />
            </div>
          </div>
        </header>

        <section className="bg-[#181818] pb-[160px] pt-[120px]">
          <div className="mx-auto w-full max-w-[1600px] px-5 text-white sm:px-8 lg:px-[84px]">
            <div className="mx-auto w-full max-w-[986px]">
              <h2 className="font-aeonik text-[48px] font-semibold leading-[55px] text-white">
                Case Study Snapshot
              </h2>

              <div className="mt-20 space-y-10">
                {details.map((detail) => (
                  <div
                    className="grid gap-5 sm:gap-8 md:grid-cols-[134px_1fr] md:gap-[125px]"
                    key={detail.title}
                  >
                    <p className="font-figtree text-[24px] font-bold leading-[1.2] text-white">
                      {detail.title}
                    </p>
                    <div className="space-y-3 font-figtree text-[20px] leading-[32px] text-[#f5f5f5]">
                      {detail.items.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter content={siteContent} />
    </>
  );
}
