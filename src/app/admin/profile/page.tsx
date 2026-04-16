"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("profile").select("*").limit(1).single();
      if (data) setProfile(data as Profile);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `avatar-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (uploadError) { toast.error("Upload failed: " + uploadError.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    const { error } = await supabase.from("profile").update({ avatar_url: publicUrl }).eq("id", profile.id);
    if (error) { toast.error(error.message); } else { setProfile({ ...profile, avatar_url: publicUrl }); toast.success("Avatar updated!"); }
    setUploading(false);
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setUploading(true);
    const path = `resume-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("files").upload(path, file, { upsert: true });
    if (uploadError) { toast.error("Upload failed: " + uploadError.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("files").getPublicUrl(path);
    const { error } = await supabase.from("profile").update({ resume_url: publicUrl }).eq("id", profile.id);
    if (error) { toast.error(error.message); } else { setProfile({ ...profile, resume_url: publicUrl }); toast.success("Resume uploaded!"); }
    setUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase.from("profile").update({ full_name: profile.full_name, tagline: profile.tagline, bio: profile.bio, email: profile.email, location: profile.location, available_for_hire: profile.available_for_hire }).eq("id", profile.id);
    if (error) { toast.error(error.message); } else { toast.success("Profile updated!"); }
    setSaving(false);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Profile</h1>
      <p className="mb-8 text-[var(--text-secondary)]">Manage your public profile information.</p>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Profile Picture</h2>
          <div className="mb-4 mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-[var(--border)]">
            {profile?.avatar_url ? (<Image src={profile.avatar_url} alt="Avatar" width={128} height={128} className="h-full w-full object-cover" />) : (<div className="flex h-full w-full items-center justify-center bg-[var(--bg-tertiary)] text-3xl font-bold text-[var(--accent)]">{(profile?.full_name || "K").charAt(0)}</div>)}
          </div>
          <label className="block"><Button variant="secondary" size="sm" className="w-full" loading={uploading} onClick={() => {}}>{uploading ? "Uploading..." : "Change Avatar"}</Button><input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" ref={(input) => { const btn = input?.previousElementSibling; if (btn) (btn as HTMLElement).onclick = () => input.click(); }} /></label>
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Resume / CV</h2>
            {profile?.resume_url && (<a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="mb-2 block truncate text-sm text-[var(--accent)] hover:underline">Current resume \u2197</a>)}
            <label className="block"><Button variant="secondary" size="sm" className="w-full" loading={uploading}>Upload Resume</Button><input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" ref={(input) => { const btn = input?.previousElementSibling; if (btn) (btn as HTMLElement).onclick = () => input.click(); }} /></label>
          </div>
        </div>
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input label="Full Name" value={profile?.full_name || ""} onChange={(e) => setProfile((p) => p && { ...p, full_name: e.target.value })} />
              <Input label="Tagline" value={profile?.tagline || ""} onChange={(e) => setProfile((p) => p && { ...p, tagline: e.target.value })} />
            </div>
            <Textarea label="Bio" rows={5} value={profile?.bio || ""} onChange={(e) => setProfile((p) => p && { ...p, bio: e.target.value })} />
            <div className="grid gap-6 sm:grid-cols-2">
              <Input label="Email" type="email" value={profile?.email || ""} onChange={(e) => setProfile((p) => p && { ...p, email: e.target.value })} />
              <Input label="Location" value={profile?.location || ""} onChange={(e) => setProfile((p) => p && { ...p, location: e.target.value })} />
            </div>
            <label className="flex items-center gap-3"><input type="checkbox" checked={profile?.available_for_hire || false} onChange={(e) => setProfile((p) => p && { ...p, available_for_hire: e.target.checked })} className="h-4 w-4 rounded border-[var(--border)] bg-[var(--bg-tertiary)] text-[var(--accent)]" /><span className="text-sm text-[var(--text-secondary)]">Available for hire</span></label>
            <div className="flex justify-end"><Button type="submit" loading={saving}>Save Changes</Button></div>
          </form>
        </div>
      </div>
    </div>
  );
}
