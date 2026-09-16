"use client";

import { useState } from "react";
import { ChevronDown, Network } from "lucide-react";
import { SiGithub } from "react-icons/si";

const experiences = [
  {
    title: "Open Source Contributor",
    context: "Velero · Ray · Kubeflow · Kubernetes SIGs · MCP",
    period: "2025 — Present",
    logo: "github",
    summary: "Reliability fixes and developer-experience improvements across production-scale open-source ecosystems.",
    details: [
      "Reproduce platform edge cases and reduce them to reviewable, testable failures.",
      "Work through public feedback and adapt changes to the maintainers’ existing contracts.",
      "Improve reliability, documentation, CI behavior, and contributor workflows without widening the patch unnecessarily.",
    ],
  },
  {
    title: "Independent AI Systems Engineer",
    context: "SCOUT · NEXUS · SHARP · VERITAS",
    period: "2025 — Present",
    logo: "agent-network",
    summary: "Agent memory, multi-agent coordination, verification, and safe execution systems built from first principles.",
    details: [
      "Design memory lifecycles that balance recall quality, provenance, latency, and context cost.",
      "Build orchestration graphs with explicit state transitions, tool boundaries, retries, and human checkpoints.",
      "Create evaluation harnesses that turn model behavior into repeatable engineering evidence.",
    ],
  },
] as const;

function ExperienceLogo({ kind }: { kind: (typeof experiences)[number]["logo"] }) {
  if (kind === "github") return <SiGithub size={25} aria-hidden="true" />;
  return <Network size={24} aria-hidden="true" />;
}

export function ExperienceAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="experience-accordion">
      {experiences.map((item, index) => {
        const open = openIndex === index;
        const panelId = `experience-panel-${index}`;
        return (
          <article className={`experience-item${open ? " is-open" : ""}`} key={item.title}>
            <button
              className="experience-item__trigger"
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className={`experience-item__logo experience-item__logo--${item.logo}`}><ExperienceLogo kind={item.logo} /></span>
              <span className="experience-item__title"><strong>{item.title}</strong><small>{item.context}</small></span>
              <time>{item.period}</time>
              <ChevronDown className="experience-item__chevron" aria-hidden="true" />
            </button>
            <div className="experience-item__reveal" id={panelId} aria-hidden={!open}>
              <div>
                <p>{item.summary}</p>
                <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
