import { NextResponse } from "next/server";

type PublicContribution = { date: string; count: number };
type PullRequestStatus = "merged" | "open" | "closed";

const GITHUB_LOGIN = "shivamsingh-007";
const PULL_REQUEST_SEARCH: Record<PullRequestStatus, string> = {
  merged: `author:${GITHUB_LOGIN} type:pr is:merged`,
  open: `author:${GITHUB_LOGIN} type:pr is:open`,
  closed: `author:${GITHUB_LOGIN} type:pr is:closed is:unmerged`,
};

function contributionQuery() {
  return `query PortfolioContributions {
    user(login: "${GITHUB_LOGIN}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`;
}

function pullRequestQuery(status: PullRequestStatus) {
  return `query PortfolioPullRequests {
    search(query: "${PULL_REQUEST_SEARCH[status]}", type: ISSUE, first: 100) {
      edges {
        node {
          ... on PullRequest {
            id
            title
            url
            repository { nameWithOwner }
            state
            createdAt
            mergedAt
            closedAt
          }
        }
      }
    }
  }`;
}

async function publicContributionFallback() {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_LOGIN}?y=last`,
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

async function publicPullRequestFallback(status: PullRequestStatus) {
  const search = PULL_REQUEST_SEARCH[status];
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
    const body = (await request.json()) as { kind?: unknown; status?: unknown };
    const isContributionRequest = body.kind === "contributions";
    const isPullRequest = body.kind === "pullRequests"
      && (body.status === "merged" || body.status === "open" || body.status === "closed");

    if (!isContributionRequest && !isPullRequest) {
      return NextResponse.json({ error: "Unsupported GitHub activity request" }, { status: 400 });
    }

    const status = isPullRequest ? body.status as PullRequestStatus : null;
    const query = isContributionRequest ? contributionQuery() : pullRequestQuery(status!);

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      const data = isContributionRequest
        ? await publicContributionFallback()
        : await publicPullRequestFallback(status!);
      return NextResponse.json(data);
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: isContributionRequest ? 3600 : 900 },
    });

    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error("GitHub API proxy error", error);
    return NextResponse.json({ error: "Failed to fetch GitHub activity" }, { status: 502 });
  }
}
