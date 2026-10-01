import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";
import { OpenSourceContributions } from "@/components/OpenSourceContributions";

export const metadata: Metadata = {
  title: "Pull requests",
  description: "Merged, open, and closed pull requests from Shivam Singh's open-source work.",
};

export default function PullRequestsPage() {
  return (
    <DetailPage
      eyebrow="Open source / pull requests"
      title="work shipped in public"
      description="A live, filterable view of pull requests across the projects and communities I contribute to."
    >
      <section className="detail-live detail-live--prs" aria-label="Open-source pull requests">
        <OpenSourceContributions isFullPage />
      </section>
    </DetailPage>
  );
}
