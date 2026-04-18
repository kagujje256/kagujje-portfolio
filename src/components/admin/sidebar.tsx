"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import toast from "react-hot-toast";
import {
  LayoutDashboard, User, FolderKanban, PenLine, Link2,
  FileUp, Settings, LogOut, ExternalLink, Building2, Layers,
  TrendingUp, DollarSign, Users, Globe, Palette
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Overview & stats" },
  { href: "/admin/profile", label: "Profile", icon: User, desc: "Your info & avatar" },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, desc: "Portfolio projects" },
  { href: "/admin/writings", label: "Writings", icon: PenLine, desc: "Blog & articles" },
  { href: "/admin/links", label: "Social Links", icon: Link2, desc: "All social media" },
  { href: "/admin/cta-links", label: "CTA Buttons", icon: TrendingUp, desc: "Trading, services links" },
  { href: "/admin/units", label: "Business Units", icon: Building2, desc: "Sub-brands & ventures" },
  { href: "/admin/services", label: "Services", icon: DollarSign, desc: "What you offer" },
  { href: "/admin/files", label: "Files", icon: FileUp, desc: "Uploads & media" },
  { href: "/admin/sections", label: "Page Text", icon: Layers, desc: "Edit section content" },
  { href: "/admin/seo", label: "SEO", icon: Globe, desc: "Search optimization" },
  { href: "/admin/settings", label: "Settings", icon: Settings, desc: "Site configuration" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success("Logged out");
    router.push("/admin");
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[var(--border)] bg-[var(--bg-secondary)] overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-6 py-5 sticky top-0 bg-[var(--bg-secondary)]">
        <span className="font-['Playfair_Display'] text-xl font-bold text-[var(--accent)]">
          KAGUJJE
        </span>
        <span className="rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group ${
                isActive
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              }`}
              title={item.desc}
            >
              <item.icon size={18} className={isActive ? "text-[var(--accent)]" : "group-hover:text-[var(--accent)]"} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="space-y-1 border-t border-[var(--border)] p-3 sticky bottom-0 bg-[var(--bg-secondary)]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
        >
          <ExternalLink size={18} />
          View Live Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 hover:bg-red-400/10"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
