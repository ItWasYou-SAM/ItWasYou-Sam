import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/ProjectExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI systems, agent infrastructure, and applied engineering projects by Shivam Singh.",
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="terminal-shell route-page projects-route">
      <h1>projects</h1>
      <ProjectExplorer />
    </main>
  );
}
