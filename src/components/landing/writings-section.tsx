"use client";

import Image from "next/image";
import Link from "next/link";
import type { Writing, PageSection } from "@/lib/types";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Props {
  writings: Writing[];
  section: PageSection | null;
}

export function WritingsSection({ writings, section }: Props) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  if (writings.length === 0) return null;

  return (
    <section ref={ref} id="writings" className="px-6 py-24">
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
              <>Latest <span className="text-[var(--accent)]">Writings</span></>
            )}
          </h2>
          <p className="text-[var(--text-secondary)]">
            {section?.subheading || "Thoughts, ideas, and stories"}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 stagger-children visible">
          {writings.map((writing, i) => (
            <Link
              key={writing.id}
              href={`/writings/${writing.slug}`}
              className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-2xl hover:shadow-[var(--accent)]/5 hover-lift"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {writing.cover_image_url && (
                <div className="relative aspect-[2.2/1] overflow-hidden">
                  <Image
                    src={writing.cover_image_url}
                    alt={writing.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {writing.tags?.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-[var(--accent)] transition-colors group-hover:text-[var(--accent)]">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-[var(--accent)]">
                  {writing.title}
                </h3>
                <p className="line-clamp-2 text-sm text-[var(--text-secondary)]">
                  {writing.excerpt}
                </p>
                {writing.published_at && (
                  <p className="mt-4 text-xs text-[var(--text-secondary)]/60">
                    {new Date(writing.published_at).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
