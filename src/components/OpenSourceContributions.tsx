"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface PullRequest {
  id: number;
  title: string;
  url: string;
  repository: { nameWithOwner: string };
  state: string;
  createdAt: string;
  mergedAt?: string;
  closedAt?: string;
}

type Filter = "merged" | "open" | "closed";
type GithubResponse = { data?: { search?: { edges?: Array<{ node: PullRequest } | null> } }; message?: string };

export function OpenSourceContributions({ isFullPage = false }: { isFullPage?: boolean }) {
  const [items, setItems] = useState<Record<Filter, PullRequest[]>>({ merged: [], open: [], closed: [] });
  const [loaded, setLoaded] = useState<Set<Filter>>(new Set());
  const [filter, setFilter] = useState<Filter>("merged");
  const fetched = useRef(false);

  const load = useCallback(async (kind: Filter) => {
    const cacheKey = `github_prs_${kind}`;
    const cached = window.localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as PullRequest[];
        setItems((current) => ({ ...current, [kind]: parsed }));
      } catch { window.localStorage.removeItem(cacheKey); }
    }

    try {
      const response = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "pullRequests", status: kind }),
      });
      const payload = await response.json() as GithubResponse;
      const next = payload.data?.search?.edges?.flatMap((edge) => edge?.node ? [edge.node] : []) ?? [];
      next.sort((a, b) => new Date(b.mergedAt || b.closedAt || b.createdAt).getTime() - new Date(a.mergedAt || a.closedAt || a.createdAt).getTime());
      if (next.length) {
        setItems((current) => ({ ...current, [kind]: next }));
        window.localStorage.setItem(cacheKey, JSON.stringify(next));
      }
    } catch {
      // Cached data remains usable when GitHub is temporarily unavailable.
    } finally {
      setLoaded((current) => new Set(current).add(kind));
    }
  }, []);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    void Promise.all((["merged", "open", "closed"] as Filter[]).map(load));
  }, [load]);

  const current = items[filter];
  const visible = isFullPage ? current : current.slice(0, 4);

  return (
    <div className="contribution-list">
      <div className="contribution-list__heading">
        <p className="command-title"><span>$</span> cat contributions.md</p>
        <div className="terminal-tabs" role="group" aria-label="Pull request status">
          {(["merged", "open", "closed"] as Filter[]).map((kind, index) => (
            <span key={kind}><button type="button" aria-pressed={filter === kind} onClick={() => setFilter(kind)}>{kind}{loaded.has(kind) ? ` ${items[kind].length}` : ""}</button>{index < 2 && <i>/</i>}</span>
          ))}
        </div>
      </div>

      <div className="contribution-list__rows" aria-live="polite">
        {!loaded.has(filter) && !current.length ? (
          Array.from({ length: 4 }, (_, index) => <div className="contribution-skeleton" key={index} />)
        ) : visible.length ? visible.map((pr) => (
          <a href={pr.url} target="_blank" rel="noreferrer" key={pr.id}>
            <span>›</span><b>⑂</b><strong>{pr.repository.nameWithOwner}</strong><small>{pr.title}</small><em>{pr.state.toLowerCase()}</em>
          </a>
        )) : <p className="empty-terminal-state">No {filter} pull requests returned by GitHub.</p>}
      </div>

      {!isFullPage && current.length > 4 && <Link className="more-terminal-link" href="/pull-requests">⌄ {current.length - 4} more pull requests</Link>}
    </div>
  );
}
