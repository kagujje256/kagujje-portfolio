import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: ["We build", "digital", "experiences"],
    subtitle: "Services that ease daily work, solve problems, and make life enjoyable.",
    image: "https://images.unsplash.com/photo-1618005182384-a83e8c230bc9?q=80&w=1920&auto=format&fit=crop",
  },
  {
    title: ["Cinematic", "storytelling", "unleashed"],
    subtitle: "From vision to screen. Movies that move audiences worldwide.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f8afaq?q=80&w=1920&auto=format&fit=crop",
  },
  {
    title: ["Financial", "freedom", "decoded"],
    subtitle: "Smart tools for forex, crypto, and wealth building.",
    image: "https://images.unsplash.com/photo-1611974789855-0c3b8f06e1b9?q=80&w=1920&auto=format&fit=crop",
  },
];

const projects = [
  { name: "CHAT28", url: "https://chat28.kagujje.com", status: "LIVE", year: "2024" },
  { name: "MDM28", url: "https://mdm28.kagujje.com", status: "LIVE", year: "2024" },
  { name: "MOVIES", url: "https://movies.kagujje.com", status: "2026", year: "2026" },
  { name: "FOREX", url: "https://forex.kagujje.com", status: "2026", year: "2026" },
  { name: "CRYPTO", url: "https://crypto.kagujje.com", status: "2026", year: "2026" },
  { name: "MORE", url: "#", status: "BUILDING", year: "2026" },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "10M+", label: "Views Generated" },
  { value: "25+", label: "Countries Reached" },
  { value: "100+", label: "Clients Served" },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
      setTimeout(() => setIsLoaded(true), 100);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide hero
  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isLoaded]);

  // GSAP scroll animations
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="bg-[#050505] text-white overflow-x-hidden selection:bg-white/20">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/80 z-[100] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Preloader */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-bold tracking-[-0.04em] mb-2">KAGUJJE</div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-[1px] w-32 mx-auto bg-white/40"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a
            href="/"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl font-semibold tracking-[-0.02em]"
          >
            KAGUJJE
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center gap-10"
          >
            {["Services", "Projects", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-[0.02em]"
              >
                {item}
              </a>
            ))}
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="px-5 py-2.5 border border-white/20 text-sm hover:bg-white hover:text-black transition-all duration-300 tracking-[0.02em]"
          >
            Let's Talk
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slides[currentSlide].image}
                alt=""
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center px-6 md:px-12">
              <div className="max-w-7xl mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-6"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Kasiba Shardick
                  </span>
                </motion.div>

                <div className="space-y-2">
                  {slides[currentSlide].title.map((line, i) => (
                    <motion.div
                      key={`${currentSlide}-${line}-${i}`}
                      initial={{ opacity: 0, y: 60, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.15 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <h1
                        className={`text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.9] tracking-[-0.03em] ${
                          i === 1 ? "text-white/90" : "text-white/30"
                        }`}
                      >
                        {line}
                      </h1>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-8 h-[2px] transition-all duration-300 ${
                i === currentSlide ? "bg-white" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 right-12 text-xs uppercase tracking-[0.2em] text-white/30"
        >
          Scroll
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="reveal-section"
              >
                <div className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="reveal-section mb-16 md:mb-24"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em]">
              Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Movies",
                desc: "Cinematic storytelling for global audiences. From script to screen.",
                url: "https://movies.kagujje.com",
                img: "https://images.unsplash.com/photo-1489599825675-39f3296886f6?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Forex",
                desc: "Smart trading tools and market insights for financial growth.",
                url: "https://forex.kagujje.com",
                img: "https://images.unsplash.com/photo-1611974789855-0c3b8f06e1b9?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Crypto",
                desc: "Navigate the crypto landscape with confidence and clarity.",
                url: "https://crypto.kagujje.com",
                img: "https://images.unsplash.com/photo-1639762681485-074b56ceb20e?q=80&w=800&auto=format&fit=crop",
              },
            ].map((service, i) => (
              <motion.a
                key={service.title}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group reveal-section relative overflow-hidden aspect-[4/5] bg-white/5"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="parallax-img absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
                    Service
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{service.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-white/40 group-hover:text-white transition-colors">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-40 px-6 md:px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="reveal-section mb-16 md:mb-24"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block">
              Our Work
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em]">
              Projects
            </h2>
          </motion.div>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="reveal-section group flex items-center justify-between py-8 border-t border-white/10 hover:border-white/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-8">
                  <span className="text-sm text-white/30 w-12">{project.year}</span>
                  <h3 className="text-2xl md:text-4xl font-bold group-hover:translate-x-4 transition-transform duration-300">
                    {project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-6">
                  <span
                    className={`text-xs uppercase tracking-[0.15em] ${
                      project.status === "LIVE" ? "text-green-400" : "text-white/30"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-white/30 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="reveal-section order-2 md:order-1"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block">
                About
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-8">
                Building ideas<br />one by one.
              </h2>
              <div className="space-y-6 text-white/50 leading-relaxed">
                <p>
                  I'm Kasiba Shardick, a content creator and digital innovator building 
                  experiences that matter. From cinematic storytelling to financial tools, 
                  each project solves real problems.
                </p>
                <p>
                  The mission is simple: create services that change the world, 
                  ease daily work, and make life enjoyable. No hype—just results.
                </p>
              </div>
              <div className="mt-12 flex gap-4">
                <a
                  href="https://github.com/kagujje256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/20 text-sm hover:bg-white hover:text-black transition-all duration-300"
                >
                  GitHub
                </a>
                <a
                  href="https://wa.me/256708886600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-black text-sm hover:bg-white/90 transition-all duration-300"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="reveal-section order-1 md:order-2 aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83e8c230bc9?q=80&w=800&auto=format&fit=crop"
                alt="Digital creation"
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="reveal-section"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] mb-8">
              Let's build<br />
              <span className="text-white/30">something great.</span>
            </h2>
            <p className="text-lg text-white/40 mb-12 max-w-md mx-auto">
              Ready to bring your vision to life? Let's collaborate.
            </p>
            <a
              href="https://wa.me/256708886600"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Start a Project</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-semibold tracking-[-0.02em]">KAGUJJE</div>
          <div className="text-sm text-white/30">
            © 2025 Kagujje. All rights reserved.
          </div>
          <div className="flex gap-6">
            {["GitHub", "Twitter", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/256708886600"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isLoaded ? 1 : 0, opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.377l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}
