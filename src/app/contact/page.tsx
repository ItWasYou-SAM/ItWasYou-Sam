import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";
import { HireTerminal } from "@/components/HireTerminal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Shivam Singh about AI systems, developer tooling, or open-source work.",
};

export default function ContactPage() {
  return (
    <DetailPage
      eyebrow="Contact / new message"
      title="let's build something useful"
      description="Send a short brief about the problem, the team, and the outcome you want. Your email client opens only after the form is valid."
    >
      <section className="contact-terminal-panel" aria-labelledby="contact-command">
        <p className="command-title" id="contact-command"><span>$</span> compose --to shivam</p>
        <HireTerminal />
        <p className="contact-terminal-panel__note">No message is stored on this website. Submission hands the draft to your local email client.</p>
      </section>
    </DetailPage>
  );
}
