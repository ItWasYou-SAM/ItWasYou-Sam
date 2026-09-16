"use client";

import { useEffect, useState } from "react";

const sections = [
  ["profile", "Profile"],
  ["experience", "Experience"],
  ["work", "Projects"],
  ["github", "GitHub activity"],
  ["skills", "Technical skills"],
  ["contact", "Contact"],
] as const;

export function SectionRail() {
  const [active, setActive] = useState("profile");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const activeIndex = sections.findIndex(([id]) => id === active);

  return (
    <aside className="section-rail" aria-label="Page sections">
      <div className="section-rail__title">On this page</div>
      <div className="section-rail__track" aria-hidden="true">
        <span style={{ height: `${((activeIndex + 1) / sections.length) * 100}%` }} />
      </div>
      <nav>
        {sections.map(([id, label], index) => (
          <a className={active === id ? "is-active" : ""} href={`#${id}`} key={id}>
            <span>{String(index + 1).padStart(2, "0")}</span>{label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
