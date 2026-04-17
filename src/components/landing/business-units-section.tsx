"use client";

import Image from "next/image";
import type { BusinessUnit, PageSection } from "@/lib/types";
import {
  TrendingUp, Briefcase, Globe, Megaphone, Code, Palette,
  ShoppingBag, Music, Camera, Film, Zap, Heart, Star, Award,
} from "lucide-react";

const lucideIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "trending-up": TrendingUp, briefcase: Briefcase, globe: Globe,
  megaphone: Megaphone, code: Code, palette: Palette,
  "shopping-bag": ShoppingBag, music: Music, camera: Camera,
  film: Film, zap: Zap, heart: Heart, star: Star, award: Award,
};

interface Props {
  units: BusinessUnit[];
  section: PageSection | null;
}

export function BusinessUnitsSection({ units, section }: Props) {
  if (units.length === 0) return null;

  return (
    <section id="ventures" className="bg-[var(--bg-secondary)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-['Playfair_Display'] text-4xl font-bold">
            {section?.heading ? (
              <>
                {section.heading.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-[var(--accent)]">
                  {section.heading.split(" ").slice(-1)[0]}
                </span>
              </>
            ) : (
              <>Our <span className="text-[var(--accent)]">Ventures</span></>
            )}
          </h2>
          <p className="text-[var(--text-secondary)]">
            {section?.subheading || "The brands and businesses under KAGUJJE"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit, i) => {
            const Icon = lucideIconMap[unit.icon] || Briefcase;
            return (
              <a
                key={unit.id}
                href={unit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-fade-in group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-xl hover:shadow-[var(--accent)]/5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {unit.image_url && (
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Image src={unit.image_url} alt="" fill className="object-cover" />
                  </div>
                )}
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-[var(--accent)]">
                    {unit.name}
                  </h3>
                  <p className="mb-4 text-sm text-[var(--text-secondary)] line-clamp-2">
                    {unit.description}
                  </p>
                  <span className="text-sm text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                    Visit →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
