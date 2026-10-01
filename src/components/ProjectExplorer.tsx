"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useEffect, useMemo, useState } from "react";
import { projectsData, techNames, type Project } from "@/data/projectsData";

type ProjectFilter = "all" | "agents" | "applied";
const agentSlugs = new Set(["scout", "nexus", "sharp", "novaharness", "core", "genesis", "astraweave", "evalgate", "osscontributoragent"]);

function techLabel(project: Project) {
  return project.tech.slice(0, 4).map((item) => typeof item === "string" ? techNames[item] : item.label).join(" · ");
}

function projectPoints(project: Project) {
  if (agentSlugs.has(project.slug)) {
    return [
      "explicit state and observable execution boundaries",
      "designed around failure recovery, evaluation, and human inspection",
      `implemented with ${techLabel(project).toLowerCase()}`,
    ];
  }
  return [
    "built around a focused real-world workflow",
    "responsive product surface with a maintainable service boundary",
    `implemented with ${techLabel(project).toLowerCase()}`,
  ];
}

export function ProjectExplorer() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [active, setActive] = useState<Project | null>(null);
  const visible = useMemo(() => projectsData.filter((project) => filter === "all" || (filter === "agents") === agentSlugs.has(project.slug)), [filter]);

  useEffect(() => {
    if (!active) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    document.addEventListener("keydown", close);
    document.body.classList.add("has-terminal-modal");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("has-terminal-modal");
    };
  }, [active]);

  return (
    <>
      <div className="route-toolbar">
        <div className="terminal-tabs" role="group" aria-label="Filter projects">
          {(["all", "agents", "applied"] as ProjectFilter[]).map((item, index) => (
            <span key={item}><button type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>{index < 2 && <i>/</i>}</span>
          ))}
        </div>
        <a href="https://github.com/shivamsingh-007" target="_blank" rel="noreferrer"><SiGithub /> all repos</a>
      </div>

      <section className="project-group" aria-labelledby="featured-projects">
        <header><h2 id="featured-projects">featured</h2><span /></header>
        <div className="project-terminal-grid">
          {visible.map((project, index) => (
            <button className="project-terminal-card" type="button" key={project.slug} onClick={() => setActive(project)}>
              <span className="project-terminal-card__media">
                <Image src={project.src} alt="" fill loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 720px) 100vw, 420px" />
                <i aria-hidden="true" />
              </span>
              <span className="project-terminal-card__copy">
                <strong>{project.title}</strong>
                {project.hasPin && <em>featured</em>}
                <small>{project.description}</small>
                <b>{techLabel(project)}</b>
                <span aria-hidden="true">...</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {active && (
        <div className="terminal-modal-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && setActive(null)}>
          <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
            <button className="terminal-modal-close" type="button" onClick={() => setActive(null)} aria-label="Close project details">×</button>
            <div className="project-dialog__image"><Image src={active.src} alt={`${active.title} project preview`} fill sizes="640px" /></div>
            <div className="project-dialog__body">
              <div className="project-dialog__title"><h2 id="project-dialog-title">{active.title}</h2><span>{active.hasPin ? "featured" : "project"}</span></div>
              <p>{active.description}</p>
              <ul>{projectPoints(active).map((point) => <li key={point}>▸ {point}</li>)}</ul>
              <p className="project-dialog__stack">{techLabel(active)}</p>
              <div className="project-dialog__links">
                <a href={active.github} target="_blank" rel="noreferrer"><SiGithub /> source</a>
                {active.live && <a href={active.live} target="_blank" rel="noreferrer"><ExternalLink /> live</a>}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
