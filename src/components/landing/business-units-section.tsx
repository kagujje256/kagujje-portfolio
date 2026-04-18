"use client";

import Image from "next/image";
import type { BusinessUnit, PageSection } from "@/lib/types";
import {
  TrendingUp, Briefcase, Globe, Megaphone, Code, Palette,
  ShoppingBag, Music, Camera, Film, Zap, Heart, Star, Award,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  if (units.length === 0) return null;

  return (
    <section ref={ref} id="ventures" className="bg-[var(--bg-secondary)] px-6 py-24">
      <div className={`mx-auto max-w-6xl ${isVisible ? '' : 'opacity-0'}`}>
        <div className="mb-16 text-center scroll-animate-scale visible">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children visible">
          {units.map((unit, i) => {
            const Icon = lucideIconMap[unit.icon] || Briefcase;
            return (
              <a
                key={unit.id}
                href={unit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 transition-all duration-500 hover:border-[var(--accent)]/60 hover:shadow-2xl hover:shadow-[var(--accent)]/10 hover-lift"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Background image overlay */}
                {unit.image_url && (
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                    <Image src={unit.image_url} alt="" fill className="object-cover" />
                  </div>
                )}
                
                {/* Accent glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/10 to-[var(--accent)]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] group-hover:scale-110">
                    <Icon size={28} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-[var(--accent)]">
                    {unit.name}
                  </h3>
                  <p className="mb-4 text-sm text-[var(--text-secondary)] line-clamp-2">
                    {unit.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                    Visit Venture
                    <span className="transition-transform group-hover:translate-x-1">→</span>
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
