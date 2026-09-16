import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const directory = [
  ["/about", "Profile"],
  ["/experience", "Experience"],
  ["/projects", "Projects"],
  ["/github", "GitHub"],
  ["/skills", "Skills"],
] as const;

export function DetailPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main id="main-content" className="detail-page">
      <header className="detail-hero folio-pad">
        <Link className="detail-hero__back" href="/"><ArrowLeft /> Portfolio index</Link>
        <p className="folio-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="detail-hero__dek">{description}</p>
      </header>

      <div className="detail-content folio-pad">{children}</div>

      <nav className="detail-directory folio-pad" aria-label="Portfolio section directory">
        <span>Continue exploring</span>
        <div>
          {directory.map(([href, label]) => (
            <Link href={href} key={href}>{label}<ArrowUpRight /></Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
