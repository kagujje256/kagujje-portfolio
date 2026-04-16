import { createServerSupabase } from "@/lib/supabase-server";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ProjectsSection } from "@/components/landing/projects-section";
import { BusinessUnitsSection } from "@/components/landing/business-units-section";
import { WritingsSection } from "@/components/landing/writings-section";
import { ContactSection } from "@/components/landing/contact-section";
import { Footer } from "@/components/landing/footer";
import type {
  Profile, SocialLink, Project, Writing,
  BusinessUnit, PageSection, SiteSettings,
} from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

async function getData() {
  const supabase = await createServerSupabase();

  const [profileRes, linksRes, projectsRes, writingsRes, unitsRes, sectionsRes, settingsRes] =
    await Promise.all([
      supabase.from("profile").select("*").limit(1).single(),
      supabase.from("social_links").select("*").eq("is_visible", true).order("display_order"),
      supabase.from("projects").select("*").eq("is_visible", true).order("display_order"),
      supabase.from("writings").select("*").eq("is_published", true).order("published_at", { ascending: false }).limit(4),
      supabase.from("business_units").select("*").eq("is_visible", true).order("display_order"),
      supabase.from("page_sections").select("*"),
      supabase.from("site_settings").select("*").limit(1).single(),
    ]);

  const sections = (sectionsRes.data as PageSection[]) || [];
  const sectionMap: Record<string, PageSection> = {};
  sections.forEach((s) => { sectionMap[s.section_key] = s; });

  return {
    profile: (profileRes.data as Profile) || null,
    links: (linksRes.data as SocialLink[]) || [],
    projects: (projectsRes.data as Project[]) || [],
    writings: (writingsRes.data as Writing[]) || [],
    units: (unitsRes.data as BusinessUnit[]) || [],
    sections: sectionMap,
    settings: (settingsRes.data as SiteSettings) || null,
  };
}

export default async function HomePage() {
  const { profile, links, projects, writings, units, sections, settings } = await getData();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero profile={profile} links={links} section={sections.hero || null} settings={settings} />
      <BusinessUnitsSection units={units} section={sections.business_units || null} />
      <ProjectsSection projects={projects} section={sections.projects || null} />
      <WritingsSection writings={writings} section={sections.writings || null} />
      <ContactSection profile={profile} section={sections.contact || null} />
      <Footer section={sections.footer || null} settings={settings} />
    </main>
  );
}
