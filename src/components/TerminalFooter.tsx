"use client";

import { useEffect, useState } from "react";

function indiaTime() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}

export function TerminalFooter() {
  const [time, setTime] = useState(indiaTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(indiaTime()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="terminal-footer terminal-shell">
      <span suppressHydrationWarning>{time} IST</span>
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">top ↑</button>
    </footer>
  );
}
