"use client";

import Image from "next/image";
import type { Profile, SocialLink, PageSection, SiteSettings } from "@/lib/types";
import {
  FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaYoutube,
  FaTiktok, FaFacebook, FaGlobe, FaEnvelope, FaWhatsapp,
  FaSpotify, FaTelegram, FaSnapchat, FaPinterest,
} from "react-icons/fa6";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FaGithub, twitter: FaTwitter, linkedin: FaLinkedin,
  instagram: FaInstagram, youtube: FaYoutube, tiktok: FaTiktok,
  facebook: FaFacebook, website: FaGlobe, email: FaEnvelope,
  whatsapp: FaWhatsapp, spotify: FaSpotify, telegram: FaTelegram,
  snapchat: FaSnapchat, pinterest: FaPinterest, link: FaGlobe,
};

interface HeroProps {
  profile: Profile | null;
  links: SocialLink[];
  section: PageSection | null;
  settings: SiteSettings | null;
}

export function Hero({ profile, links, section, settings }: HeroProps) {
  const motto = settings?.motto || section?.subheading || "just a brand";

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent" />
      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--accent)]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Avatar */}
        <div className="mx-auto mb-8 h-36 w-36 overflow-hidden rounded-full border-2 border-[var(--accent)]/30 shadow-2xl shadow-[var(--accent)]/10">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name || "Profile"}
              width={144}
              height={144}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[var(--bg-tertiary)] text-4xl font-bold text-[var(--accent)]">
              {(profile?.full_name || "K").charAt(0)}
            </div>
          )}
        </div>

        {/* Brand Name */}
        <h1 className="mb-3 font-['Playfair_Display'] text-5xl font-bold tracking-tight md:text-7xl">
          {section?.heading || profile?.full_name || "KAGUJJE"}
        </h1>

        {/* Motto */}
        <p className="mb-6 font-light italic tracking-widest text-[var(--accent)] text-lg md:text-xl">
          {motto}
        </p>

        {/* Tagline */}
        <p className="mb-2 text-xl text-[var(--text-secondary)] md:text-2xl">
          {profile?.tagline || "Creative Professional"}
        </p>

        {/* Bio */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]/80">
          {section?.body || profile?.bio || "Welcome to my portfolio."}
        </p>

        {/* Social Links */}
        {links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {links.map((link) => {
              const Icon = iconMap[link.icon] || FaGlobe;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-2.5 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon size={16} />
                  <span>{link.platform}</span>
                </a>
              );
            })}
          </div>
        )}

        {/* Location & Status */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--text-secondary)]">
          {profile?.location && <span>{profile.location}</span>}
          {profile?.available_for_hire && (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available for work
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
