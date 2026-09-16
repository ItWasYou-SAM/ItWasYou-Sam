import { NextResponse } from "next/server";

type PublicContribution = { date: string; count: number };

async function publicContributionFallback() {
  const response = await fetch(
    "https://github-contributions-api.jogruber.de/v4/shivamsingh-007?y=last",
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) throw new Error("Contribution fallback unavailable");

  const payload = (await response.json()) as { contributions?: PublicContribution[] };
  const contributions = (payload.contributions ?? []).sort((a, b) => a.date.localeCompare(b.date));
  const contributionMap = new Map(contributions.map((day) => [day.date, day.count]));
  const firstDate = contributions.at(0)?.date;
  const lastDate = contributions.at(-1)?.date;
  const weeks: Array<{ contributionDays: Array<{ contributionCount: number; date: string }> }> = [];

  if (firstDate && lastDate) {
    const start = new Date(`${firstDate}T00:00:00Z`);
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());
    const end = new Date(`${lastDate}T00:00:00Z`);
    end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));

    for (let cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 7)) {
      const contributionDays = Array.from({ length: 7 }, (_, dayIndex) => {
        const date = new Date(cursor);
        date.setUTCDate(cursor.getUTCDate() + dayIndex);
        const key = date.toISOString().slice(0, 10);
        return { contributionCount: contributionMap.get(key) ?? 0, date: key };
      });
      weeks.push({ contributionDays });
    }
  }

  return {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: contributions.reduce((sum, day) => sum + day.count, 0),
            weeks,
          },
        },
      },
    },
  };
}

async function publicPullRequestFallback(query: string) {
  const match = query.match(/search\(query:\s*"([^"]+)"/);
  const search = match?.[1] ?? "author:shivamsingh-007 type:pr is:merged";
  const response = await fetch(
    `https://api.github.com/search/issues?q=${encodeURIComponent(search)}&per_page=100`,
    {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "shivam-portfolio" },
      next: { revalidate: 900 },
    },
  );
  if (!response.ok) throw new Error("GitHub public search unavailable");

  const payload = (await response.json()) as {
    items?: Array<{
      id: number;
      title: string;
      html_url: string;
      repository_url: string;
      state: string;
      created_at: string;
      closed_at?: string;
      pull_request?: { merged_at?: string };
    }>;
  };

  return {
    data: {
      search: {
        edges: (payload.items ?? []).map((item) => ({
          node: {
            id: item.id,
            title: item.title,
            url: item.html_url,
            repository: { nameWithOwner: item.repository_url.split("/repos/")[1] ?? "GitHub" },
            state: item.pull_request?.merged_at ? "MERGED" : item.state.toUpperCase(),
            createdAt: item.created_at,
            mergedAt: item.pull_request?.merged_at,
            closedAt: item.closed_at,
          },
        })),
      },
    },
  };
}

export async function POST(request: Request) {
  try {
    const { query } = (await request.json()) as { query?: string };
    if (!query) return NextResponse.json({ error: "Missing GraphQL query" }, { status: 400 });

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      const data = query.includes("contributionsCollection")
        ? await publicContributionFallback()
        : await publicPullRequestFallback(query);
      return NextResponse.json(data);
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error("GitHub API proxy error", error);
    return NextResponse.json({ error: "Failed to fetch GitHub activity" }, { status: 502 });
  }
}
