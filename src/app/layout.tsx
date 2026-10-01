import type { Metadata } from "next";
import "./globals.css";
import "./terminal.css";
import { SiteHeader } from "@/components/SiteHeader";
import { TerminalFooter } from "@/components/TerminalFooter";

export const metadata: Metadata = {
  title: {
    default: "Shivam Singh — AI Engineer",
    template: "%s — Shivam Singh",
  },
  description:
    "AI engineer and open-source contributor building autonomous systems, agent infrastructure, and thoughtful developer tools.",
  metadataBase: new URL("https://shivam-portfolio-lac-three.vercel.app"),
  openGraph: {
    title: "Shivam Singh — AI Engineer",
    description:
      "Selected work and experiments in autonomous AI systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <TerminalFooter />
      </body>
    </html>
  );
}
