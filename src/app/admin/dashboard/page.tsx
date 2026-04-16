"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { FolderKanban, PenLine, Link2, FileUp, Building2 } from "lucide-react";
import Link from "next/link";

interface Stats { projects: number; writings: number; links: number; files: number; units: number; }

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ projects: 0, writings: 0, links: 0, files: 0, units: 0 });
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const [p, w, l, f, u] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("writings").select("id", { count: "exact", head: true }),
        supabase.from("social_links").select("id", { count: "exact", head: true }),
        supabase.from("file_uploads").select("id", { count: "exact", head: true }),
        supabase.from("business_units").select("id", { count: "exact", head: true }),
      ]);
      setStats({ projects: p.count || 0, writings: w.count || 0, links: l.count || 0, files: f.count || 0, units: u.count || 0 });
    }
    load();
  }, []);

  const cards = [
    { label: "Projects", count: stats.projects, icon: FolderKanban, href: "/admin/projects", color: "text-blue-400" },
    { label: "Writings", count: stats.writings, icon: PenLine, href: "/admin/writings", color: "text-green-400" },
    { label: "Business Units", count: stats.units, icon: Building2, href: "/admin/units", color: "text-amber-400" },
    { label: "Links", count: stats.links, icon: Link2, href: "/admin/links", color: "text-purple-400" },
    { label: "Files", count: stats.files, icon: FileUp, href: "/admin/files", color: "text-orange-400" },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
      <p className="mb-8 text-[var(--text-secondary)]">Welcome back to the KAGUJJE admin panel.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 transition-all hover:border-[var(--accent)]/30">
            <div className="mb-4 flex items-center justify-between">
              <card.icon size={24} className={card.color} />
              <span className="text-3xl font-bold">{card.count}</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">{card.label}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects/new" className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg-primary)] hover:bg-[var(--accent-hover)]">+ New Project</Link>
          <Link href="/admin/writings/new" className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--border)]">+ New Writing</Link>
          <Link href="/admin/units/new" className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--border)]">+ New Business Unit</Link>
          <Link href="/admin/profile" className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--border)]">Edit Profile</Link>
          <Link href="/admin/sections" className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--border)]">Edit Page Text</Link>
        </div>
      </div>
    </div>
  );
}
