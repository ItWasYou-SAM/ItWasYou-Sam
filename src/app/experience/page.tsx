import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";
import { ExperienceAccordion } from "@/components/ExperienceAccordion";

export const metadata: Metadata = {
  title: "Experience",
  description: "Detailed engineering experience and responsibilities from Shivam Singh.",
};

export default function ExperiencePage() {
  return (
    <DetailPage
      eyebrow="Experience / 01"
      title="Work that gets clearer when you open it."
      description="Select a role to inspect its responsibilities, engineering focus, and the way the work was approached."
    >
      <ExperienceAccordion />
    </DetailPage>
  );
}
