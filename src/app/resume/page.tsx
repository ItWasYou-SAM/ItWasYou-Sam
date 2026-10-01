import type { Metadata } from "next";
import { Download, ExternalLink, FileText } from "lucide-react";
import { DetailPage } from "@/components/DetailPage";

const resumePath = "/Shivam-Singh-Resume.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Shivam Singh, AI engineer and autonomous-systems builder.",
};

export default function ResumePage() {
  return (
    <DetailPage
      eyebrow="Resume / current"
      title="experience, systems, and outcomes"
      description="The concise version of my work across AI infrastructure, agents, developer tooling, and open source."
    >
      <section className="resume-terminal" aria-labelledby="resume-file-name">
        <div className="resume-terminal__toolbar">
          <div className="resume-terminal__file">
            <FileText aria-hidden="true" />
            <span><strong id="resume-file-name">Shivam-Singh-Resume.pdf</strong><small>application/pdf</small></span>
          </div>
          <div className="resume-terminal__actions">
            <a href={resumePath} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> open</a>
            <a href={resumePath} download="Shivam-Singh-Resume.pdf"><Download aria-hidden="true" /> download</a>
          </div>
        </div>
        <div className="resume-terminal__preview">
          <object data={resumePath} type="application/pdf" aria-label="Embedded PDF preview of Shivam Singh's resume">
            <p>PDF preview is unavailable. <a href={resumePath} target="_blank" rel="noopener noreferrer">Open the resume</a>.</p>
          </object>
        </div>
      </section>
    </DetailPage>
  );
}
