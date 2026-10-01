import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on autonomous agents, memory systems, open source, and engineering practice.",
};

export default function BlogPage() {
  return (
    <main id="main-content" className="terminal-shell route-page blog-route">
      <h1>blog</h1>
      <BlogIndex />
    </main>
  );
}
