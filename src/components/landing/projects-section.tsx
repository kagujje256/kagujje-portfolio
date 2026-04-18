"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project, PageSection } from "@/lib/types";
import { ExternalLink, GitFork } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Props {
  projects: Project[];
  section: PageSection | null;
}

export function ProjectsSection({ projects, section }: Props) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  if (projects.length === 0) return null;

  return (
    <section ref={ref} id="projects" className="px-6 py-24">
      <div className={`mx-auto max-w-6xl ${isVisible ? '' : 'opacity-0'}`}>
        <div className="mb-16 text-center scroll-animate-scale visible">
          <h2 className="mb-4 font-['Playfair_Display'] text-4xl font-bold">
            {section?.heading ? (
              <>
                {section.heading.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-[var(--accent)]">
                  {section.heading.split(" ").slice(-1)[0]}
                </span>
              </>
            ) : (
              <>Featured <span className="text-[var(--accent)]">Projects</span></>
            )}
          </h2>
          <p className="text-[var(--text-secondary)]">
            {section?.subheading || "A showcase of work and creative endeavors"}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger-children visible">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-2xl hover:shadow-[var(--accent)]/10 hover-lift"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden bg-[var(--bg-tertiary)]">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl font-bold text-[var(--accent)]/20">
                    {project.title.charAt(0)}
                  </div>
                )}
                {project.is_featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--bg-primary)] animate-pulse-glow">
                    Featured
                  </span>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold transition-all duration-300 group-hover:text-[var(--accent)]">
                  {project.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-[var(--text-secondary)]">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[var(--bg-tertiary)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)] transition-colors group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline transition-all hover:scale-105">
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                  {project.repo_url && (
                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-105">
                      <GitFork size={14} /> Code
                    </a>
                  )}
                  <Link href={`/projects/${project.slug}`}
                    className="ml-auto text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all hover:translate-x-1">
                    Details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
