export type BlogCategory = "engineering" | "notes";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  readTime: string;
  sections: Array<{ heading?: string; paragraphs: string[] }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-memory-that-knows-when-to-forget",
    title: "Building memory that knows when to forget",
    description: "A practical model for keeping agent context useful without letting recall become noise.",
    date: "2026-09-18",
    category: "engineering",
    readTime: "6 min",
    sections: [
      {
        paragraphs: [
          "Agent memory is usually described as a storage problem. In production it behaves more like a prioritisation problem: every remembered item competes for attention, tokens, latency, and trust.",
          "The useful question is not whether an agent can retrieve a fact. It is whether that fact still deserves to influence the next decision.",
        ],
      },
      {
        heading: "memory needs a lifecycle",
        paragraphs: [
          "I split memory into capture, consolidation, retrieval, and retirement. Capture stays permissive. Consolidation attaches provenance and merges repetition. Retrieval is constrained by the active task. Retirement lowers the influence of stale evidence instead of deleting it immediately.",
          "That lifecycle makes failure visible. If recall is poor, you can identify whether the information was never captured, consolidated incorrectly, ranked badly, or allowed to outlive its usefulness.",
        ],
      },
      {
        heading: "measure the wrong memories too",
        paragraphs: [
          "Recall metrics alone reward systems that return more context. I also track distraction: how often retrieved items are ignored, contradicted, or cause a tool choice to change without improving the result.",
          "A good memory system is not the one that remembers everything. It is the one that makes the next correct action easier to justify.",
        ],
      },
    ],
  },
  {
    slug: "what-open-source-taught-me-about-small-patches",
    title: "What open source taught me about small patches",
    description: "Why a narrow, well-proved change often carries more engineering value than a broad rewrite.",
    date: "2026-08-27",
    category: "notes",
    readTime: "4 min",
    sections: [
      {
        paragraphs: [
          "Working in an unfamiliar repository changes how you define progress. A large idea may be exciting, but a maintainer needs a change that can be understood, tested, and safely owned after you leave.",
          "The most effective patches I have worked on started with an exact failure, not an abstract improvement.",
        ],
      },
      {
        heading: "reduce before you repair",
        paragraphs: [
          "Reproduction is design work. A small fixture or focused test removes assumptions and gives reviewers a shared object to reason about. Once the failure is precise, the implementation usually becomes smaller as well.",
          "This is especially important around CI, infrastructure, and distributed tools where a symptom can be several layers away from its cause.",
        ],
      },
      {
        heading: "review is part of the implementation",
        paragraphs: [
          "A patch is not finished when it passes locally. It is finished when another engineer can see the mechanism, understand the boundaries, and change it later without rediscovering the entire problem.",
        ],
      },
    ],
  },
  {
    slug: "from-agent-demo-to-agent-runtime",
    title: "From agent demo to agent runtime",
    description: "The boundaries that turn a clever loop into software you can operate and debug.",
    date: "2026-07-11",
    category: "engineering",
    readTime: "7 min",
    sections: [
      {
        paragraphs: [
          "An agent demo can hide state in a prompt and treat every tool call as success. A runtime cannot. It must know what happened, what is allowed to happen next, and how to recover when a dependency or model behaves unexpectedly.",
        ],
      },
      {
        heading: "make state explicit",
        paragraphs: [
          "I prefer workflows where plans, tool results, retries, approvals, and terminal outcomes are first-class records. This gives long-running tasks a stable shape and lets operators inspect progress without parsing a transcript.",
          "Explicit state also makes replay possible. You can reproduce a decision from the same inputs instead of hoping a free-form conversation follows the same path twice.",
        ],
      },
      {
        heading: "design the stop conditions",
        paragraphs: [
          "Retries, budgets, cancellation, and human checkpoints should be designed before adding more tools. Autonomy is not the absence of limits; it is useful work performed inside limits that remain visible.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
