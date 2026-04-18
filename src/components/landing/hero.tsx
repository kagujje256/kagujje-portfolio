"use client";

import Image from "next/image";
import type { Profile, SocialLink, PageSection, SiteSettings } from "@/lib/types";
import {
  FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaYoutube,
  FaTiktok, FaFacebook, FaGlobe, FaEnvelope, FaWhatsapp,
  FaSpotify, FaTelegram, FaSnapchat, FaPinterest, FaDollarSign,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Sparkles, MapPin } from "lucide-react";

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
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent animate-gradient-shift" />
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--accent)]/5 blur-[150px] animate-pulse" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[var(--accent)]/3 blur-[100px] animate-float" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px),
                          linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className={`relative z-10 mx-auto max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Professional Avatar - Clean, no decorations */}
        <div className="mx-auto mb-10 relative">
          <div className="relative h-44 w-44 mx-auto overflow-hidden rounded-full border-2 border-[var(--accent)]/40 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/20 hover:scale-105">
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

        {/* Brand Name */}
        <h1 className="mb-4 font-['Playfair_Display'] text-6xl font-bold tracking-tight md:text-7xl">
          <span className="bg-gradient-to-r from-white via-[var(--accent)] to-white bg-clip-text text-transparent animate-shimmer-text">
            {section?.heading || profile?.full_name || "KAGUJJE"}
          </span>
        </h1>

        {/* The Big Brand - Prominent */}
        <p className="mb-6 font-['Playfair_Display'] text-2xl md:text-3xl font-light italic tracking-[0.2em] text-[var(--accent)]">
          {motto}
        </p>

        {/* Tagline */}
        <p className="mb-4 text-xl text-[var(--text-secondary)] md:text-2xl">
          {profile?.tagline || "Creative Professional & Brand Owner"}
        </p>

        {/* Bio */}
        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]/80">
          {section?.body || profile?.bio || "Welcome to my portfolio."}
        </p>

        {/* Social Links - Vertical Layout */}
        <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
          {links.map((link, index) => {
            const Icon = iconMap[link.icon] || FaGlobe;
            const isCTA = link.platform.toLowerCase().includes("trading") || link.platform.toLowerCase().includes("start");
            
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group w-full flex items-center justify-center gap-3 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                  isCTA
                    ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] border-transparent px-6 py-4 text-[var(--bg-primary)] font-semibold text-lg hover:shadow-lg hover:shadow-[var(--accent)]/30"
                    : "border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-3.5 text-[var(--text-secondary)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] hover:bg-[var(--bg-tertiary)]"
                }`}
                style={{ 
                  animationDelay: `${0.5 + index * 0.1}s`,
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease-out ${0.5 + index * 0.1}s forwards`
                }}
              >
                <Icon size={isCTA ? 22 : 18} />
                <span>{link.platform}</span>
                {isCTA && <Sparkles size={16} className="ml-1" />}
              </a>
            );
          })}
        </div>

        {/* Location - Clean */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
          <MapPin size={16} />
          <span>{profile?.location || "Kampala, Uganda"}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes shimmer-text {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }
        .animate-shimmer-text {
          background-size: 200% auto;
          animation: shimmer-text 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
