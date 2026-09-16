import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { DetailPage } from "@/components/DetailPage";
import {
  iconMap,
  projectsData,
  techNames,
  type Project,
  type TechItem,
} from "@/data/projectsData";

const collections = [
  {
    index: "01",
    title: "Agent architecture",
    description: "Runtimes, orchestration systems, and safety infrastructure for dependable autonomous agents.",
    slugs: ["scout", "nexus", "sharp", "novaharness", "core", "genesis", "astraweave"],
  },
  {
    index: "02",
    title: "Memory, retrieval & evaluation",
    description: "Systems that make model context smaller, evidence stronger, and evaluations easier to trust.",
    slugs: ["veritas", "compact", "evalgate", "periapsis", "llmcostautopilot"],
  },
  {
    index: "03",
    title: "Applied AI & automation",
    description: "Practical products spanning computer vision, local assistants, debugging, security, and open source.",
    slugs: ["gestureflow", "jarvis", "repobugfix", "chillpal", "cybersentryai", "osscontributoragent"],
  },
] as const;

const bySlug = new Map(projectsData.map((project) => [project.slug, project]));

function technologyMeta(tech: TechItem) {
  if (typeof tech === "string") {
    return { name: techNames[tech], Icon: iconMap[tech] };
  }

  return { name: tech.label, Icon: iconMap.github };
}

function ProjectArchiveCard({
  project,
  number,
  isLead = false,
}: {
  project: Project;
  number: number;
  isLead?: boolean;
}) {
  return (
    <article className={`project-archive-card${isLead ? " project-archive-card--lead" : ""}`}>
      <Link
        className="project-archive-card__cover project-cover-motion"
        href={`/projects/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
      >
        <Image
          src={project.src}
          alt={`${project.title} interface preview`}
          fill
          loading={number === 1 ? "eager" : "lazy"}
          sizes="(max-width: 560px) calc(100vw - 32px), (max-width: 900px) 52vw, 430px"
        />
        <span className="project-cover-motion__sheen" aria-hidden="true" />
        <span className="project-archive-card__number">{String(number).padStart(2, "0")}</span>
        <span className="project-archive-card__status">
          <i aria-hidden="true" /> {project.hasPin ? "Featured system" : "Case study"}
        </span>
        <span className="project-archive-card__view">View project <ArrowUpRight /></span>
      </Link>

      <div className="project-archive-card__body">
        <div className="project-archive-card__heading">
          <div>
            <span>{project.imageTitle}</span>
            <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
          </div>
          <a
            className="project-archive-card__github"
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} on GitHub`}
          >
            <SiGithub />
          </a>
        </div>

        <p>{project.description}</p>

        <ul className="project-archive-card__tech" aria-label={`${project.title} technology stack`}>
          {project.tech.slice(0, 4).map((tech, index) => {
            const { name, Icon } = technologyMeta(tech);
            return (
              <li key={`${name}-${index}`} title={name}>
                <Icon className="project-archive-card__tech-icon" />
                <span>{name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <DetailPage
      eyebrow="Selected engineering archive"
      title="Systems built to reason, retrieve, and act."
      description="A structured archive of agent infrastructure and applied AI products—from memory and evaluation layers to complete autonomous workflows."
    >
      <section className="project-archive-intro" aria-label="Project archive summary">
        <div className="project-archive-intro__copy">
          <span>Archive overview</span>
          <p>
            Each project is documented as an engineering case study: the problem, architecture,
            implementation choices, and what the system proved in practice.
          </p>
          <nav className="project-archive-index" aria-label="Project collections">
            {collections.map((collection) => (
              <a href={`#collection-${collection.index}`} key={collection.index}>
                <b>{collection.index}</b>
                {collection.title}
              </a>
            ))}
          </nav>
        </div>
        <dl>
          <div><dt>Systems</dt><dd>{projectsData.length}</dd></div>
          <div><dt>Collections</dt><dd>{collections.length}</dd></div>
          <div><dt>Source</dt><dd>Open</dd></div>
        </dl>
      </section>

      <div className="project-archive">
        {collections.map((collection, collectionIndex) => {
          const projects = collection.slugs
            .map((slug) => bySlug.get(slug))
            .filter((project): project is Project => Boolean(project));
          const numberOffset = collections
            .slice(0, collectionIndex)
            .reduce((total, previous) => total + previous.slugs.length, 0);

          return (
            <section
              className="project-archive-group"
              id={`collection-${collection.index}`}
              key={collection.title}
            >
              <header className="project-archive-group__header">
                <span>{collection.index}</span>
                <div>
                  <h2>{collection.title}</h2>
                  <p>{collection.description}</p>
                </div>
                <small>{String(projects.length).padStart(2, "0")} projects</small>
              </header>

              <div className="project-archive-grid">
                {projects.map((project, projectIndex) => (
                  <ProjectArchiveCard
                    key={project.slug}
                    project={project}
                    number={numberOffset + projectIndex + 1}
                    isLead={projectIndex === 0}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </DetailPage>
  );
}
