import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { CurrentTime } from "@/components/CurrentTime";
import { ExperienceAccordion } from "@/components/ExperienceAccordion";
import { GithubGraph } from "@/components/GithubGraph";
import { OpenSourceContributions } from "@/components/OpenSourceContributions";
import { SectionRail } from "@/components/SectionRail";
import { TechStack } from "@/components/TechStack";
import SocialHoverCard from "@/components/pixel-perfect/social-hover-card";
import { projectsData, techNames } from "@/data/projectsData";

function projectTech(tech: (typeof projectsData)[number]["tech"]) {
  return tech.slice(0, 4).map((item) => typeof item === "string" ? techNames[item] : item.label);
}

export default function Home() {
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <>
      <SectionRail />
      <main id="main-content" className="folio">
        <section className="folio-cover" aria-label="Day and night landscape cover">
          <Image className="folio-cover__image folio-cover__image--light" src="/cover-light.png" alt="A sunlit meadow with a wooden chair beneath a tree" fill priority unoptimized sizes="760px" />
          <Image className="folio-cover__image folio-cover__image--dark" src="/cover-dark.jpg" alt="" fill priority unoptimized sizes="760px" />
          <div className="folio-cover__clock"><CurrentTime /></div>
        </section>

        <section className="folio-profile folio-pad" id="profile" aria-labelledby="profile-name">
          <div className="folio-profile__identity">
            <div className="folio-avatar"><Image src="/avatar.jpg" alt="Portrait of Shivam Singh" width={160} height={160} priority /></div>
            <div>
              <p className="folio-kicker">Hello, I&apos;m</p>
              <h1 id="profile-name">Shivam Singh</h1>
              <p className="folio-role">AI Engineer & Autonomous Systems Architect</p>
            </div>
          </div>

          <div className="folio-intro">
            <p className="folio-lead">I build AI agents that remember, reason, and act—without losing sight of the humans they work for.</p>
            <p>From self-evolving memory to multi-agent orchestration, I turn experimental ideas into observable, reliable systems. I also contribute fixes and infrastructure to open-source projects where the edge cases are real.</p>
          </div>

          <div className="folio-actions">
            <a className="folio-button folio-button--primary" href="mailto:shivam.singh.koyad2006@gmail.com"><Mail /> Get in touch</a>
            <a className="folio-button" href="/Shivam-Singh-Resume.pdf" target="_blank"><Download /> Résumé</a>
            <SocialHoverCard socialName="GitHub"><a className="folio-button" href="https://github.com/shivamsingh-007" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a></SocialHoverCard>
            <SocialHoverCard socialName="Twitter"><a className="folio-button" href="https://x.com/spidershivam" target="_blank" rel="noreferrer">Twitter <ArrowUpRight /></a></SocialHoverCard>
            <SocialHoverCard socialName="LinkedIn"><a className="folio-button" href="https://www.linkedin.com/in/shivam-007-singh" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></SocialHoverCard>
            <Link className="folio-button" href="/about">Detailed profile <ArrowUpRight /></Link>
          </div>
        </section>

        <section className="folio-section" id="experience" aria-labelledby="experience-title">
          <header className="folio-section__header folio-pad"><span>01</span><h2 id="experience-title">Experience</h2><p>Building in public</p><Link className="folio-section__link" href="/experience">Details <ArrowUpRight /></Link></header>
          <ExperienceAccordion />
        </section>

        <section className="folio-section" id="work" aria-labelledby="projects-title">
          <header className="folio-section__header folio-pad"><span>02</span><h2 id="projects-title">Selected projects</h2><p>Systems, not demos</p><Link className="folio-section__link" href="/projects">Details <ArrowUpRight /></Link></header>
          <div className="folio-projects folio-pad">
            {featuredProjects.map((project, index) => (
              <article className="folio-project" key={project.slug}>
                <Link className="folio-project__image project-cover-motion" href={`/projects/${project.slug}`} aria-label={`Read about ${project.title}`}>
                  <Image src={project.src} alt="" fill sizes="(max-width: 560px) 100vw, 350px" />
                  <span className="project-cover-motion__sheen" aria-hidden="true" />
                  <span className="folio-project__index">0{index + 1}</span>
                  <span className="folio-project__status"><i /> Live system</span>
                  <span className="folio-project__open">Open case study <ArrowUpRight /></span>
                </Link>
                <div className="folio-project__copy">
                  <div><h3>{project.title}</h3><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}><ArrowUpRight /></a></div>
                  <p>{project.description}</p>
                  <ul>{projectTech(project.tech).map((tech) => <li key={tech}>{tech}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
          <div className="folio-more folio-pad"><Link href="/projects">View all projects <ArrowUpRight /></Link></div>
        </section>

        <section className="folio-section folio-github" id="github" aria-labelledby="github-section-title">
          <header className="folio-section__header folio-pad"><span>03</span><h2 id="github-section-title">GitHub activity</h2><p>Work in the open</p><Link className="folio-section__link" href="/github">Details <ArrowUpRight /></Link></header>
          <div className="folio-pad folio-github__body">
            <GithubGraph />
            <div className="folio-prs"><OpenSourceContributions /></div>
          </div>
        </section>

        <section className="folio-section" id="skills" aria-labelledby="skills-title">
          <header className="folio-section__header folio-pad"><span>04</span><h2 id="skills-title">Technical skills</h2><p>Tools I trust</p><Link className="folio-section__link" href="/skills">Details <ArrowUpRight /></Link></header>
          <TechStack />
        </section>

        <section className="folio-contact folio-pad" id="contact" aria-labelledby="contact-title">
          <span className="folio-kicker">Open channel</span>
          <h2 id="contact-title">Let&apos;s build something difficult.</h2>
          <p>I’m interested in autonomous systems, developer tools, and open-source infrastructure with real technical edges.</p>
          <a className="folio-button folio-button--primary" href="mailto:shivam.singh.koyad2006@gmail.com"><Mail /> shivam.singh.koyad2006@gmail.com</a>
        </section>

        <footer className="folio-footer folio-pad"><span>© {new Date().getFullYear()} Shivam Singh</span><a href="#profile">Back to top ↑</a></footer>
      </main>
    </>
  );
}
