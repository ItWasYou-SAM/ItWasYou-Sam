import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/SiteHeader";
import { PandaMascot } from "@/components/PandaMascot";
import { InteractionFeedback } from "@/components/InteractionFeedback";

export const metadata: Metadata = {
  title: {
    default: "Shivam Singh — AI Engineer",
    template: "%s — Shivam Singh",
  },
  description:
    "AI engineer and open-source contributor building autonomous systems, agent infrastructure, and thoughtful developer tools.",
  metadataBase: new URL("https://shivamsingh.dev"),
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <div className="site-stage">
            <div className="app-frame">
              <SiteHeader />
              {children}
            </div>
          </div>
          <PandaMascot />
          <InteractionFeedback />
        </ThemeProvider>
      </body>
    </html>
  );
}
