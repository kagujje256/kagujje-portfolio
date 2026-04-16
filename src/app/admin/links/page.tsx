"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import toast from "react-hot-toast";
import type { SocialLink } from "@/lib/types";
import { Plus, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";

const ICON_OPTIONS = ["github", "twitter", "linkedin", "instagram", "youtube", "tiktok", "facebook", "website", "email", "whatsapp", "spotify", "telegram", "snapchat", "pinterest", "link"];

export default function LinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newLink, setNewLink] = useState({ platform: "", url: "", icon: "link", display_order: 0 });
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from("social_links").select("*").order("display_order");
    setLinks((data as SocialLink[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addLink() {
    if (!newLink.platform || !newLink.url) { toast.error("Platform and URL required"); return; }
    setSaving("new");
    const { error } = await supabase.from("social_links").insert({ platform: newLink.platform, url: newLink.url, icon: newLink.icon, display_order: links.length, is_visible: true });
    if (error) { toast.error(error.message); setSaving(null); return; }
    toast.success("Link added!");
    setNewLink({ platform: "", url: "", icon: "link", display_order: 0 });
    setShowAdd(false);
    setSaving(null);
    load();
  }

  async function updateLink(link: SocialLink, updates: Partial<SocialLink>) {
    setSaving(link.id);
    const { error } = await supabase.from("social_links").update(updates).eq("id", link.id);
    if (error) { toast.error(error.message); } else { toast.success("Updated"); }
    setSaving(null);
    load();
  }

  async function deleteLink(id: string) {
    if (!confirm("Delete this link?")) return;
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">External Links</h1>
          <p className="text-[var(--text-secondary)]">Manage social media and external links</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)}><Plus size={16} className="mr-2" /> Add Link</Button>
      </div>
      {showAdd && (
        <div className="mb-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--bg-secondary)] p-6">
          <h3 className="mb-4 font-semibold">New Link</h3>
          <div className="grid gap-4 sm:grid-cols-4">
            <Input label="Platform" placeholder="e.g. Twitter" value={newLink.platform} onChange={(e) => setNewLink((n) => ({ ...n, platform: e.target.value }))} />
            <Input label="URL" placeholder="https://..." value={newLink.url} onChange={(e) => setNewLink((n) => ({ ...n, url: e.target.value }))} />
            <div className="space-y-1.5"><label className="block text-sm font-medium text-[var(--text-secondary)]">Icon</label><select value={newLink.icon} onChange={(e) => setNewLink((n) => ({ ...n, icon: e.target.value }))} className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-[var(--text-primary)]">{ICON_OPTIONS.map((icon) => (<option key={icon} value={icon}>{icon}</option>))}</select></div>
            <div className="flex items-end"><Button onClick={addLink} loading={saving === "new"} className="w-full">Add</Button></div>
          </div>
        </div>
      )}
      {links.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-12 text-center"><p className="text-[var(--text-secondary)]">No links yet. Add your first one!</p></div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <GripVertical size={16} className="text-[var(--text-secondary)]/40" />
              <div className="flex-1 grid gap-3 sm:grid-cols-3">
                <Input value={link.platform} onChange={(e) => updateLink(link, { platform: e.target.value })} placeholder="Platform" />
                <Input value={link.url} onChange={(e) => updateLink(link, { url: e.target.value })} placeholder="URL" />
                <select value={link.icon} onChange={(e) => updateLink(link, { icon: e.target.value })} className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-[var(--text-primary)]">{ICON_OPTIONS.map((icon) => (<option key={icon} value={icon}>{icon}</option>))}</select>
              </div>
              <button onClick={() => updateLink(link, { is_visible: !link.is_visible })} className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]" title={link.is_visible ? "Hide" : "Show"}>{link.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}</button>
              <button onClick={() => deleteLink(link.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
