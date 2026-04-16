"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { ProjectForm } from "@/components/admin/project-form";
import { LoadingSpinner } from "@/components/ui/loading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/lib/types";

export default function EditProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("projects").select("*").eq("id", params.id).single();
      setProject(data as Project);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (!project) return <p className="text-red-400">Project not found.</p>;

  return (
    <div>
      <Link href="/admin/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
        <ArrowLeft size={16} /> Back to Projects
      </Link>
      <h1 className="mb-6 text-2xl font-bold">Edit: {project.title}</h1>
      <ProjectForm project={project} />
    </div>
  );
}
