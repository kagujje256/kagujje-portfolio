import { createServerSupabase } from "@/lib/supabase-server";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { TelegramChat } from "@/components/landing/telegram-chat";
import type { PageSection, SiteSettings } from "@/lib/types";
import { ChevronDown } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAQ | KAGUJJE",
  description: "Frequently asked questions about KAGUJJE services",
};

const faqs = [
  {
    question: "What services does KAGUJJE offer?",
    answer: "KAGUJJE provides website development, software installation, phone MDM (Mobile Device Management) services, and trading guidance through Exness. We help businesses and individuals establish and grow their digital presence.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "Project timelines vary based on complexity. A simple landing page can be ready in 2-3 days, while a full-featured website typically takes 1-2 weeks. I'll provide a detailed timeline after understanding your requirements.",
  },
  {
    question: "What are your rates?",
    answer: "Pricing depends on project scope. Contact me with your requirements, and I'll provide a customized quote. I work with budgets of all sizes and offer flexible payment options.",
  },
  {
    question: "Do you work with clients outside Uganda?",
    answer: "Absolutely! I serve clients globally. Communication happens via Telegram, email, or video calls. Payments can be made via various international methods.",
  },
  {
    question: "What is the Exness trading service?",
    answer: "I help people get started with trading on Exness, a leading forex platform. Whether you're new to trading or looking for guidance, I can help you set up and understand the basics.",
  },
  {
    question: "How do I contact KAGUJJE?",
    answer: "You can reach me via email at dicksonkagujje@gmail.com, Telegram @kagujje, or through the contact section on this website. I typically respond within a few hours.",
  },
];

export default async function FAQPage() {
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
          Frequently Asked <span className="text-[var(--accent)]">Questions</span>
        </h1>
        <p className="mb-12 text-lg text-zinc-400">
          Got questions? I've got answers. If you don't find what you're looking for, feel free to reach out directly.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
              <summary className="flex cursor-pointer items-center justify-between p-6 text-left">
                <span className="font-medium text-white">{faq.question}</span>
                <ChevronDown size={20} className="text-zinc-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-zinc-800 px-6 pb-6">
                <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Still have questions?</h3>
          <p className="text-zinc-400 mb-4">I'm here to help. Reach out directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:dicksonkagujje@gmail.com" className="rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-black hover:bg-[var(--accent-hover)]">
              Send Email
            </a>
            <a href="https://t.me/kagujje" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-white hover:bg-zinc-800">
              Chat on Telegram
            </a>
          </div>
        </div>
      </div>
      <Footer section={(footerRes.data as PageSection) || null} settings={(settingsRes.data as SiteSettings) || null} />
    </main>
  );
}
