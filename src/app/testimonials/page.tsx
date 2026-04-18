import { createServerSupabase } from "@/lib/supabase-server";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { TelegramChat } from "@/components/landing/telegram-chat";
import type { PageSection, SiteSettings } from "@/lib/types";
import { Quote, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Testimonials | KAGUJJE",
  description: "What clients say about KAGUJJE - Web development, software, and digital services",
};

const testimonials = [
  {
    name: "Sarah N.",
    role: "Business Owner",
    content: "KAGUJJE transformed my business with a stunning website. Professional, fast, and incredibly responsive.",
    rating: 5,
  },
  {
    name: "Michael K.",
    role: "Entrepreneur",
    content: "The software installation service saved me hours. Everything works perfectly. Highly recommended!",
    rating: 5,
  },
  {
    name: "Grace A.",
    role: "Content Creator",
    content: "From concept to launch in record time. KAGUJJE truly understands what a brand needs to stand out.",
    rating: 5,
  },
];

export default async function TestimonialsPage() {
  const supabase = await createServerSupabase();
  const [footerRes, settingsRes] = await Promise.all([
    supabase.from("page_sections").select("*").eq("section_key", "footer").single(),
    supabase.from("site_settings").select("*").limit(1).single(),
  ]);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <TelegramChat />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-4 font-['Playfair_Display'] text-5xl font-bold text-white">
          Client <span className="text-[var(--accent)]">Testimonials</span>
        </h1>
        <p className="mb-12 text-lg text-zinc-400">
          Real feedback from real clients. Their words speak for the quality of service.
        </p>

        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
              <div className="flex items-start gap-4">
                <Quote className="flex-shrink-0 text-[var(--accent)] opacity-50" size={32} />
                <div className="flex-1">
                  <p className="text-lg text-zinc-300 leading-relaxed">"{t.content}"</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-sm text-zinc-500">{t.role}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} size={16} className="fill-[var(--accent)] text-[var(--accent)]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Ready to Work Together?</h3>
          <p className="text-zinc-400 mb-4">Let's build something amazing for your brand.</p>
          <a href="mailto:dicksonkagujje@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-black hover:bg-[var(--accent-hover)]">
            Get Started
          </a>
        </div>
      </div>
      <Footer section={(footerRes.data as PageSection) || null} settings={(settingsRes.data as SiteSettings) || null} />
    </main>
  );
}
