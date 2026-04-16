"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Project } from "@/lib/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const isEdit = !!project;
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    long_description: project?.long_description || "",
    image_url: project?.image_url || "",
    live_url: project?.live_url || "",
    repo_url: project?.repo_url || "",
    tags: project?.tags?.join(", ") || "",
    is_featured: project?.is_featured || false,
    is_visible: project?.is_visible ?? true,
    display_order: project?.display_order || 0,
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function updateField(field: string, value: string | boolean | number) {
    if (field === "title" && !isEdit) {
      setForm((f) => ({ ...f, title: String(value), slug: slugify(String(value)) }));
      return;
    }
    setForm((f) => {
      const updated = { ...f };
      (updated as Record<string, unknown>)[field] = value;
      return updated;
    });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `project-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("projects").upload(path, file, { upsert: true });
    if (uploadError) { toast.error("Upload failed: " + uploadError.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("projects").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    toast.success("Image uploaded!");
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      description: form.description,
      long_description: form.long_description || null,
      image_url: form.image_url || null,
      live_url: form.live_url || null,
      repo_url: form.repo_url || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      is_featured: form.is_featured,
      is_visible: form.is_visible,
      display_order: form.display_order,
    };
    if (isEdit) {
      const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Project updated!");
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Project created!");
    }
    setSaving(false);
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h2 className="mb-6 text-lg font-semibold">Project Details</h2>
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Input label="Title" value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
            <Input label="Slug" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required />
          </div>
          <Textarea label="Short Description" value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={3} />
          <Textarea label="Detailed Description" value={form.long_description} onChange={(e) => updateField("long_description", e.target.value)} rows={8} />
          <div className="grid gap-6 sm:grid-cols-2">
            <Input label="Live URL" type="url" value={form.live_url} onChange={(e) => updateField("live_url", e.target.value)} placeholder="https://..." />
            <Input label="Repository URL" type="url" value={form.repo_url} onChange={(e) => updateField("repo_url", e.target.value)} placeholder="https://github.com/..." />
          </div>
          <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => updateField("tags", e.target.value)} placeholder="React, TypeScript, Design" />
          <div className="grid gap-6 sm:grid-cols-3">
            <Input label="Display Order" type="number" value={form.display_order.toString()} onChange={(e) => updateField("display_order", parseInt(e.target.value) || 0)} />
            <label className="flex items-center gap-3 pt-7"><input type="checkbox" checked={form.is_featured} onChange={(e) => updateField("is_featured", e.target.checked)} className="h-4 w-4 rounded" /><span className="text-sm text-[var(--text-secondary)]">Featured</span></label>
            <label className="flex items-center gap-3 pt-7"><input type="checkbox" checked={form.is_visible} onChange={(e) => updateField("is_visible", e.target.checked)} className="h-4 w-4 rounded" /><span className="text-sm text-[var(--text-secondary)]">Visible</span></label>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Cover Image</h2>
        {form.image_url && (<div className="relative mb-4 aspect-video w-full max-w-md overflow-hidden rounded-lg border border-[var(--border)]"><Image src={form.image_url} alt="Preview" fill className="object-cover" /></div>)}
        <div className="flex items-center gap-4">
          <label><Button type="button" variant="secondary" loading={uploading}>{uploading ? "Uploading..." : "Upload Image"}</Button><input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={(input) => { const btn = input?.previousElementSibling; if (btn) (btn as HTMLElement).onclick = () => input.click(); }} /></label>
          <span className="text-xs text-[var(--text-secondary)]">or</span>
          <Input placeholder="Paste image URL" value={form.image_url} onChange={(e) => updateField("image_url", e.target.value)} className="flex-1" />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={saving}>{isEdit ? "Update Project" : "Create Project"}</Button>
      </div>
    </form>
  );
}
