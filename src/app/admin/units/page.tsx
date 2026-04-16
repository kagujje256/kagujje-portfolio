"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import type { BusinessUnit } from "@/lib/types";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";

export default function UnitsPage() {
  const [units, setUnits] = useState<BusinessUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from("business_units").select("*").order("display_order");
    setUnits((data as BusinessUnit[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleVisibility(unit: BusinessUnit) {
    const { error } = await supabase.from("business_units").update({ is_visible: !unit.is_visible }).eq("id", unit.id);
    if (error) { toast.error(error.message); return; }
    toast.success(unit.is_visible ? "Hidden" : "Visible");
    load();
  }

  async function deleteUnit(id: string) {
    if (!confirm("Delete this business unit?")) return;
    const { error } = await supabase.from("business_units").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Business Units</h1>
          <p className="text-[var(--text-secondary)]">Manage sub-brands, ventures, and subdomains</p>
        </div>
        <Link href="/admin/units/new"><Button><Plus size={16} className="mr-2" /> New Unit</Button></Link>
      </div>
      {units.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-12 text-center"><p className="text-[var(--text-secondary)]">No business units yet.</p></div>
      ) : (
        <div className="space-y-4">
          {units.map((unit) => (
            <div key={unit.id} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--bg-tertiary)]">
                {unit.image_url ? (<Image src={unit.image_url} alt={unit.name} width={56} height={56} className="h-full w-full object-cover" />) : (<div className="flex h-full items-center justify-center text-lg font-bold text-[var(--accent)]/30">{unit.name.charAt(0)}</div>)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{unit.name}</h3>
                  {!unit.is_visible && (<span className="text-xs bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-[var(--text-secondary)]">Hidden</span>)}
                </div>
                <p className="text-sm text-[var(--text-secondary)] truncate">{unit.description}</p>
                <a href={unit.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1 mt-1"><ExternalLink size={10} /> {unit.url}</a>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleVisibility(unit)} className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">{unit.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <Link href={`/admin/units/${unit.id}`} className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"><Pencil size={16} /></Link>
                <button onClick={() => deleteUnit(unit.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
