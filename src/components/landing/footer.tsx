"use client";

import type { PageSection, SiteSettings } from "@/lib/types";

interface Props {
  section: PageSection | null;
  settings: SiteSettings | null;
}

export function Footer({ section, settings }: Props) {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-['Playfair_Display'] text-lg font-bold text-[var(--accent)]">
          {section?.heading || settings?.site_title || "KAGUJJE"}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          {settings?.footer_text || section?.subheading || `© ${new Date().getFullYear()} KAGUJJE Brand. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
