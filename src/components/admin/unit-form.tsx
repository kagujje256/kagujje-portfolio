"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import type { BusinessUnit } from "@/lib/types";

const ICON_OPTIONS = [
  "trending-up", "briefcase", "globe", "megaphone", "code", "palette",
  "shopping-bag", "music", "camera", "film", "zap", "heart", "star", "award",
];

interface UnitFormProps {
  unit?: BusinessUnit;
}

export function UnitForm({ unit }: UnitFormProps) {
  const isEdit = !!unit;
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    name: unit?.name || "",
    description: unit?.description || "",
    url: unit?.url || "",
    icon: unit?.icon || "briefcase",
    image_url: unit?.image_url || "",
    is_visible: unit?.is_visible ?? true,
    display_order: unit?.display_order || 0,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function updateField(field: string, value: string | boolean | number) {
    setForm((f) => { const updated = { ...f }; (updated as Record<string, unknown>)[field] = value; return updated; });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `unit-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("projects").upload(path, file, { upsert: true });
    if (uploadError) { toast.error("Upload failed"); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("projects").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    toast.success("Image uploaded!");
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { name: form.name, description: form.description, url: form.url, icon: form.icon, image_url: form.image_url || null, is_visible: form.is_visible, display_order: form.display_order };
    if (isEdit) {
      const { error } = await supabase.from("business_units").update(payload).eq("id", unit.id);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Updated!");
    } else {
      const { error } = await supabase.from("business_units").insert(payload);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Created!");
    }
    setSaving(false);
    router.push("/admin/units");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h2 className="mb-6 text-lg font-semibold">Business Unit Details</h2>
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Input label="Name" value={form.name} onChange={(e) => updateField("name", e.target.value)} required placeholder="e.g. Social Media Boosting" />
            <Input label="URL / Subdomain" type="url" value={form.url} onChange={(e) => updateField("url", e.target.value)} required placeholder="https://boosting.kagujje.com" />
          </div>
          <Textarea label="Description" value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={3} />
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-1.5"><label className="block text-sm font-medium text-[var(--text-secondary)]">Icon</label><select value={form.icon} onChange={(e) => updateField("icon", e.target.value)} className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-[var(--text-primary)]">{ICON_OPTIONS.map((icon) => (<option key={icon} value={icon}>{icon}</option>))}</select></div>
            <Input label="Display Order" type="number" value={form.display_order.toString()} onChange={(e) => updateField("display_order", parseInt(e.target.value) || 0)} />
            <label className="flex items-center gap-3 pt-7"><input type="checkbox" checked={form.is_visible} onChange={(e) => updateField("is_visible", e.target.checked)} className="h-4 w-4 rounded" /><span className="text-sm text-[var(--text-secondary)]">Visible on site</span></label>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Cover Image (optional)</h2>
        {form.image_url && (<div className="relative mb-4 aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-[var(--border)]"><Image src={form.image_url} alt="Preview" fill className="object-cover" /></div>)}
        <div className="flex items-center gap-4">
          <label><Button type="button" variant="secondary" loading={uploading}>{uploading ? "Uploading..." : "Upload Image"}</Button><input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={(input) => { const btn = input?.previousElementSibling; if (btn) (btn as HTMLElement).onclick = () => input.click(); }} /></label>
          <span className="text-xs text-[var(--text-secondary)]">or</span>
          <Input placeholder="Paste image URL" value={form.image_url} onChange={(e) => updateField("image_url", e.target.value)} className="flex-1" />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={saving}>{isEdit ? "Update" : "Create"} Unit</Button>
      </div>
    </form>
  );
}
