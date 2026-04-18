"use client";

import Image from "next/image";
import type { Profile, SocialLink, PageSection, SiteSettings } from "@/lib/types";
import {
  FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaYoutube,
  FaTiktok, FaFacebook, FaGlobe, FaEnvelope, FaWhatsapp,
  FaSpotify, FaTelegram, FaSnapchat, FaPinterest,
} from "react-icons/fa6";
import { useScrollAnimation, useMousePosition } from "@/hooks/useScrollAnimation";

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
  const motto = "THE BIG BRAND";
  const [heroRef, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const mousePosition = useMousePosition();

  return (
    <section
      ref={heroRef}
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Animated background effects */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      />
      
      {/* Floating orbs */}
      <div 
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-[100px] animate-float"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-[var(--accent)]/5 blur-[80px] animate-float"
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute left-1/2 bottom-1/4 h-32 w-32 rounded-full bg-[var(--accent)]/8 blur-[60px] animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className={`relative z-10 mx-auto max-w-4xl text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Avatar with glow */}
        <div className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-[var(--accent)]/50 shadow-2xl shadow-[var(--accent)]/30 animate-bounce-in hover-glow">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name || "Profile"}
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <Image
              src="/avatar.png"
              alt="KAGUJJE"
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          )}
        </div>

        {/* Brand Name with gradient */}
        <h1 className="mb-4 font-['Playfair_Display'] text-6xl font-bold tracking-tight md:text-8xl animate-fade-in-up">
          <span className="text-gradient">{section?.heading || profile?.full_name || "KAGUJJE"}</span>
        </h1>

        {/* Motto with typewriter effect */}
        <p className="mb-8 font-light italic tracking-[0.3em] text-[var(--accent)] text-xl md:text-2xl animate-fade-in-up delay-200">
          {motto}
        </p>

        {/* Animated line */}
        <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent animate-fade-in delay-300" />

        {/* Tagline */}
        <p className="mb-2 text-xl text-[var(--text-secondary)] md:text-2xl animate-fade-in-up delay-400">
          {profile?.tagline || "Creative Professional"}
        </p>

        {/* Bio */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]/80 animate-fade-in-up delay-500">
          {section?.body || profile?.bio || "Welcome to my portfolio."}
        </p>

        {/* Social Links */}
        {links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up delay-600">
            {links.map((link, index) => {
              const Icon = iconMap[link.icon] || FaGlobe;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-2.5 text-sm text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon size={16} />
                  <span>{link.platform}</span>
                </a>
              );
            })}
          </div>
        )}

        {/* Location & Status */}
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-[var(--text-secondary)] animate-fade-in-up delay-700">
          {profile?.location && <span>{profile.location}</span>}
          {profile?.available_for_hire && (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available for work
            </span>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-1000">
          <a 
            href="#ventures" 
            className="flex flex-col items-center gap-2 text-[var(--text-secondary)]/50 hover:text-[var(--accent)] transition-colors"
          >
            <span className="text-xs tracking-widest">SCROLL</span>
            <div className="h-8 w-px bg-gradient-to-b from-[var(--accent)] to-transparent animate-pulse" />
          </a>
        </div>
      </div>
    </section>
  );
}
