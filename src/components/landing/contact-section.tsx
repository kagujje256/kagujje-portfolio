"use client";

import type { Profile, PageSection } from "@/lib/types";
import { Mail, MapPin } from "lucide-react";

interface Props {
  profile: Profile | null;
  section: PageSection | null;
}

export function ContactSection({ profile, section }: Props) {
  return (
    <section id="contact" className="bg-[var(--bg-secondary)] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
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

        <div className="flex flex-col items-center gap-4">
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-8 py-4 text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Mail size={20} />
              <span>{profile.email}</span>
            </a>
          )}
          {profile?.location && (
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <MapPin size={18} />
              <span>{profile.location}</span>
            </div>
          )}
        </div>

        {profile?.resume_url && (
          <a
            href={profile.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-lg bg-[var(--accent)] px-8 py-3 font-medium text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Download Resume
          </a>
        )}
      </div>
    </section>
  );
}
