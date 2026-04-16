import { createServerSupabase } from "@/lib/supabase-server";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Writing, PageSection, SiteSettings } from "@/lib/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function WritingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const [writingRes, footerRes, settingsRes] = await Promise.all([
    supabase.from("writings").select("*").eq("slug", id).eq("is_published", true).single(),
    supabase.from("page_sections").select("*").eq("section_key", "footer").single(),
    supabase.from("site_settings").select("*").limit(1).single(),
  ]);

  if (!writingRes.data) notFound();
  const w = writingRes.data as Writing;

  return (
    <main className="min-h-screen">
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <Link href="/#writings" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
          <ArrowLeft size={16} /> Back to Writings
        </Link>

        {w.cover_image_url && (
          <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-xl border border-[var(--border)]">
            <Image src={w.cover_image_url} alt={w.title} fill className="object-cover" />
          </div>
        )}

        <div className="mb-4 flex flex-wrap gap-2">
          {w.tags?.map((tag) => (
            <span key={tag} className="text-sm font-medium text-[var(--accent)]">#{tag}</span>
          ))}
        </div>

        <h1 className="mb-4 font-['Playfair_Display'] text-4xl font-bold">{w.title}</h1>

        {w.published_at && (
          <p className="mb-8 text-sm text-[var(--text-secondary)]">
            {new Date(w.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}

        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-[var(--text-secondary)] leading-relaxed">
          {w.content}
        </div>
      </article>
      <Footer section={(footerRes.data as PageSection) || null} settings={(settingsRes.data as SiteSettings) || null} />
    </main>
  );
}
