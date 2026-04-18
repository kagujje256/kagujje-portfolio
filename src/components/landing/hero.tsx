"use client";

import Image from "next/image";
import type { Profile, SocialLink, PageSection, SiteSettings } from "@/lib/types";
import {
  FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaYoutube,
  FaTiktok, FaFacebook, FaGlobe, FaEnvelope, FaWhatsapp,
  FaSpotify, FaTelegram, FaSnapchat, FaPinterest, FaDollarSign,
} from "react-icons/fa6";
import { TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FaGithub, twitter: FaTwitter, linkedin: FaLinkedin,
  instagram: FaInstagram, youtube: FaYoutube, tiktok: FaTiktok,
  facebook: FaFacebook, website: FaGlobe, email: FaEnvelope,
  whatsapp: FaWhatsapp, spotify: FaSpotify, telegram: FaTelegram,
  snapchat: FaSnapchat, pinterest: FaPinterest, link: FaGlobe,
  "trending-up": FaGlobe,
  "dollar-sign": FaDollarSign,
};

interface HeroProps {
  profile: Profile | null;
  links: SocialLink[];
  section: PageSection | null;
  settings: SiteSettings | null;
}

export function Hero({ profile, links, section, settings }: HeroProps) {
  const motto = settings?.motto || "THE BIG BRAND";
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      ref={heroRef}
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 via-transparent to-transparent" />
      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-[120px] animate-pulse" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[var(--accent)]/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 mx-auto max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Avatar with glow effect */}
        <div className="mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-[var(--accent)]/20 blur-2xl animate-pulse" />
          <div className="relative h-40 w-40 mx-auto overflow-hidden rounded-full border-4 border-[var(--accent)]/50 shadow-2xl shadow-[var(--accent)]/20 transition-transform duration-500 hover:scale-105">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || "Profile"}
                width={160}
                height={160}
                className="h-full w-full object-cover object-top"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-5xl font-bold text-[var(--bg-primary)]">
                {(profile?.full_name || "K").charAt(0)}
              </div>
            )}
          </div>
          {/* Online status */}
          {profile?.available_for_hire && (
            <div className="absolute bottom-2 right-1/2 translate-x-16 bg-green-500 rounded-full p-1.5 border-2 border-[var(--bg-primary)]">
              <Sparkles size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Brand Name with gradient */}
        <h1 className="mb-3 font-['Playfair_Display'] text-6xl font-bold tracking-tight md:text-8xl bg-gradient-to-r from-white via-[var(--accent)] to-white bg-clip-text text-transparent animate-gradient">
          {section?.heading || profile?.full_name || "KAGUJJE"}
        </h1>

        {/* Motto with typing effect */}
        <p className="mb-6 font-light italic tracking-[0.3em] text-[var(--accent)] text-lg md:text-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {motto}
        </p>

        {/* Tagline */}
        <p className="mb-3 text-xl text-[var(--text-secondary)] md:text-2xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {profile?.tagline || "Creative Professional & Brand Owner"}
        </p>

        {/* Bio */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]/80 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          {section?.body || profile?.bio || "Welcome to my portfolio."}
        </p>

        {/* Social Links - Enhanced */}
        {links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            {links.map((link, index) => {
              const Icon = iconMap[link.icon] || FaGlobe;
              const isCTA = link.platform.toLowerCase().includes("trading") || link.platform.toLowerCase().includes("start");
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2 rounded-full border transition-all duration-300 hover:scale-105 ${
                    isCTA
                      ? "bg-[var(--accent)] border-[var(--accent)] px-6 py-3 text-[var(--bg-primary)] font-semibold hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-[var(--accent)]/30"
                      : "border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-2.5 text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <Icon size={isCTA ? 20 : 16} />
                  <span>{link.platform}</span>
                </a>
              );
            })}
          </div>
        )}

        {/* Location & Status */}
        <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-secondary)] animate-fade-in" style={{ animationDelay: '1.2s' }}>
          {profile?.location && (
            <span className="flex items-center gap-2">
              📍 {profile.location}
            </span>
          )}
          {profile?.available_for_hire && (
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available for work
            </span>
          )}
        </div>

        {/* Scroll indicator */}
        <a 
          href="#ventures" 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-secondary)] animate-bounce"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
