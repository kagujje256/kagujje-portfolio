"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { toast.error(error.message); setLoading(false); return; }
    toast.success("Welcome back!");
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[var(--accent)]">KAGUJJE</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Admin Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8">
          <h2 className="text-xl font-semibold">Sign In</h2>
          <Input label="Email" type="email" placeholder="admin@kagujje.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" loading={loading} className="w-full" size="lg">Sign In</Button>
        </form>
        <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">Protected area. Authorized personnel only.</p>
      </div>
    </div>
  );
}
