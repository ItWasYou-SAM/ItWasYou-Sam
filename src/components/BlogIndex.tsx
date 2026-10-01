"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { blogPosts, type BlogCategory } from "@/data/blogData";

type BlogFilter = "all" | BlogCategory;

export function BlogIndex() {
  const [filter, setFilter] = useState<BlogFilter>("all");
  const visible = useMemo(() => blogPosts.filter((post) => filter === "all" || post.category === filter), [filter]);

  return (
    <>
      <div className="route-toolbar">
        <div className="terminal-tabs" role="group" aria-label="Filter articles">
          {(["all", "engineering", "notes"] as BlogFilter[]).map((item, index) => (
            <span key={item}><button type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>{index < 2 && <i>/</i>}</span>
          ))}
        </div>
        <span className="route-toolbar__meta">{visible.length} entries</span>
      </div>
      <ul className="blog-terminal-list">
        {visible.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.title}</span>
              <small>{post.category} · {post.readTime}</small>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
