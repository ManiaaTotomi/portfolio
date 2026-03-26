import Image from "next/image";
import { QuestionnaireBuilderFlowAnimation } from "@/components/sections/questionnaire-builder-flow-animation";

const USER_SPECTRUM_POINTS = [
  "startup founders validating ideas quickly",
  "consultants running multiple client studies",
  "professional researchers designing complex studies",
] as const;

const SYSTEM_LAYERS = [
  {
    title: "Survey structure",
    description: "How questions and answers are created and edited",
    icon: "structure",
  },
  {
    title: "Survey flow",
    description: "How respondents move through the survey",
    icon: "flow",
  },
  {
    title: "Research capabilities",
    description: "How advanced methods are modeled in the same builder",
    icon: "capabilities",
  },
] as const;

const RESEARCH_FRAMEWORKS = [
  "A/B testing",
  "Conjoint analysis",
  "MaxDiff",
  "Van Westendorp pricing studies",
] as const;

interface NarrativeBlockProps {
  label: string;
  children: React.ReactNode;
}

function NarrativeBlock({ label, children }: NarrativeBlockProps) {
  return (
    <div className="grid gap-5 md:grid-cols-[133px_1fr] md:gap-[85px]">
      <p className="font-figtree text-[22px] font-bold leading-[1.25] text-inherit">{label}</p>
      <div className="space-y-4 font-figtree text-[20px] leading-[32px] text-inherit">
        {children}
      </div>
    </div>
  );
}

function ScreenshotPair({
  caption,
  light = true,
}: {
  caption: string;
  light?: boolean;
}) {
  const frameClassName = light
    ? "border-[#e2e2e2] bg-[#f4f4f4]"
    : "border-white/[0.1] bg-[#232323]";

  return (
    <div className="space-y-4">
      <p
        className={`font-figtree text-[16px] ${
          light ? "text-black/60" : "text-white/60"
        }`}
      >
        {caption}
      </p>
      <div className={`overflow-hidden rounded-[16px] border ${frameClassName} p-3 sm:p-4`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="overflow-hidden rounded-[16px] border border-black/10 bg-white">
            <Image
              alt="Questionnaire Builder workflow screenshot"
              className="h-auto w-full object-cover"
              height={1762}
              sizes="(min-width: 640px) 50vw, 100vw"
              src="/images/Questionnaire-Builder/images/Questionnaire.png"
              width={2772}
            />
          </div>
          <div className="overflow-hidden rounded-[16px] border border-black/10 bg-white">
            <Image
              alt="Questionnaire Builder interface screenshot"
              className="h-auto w-full object-cover"
              height={2000}
              sizes="(min-width: 640px) 50vw, 100vw"
              src="/images/pollfish-questionnaire.png"
              width={3200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedImageBlock({
  caption,
  src,
  alt,
  light = true,
}: {
  caption: string;
  src: string;
  alt: string;
  light?: boolean;
}) {
  const frameClassName = light
    ? "border-[#e2e2e2] bg-[#f4f4f4]"
    : "border-white/[0.1] bg-[#232323]";

  return (
    <div className="space-y-4">
      <p
        className={`font-figtree text-[16px] ${
          light ? "text-black/60" : "text-white/60"
        }`}
      >
        {caption}
      </p>
      <div className={`overflow-hidden rounded-[16px] border ${frameClassName} p-3 sm:p-4`}>
        <div className="overflow-hidden rounded-[16px] border border-black/10 bg-white shadow-[0_18px_36px_rgba(13,17,25,0.1)]">
          <Image
            alt={alt}
            className="block h-auto w-full"
            src={src}
            unoptimized
            width={1440}
            height={775}
            sizes="(min-width: 1440px) 986px, 100vw"
          />
        </div>
      </div>
    </div>
  );
}

function SystemLayerIcon({ kind }: { kind: (typeof SYSTEM_LAYERS)[number]["icon"] }) {
  if (kind === "structure") {
    return (
      <span className="relative inline-flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-white/20 bg-white/[0.04]">
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          viewBox="0 0 18 18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect height="4.25" rx="1" stroke="#EAFBFF" strokeWidth="1.25" width="12.5" x="2.75" y="2.75" />
          <rect height="4.25" rx="1" stroke="#EAFBFF" strokeWidth="1.25" width="12.5" x="2.75" y="10.75" />
          <path d="M6 7.4V10.6" stroke="#9DFFF0" strokeLinecap="round" strokeWidth="1.25" />
          <path d="M12 7.4V10.6" stroke="#9DFFF0" strokeLinecap="round" strokeWidth="1.25" />
        </svg>
      </span>
    );
  }

  if (kind === "flow") {
    return (
      <span className="relative inline-flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-white/20 bg-white/[0.04]">
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          viewBox="0 0 18 18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4" cy="4" fill="#9DFFF0" r="1.5" />
          <circle cx="14" cy="4" fill="#EAFBFF" r="1.5" />
          <circle cx="9" cy="14" fill="#EAFBFF" r="1.5" />
          <path d="M5.2 4H12.8" stroke="#EAFBFF" strokeLinecap="round" strokeWidth="1.25" />
          <path d="M4.9 5.2L8.1 12.5" stroke="#9DFFF0" strokeLinecap="round" strokeWidth="1.25" />
          <path d="M13.1 5.2L9.9 12.5" stroke="#9DFFF0" strokeLinecap="round" strokeWidth="1.25" />
        </svg>
      </span>
    );
  }

  return (
    <span className="relative inline-flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-white/20 bg-white/[0.04]">
      <svg
        aria-hidden="true"
        fill="none"
        height="18"
        viewBox="0 0 18 18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 14.25V8.75" stroke="#EAFBFF" strokeLinecap="round" strokeWidth="1.25" />
        <path d="M9 14.25V6" stroke="#EAFBFF" strokeLinecap="round" strokeWidth="1.25" />
        <path d="M15 14.25V3.75" stroke="#EAFBFF" strokeLinecap="round" strokeWidth="1.25" />
        <circle cx="3" cy="7.5" fill="#9DFFF0" r="1.5" />
        <circle cx="9" cy="4.75" fill="#9DFFF0" r="1.5" />
        <circle cx="15" cy="2.5" fill="#9DFFF0" r="1.5" />
      </svg>
    </span>
  );
}

export function QuestionnaireBuilderContentSections() {
  return (
    <>
      <section className="bg-[#141314] pb-[80px] pt-[120px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 text-white sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[986px]">
            <h2 className="font-aeonik text-[44px] font-semibold leading-[1.08] text-[#ececec] sm:text-[48px]">
              The challenge
            </h2>

            <div className="mt-20">
              <NarrativeBlock label="User spectrum">
                <p>The builder needed to support a wide range of users:</p>
                <ul className="list-disc space-y-1 pl-7">
                  {USER_SPECTRUM_POINTS.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p>
                  The challenge was evolving a simple survey builder into a system capable
                  of supporting advanced research workflows without overwhelming less
                  experienced users.
                </p>
                <p>
                  This required balancing simplicity for quick surveys with the flexibility
                  needed for more complex research logic and structures.
                </p>
              </NarrativeBlock>
            </div>
          </div>

          <div className="mx-auto mt-20 w-full max-w-[1439px]">
            <p className="font-figtree text-[16px] font-medium text-white/60">
              Three primary user archetypes shaped how the builder balanced speed,
              clarity, and advanced capabilities.
            </p>
            <div className="mt-4 overflow-hidden rounded-[16px] bg-[#f2f2f2]">
              <Image
                alt="Three primary user archetypes for Questionnaire Builder"
                className="h-auto w-full object-cover"
                height={962}
                sizes="(min-width: 1440px) 1439px, 100vw"
                src="/images/Questionnaire-Builder/images/personas.png"
                width={2879}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141314] pb-[120px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[75px]">
          <div className="relative overflow-hidden rounded-[20px] border border-white/[0.1] bg-[#111111] px-5 py-[70px] text-white sm:px-8 lg:px-[120px] lg:py-[120px]">
            <div className="pointer-events-none absolute -left-[180px] -top-[170px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,207,139,0.2)_0%,rgba(0,207,139,0)_72%)] blur-[18px]" />
            <div className="pointer-events-none absolute -bottom-[260px] right-[-140px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(0,207,139,0.16)_0%,rgba(0,207,139,0)_72%)] blur-[22px]" />

            <div className="relative mx-auto w-full max-w-[986px]">
              <div className="max-w-[779px]">
                <h2 className="font-aeonik text-[44px] font-semibold leading-[1.08] text-[#ececec] sm:text-[48px]">
                  The system
                </h2>
                <p className="mt-6 font-figtree text-[20px] leading-[32px] text-[#f1f1f1]">
                  This system gradually evolved into three interconnected layers. Each
                  layer expanded over time as Pollfish introduced more sophisticated
                  research workflows.
                </p>
              </div>

              <div className="mt-10 grid overflow-hidden rounded-[16px] border border-white/[0.07] md:grid-cols-3">
                {SYSTEM_LAYERS.map((layer, index) => (
                  <div
                    className={`flex min-h-[226px] flex-col gap-4 p-8 ${
                      index < SYSTEM_LAYERS.length - 1
                        ? "border-b border-white/[0.07] md:border-b-0 md:border-r"
                        : ""
                    } border-white/[0.07]`}
                    key={layer.title}
                  >
                    <SystemLayerIcon kind={layer.icon} />
                    <h3 className="font-figtree text-[20px] font-bold leading-[28px] text-white">
                      {layer.title}
                    </h3>
                    <p className="font-figtree text-[18px] leading-[26px] text-white">
                      {layer.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[#141314] py-[120px] text-[#f1f1f1]">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[986px]">
            <h2 className="font-aeonik text-[40px] font-semibold leading-[1.1] text-[#e7e7e7] sm:text-[44px]">
              Survey Structure
            </h2>

            <div className="mt-20 space-y-20">
              <NarrativeBlock label="Editing model">
                <p>
                  At its core, every survey follows the same structure:{" "}
                  <strong>Question → Answers → Configuration</strong>
                </p>
                <p>
                  The builder is organized into two main areas: the survey structure on
                  the right, where all questions are displayed, and the question settings
                  on the left, which update based on the selected question.
                </p>
                <p>
                  Selecting a question updates its configuration panel, allowing
                  researchers to edit structure and settings within the same workspace.
                </p>
                <p>
                  Navigation is also built into this model. Researchers can move between
                  questions using inline controls or arrow navigation, making it easier
                  to manage longer surveys without losing context.
                </p>
              </NarrativeBlock>

              <QuestionnaireBuilderFlowAnimation light={false} />

              <NarrativeBlock label="Navigation & Editing">
                <p>
                  As surveys grow longer, restructuring questions becomes essential.
                </p>
                <p>
                  Researchers can reorder questions using drag-and-drop, arrow controls,
                  or by inserting a new question between existing ones. Questions can
                  also be duplicated and converted into different question types, allowing
                  users to reuse existing structures instead of recreating them.
                </p>
                <p>
                  These editing patterns support fast iteration while keeping survey
                  structure manageable.
                </p>
              </NarrativeBlock>

              <AnimatedImageBlock
                alt="Animated demonstration of reordering and editing questions in the Questionnaire Builder"
                caption="Questions can be reordered, duplicated, converted, or inserted between existing ones without breaking the editing flow."
                light={false}
                src="/images/Questionnaire-Builder/animations/first-flow/questions-reordering-animated.webp"
              />
            </div>
          </div>

          <div className="mx-auto mt-[120px] w-full max-w-[986px]">
            <h2 className="font-aeonik text-[40px] font-semibold leading-[1.1] text-[#e7e7e7] sm:text-[44px]">
              Survey flow
            </h2>

            <div className="mt-20 space-y-20">
              <NarrativeBlock label="Respondent paths">
                <p>
                  Survey logic defines how respondents move through the questionnaire.
                </p>
                <p>
                  Researchers can create rules based on answers or audience attributes,
                  using combinations of conditions connected with And / Or logic. These
                  rules determine which question a respondent will see next.
                </p>
                <p>
                  The logic editor was designed to read sequentially, allowing rules to
                  be understood as a clear flow rather than as disconnected conditions.
                </p>
                <p>
                  The layout follows the same editing model as the Questionnaire Builder:
                  rules appear on the left while the survey structure remains visible on
                  the right. Researchers can edit questions and answers directly within
                  this view without leaving the logic tab.
                </p>
              </NarrativeBlock>

              <ScreenshotPair
                caption="Logic and structure stay connected in one workspace so teams can edit and verify flow without context switching."
                light={false}
              />

              <NarrativeBlock label="Logic validation">
                <p>
                  As survey logic becomes more complex, configuration mistakes can occur.
                </p>
                <p>
                  To prevent this, the builder surfaces potential issues directly in the
                  questionnaire view. If logic rules cause a question to never appear in
                  any scenario, it is flagged as a skipped question.
                </p>
                <p>
                  Inline indicators also show how questions connect to each other,
                  helping researchers understand survey flow without opening the logic
                  editor.
                </p>
              </NarrativeBlock>

              <NarrativeBlock label="Visualizing survey flow">
                <p>
                  To help researchers understand complex branching flows, the builder
                  also provides a visual representation of the survey structure.
                </p>
                <p>
                  The Logic Path view displays the full questionnaire as a node-based
                  flow, making it easier to verify how respondents move between
                  questions and identify potential issues in the survey structure.
                </p>
              </NarrativeBlock>
            </div>
          </div>

          <div className="mx-auto mt-[120px] w-full max-w-[986px]">
            <h2 className="font-aeonik text-[40px] font-semibold leading-[1.1] text-[#e7e7e7] sm:text-[44px]">
              Research Capabilities
            </h2>

            <div className="mt-20 space-y-20">
              <NarrativeBlock label="Research frameworks">
                <p>
                  Beyond basic question types, the builder supports advanced research
                  methods including:
                </p>
                <ul className="list-disc space-y-1 pl-7">
                  {RESEARCH_FRAMEWORKS.map((framework) => (
                    <li key={framework}>{framework}</li>
                  ))}
                </ul>
                <p>
                  These methods introduce specialized survey structures directly within
                  the builder, allowing researchers to design sophisticated studies
                  without leaving the questionnaire environment.
                </p>
              </NarrativeBlock>

              <ScreenshotPair
                caption="The builder supports both standard question types and complete research frameworks within the same system."
                light={false}
              />

              <NarrativeBlock label="Loop & Merge">
                <p>
                  Loop &amp; Merge enables dynamic question repetition based on previous
                  responses.
                </p>
                <p>
                  Instead of manually duplicating question groups, researchers can define
                  a set of questions that repeat automatically for each selected option
                  from a previous question.
                </p>
                <p>
                  This significantly reduces manual setup and allows complex survey
                  structures to remain manageable.
                </p>
              </NarrativeBlock>

              <NarrativeBlock label="Preview & validation">
                <p>
                  To ensure the survey behaves as expected, the builder includes an
                  interactive preview that simulates the respondent experience.
                </p>
                <p>
                  Researchers can answer questions and immediately see how the survey path
                  changes based on their responses, allowing them to validate both
                  question behavior and logic before launching the survey.
                </p>
              </NarrativeBlock>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141314] py-[120px] text-white">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[84px]">
          <div className="mx-auto w-full max-w-[986px]">
            <h2 className="font-aeonik text-[40px] font-semibold leading-[1.1] sm:text-[44px]">
              Impact
            </h2>

            <div className="mt-20 space-y-20">
              <NarrativeBlock label="Result">
                <p>
                  Over time, the Questionnaire Builder evolved from a simple survey
                  editor into a scalable system capable of supporting advanced research
                  workflows.
                </p>
                <p className="font-semibold">
                  By gradually introducing research methods, survey logic, and dynamic
                  survey structures, the builder became the foundation of Pollfish&apos;s
                  survey creation platform.
                </p>
              </NarrativeBlock>

              <NarrativeBlock label="What I learnt">
                <p>
                  Designing a core product surface over several years reinforced the
                  importance of system thinking over isolated features.
                </p>
                <p>
                  Each new capability from research methods to survey logic had to
                  integrate into the same editing model without increasing complexity for
                  everyday users.
                </p>
                <p>
                  This project taught me how to evolve a system incrementally:
                  introducing new capabilities while preserving clarity and consistency
                  across the interface.
                </p>
              </NarrativeBlock>

              <NarrativeBlock label="What I would change">
                <p>
                  If redesigning the builder today, I would revisit interaction patterns
                  that evolved gradually over time.
                </p>
                <p>
                  Some areas of the interface reflect earlier product constraints and
                  would benefit from simplification now that the system supports more
                  advanced research capabilities.
                </p>
                <p>
                  A future iteration could unify certain editing patterns and reduce
                  configuration complexity while preserving the flexibility required for
                  complex studies.
                </p>
              </NarrativeBlock>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
