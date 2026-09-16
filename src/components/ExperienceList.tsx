"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type ExperienceData = {
  title: string;
  role: string;
  dates: string;
  location: string;
  src: string;
  type?: string;
  imageFit?: "contain" | "cover";
  imageZoom?: number;
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  screenshot?: string;
};

export const experiences: ExperienceData[] = [
  {
    title: "Open Source Contributor",
    role: "Cross-ecosystem maintainer · velero, ray-project, kubeflow, kubernetes-sigs, Cloud-CV, modelcontextprotocol",
    dates: "2025 - Present",
    location: "GitHub",
    src: "/project-cover/osscontributoragent.png",
    imageFit: "cover",
    imageZoom: 1,
    description: `
      Merged pull requests across major open-source projects including velero-io, ray-project, Kubeflow, kubernetes-sigs/headlamp, Cloud-CV/EvalAI, the MCP Python SDK, ZenML, and RISC-V infrastructure
      Shipped reliability fixes such as routing orphaned backup deletion through DeleteBackupRequest in velero and hiding GPU/GRAM columns when absent in the Ray dashboard
      Fixed hard bugs others skipped: MCP respond()/cancel() concurrent-cancellation race, Headlamp events table crash on missing source, and LogReg edge cases in EvalAI
      Improving DX and docs across ZenML GitBook rendering, JSON-Schema test-suite spec links, and Python SDK guards
    `,
    tech: ["TypeScript", "Python", "Go", "Rust", "Kubernetes", "Docker", "Git"],
  },
  {
    title: "SCOUT",
    role: "Self-Evolving Memory Agent",
    dates: "2025 - Present",
    location: "GitHub",
    src: "/exp-cover/pp.jpg",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Built an AI agent with autonomous memory management that learns, recalls, and evolves its knowledge base over time without human intervention
      Designed a persistent memory layer using LangChain and ChromaDB that stores, retrieves, and compacts long-horizon context across sessions
      Wired retrieval-augmented generation (RAG) so the agent grounds answers in its own evolving memory rather than static context
      Exposed a FastAPI service for memory ingestion, retrieval, and diagnostics with live agent feedback loops
    `,
    tech: ["Python", "LangChain", "ChromaDB", "RAG", "GPT-4", "FastAPI"],
  },
  {
    title: "NEXUS",
    role: "Multi-Agent Orchestration Framework",
    dates: "2025 - Present",
    location: "GitHub",
    src: "/exp-cover/dl13.jpg",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Built a framework for coordinating multiple AI agents to solve complex tasks through collaborative planning and execution
      Implemented role-specialized agents that plan, delegate, and verify subtasks using AutoGen and CrewAI
      Added an event-driven runtime with Redis pub/sub and WebSockets for real-time inter-agent communication
      Enabled conversational handoffs so a coding assistant can spawn, monitor, and merge parallel agent work
    `,
    tech: ["Python", "AutoGen", "CrewAI", "Redis", "WebSockets"],
  },
  {
    title: "VERITAS",
    role: "Truth Verification Engine",
    dates: "2025 - Present",
    location: "GitHub",
    src: "/exp-cover/dl14.jpg",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Built an AI-powered fact-checking system that cross-references multiple sources to verify claims in real-time
      Plumbed a RAG pipeline over GPT-4 and BERT embeddings to retrieve supporting or contradicting evidence for a claim
      Modeled entity and source relationships in Neo4j to surface provenance and confidence paths
      Delivered verdicts with source citations through a FastAPI endpoint
    `,
    tech: ["Python", "GPT-4", "BERT", "RAG", "FastAPI", "Neo4j"],
  },
  {
    title: "JARVIS",
    role: "Local AI Assistant",
    dates: "2025 - Present",
    location: "GitHub",
    src: "/exp-cover/robin.jpg",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Built a fully local AI assistant integrating LLMs, voice interaction, and automation tools for privacy-first task execution
      Wired Whisper for voice transcription and local model inference so queries never leave the machine
      Automated system and workflow tasks through a FastAPI service with tool-calling
    `,
    tech: ["Python", "LLMs", "Whisper", "FastAPI", "Local Inference"],
  },
];

export function ExperienceList() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="block">
      {experiences.map((item, idx) => {
        const isOpen = openIdx === idx;
        const isLast = idx === experiences.length - 1;

        return (
          <div key={idx} className="group relative">
            {/* Dashed bottom border for all items except the last one */}
            {!isLast && (
              <div
                className="absolute bottom-0 left-[-16px] right-[-16px] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none z-10"
                style={{
                  maskImage:
                    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  WebkitMaskImage:
                    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                }}
              />
            )}

            {/* Special full-width dashed line and intersection dots for the last item */}
            {isLast && (
              <>
                <div
                  className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none z-10"
                  style={{
                    maskImage:
                      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                    WebkitMaskImage:
                      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  }}
                />
                <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
                <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              </>
            )}

            <div
              className="flex flex-col items-start gap-2.5 py-3.5 px-4 -mx-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer relative z-20 rounded-lg sm:gap-3 sm:py-4 2xl:flex-row 2xl:items-center 2xl:justify-between"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="size-10 shrink-0 rounded-[10px] border border-black/10 bg-zinc-50 p-[2px] shadow-sm shadow-black/15 dark:border-zinc-800 dark:bg-[#111111] dark:shadow-md dark:shadow-black/50">
                  <div className="w-full h-full rounded-[7px] border border-black/5 dark:border-black/20 bg-white flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={40}
                      height={40}
                      sizes="40px"
                      quality={60}
                      style={item.imageZoom ? { transform: `scale(${item.imageZoom})` } : undefined}
                      className={`${item.imageFit === "contain" ? "object-contain" : "object-cover"} w-full h-full p-0.5`}
                    />
                    {item.title === "Open Source Contributor" && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/45">
                        <FaGithub className="size-5 text-white" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 min-w-0 pr-2 sm:pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14px] font-bold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-[17px]">
                      {item.title === "Vercel OSS Program x VengenceUI" ? (
                        <>
                          <span className="sm:hidden">Vercel OSS Program x VengenceUI</span>
                          <span className="hidden flex-wrap items-center gap-x-2 gap-y-1 align-middle sm:inline-flex">
                            <span className="inline-flex h-10 items-center">
                              Vercel OSS Program
                            </span>
                            <span className="inline-flex h-10 items-center text-[13px] font-semibold leading-none text-zinc-500 dark:text-zinc-500">
                              x
                            </span>
                            <span className="inline-flex h-10 items-center gap-2 leading-none">
                              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-black/10 bg-zinc-50 p-[2px] shadow-sm shadow-black/15 dark:border-zinc-800 dark:bg-[#111111] dark:shadow-md dark:shadow-black/50">
                                <span className="inline-flex size-full items-center justify-center overflow-hidden rounded-[7px] border border-black/5 bg-white dark:border-black/20">
                                  <Image
                                    src="/Experience-image/vengenceui-title-bg-less.png"
                                    alt=""
                                    width={113}
                                    height={96}
                                    sizes="40px"
                                    quality={60}
                                    aria-hidden="true"
                                    className="h-[18px] w-auto -translate-x-px translate-y-px rotate-180 object-contain"
                                  />
                                </span>
                              </span>
                              <span className="inline-flex h-10 items-center">
                                VengenceUI
                              </span>
                            </span>
                          </span>
                        </>
                      ) : (
                        item.title
                      )}
                    </span>
                    {item.type && (
                      <span className="self-center px-1.5 py-[1px] rounded-[4px] text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50 whitespace-nowrap">
                        {item.type}
                      </span>
                    )}
                  </div>
                  <span
                    className={`${item.title === "Vercel OSS Program x VengenceUI" ? "sm:-mt-2" : ""} text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 truncate`}
                  >
                    {item.role}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start gap-0.5 text-left pr-5 pl-[52px] shrink-0 sm:pl-[56px] 2xl:mt-0 2xl:items-end 2xl:pl-0 2xl:text-right">
                <div className="flex items-center text-[13px] sm:text-[14px] font-medium text-zinc-900 dark:text-zinc-100 relative">
                  <span>{item.dates}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-3.5 h-3.5 text-zinc-500 absolute -right-5 top-1/2 -translate-y-1/2 -mt-[1.5px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <span className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400">
                  {item.location}
                </span>
              </div>
            </div>

            {/* Expandable Details Section */}
            <div
              className={`-mx-4 grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`${isOpen ? "pb-4 pt-0 opacity-100 translate-y-0" : "pb-0 pt-0 opacity-0 -translate-y-2"
                    } transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] pl-6 pr-8 text-[14px] text-zinc-600 dark:text-zinc-400`}
                >
                  {item.metrics && (
                    <div className="relative -ml-6 -mr-8 mb-4">
                      <div className="grid max-w-full grid-cols-2 pl-6 pr-8 2xl:grid-cols-4">
                        {item.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="relative min-w-0 px-3 py-2 after:absolute after:bottom-0 after:right-0 after:top-0 after:w-0 after:border-r after:border-black/30 after:[mask-image:repeating-linear-gradient(to_bottom,black_0,black_1px,transparent_1px,transparent_6px)] dark:after:border-white/[0.15] [&:nth-child(2n)]:after:hidden 2xl:[&:not(:last-child)]:after:block 2xl:[&:last-child]:after:hidden"
                          >
                            <p
                              className={`${metric.value.includes(" - ") ? "text-[13px]" : "text-[16px]"} whitespace-nowrap font-bold leading-none text-zinc-900 dark:text-zinc-100`}
                            >
                              {metric.value}
                            </p>
                            <p className="mt-1 text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-600">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-0 border-t border-black/30 dark:border-white/[0.15]"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span
                        className="pointer-events-none absolute inset-x-0 top-1/2 h-0 border-t border-black/30 dark:border-white/[0.15] 2xl:hidden"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-0 border-b border-black/30 dark:border-white/[0.15]"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
                      <span className="pointer-events-none absolute right-0 top-0 h-[2px] w-[2px] translate-x-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
                      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-[2px] -translate-x-1/2 translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
                      <span className="pointer-events-none absolute bottom-0 right-0 h-[2px] w-[2px] translate-x-1/2 translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
                    </div>
                  )}

                  {isOpen && item.screenshot && (
                    <div className="relative mb-4 overflow-hidden bg-black">
                      <Image
                        src={item.screenshot}
                        alt={`${item.title} analytics screenshot`}
                        width={1400}
                        height={1050}
                        sizes="(min-width: 768px) 40vw, calc(100vw - 3rem)"
                        quality={70}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}

                  <ul className="mb-4 space-y-2 text-[13px] leading-relaxed">
                    {item.description
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((point, i) => {
                        const [label, ...detail] = point.trim().split(":");

                        return (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check
                              aria-hidden="true"
                              className="mt-[2px] size-3.5 shrink-0 text-emerald-500"
                              strokeWidth={2.5}
                            />
                            <span>
                              {detail.length > 0 ? (
                                <>
                                  <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
                                    {label}:
                                  </strong>
                                  {detail
                                    .join(":")
                                    .split(
                                      /(kgateway|FOSSology|FOSSASIA Eventyay|Extralit|React JSON Schema Form)/,
                                    )
                                    .map((part, partIndex) =>
                                      /^(kgateway|FOSSology|FOSSASIA Eventyay|Extralit|React JSON Schema Form)$/.test(
                                        part,
                                      ) ? (
                                        <strong
                                          key={partIndex}
                                          className="font-semibold text-zinc-800 dark:text-zinc-200"
                                        >
                                          {part}
                                        </strong>
                                      ) : (
                                        part
                                      ),
                                    )}
                                </>
                              ) : (
                                point.trim()
                              )}
                            </span>
                          </li>
                        );
                      })}
                  </ul>

                  {item.tech && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-[4px] border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-[#111111] text-[11px] font-medium text-zinc-500 dark:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
