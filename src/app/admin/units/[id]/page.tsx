"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { UnitForm } from "@/components/admin/unit-form";
import { LoadingSpinner } from "@/components/ui/loading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BusinessUnit } from "@/lib/types";

export default function EditUnitPage() {
  const params = useParams();
  const [unit, setUnit] = useState<BusinessUnit | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("business_units").select("*").eq("id", params.id).single();
      setUnit(data as BusinessUnit);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (!unit) return <p className="text-red-400">Unit not found.</p>;

  return (
    <div>
      <Link href="/admin/units" className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
        <ArrowLeft size={16} /> Back to Units
      </Link>
      <h1 className="mb-6 text-2xl font-bold">Edit: {unit.name}</h1>
      <UnitForm unit={unit} />
    </div>
  );
}
