import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gears",
  description: "The tools and technologies behind Shivam Singh's AI engineering work.",
};

const groups = [
  {
    label: "agent systems",
    tone: "green",
    items: [["language", "python · typescript"], ["orchestration", "langgraph · langchain · crewai"], ["models", "openai · anthropic · gemini · hugging face"], ["evaluation", "custom harnesses · regression gates"]],
  },
  {
    label: "product engineering",
    tone: "amber",
    items: [["web", "next.js · react · tailwind css"], ["services", "fastapi · node.js"], ["interfaces", "radix ui · framer motion"], ["testing", "eslint · type checking · focused integration tests"]],
  },
  {
    label: "data & state",
    tone: "coral",
    items: [["relational", "postgresql · prisma"], ["document", "mongodb"], ["cache / queue", "redis · celery"], ["graph", "neo4j"], ["retrieval", "vector search · hybrid rag"]],
  },
  {
    label: "delivery",
    tone: "mint",
    items: [["containers", "docker · kubernetes"], ["cloud", "aws · google cloud · vercel"], ["automation", "github actions"], ["system", "linux · git"]],
  },
] as const;

export default function GearsPage() {
  return (
    <main id="main-content" className="terminal-shell route-page gears-route">
      <p className="command-title"><span>$</span> cat stack.yml</p>
      <div className="route-toolbar gears-intro"><span>## working setup</span><a href="https://github.com/shivamsingh-007" target="_blank" rel="noreferrer">⑂ github profile</a></div>
      <div className="gear-groups">
        {groups.map((group) => (
          <section className={`gear-group gear-group--${group.tone}`} key={group.label}>
            <h1>{group.label}</h1>
            <dl>{group.items.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
          </section>
        ))}
      </div>
      <p className="gear-eof">this page changes as the work changes.<br />▊ end of file</p>
    </main>
  );
}
