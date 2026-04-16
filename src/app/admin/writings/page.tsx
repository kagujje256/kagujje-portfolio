"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Writing } from "@/lib/types";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export default function WritingsPage() {
  const [writings, setWritings] = useState<Writing[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from("writings").select("*").order("created_at", { ascending: false });
    setWritings((data as Writing[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublish(w: Writing) {
    const updates: Record<string, unknown> = { is_published: !w.is_published };
    if (!w.is_published) updates.published_at = new Date().toISOString();
    const { error } = await supabase.from("writings").update(updates).eq("id", w.id);
    if (error) { toast.error(error.message); return; }
    toast.success(w.is_published ? "Unpublished" : "Published");
    load();
  }

  async function deleteWriting(id: string) {
    if (!confirm("Delete this writing?")) return;
    const { error } = await supabase.from("writings").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Writings</h1>
          <p className="text-[var(--text-secondary)]">{writings.length} total</p>
        </div>
        <Link href="/admin/writings/new"><Button><Plus size={16} className="mr-2" /> New Writing</Button></Link>
      </div>
      {writings.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-12 text-center"><p className="text-[var(--text-secondary)]">No writings yet.</p></div>
      ) : (
        <div className="space-y-4">
          {writings.map((w) => (
            <div key={w.id} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{w.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${w.is_published ? "bg-green-500/10 text-green-400" : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"}`}>{w.is_published ? "Published" : "Draft"}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] truncate">{w.excerpt}</p>
                {w.published_at && (<p className="text-xs text-[var(--text-secondary)]/50 mt-1">{new Date(w.published_at).toLocaleDateString()}</p>)}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => togglePublish(w)} className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">{w.is_published ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <Link href={`/admin/writings/${w.id}`} className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"><Pencil size={16} /></Link>
                <button onClick={() => deleteWriting(w.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
