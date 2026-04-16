"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import toast from "react-hot-toast";
import type { SiteSettings } from "@/lib/types";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("site_settings").select("*").limit(1).single();
      setSettings(data as SiteSettings);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({ site_title: settings.site_title, site_description: settings.site_description, motto: settings.motto, theme_accent_color: settings.theme_accent_color, og_image_url: settings.og_image_url, favicon_url: settings.favicon_url, footer_text: settings.footer_text }).eq("id", settings.id);
    if (error) { toast.error(error.message); } else { toast.success("Settings saved!"); }
    setSaving(false);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="mb-2 flex items-center gap-3 text-2xl font-bold"><Settings size={24} className="text-[var(--accent)]" /> Site Settings</h1>
      <p className="mb-8 text-[var(--text-secondary)]">Global settings for your KAGUJJE portfolio site.</p>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <h2 className="mb-6 text-lg font-semibold">General</h2>
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input label="Site Title" value={settings?.site_title || ""} onChange={(e) => setSettings((s) => s && { ...s, site_title: e.target.value })} />
              <Input label="Motto" value={settings?.motto || ""} onChange={(e) => setSettings((s) => s && { ...s, motto: e.target.value })} placeholder="just a brand" />
            </div>
            <Textarea label="Site Description (SEO)" value={settings?.site_description || ""} onChange={(e) => setSettings((s) => s && { ...s, site_description: e.target.value })} rows={2} />
            <Input label="Footer Text" value={settings?.footer_text || ""} onChange={(e) => setSettings((s) => s && { ...s, footer_text: e.target.value })} />
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <h2 className="mb-6 text-lg font-semibold">Appearance</h2>
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--text-secondary)]">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={settings?.theme_accent_color || "#c9a84c"} onChange={(e) => setSettings((s) => s && { ...s, theme_accent_color: e.target.value })} className="h-10 w-14 cursor-pointer rounded-lg border border-[var(--border)] bg-transparent" />
                  <Input value={settings?.theme_accent_color || ""} onChange={(e) => setSettings((s) => s && { ...s, theme_accent_color: e.target.value })} placeholder="#c9a84c" className="flex-1" />
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input label="OG Image URL" value={settings?.og_image_url || ""} onChange={(e) => setSettings((s) => s && { ...s, og_image_url: e.target.value })} placeholder="https://..." />
              <Input label="Favicon URL" value={settings?.favicon_url || ""} onChange={(e) => setSettings((s) => s && { ...s, favicon_url: e.target.value })} placeholder="https://..." />
            </div>
          </div>
        </div>
        <div className="flex justify-end"><Button type="submit" loading={saving} size="lg">Save Settings</Button></div>
      </form>
    </div>
  );
}
