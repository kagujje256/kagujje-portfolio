"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import toast from "react-hot-toast";
import type { PageSection } from "@/lib/types";
import { Layers, Save } from "lucide-react";

const SECTION_LABELS: Record<string, string> = {
  hero: "\ud83c\udfe0 Hero / Header",
  projects: "\ud83d\udcc2 Projects Section",
  writings: "\u270d\ufe0f Writings Section",
  business_units: "\ud83c\udfe2 Business Units Section",
  contact: "\ud83d\udce7 Contact Section",
  footer: "\ud83d\udd3b Footer",
};

export default function SectionsPage() {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from("page_sections").select("*").order("section_key");
    setSections((data as PageSection[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function updateSection(id: string, field: keyof PageSection, value: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  }

  async function saveSection(section: PageSection) {
    setSavingId(section.id);
    const { error } = await supabase.from("page_sections").update({ heading: section.heading, subheading: section.subheading, body: section.body }).eq("id", section.id);
    if (error) { toast.error(error.message); } else { toast.success(`${SECTION_LABELS[section.section_key] || section.section_key} saved!`); }
    setSavingId(null);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-2xl font-bold"><Layers size={24} className="text-[var(--accent)]" /> Page Sections</h1>
        <p className="text-[var(--text-secondary)]">Edit all text content on your landing page. Changes appear instantly on the site.</p>
      </div>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{SECTION_LABELS[section.section_key] || section.section_key}</h2>
              <Button size="sm" loading={savingId === section.id} onClick={() => saveSection(section)}><Save size={14} className="mr-1.5" /> Save</Button>
            </div>
            <div className="space-y-4">
              <Input label="Heading" value={section.heading} onChange={(e) => updateSection(section.id, "heading", e.target.value)} placeholder="Section heading" />
              <Input label="Subheading" value={section.subheading} onChange={(e) => updateSection(section.id, "subheading", e.target.value)} placeholder="Section subheading" />
              <Textarea label="Body Text" value={section.body} onChange={(e) => updateSection(section.id, "body", e.target.value)} placeholder="Additional text content..." rows={3} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
