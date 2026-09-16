"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FaAws } from "react-icons/fa";
import {
  SiCrewai,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiHuggingface,
  SiKubernetes,
  SiLangchain,
  SiLanggraph,
  SiLinux,
  SiMongodb,
  SiNeo4J,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Pause, Play } from "lucide-react";

const skills = [
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "LangChain", icon: SiLangchain, color: "#1c8b7b" },
  { name: "LangGraph", icon: SiLanggraph, color: "#ef4b25" },
  { name: "CrewAI", icon: SiCrewai, color: "#ff5a36" },
  { name: "OpenAI", icon: SiOpenai, color: "#10a37f" },
  { name: "Hugging Face", icon: SiHuggingface, color: "#ffbd15" },
  { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "React", icon: SiReact, color: "#149eca" },
  { name: "Next.js", icon: SiNextdotjs, color: "#888888" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "Redis", icon: SiRedis, color: "#dc382d" },
  { name: "Neo4j", icon: SiNeo4J, color: "#4581c3" },
  { name: "Prisma", icon: SiPrisma, color: "#64748b" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5" },
  { name: "AWS", icon: FaAws, color: "#ff9900" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285f4" },
  { name: "Vercel", icon: SiVercel, color: "#888888" },
  { name: "GitHub", icon: SiGithub, color: "#888888" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
  { name: "Linux", icon: SiLinux, color: "#f6c915" },
  { name: "Git", icon: SiGit, color: "#f05032" },
];

const lanes = [skills.filter((_, index) => index % 2 === 0), skills.filter((_, index) => index % 2 === 1)];

function SkillList({ items, duplicate = false }: { items: typeof skills; duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li
            key={`${duplicate ? "copy-" : ""}${item.name}`}
            style={{ "--logo-color": item.color } as CSSProperties}
            title={item.name}
          >
            <span className="tech-stack__logo" aria-hidden="true"><Icon size={22} /></span>
            <span>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function TechStack() {
  const tracks = useRef<Array<HTMLDivElement | null>>([]);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const offsets = [0, 0];
    let frame = 0;
    let previous = performance.now();
    let initialized = false;

    const move = (now: number) => {
      const elapsed = Math.min(64, now - previous) / 1000;
      previous = now;

      tracks.current.forEach((track, index) => {
        if (!track) return;
        const loopWidth = track.scrollWidth / 2;
        if (!loopWidth) return;

        if (!initialized && index === 1) offsets[index] = -loopWidth;
        if (!pausedRef.current) offsets[index] += (index === 0 ? -28 : 24) * elapsed;

        if (offsets[index] <= -loopWidth) offsets[index] += loopWidth;
        if (offsets[index] >= 0 && index === 1) offsets[index] -= loopWidth;
        track.style.transform = `translate3d(${offsets[index]}px, 0, 0)`;
      });

      initialized = true;
      frame = requestAnimationFrame(move);
    };

    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleMotion() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  }

  return (
    <div className="tech-stack" aria-label="Technology stack">
      <button className="tech-stack__motion" type="button" onClick={toggleMotion} aria-pressed={paused}>
        {paused ? <Play size={11} aria-hidden="true" /> : <Pause size={11} aria-hidden="true" />}
        {paused ? "Play logos" : "Pause logos"}
      </button>
      {lanes.map((lane, index) => (
        <div className={`tech-stack__lane tech-stack__lane--${index + 1}`} key={index}>
          <div className="tech-stack__track" ref={(node) => { tracks.current[index] = node; }}>
            <SkillList items={lane} />
            <SkillList items={lane} duplicate />
          </div>
        </div>
      ))}
      <p className="tech-stack__note folio-pad">Real tools · production systems · open infrastructure</p>
    </div>
  );
}
