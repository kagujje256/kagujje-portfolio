import { createServerSupabase } from "@/lib/supabase-server";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { TelegramChat } from "@/components/landing/telegram-chat";
import type { PageSection, SiteSettings, Profile } from "@/lib/types";
import Image from "next/image";
import { Code, Smartphone, Globe, TrendingUp, Heart, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About | KAGUJJE",
  description: "Learn about KAGUJJE - Creative Professional & Brand Owner based in Kampala, Uganda",
};

const services = [
  { icon: Globe, title: "Website Development", desc: "Custom websites, landing pages, e-commerce, and web applications" },
  { icon: Smartphone, title: "Phone MDM Services", desc: "Mobile device management and security solutions" },
  { icon: Code, title: "Software Installation", desc: "Professional software setup and configuration" },
  { icon: TrendingUp, title: "Trading Guidance", desc: "Exness platform setup and trading basics" },
];

export default async function AboutPage() {
  const supabase = await createServerSupabase();
  const [profileRes, footerRes, settingsRes] = await Promise.all([
    supabase.from("profile").select("*").limit(1).single(),
    supabase.from("page_sections").select("*").eq("section_key", "footer").single(),
    supabase.from("site_settings").select("*").limit(1).single(),
  ]);

  const profile = profileRes.data as Profile | null;

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <TelegramChat />
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-8 h-48 w-48 overflow-hidden rounded-full">
            {profile?.avatar_url ? (
              <Image src={profile.avatar_url} alt={profile.full_name || "Profile"} width={192} height={192} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-6xl font-bold text-[var(--accent)]">K</div>
            )}
          </div>
          <h1 className="mb-4 font-['Playfair_Display'] text-5xl font-bold text-white">
            {profile?.full_name || "Kasiba Shardick"}
          </h1>
          <p className="text-xl text-[var(--accent)]">{profile?.tagline || "Creative Professional & Brand Owner"}</p>
        </div>

        {/* Story Section */}
        <section className="mb-16 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-white">The Story</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              KAGUJJE is more than a brand—it's a vision. Founded by Kasiba Shardick in Kampala, Uganda, 
              KAGUJJE represents the intersection of creativity, technology, and ambition.
            </p>
            <p>
              With a passion for technology and a drive for excellence, I help businesses and individuals 
              establish their digital presence. From stunning websites to complex software solutions, 
              from mobile device management to trading guidance—every project is an opportunity to create something meaningful.
            </p>
            <p>
              The motto <span className="text-[var(--accent)] font-semibold">"THE BIG BRAND"</span> isn't just words. 
              It's a commitment to delivering big results, big impact, and big dreams turned into reality.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-semibold text-white text-center">What I Do</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition-all hover:border-[var(--accent)]/30">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900">
                  <s.icon className="text-[var(--accent)]" size={24} />
                </div>
                <h3 className="mb-2 font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-zinc-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-white">Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <Zap className="mx-auto mb-2 text-[var(--accent)]" size={32} />
              <h3 className="font-semibold text-white">Speed</h3>
              <p className="text-sm text-zinc-500">Fast delivery without compromising quality</p>
            </div>
            <div className="text-center">
              <Heart className="mx-auto mb-2 text-[var(--accent)]" size={32} />
              <h3 className="font-semibold text-white">Passion</h3>
              <p className="text-sm text-zinc-500">Every project is built with care</p>
            </div>
            <div className="text-center">
              <TrendingUp className="mx-auto mb-2 text-[var(--accent)]" size={32} />
              <h3 className="font-semibold text-white">Growth</h3>
              <p className="text-sm text-zinc-500">Helping clients scale and succeed</p>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="text-center">
          <p className="text-zinc-500">📍 Based in {profile?.location || "Kampala, Uganda"} — Serving clients worldwide</p>
        </section>
      </div>
      <Footer section={(footerRes.data as PageSection) || null} settings={(settingsRes.data as SiteSettings) || null} />
    </main>
  );
}
