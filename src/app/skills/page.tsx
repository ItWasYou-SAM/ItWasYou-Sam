import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";
import { TechStack } from "@/components/TechStack";

export const metadata: Metadata = {
  title: "Technical Skills",
  description: "AI, product engineering, data, and infrastructure capabilities used by Shivam Singh.",
};

const capabilityGroups = [
  { number: "01", title: "Agent systems", copy: "Memory architectures, tool routing, multi-agent graphs, retrieval pipelines, evaluation, guardrails, and human checkpoints.", tools: "Python · LangChain · LangGraph · CrewAI · OpenAI · Hugging Face" },
  { number: "02", title: "Product engineering", copy: "Responsive interfaces and service layers that expose complex systems without exposing unnecessary complexity.", tools: "TypeScript · React · Next.js · Node.js · FastAPI · Tailwind CSS" },
  { number: "03", title: "Data & state", copy: "Relational, graph, cache, and vector-oriented storage selected around access patterns and operational constraints.", tools: "PostgreSQL · MongoDB · Redis · Neo4j · Prisma" },
  { number: "04", title: "Infrastructure", copy: "Containerized delivery, automated checks, cloud deployment, and production diagnostics for repeatable releases.", tools: "Docker · Kubernetes · AWS · Google Cloud · GitHub Actions · Linux" },
];

export default function SkillsPage() {
  return (
    <DetailPage
      eyebrow="Capabilities / 04"
      title="Tools are useful when the decisions behind them are clear."
      description="This is the working stack behind the portfolio: technologies used to build, observe, and ship AI-heavy products rather than a keyword inventory."
    >
      <section className="detail-live detail-live--stack"><TechStack /></section>
      <section className="detail-section">
        <span className="detail-label">Capability map</span>
        <div className="capability-grid">
          {capabilityGroups.map((group) => (
            <article key={group.number}>
              <span>{group.number}</span>
              <h2>{group.title}</h2>
              <p>{group.copy}</p>
              <small>{group.tools}</small>
            </article>
          ))}
        </div>
      </section>
    </DetailPage>
  );
}
