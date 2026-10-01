import Link from "next/link";
import { GithubGraph } from "@/components/GithubGraph";
import { HireTerminal } from "@/components/HireTerminal";
import { OpenSourceContributions } from "@/components/OpenSourceContributions";
import { ProfileConsole } from "@/components/ProfileConsole";

const experiences = [
  {
    title: "open source contributor",
    accent: "green",
    copy: "Reliability fixes and developer-experience improvements across Velero, Ray, Kubeflow, Kubernetes SIGs, MCP tooling, and other production-scale ecosystems.",
  },
  {
    title: "independent ai systems engineer",
    accent: "amber",
    copy: "Designed SCOUT, NEXUS, SHARP, VERITAS, and related systems for agent memory, multi-agent coordination, verification, evaluation, and safe execution.",
  },
  {
    title: "product & infrastructure builder",
    accent: "coral",
    copy: "Turn experimental ideas into responsive product surfaces, observable services, repeatable deployments, and technical case studies that explain the trade-offs.",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content" className="terminal-shell terminal-home">
      <ProfileConsole />

      <section className="home-calendar" aria-label="GitHub contribution activity">
        <GithubGraph />
      </section>

      <section className="terminal-section" aria-labelledby="experience-title">
        <p className="command-title" id="experience-title"><span>$</span> cat experience.log</p>
        <div className="experience-log">
          {experiences.map((item) => (
            <article className={`experience-log__item experience-log__item--${item.accent}`} key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <Link className="inline-terminal-link" href="/experience">read the detailed log →</Link>
      </section>

      <section className="terminal-section" aria-label="Open source pull requests">
        <OpenSourceContributions />
      </section>

      <section className="terminal-section why-hire" aria-labelledby="why-title">
        <p className="command-title" id="why-title"><span>$</span> cat why-hire-me.md</p>
        <div className="terminal-note">
          <p>I like difficult systems work: the point where a model demo needs explicit state, recovery paths, evidence, and a product surface people can actually use.</p>
          <p>I learn quickly, ask precise questions when I am stuck, and keep the work inspectable. My goal is simple—show up, do good engineering, and leave the system easier to trust.</p>
          <p>And I care about the last ten percent: naming, documentation, responsive behavior, and the awkward failure cases that decide whether software feels finished.</p>
        </div>
      </section>

      <section className="terminal-section" id="hire" aria-labelledby="hire-title">
        <p className="command-title" id="hire-title"><span>$</span> cat hire.me</p>
        <HireTerminal />
      </section>
    </main>
  );
}
