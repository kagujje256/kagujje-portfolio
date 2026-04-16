"use client";

import { WritingForm } from "@/components/admin/writing-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewWritingPage() {
  return (
    <div>
      <Link href="/admin/writings" className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
        <ArrowLeft size={16} /> Back to Writings
      </Link>
      <h1 className="mb-6 text-2xl font-bold">New Writing</h1>
      <WritingForm />
    </div>
  );
}
