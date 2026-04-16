"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Writing } from "@/lib/types";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").trim();
}

interface WritingFormProps {
  writing?: Writing;
}

export function WritingForm({ writing }: WritingFormProps) {
  const isEdit = !!writing;
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    title: writing?.title || "",
    slug: writing?.slug || "",
    excerpt: writing?.excerpt || "",
    content: writing?.content || "",
    cover_image_url: writing?.cover_image_url || "",
    tags: writing?.tags?.join(", ") || "",
    is_published: writing?.is_published || false,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function updateField(field: string, value: string | boolean) {
    if (field === "title" && !isEdit) { setForm((f) => ({ ...f, title: String(value), slug: slugify(String(value)) })); return; }
    setForm((f) => { const updated = { ...f }; (updated as Record<string, unknown>)[field] = value; return updated; });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `writing-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("writings").upload(path, file, { upsert: true });
    if (uploadError) { toast.error("Upload failed"); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("writings").getPublicUrl(path);
    setForm((f) => ({ ...f, cover_image_url: publicUrl }));
    toast.success("Image uploaded!");
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      cover_image_url: form.cover_image_url || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      is_published: form.is_published,
      published_at: form.is_published ? (writing?.published_at || new Date().toISOString()) : null,
    };
    if (isEdit) {
      const { error } = await supabase.from("writings").update(payload).eq("id", writing.id);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Updated!");
    } else {
      const { error } = await supabase.from("writings").insert(payload);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Created!");
    }
    setSaving(false);
    router.push("/admin/writings");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h2 className="mb-6 text-lg font-semibold">Writing Details</h2>
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Input label="Title" value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
            <Input label="Slug" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required />
          </div>
          <Textarea label="Excerpt" value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} rows={2} />
          <Textarea label="Content" value={form.content} onChange={(e) => updateField("content", e.target.value)} rows={16} />
          <div className="grid gap-6 sm:grid-cols-2">
            <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => updateField("tags", e.target.value)} placeholder="thoughts, tech" />
            <label className="flex items-center gap-3 pt-7"><input type="checkbox" checked={form.is_published} onChange={(e) => updateField("is_published", e.target.checked)} className="h-4 w-4 rounded" /><span className="text-sm text-[var(--text-secondary)]">Publish now</span></label>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Cover Image</h2>
        {form.cover_image_url && (<div className="relative mb-4 aspect-[2.2/1] w-full max-w-md overflow-hidden rounded-lg border border-[var(--border)]"><Image src={form.cover_image_url} alt="Preview" fill className="object-cover" /></div>)}
        <div className="flex items-center gap-4">
          <label><Button type="button" variant="secondary" loading={uploading}>{uploading ? "Uploading..." : "Upload Image"}</Button><input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={(input) => { const btn = input?.previousElementSibling; if (btn) (btn as HTMLElement).onclick = () => input.click(); }} /></label>
          <span className="text-xs text-[var(--text-secondary)]">or</span>
          <Input placeholder="Paste image URL" value={form.cover_image_url} onChange={(e) => updateField("cover_image_url", e.target.value)} className="flex-1" />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={saving}>{isEdit ? "Update" : "Create"} Writing</Button>
      </div>
    </form>
  );
}
