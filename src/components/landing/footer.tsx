"use client";

import type { PageSection, SiteSettings } from "@/lib/types";
import { Heart } from "lucide-react";

interface Props {
  section: PageSection | null;
  settings: SiteSettings | null;
}

export function Footer({ section, settings }: Props) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-[var(--border)] px-6 py-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-20 h-40 w-40 rounded-full bg-[var(--accent)]/5 blur-[80px]" />
      
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-['Playfair_Display'] text-xl font-bold text-[var(--accent)]">
            {section?.heading || settings?.site_title || "KAGUJJE"}
          </span>
          <span className="text-[var(--text-secondary)]/30">|</span>
          <span className="text-sm text-[var(--accent)]/80 font-light tracking-widest">
            THE BIG BRAND
          </span>
        </div>
        
        <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
          <span>© {currentYear}</span>
          <span className="text-[var(--accent)]">{settings?.site_title || "KAGUJJE"} Brand</span>
          <span>· All rights reserved</span>
        </p>
        
        <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]/50">
          <span>Built with</span>
          <Heart size={12} className="text-[var(--accent)] animate-pulse" />
          <span>in Uganda</span>
        </div>
      </div>
    </footer>
  );
}
