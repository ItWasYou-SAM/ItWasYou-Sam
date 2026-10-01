"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface TooltipState {
  count: number;
  date: string;
  x: number;
  y: number;
}

const USERNAME = "shivamsingh-007";
const CACHE_KEY = "github_contributions_v2";

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function createEmptyCalendar() {
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const start = new Date(end);
  start.setDate(end.getDate() - 52 * 7 - 6);

  return Array.from({ length: 53 }, (_, weekIndex) => ({
    contributionDays: Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(start);
      date.setDate(start.getDate() + weekIndex * 7 + dayIndex);
      return { contributionCount: 0, date: dateKey(date) };
    }),
  }));
}

function getLevel(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function GithubGraph() {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const emptyWeeks = useMemo(() => createEmptyCalendar(), []);

  useEffect(() => {
    async function fetchContributions() {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as {
            weeks: ContributionWeek[];
            totalContributions: number;
          };
          setWeeks(parsed.weeks);
          setTotalContributions(parsed.totalContributions);
          setLoading(false);
        } catch {
          localStorage.removeItem(CACHE_KEY);
        }
      }

      try {
        const response = await fetch("/api/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind: "contributions" }),
        });
        if (!response.ok) throw new Error(`GitHub activity returned ${response.status}`);

        const data = await response.json();
        const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar?.weeks?.length) {
          const nextWeeks = (calendar.weeks as ContributionWeek[]).slice(-53);
          setWeeks(nextWeeks);
          setTotalContributions(calendar.totalContributions);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ weeks: nextWeeks, totalContributions: calendar.totalContributions }),
          );
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  useEffect(() => {
    if (!weeks.length || !viewportRef.current) return;
    const viewport = viewportRef.current;
    viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
  }, [weeks]);

  const graphWeeks = weeks.length ? weeks : emptyWeeks;
  const graphStatus = loading && !weeks.length
    ? "Loading GitHub contribution activity"
    : `${totalContributions.toLocaleString()} contributions in the last year`;

  const monthMarkers = useMemo(() => {
    const markers = graphWeeks.reduce<Array<{ index: number; label: string; month: number }>>((result, week, index) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay) return result;
      const month = new Date(`${firstDay.date}T00:00:00`).getMonth();
      if (result.at(-1)?.month === month) return result;
      return [...result, {
        index,
        month,
        label: new Intl.DateTimeFormat("en", { month: "short" }).format(
          new Date(`${firstDay.date}T00:00:00`),
        ),
      }];
    }, []);

    const first = markers[0];
    const last = markers.at(-1);
    const next = markers[1];
    const leadingMonthIsPartial = first?.index === 0 && next && next.index < 4;
    const leadingMonthIsRepeated = first && last && first.month === last.month;
    return leadingMonthIsPartial || leadingMonthIsRepeated ? markers.slice(1) : markers;
  }, [graphWeeks]);

  function showTooltip(day: ContributionDay, target: HTMLButtonElement) {
    const rect = target.getBoundingClientRect();
    setTooltip({
      count: day.contributionCount,
      date: formatDate(day.date),
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }

  return (
    <section className="github-calendar" aria-labelledby="github-activity-title">
      <h2 className="sr-only" id="github-activity-title">GitHub activity</h2>

      <p className="sr-only">
        Daily GitHub contributions for {USERNAME}. The visual grid is arranged by week from Sunday through Saturday.
      </p>

      <div ref={viewportRef} className="github-calendar__viewport" tabIndex={0} aria-label="Scrollable GitHub contribution calendar">
        <div className="github-calendar__canvas">
          <div className="github-calendar__months" aria-hidden="true">
            {monthMarkers.map((month) => (
              <span key={`${month.label}-${month.index}`} style={{ gridColumn: `${month.index + 1} / span 4` }}>
                {month.label}
              </span>
            ))}
          </div>

          <div className="github-calendar__plot">
            <div className="github-calendar__days" aria-hidden="true">
              <span>Mon</span><span>Wed</span><span>Fri</span>
            </div>
            <div className="github-calendar__weeks" role="img" aria-label={graphStatus}>
              {graphWeeks.map((week, weekIndex) => (
                <div className="github-calendar__week" key={weekIndex}>
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const day = week.contributionDays[dayIndex];
                    if (!day) return <span className="github-calendar__cell is-empty" key={dayIndex} />;
                    return (
                      <button
                        type="button"
                        className={`github-calendar__cell level-${getLevel(day.contributionCount)}${loading && !weeks.length ? " is-loading" : ""}`}
                        key={day.date}
                        aria-label={`${day.contributionCount} contributions on ${formatDate(day.date)}`}
                        onMouseEnter={(event) => showTooltip(day, event.currentTarget)}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={(event) => showTooltip(day, event.currentTarget)}
                        onBlur={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="github-calendar__footer">
        <p className="github-calendar__total" aria-live="polite">{graphStatus}</p>
        <div className="github-calendar__legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => <i className={`level-${level}`} key={level} />)}
          <span>More</span>
        </div>
      </div>

      {tooltip && (
        <div className="github-calendar__tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <strong>{tooltip.count} contribution{tooltip.count === 1 ? "" : "s"}</strong>
          <span>{tooltip.date}</span>
        </div>
      )}
    </section>
  );
}
