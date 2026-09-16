import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";
import { GithubGraph } from "@/components/GithubGraph";
import { OpenSourceContributions } from "@/components/OpenSourceContributions";

export const metadata: Metadata = {
  title: "GitHub Activity",
  description: "Contribution calendar, pull requests, and open-source engineering notes from Shivam Singh.",
};

export default function GitHubPage() {
  return (
    <DetailPage
      eyebrow="Open source / 03"
      title="The work is public on purpose."
      description="The calendar shows consistency. The pull requests show the harder part: reading unfamiliar systems, reproducing edge cases, and leaving the codebase easier to trust."
    >
      <section className="detail-live"><GithubGraph /></section>
      <section className="detail-live detail-live--prs"><OpenSourceContributions /></section>
      <section className="detail-section">
        <span className="detail-label">Contribution loop</span>
        <div className="detail-cards">
          <article><span>01</span><h2>Reproduce</h2><p>Reduce the report to an observable failure and document the environment around it.</p></article>
          <article><span>02</span><h2>Repair</h2><p>Prefer the smallest change that restores the intended contract without hiding adjacent risks.</p></article>
          <article><span>03</span><h2>Prove</h2><p>Add focused tests, explain the mechanism, and make review easier for the maintainers who own the system.</p></article>
        </div>
      </section>
    </DetailPage>
  );
}
