import type { Metadata } from "next";
import { CvContent } from "@/components/cv/cv-content";

export const metadata: Metadata = {
  title: "CV",
  description: "Resume and professional experience of Mania Totomi.",
};

export default function CvPage() {
  return (
    <main className="min-h-screen bg-[#040404] px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
      <div className="mx-auto w-full max-w-[1200px]">
        <CvContent />
      </div>
    </main>
  );
}
