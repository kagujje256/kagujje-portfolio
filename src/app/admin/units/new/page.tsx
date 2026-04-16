"use client";

import { UnitForm } from "@/components/admin/unit-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewUnitPage() {
  return (
    <div>
      <Link href="/admin/units" className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
        <ArrowLeft size={16} /> Back to Units
      </Link>
      <h1 className="mb-6 text-2xl font-bold">New Business Unit</h1>
      <UnitForm />
    </div>
  );
}
