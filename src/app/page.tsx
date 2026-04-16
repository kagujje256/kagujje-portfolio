import Hero from '@/components/landing/hero';
import ProjectsSection from '@/components/landing/projects-section';
import BusinessUnitsSection from '@/components/landing/business-units-section';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <BusinessUnitsSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}