import { createServerSupabase } from "@/lib/supabase-server";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitFork } from "lucide-react";
import type { Project, PageSection, SiteSettings } from "@/lib/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const [projectRes, footerRes, settingsRes] = await Promise.all([
    supabase.from("projects").select("*").eq("slug", id).eq("is_visible", true).single(),
    supabase.from("page_sections").select("*").eq("section_key", "footer").single(),
    supabase.from("site_settings").select("*").limit(1).single(),
  ]);

  if (!projectRes.data) notFound();
  const p = projectRes.data as Project;

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-28">
        <Link href="/#projects" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {p.image_url && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-xl border border-[var(--border)]">
            <Image src={p.image_url} alt={p.title} fill className="object-cover" />
          </div>
        )}

        <h1 className="mb-4 font-['Playfair_Display'] text-4xl font-bold">{p.title}</h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {p.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-sm text-[var(--text-secondary)]">{tag}</span>
          ))}
        </div>

        <div className="mb-8 flex gap-4">
          {p.live_url && (
            <a href={p.live_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg-primary)]">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {p.repo_url && (
            <a href={p.repo_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm">
              <GitFork size={16} /> Source Code
            </a>
          )}
        </div>

        <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed">{p.description}</p>
          {p.long_description && <div className="mt-6 whitespace-pre-wrap">{p.long_description}</div>}
        </div>
      </div>
      <Footer section={(footerRes.data as PageSection) || null} settings={(settingsRes.data as SiteSettings) || null} />
    </main>
  );
}
