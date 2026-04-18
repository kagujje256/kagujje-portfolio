"use client";

import type { Profile, PageSection } from "@/lib/types";
import { Mail, MapPin, Download, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Props {
  profile: Profile | null;
  section: PageSection | null;
}

export function ContactSection({ profile, section }: Props) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} id="contact" className="relative bg-[var(--bg-secondary)] px-6 py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)]/5 blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-[var(--accent)]/3 blur-[80px]" />
      </div>

      <div className={`relative mx-auto max-w-2xl text-center ${isVisible ? '' : 'opacity-0'}`}>
        <div className="scroll-animate-scale visible">
          <h2 className="mb-4 font-['Playfair_Display'] text-4xl font-bold">
            {section?.heading ? (
              <>
                {section.heading.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-[var(--accent)]">
                  {section.heading.split(" ").slice(-1)[0]}
                </span>
              </>
            ) : (
              <>Get In <span className="text-[var(--accent)]">Touch</span></>
            )}
          </h2>
          <p className="mb-10 text-[var(--text-secondary)]">
            {section?.subheading ||
              "Have a project in mind or just want to say hello? Feel free to reach out."}
          </p>
        </div>

        <div className="space-y-4 scroll-animate visible" style={{ animationDelay: '200ms' }}>
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-8 py-5 text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] hover-lift hover-glow"
            >
              <Mail size={20} className="transition-transform group-hover:scale-110" />
              <span className="text-lg">{profile.email}</span>
            </a>
          )}
          
          {profile?.location && (
            <div className="flex items-center justify-center gap-3 text-[var(--text-secondary)]">
              <MapPin size={18} className="text-[var(--accent)]" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>

        {profile?.resume_url && (
          <a
            href={profile.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-lg bg-[var(--accent)] px-8 py-4 font-medium text-[var(--bg-primary)] transition-all duration-300 hover:bg-[var(--accent-hover)] hover-lift hover-glow scroll-animate visible"
            style={{ animationDelay: '400ms' }}
          >
            <Download size={18} className="transition-transform group-hover:translate-y-1" />
            Download Resume
          </a>
        )}

        {/* Available badge */}
        {profile?.available_for_hire && (
          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-6 py-3 text-green-400 scroll-animate visible" style={{ animationDelay: '600ms' }}>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
            Available for opportunities
          </div>
        )}
      </div>
    </section>
  );
}
