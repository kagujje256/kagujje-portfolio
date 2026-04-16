"use client";

import { ProjectForm } from "@/components/admin/project-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
        <ArrowLeft size={16} /> Back to Projects
      </Link>
      <h1 className="mb-6 text-2xl font-bold">New Project</h1>
      <ProjectForm />
    </div>
  );
}
