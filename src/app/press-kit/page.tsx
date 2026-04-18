import { createServerSupabase } from "@/lib/supabase-server";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import type { PageSection, SiteSettings, Profile } from "@/lib/types";
import Image from "next/image";
import { Download, FileText, Image as ImageIcon, Mail, MapPin, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Press Kit | KAGUJJE",
  description: "Official press kit for KAGUJJE - Download photos, logos, and media resources",
};

export default async function PressKitPage() {
  const supabase = await createServerSupabase();

  const [profileRes, footerRes, settingsRes] = await Promise.all([
    supabase.from("profile").select("*").limit(1).single(),
    supabase.from("page_sections").select("*").eq("section_key", "footer").single(),
    supabase.from("site_settings").select("*").limit(1).single(),
  ]);

  const profile = profileRes.data as Profile | null;
  const settings = settingsRes.data as SiteSettings | null;

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-4 font-['Playfair_Display'] text-5xl font-bold text-white">
          Press <span className="text-[var(--accent)]">Kit</span>
        </h1>
        <p className="mb-12 text-lg text-zinc-400">
          Official media resources for KAGUJJE. All materials are free to use for press, media, and partnerships.
        </p>

        {/* Bio Section */}
        <section className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-white">Short Bio</h2>
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
              {profile?.avatar_url ? (
                <Image src={profile.avatar_url} alt={profile.full_name || "Profile"} width={96} height={96} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-2xl font-bold text-[var(--accent)]">K</div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{profile?.full_name || "Kasiba Shardick"}</h3>
              <p className="text-zinc-400">{profile?.tagline || "Creative Professional & Brand Owner"}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1"><MapPin size={14} /> {profile?.location || "Kampala, Uganda"}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> Est. 2024</span>
              </div>
              <p className="mt-4 text-zinc-300 leading-relaxed">
                {profile?.bio || "KAGUJJE is a creative brand specializing in website development, software installation, phone MDM services, and digital solutions. Based in Uganda, serving clients globally."}
              </p>
            </div>
          </div>
        </section>

        {/* Downloadable Assets */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">Download Assets</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900">
                  <ImageIcon className="text-[var(--accent)]" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Profile Photo</h3>
                  <p className="text-sm text-zinc-500">High resolution PNG</p>
                </div>
              </div>
              <a href={profile?.avatar_url || "/avatar-final.png"} download className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline">
                <Download size={16} /> Download (PNG)
              </a>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900">
                  <FileText className="text-[var(--accent)]" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Brand Logo</h3>
                  <p className="text-sm text-zinc-500">SVG / PNG formats</p>
                </div>
              </div>
              <a href="/logo.svg" download className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline">
                <Download size={16} /> Download Logo
              </a>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-white">Quick Facts</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm text-zinc-500 mb-1">Brand Name</h4>
              <p className="text-white">KAGUJJE</p>
            </div>
            <div>
              <h4 className="text-sm text-zinc-500 mb-1">Tagline</h4>
              <p className="text-white">THE BIG BRAND</p>
            </div>
            <div>
              <h4 className="text-sm text-zinc-500 mb-1">Founded</h4>
              <p className="text-white">2024</p>
            </div>
            <div>
              <h4 className="text-sm text-zinc-500 mb-1">Location</h4>
              <p className="text-white">Kampala, Uganda</p>
            </div>
            <div>
              <h4 className="text-sm text-zinc-500 mb-1">Services</h4>
              <p className="text-white">Web Development, Software, MDM, Trading</p>
            </div>
            <div>
              <h4 className="text-sm text-zinc-500 mb-1">Contact</h4>
              <p className="text-white">dicksonkagujje@gmail.com</p>
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-white">Media Inquiries</h2>
          <p className="mb-6 text-zinc-400">For interviews, features, or partnerships, reach out directly:</p>
          <a href="mailto:dicksonkagujje@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3 font-medium text-black hover:bg-[var(--accent-hover)]">
            <Mail size={18} /> dicksonkagujje@gmail.com
          </a>
        </section>
      </div>
      <Footer section={(footerRes.data as PageSection) || null} settings={(settingsRes.data as SiteSettings) || null} />
    </main>
  );
}
