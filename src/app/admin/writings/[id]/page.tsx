"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { WritingForm } from "@/components/admin/writing-form";
import { LoadingSpinner } from "@/components/ui/loading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Writing } from "@/lib/types";

export default function EditWritingPage() {
  const params = useParams();
  const [writing, setWriting] = useState<Writing | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("writings").select("*").eq("id", params.id).single();
      setWriting(data as Writing);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (!writing) return <p className="text-red-400">Writing not found.</p>;

  return (
    <div>
      <Link href="/admin/writings" className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
        <ArrowLeft size={16} /> Back to Writings
      </Link>
      <h1 className="mb-6 text-2xl font-bold">Edit: {writing.title}</h1>
      <WritingForm writing={writing} />
    </div>
  );
}
