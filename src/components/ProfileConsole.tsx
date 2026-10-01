"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType, type CSSProperties } from "react";
import { BookOpen, Mail, Radio } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiFastapi, SiGit, SiGithub, SiLangchain, SiLanggraph, SiLinux, SiNextdotjs, SiPython, SiReact, SiRedis, SiTypescript, SiX } from "react-icons/si";
import { ParticlePortrait } from "@/components/ParticlePortrait";

type Overlay = "summary" | "coding" | null;
type Tag = { label: string; Icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }> };

const tags: Tag[] = [
  { label: "python", Icon: SiPython }, { label: "langchain", Icon: SiLangchain },
  { label: "langgraph", Icon: SiLanggraph }, { label: "typescript", Icon: SiTypescript },
  { label: "react", Icon: SiReact }, { label: "next.js", Icon: SiNextdotjs },
  { label: "fastapi", Icon: SiFastapi }, { label: "redis", Icon: SiRedis },
  { label: "git", Icon: SiGit }, { label: "linux", Icon: SiLinux },
];

export function ProfileConsole() {
  const [overlay, setOverlay] = useState<Overlay>(null);

  useEffect(() => {
    if (!overlay) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOverlay(null);
    document.addEventListener("keydown", close);
    document.body.classList.add("has-terminal-modal");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("has-terminal-modal");
    };
  }, [overlay]);

  return (
    <>
      <section className="profile-console" aria-labelledby="profile-name">
        <div className="profile-console__visual">
          <div className="terminal-portrait"><ParticlePortrait /></div>
          <div className="profile-console__controls">
            <button type="button" title="Recruiter summary" onClick={() => setOverlay("summary")}>tl;dr</button>
            <button type="button" onClick={() => setOverlay("coding")}>coding</button>
          </div>
        </div>

        <div className="profile-console__copy">
          <span className="availability-stamp" title="Available for full-time and contract work">OPEN TO WORK</span>
          <p className="command-label">~ whoami</p>
          <h1 id="profile-name" aria-label="shivam singh">{"shivam singh".split("").map((letter, index) => <span style={{ "--letter": index } as CSSProperties} aria-hidden="true" key={`${letter}-${index}`}>{letter === " " ? "\u00a0" : letter}</span>)}</h1>
          <p className="profile-console__lead">I&apos;m an AI engineer building autonomous systems, agent infrastructure, and developer tools that stay observable.</p>
          <p className="currently-building"><span>▸ building</span> <Link href="/projects/scout">SCOUT</Link> — memory that learns when to remember</p>

          <ul className="tech-tags" aria-label="Primary technologies">
            {tags.map(({ label, Icon }, index) => (
              <li key={label} className={`tone-${(index % 4) + 1}`}><Icon size={12} aria-hidden />{label}</li>
            ))}
          </ul>

          <div className="social-row" aria-label="Social links">
            <a href="https://github.com/shivamsingh-007" target="_blank" rel="noreferrer" aria-label="GitHub"><SiGithub /></a>
            <a href="https://www.linkedin.com/in/shivam-007-singh/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="mailto:shivam.singh.koyad2006@gmail.com" aria-label="Email"><Mail /></a>
            <a href="https://x.com/Shivam_2006_ss" target="_blank" rel="noreferrer" aria-label="X / Twitter"><SiX /></a>
          </div>

          <div className="profile-actions">
            <a href="/Shivam-Singh-Resume.pdf" target="_blank" rel="noreferrer"><BookOpen /> resume</a>
            <a href="#hire"><Radio /> start a conversation</a>
          </div>
        </div>
      </section>

      {overlay && (
        <div className="terminal-modal-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && setOverlay(null)}>
          <section className="terminal-mini-modal" role="dialog" aria-modal="true" aria-labelledby="profile-overlay-title">
            <button className="terminal-modal-close" type="button" onClick={() => setOverlay(null)} aria-label="Close dialog">×</button>
            {overlay === "summary" ? (
              <>
                <p className="command-label">$ cat recruiter-summary.md</p>
                <h2 id="profile-overlay-title">the short version</h2>
                <p>AI systems engineer focused on agent memory, orchestration, evaluation, and safe tool execution.</p>
                <dl className="terminal-stats">
                  <div><dt>focus</dt><dd>autonomous systems</dd></div>
                  <div><dt>proof</dt><dd>projects + OSS</dd></div>
                  <div><dt>base</dt><dd>India / remote</dd></div>
                </dl>
              </>
            ) : (
              <>
                <p className="command-label">$ status --coding</p>
                <h2 id="profile-overlay-title">currently in the loop</h2>
                <dl className="terminal-stats terminal-stats--grid">
                  <div><dt>building</dt><dd>agent runtimes</dd></div>
                  <div><dt>testing</dt><dd>memory quality</dd></div>
                  <div><dt>learning</dt><dd>distributed systems</dd></div>
                  <div><dt>mode</dt><dd className="status-live">● available</dd></div>
                </dl>
                <p className="modal-footnote">↻ based on my current engineering focus</p>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
