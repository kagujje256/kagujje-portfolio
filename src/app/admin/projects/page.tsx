"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Project } from "@/lib/types";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from("projects").select("*").order("display_order");
    setProjects((data as Project[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleVisibility(project: Project) {
    const { error } = await supabase.from("projects").update({ is_visible: !project.is_visible }).eq("id", project.id);
    if (error) { toast.error(error.message); return; }
    toast.success(project.is_visible ? "Hidden" : "Visible");
    load();
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Project deleted");
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-[var(--text-secondary)]">{projects.length} total</p>
        </div>
        <Link href="/admin/projects/new"><Button><Plus size={16} className="mr-2" /> New Project</Button></Link>
      </div>
      {projects.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-12 text-center"><p className="text-[var(--text-secondary)]">No projects yet. Create your first one!</p></div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 transition-colors hover:border-[var(--border)]">
              <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--bg-tertiary)]">
                {project.image_url ? (<Image src={project.image_url} alt={project.title} width={96} height={64} className="h-full w-full object-cover" />) : (<div className="flex h-full items-center justify-center text-lg font-bold text-[var(--accent)]/20">{project.title.charAt(0)}</div>)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{project.title}</h3>
                  {project.is_featured && <Star size={14} className="text-[var(--accent)]" />}
                  {!project.is_visible && (<span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">Hidden</span>)}
                </div>
                <p className="text-sm text-[var(--text-secondary)] truncate">{project.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleVisibility(project)} className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]" title={project.is_visible ? "Hide" : "Show"}>{project.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <Link href={`/admin/projects/${project.id}`} className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"><Pencil size={16} /></Link>
                <button onClick={() => deleteProject(project.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
