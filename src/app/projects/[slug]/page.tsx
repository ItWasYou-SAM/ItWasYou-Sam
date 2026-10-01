import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { DetailPage } from "@/components/DetailPage";
import { iconMap, projectsData, techNames, type TechKey } from "@/data/projectsData";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectsData.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <DetailPage
      eyebrow={`Projects / ${project.slug}`}
      title={project.title.toLowerCase()}
      description={project.description}
    >
      <article className="project-detail-terminal">
        <div className="project-detail-terminal__media">
          {project.video ? (
            project.video.includes("youtube") ? (
              <iframe
                src={project.video}
                title={`${project.title} project demo`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={project.video} controls muted playsInline poster={project.src} />
            )
          ) : (
            <Image src={project.src} alt={project.imageTitle} fill priority sizes="(max-width: 900px) 100vw, 850px" />
          )}
          <span aria-hidden="true" />
        </div>

        <div className="project-detail-terminal__status">
          <p><span>$</span> inspect project.json</p>
          <strong className={project.live ? "is-live" : "is-source"}>{project.live ? "live deployment" : "source available"}</strong>
        </div>

        <div className="project-detail-terminal__body">
          <section>
            <h2>overview</h2>
            <p>{project.description}</p>
          </section>
          <section>
            <h2>stack</h2>
            <ul className="project-detail-terminal__stack">
              {project.tech.map((item) => {
                const key: TechKey | null = typeof item === "string" ? item : null;
                const label = typeof item === "string" ? techNames[item] : item.label;
                const Icon = key ? iconMap[key] : null;
                return <li key={label}>{Icon && <Icon className="project-detail-terminal__tech-icon" />}<span>{label}</span></li>;
              })}
            </ul>
          </section>
        </div>

        <div className="project-detail-terminal__links">
          <Link href="/projects"><ArrowLeft aria-hidden="true" /> all projects</Link>
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><SiGithub aria-hidden="true" /> source</a>}
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> live site</a>}
        </div>
      </article>
    </DetailPage>
  );
}
