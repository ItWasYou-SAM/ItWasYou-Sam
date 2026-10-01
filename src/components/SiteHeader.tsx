"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/gears", label: "gears" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="terminal-header">
      <nav className="terminal-shell terminal-nav" aria-label="Primary navigation">
        <Link className="terminal-wordmark" href="/" aria-label="Shivam Singh, home">shivam</Link>
        <div className="terminal-nav__links">
          {navItems.map((item) => (
            <Link className={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "is-active" : undefined} href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
