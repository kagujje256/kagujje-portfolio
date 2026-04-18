"use client";

import Image from "next/image";
import type { Profile, SocialLink, PageSection, SiteSettings } from "@/lib/types";
import {
  FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaYoutube,
  FaTiktok, FaFacebook, FaGlobe, FaEnvelope, FaWhatsapp,
  FaSpotify, FaTelegram, FaSnapchat, FaPinterest, FaDollarSign,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FaGithub, twitter: FaTwitter, linkedin: FaLinkedin,
  instagram: FaInstagram, youtube: FaYoutube, tiktok: FaTiktok,
  facebook: FaFacebook, website: FaGlobe, email: FaEnvelope,
  whatsapp: FaWhatsapp, spotify: FaSpotify, telegram: FaTelegram,
  snapchat: FaSnapchat, pinterest: FaPinterest, link: FaGlobe,
  "whatsapp-channel": FaWhatsapp,
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Luxury animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent" />
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--accent)]/5 blur-[150px] animate-pulse" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[var(--accent)]/20 rounded-full animate-float"
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
        {/* Avatar - Professional Frame */}
        <div className="mx-auto mb-10 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent)] via-yellow-300 to-[var(--accent)] blur-xl opacity-30 animate-pulse" />
          <div className="relative h-44 w-44 mx-auto rounded-full p-1 bg-gradient-to-r from-[var(--accent)] via-yellow-300 to-[var(--accent)] shadow-2xl shadow-[var(--accent)]/30">
            <div className="h-full w-full rounded-full overflow-hidden bg-[var(--bg-secondary)]">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name || "Profile"}
                  width={176}
                  height={176}
                  className="h-full w-full object-cover object-top"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-5xl font-bold text-[var(--bg-primary)]">
                  {(profile?.full_name || "K").charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LUXURY Brand Name - Extra Noticeable */}
        <div className="mb-4 relative">
          {/* Glow effect behind */}
          <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
          
          <h1 className="relative font-['Playfair_Display'] text-7xl md:text-9xl font-black tracking-[0.1em] uppercase">
            <span className="bg-gradient-to-r from-[var(--accent)] via-yellow-200 to-[var(--accent)] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(201,168,76,0.5)] animate-shimmer-bg bg-[length:200%_100%]">
              {section?.heading || "KAGUJJE"}
            </span>
          </h1>
        </div>

        {/* Motto with luxury styling */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/20 to-[var(--accent)]/10 border border-[var(--accent)]/30">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--accent)]" />
            <p className="font-light tracking-[0.4em] text-[var(--accent)] text-sm md:text-base uppercase">
              {motto}
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--accent)]" />
          </div>
        </div>

        {/* Tagline */}
        <p className="mb-4 text-xl md:text-2xl text-[var(--text-primary)] font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {profile?.tagline || "Creative Professional & Brand Owner"}
        </p>

        {/* Bio */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {section?.body || profile?.bio || "Welcome to my portfolio."}
        </p>

        {/* Social Links - Vertical List */}
        {links.length > 0 && (
          <div className="flex flex-col items-center gap-3 mb-10 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            {links.map((link, index) => {
              const Icon = iconMap[link.icon] || FaGlobe;
              const isCTA = link.platform.toLowerCase().includes("trading") || link.platform.toLowerCase().includes("start");
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center gap-3 rounded-full border transition-all duration-300 hover:scale-105 w-64 ${
                    isCTA
                      ? "bg-gradient-to-r from-[var(--accent)] to-yellow-500 border-[var(--accent)] px-6 py-3.5 text-[var(--bg-primary)] font-bold hover:shadow-lg hover:shadow-[var(--accent)]/50"
                      : "border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur px-6 py-3 text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--bg-secondary)]"
                  }`}
                  style={{ animationDelay: `${0.9 + index * 0.05}s` }}
                >
                  <Icon size={isCTA ? 22 : 18} />
                  <span className="text-sm md:text-base">{link.platform}</span>
                </a>
              );
            })}
          </div>
        )}

        {/* Location */}
        <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-secondary)] animate-fade-in" style={{ animationDelay: '1.2s' }}>
          {profile?.location && (
            <span className="flex items-center gap-2">
              📍 {profile.location}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
