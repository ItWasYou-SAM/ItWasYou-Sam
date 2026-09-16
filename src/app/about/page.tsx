import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";

export const metadata: Metadata = {
  title: "Profile",
  description: "The engineering perspective, focus areas, and working principles behind Shivam Singh's portfolio.",
};

const principles = [
  ["01", "Build from the failure case", "I start by asking how a system loses context, calls the wrong tool, or becomes impossible to debug. The happy path comes after the boundaries are clear."],
  ["02", "Keep autonomy observable", "Long-running agents need explicit state, replayable decisions, and human-readable traces. Autonomy without an audit trail is just hidden complexity."],
  ["03", "Ship proof, not promises", "A project earns confidence through tests, measurable behavior, and a clear explanation of trade-offs—not through a polished demo alone."],
] as const;

export default function AboutPage() {
  return (
    <DetailPage
      eyebrow="Profile / 00"
      title="I design AI systems that can explain themselves."
      description="My work sits between agent architecture, product engineering, and open-source reliability. I turn uncertain research ideas into systems people can inspect, operate, and improve."
    >
      <section className="detail-split">
        <h2>Current focus</h2>
        <div>
          <p>Autonomous memory, multi-agent coordination, retrieval quality, evaluation gates, and safe tool execution.</p>
          <p>I’m especially interested in the moment a prototype stops being a clever loop and starts becoming dependable infrastructure.</p>
        </div>
      </section>

      <section className="detail-stats" aria-label="Profile facts">
        <div><strong>AI</strong><span>Primary domain</span></div>
        <div><strong>OSS</strong><span>Public workshop</span></div>
        <div><strong>India</strong><span>Working globally</span></div>
      </section>

      <section className="detail-section">
        <span className="detail-label">Working principles</span>
        <div className="detail-cards">
          {principles.map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>
          ))}
        </div>
      </section>
    </DetailPage>
  );
}
