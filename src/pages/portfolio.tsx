import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { 
  ArrowRight, 
  ExternalLink, 
  Mail, 
  MessageSquare, 
  Play, 
  Globe, 
  BarChart, 
  ShieldCheck, 
  Zap,
  Github,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: ["Mastering", "the Digital", "Horizon"],
    subtitle: "Strategic development and cinematic production for the modern age. We build digital powerhouses that redefine industry standards.",
    image: "https://picsur.org/i/2faec644-c240-43fd-84d4-dac2b48a9595.jpg",
    topic: "Innovation"
  },
  {
    title: ["Cinematic", "storytelling", "unleashed"],
    subtitle: "From vision to screen. Movies that move audiences worldwide and define digital excellence.",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1920&auto=format&fit=crop",
    topic: "Media"
  },
  {
    title: ["Ugandan", "Entertainment", "Platform"],
    subtitle: "UGMovies - Stream the best of Ugandan and East African cinema. Premium entertainment for the region.",
    image: "https://images.unsplash.com/photo-1489599840318-1b8d36bc1a2c?q=80&w=1920&auto=format&fit=crop",
    topic: "UGMovies"
  },
  {
    title: ["Financial", "freedom", "decoded"],
    subtitle: "Expert forex and crypto solutions for wealth building. Smart tools for the modern investor.",
    image: "https://images.unsplash.com/photo-1611974789855-0c3b8f06e1b9?q=80&w=1920&auto=format&fit=crop",
    topic: "Finance"
  },
  {
    title: ["Tech", "development", "evolved"],
    subtitle: "High-performing digital machines, content, ads & websites that deliver results.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop",
    topic: "Technology"
  },
  {
    title: ["Digital", "experiences", "matter"],
    subtitle: "We turn beautiful brands into high-performing machines. Real experience for real growth.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1920&auto=format&fit=crop",
    topic: "Branding"
  }
];

const services = [
  {
    title: "Forex Trading",
    desc: "Smart trading tools and market insights for financial growth and wealth building.",
    icon: BarChart,
    image: "https://images.unsplash.com/photo-1611974789855-0c3b8f06e1b9?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Crypto Solutions",
    desc: "Navigate the crypto landscape with confidence. Secure, scalable, and intuitive digital assets.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1639762681485-074b56ceb20e?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Film Production",
    desc: "Cinematic storytelling that captivates. From script to screen, we bring your vision to life.",
    icon: Play,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f8afaq?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Tech Development",
    desc: "Building digital powerhouses. Custom software, high-performing websites, and scalable APIs.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Content Creation",
    desc: "Crafting digital experiences that move people. High-end content that converts and inspires.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
  }
];

const projects = [
  { name: "UGMOVIES", url: "https://ugmovies.kagujje.com", status: "LIVE", year: "2026" },
  { name: "CHAT28", url: "https://chat28.kagujje.com", status: "LIVE", year: "2024" },
  { name: "MDM28", url: "https://mdm28.kagujje.com", status: "LIVE", year: "2024" },
  { name: "MOVIES", url: "https://movies.kagujje.com", status: "2026", year: "2026" },
  { name: "FOREX", url: "https://forex.kagujje.com", status: "2026", year: "2026" },
  { name: "CRYPTO", url: "https://crypto.kagujje.com", status: "2026", year: "2026" },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isAuric, setIsAuric] = useState(false);

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

  // Hidden Auric Trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'g') {
        setIsAuric(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-slide hero
  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isLoaded]);

  // Infinite horizontal scroll for services (Right to Left)
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth / 2;
    
    gsap.to(slider, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, [isLoaded]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className={`bg-[#050505] text-white overflow-x-hidden selection:bg-white/20 font-sans transition-colors duration-1000 ${isAuric ? 'selection:bg-[#D4AF37]/30' : ''}`}>
      {/* Progress bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left transition-colors duration-1000 ${isAuric ? 'bg-[#D4AF37]' : 'bg-white/80'}`}
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
              <div className={`text-6xl md:text-8xl font-bold tracking-[-0.04em] mb-4 transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>KAGUJJE</div>
              <div className="text-xs uppercase tracking-[0.4em] text-white/30">Digital Excellence</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          <motion.a
            href="/"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            className={`text-2xl font-bold tracking-tight transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setIsAuric(!isAuric);
            }}
          >
            KAGUJJE
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            transition={{ delay: 0.1 }}
            className="hidden lg:flex items-center gap-12"
          >
            {["Services", "Work", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${isAuric ? 'text-[#D4AF37]/50 hover:text-[#D4AF37]' : 'text-white/50 hover:text-white'}`}
              >
                {item}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6"
          >
             <a 
               href="/admin" 
               className={`text-[10px] uppercase tracking-[0.2em] transition-colors bg-white/10 px-4 py-2 rounded-full border border-white/20 ${isAuric ? 'text-[#D4AF37] border-[#D4AF37]/20' : 'text-white'}`}
             >
               Admin
             </a>
             <a
              href="#contact"
              className={`px-8 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-500 ${isAuric ? 'bg-[#D4AF37] text-black hover:bg-[#B8860B]' : 'bg-white text-black hover:bg-white/90'}`}
            >
              Let's Talk
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "linear" }}
                src={slides[currentSlide].image}
                alt=""
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-[#050505]/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center px-6 md:px-12">
              <div className="max-w-[1800px] mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className={`h-[1px] w-12 transition-colors duration-1000 ${isAuric ? 'bg-[#D4AF37]/40' : 'bg-white/40'}`} />
                  <button 
                    onClick={() => {
                      const sectionMap: Record<string, string> = {
                        'Innovation': 'services',
                        'Media': 'services',
                        'Finance': 'services',
                        'Technology': 'services',
                        'Branding': 'services'
                      };
                      const id = sectionMap[slides[currentSlide].topic] || 'services';
                      const el = document.getElementById(id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-[10px] uppercase tracking-[0.5em] font-bold transition-all cursor-pointer hover:tracking-[0.7em] ${isAuric ? 'text-[#D4AF37] hover:text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    {slides[currentSlide].topic}
                  </button>
                </motion.div>

                <div className="space-y-4">
                  {slides[currentSlide].title.map((line, i) => (
                    <motion.div
                      key={`${currentSlide}-${line}-${i}`}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.4 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <h1
                        className={`text-6xl md:text-8xl lg:text-[11rem] font-bold leading-[0.85] tracking-[-0.04em] uppercase transition-colors duration-1000 ${
                          i === 1 ? (isAuric ? "text-[#D4AF37]" : "text-white") : (isAuric ? "text-[#D4AF37]/10" : "text-white/20")
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
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className={`mt-12 text-lg md:text-2xl max-w-2xl leading-relaxed font-light transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/60' : 'text-white/60'}`}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide navigation */}
        <div className="absolute bottom-20 left-12 flex items-center gap-8 text-white">
          <div className="flex gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-12 h-[2px] transition-all duration-500 ${
                  i === currentSlide 
                    ? (isAuric ? "bg-[#D4AF37]" : "bg-white") 
                    : (isAuric ? "bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40" : "bg-white/20 hover:bg-white/40")
                }`}
              />
            ))}
          </div>
          <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-white/40'}`}>
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>
      </section>

      {/* Services Slider (Moving Right to Left) */}
      <section id="services" className="py-24 border-y border-white/5 overflow-hidden">
        <div className="mb-20 px-6 md:px-12 max-w-[1800px] mx-auto">
          <h2 className={`text-sm uppercase tracking-[0.5em] font-bold mb-4 transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/30' : 'text-white/30'}`}>Our Expertise</h2>
          <div className={`text-4xl md:text-6xl font-bold tracking-tighter uppercase transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>Exceptional by Design</div>
        </div>

        <div className="flex relative">
          <div 
            ref={sliderRef}
            className="flex gap-6 pr-6 w-max"
          >
            {[...services, ...services].map((service, i) => (
              <div 
                key={`${service.title}-${i}`}
                className={`relative w-[400px] md:w-[600px] aspect-[16/10] overflow-hidden group border transition-colors duration-1000 ${isAuric ? 'border-[#D4AF37]/10' : 'border-transparent'}`}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-[1.5s]"
                />
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent transition-colors duration-1000 ${isAuric ? 'from-[#D4AF37]/20' : 'from-black'}`} />
                <div className="absolute bottom-0 left-0 p-10">
                  <service.icon className={`w-8 h-8 mb-6 transition-colors duration-500 ${isAuric ? 'text-[#D4AF37]/40 group-hover:text-[#D4AF37]' : 'text-white/40 group-hover:text-white'}`} />
                  <h3 className={`text-2xl font-bold mb-4 uppercase tracking-tight transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>{service.title}</h3>
                  <p className={`text-sm max-w-sm leading-relaxed transition-colors duration-500 ${isAuric ? 'text-[#D4AF37]/50 group-hover:text-[#D4AF37]/80' : 'text-white/50 group-hover:text-white/80'}`}>
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 md:py-60 px-6 md:px-12 text-white">
        <div className="max-w-[1800px] mx-auto">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
             <div>
                <h2 className={`text-sm uppercase tracking-[0.5em] font-bold mb-8 transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/30' : 'text-white/30'}`}>Selected Work</h2>
                <div className="space-y-12">
                   {projects.map((project, i) => (
                     <motion.a
                       key={project.name}
                       href={project.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className={`group flex items-center justify-between py-10 border-b transition-all duration-500 ${isAuric ? 'border-[#D4AF37]/10 hover:border-[#D4AF37]/40' : 'border-white/5 hover:border-white/20'}`}
                     >
                        <div className="flex items-center gap-12">
                          <span className={`text-[10px] font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/20' : 'text-white/20'}`}>{project.year}</span>
                          <h3 className={`text-4xl md:text-6xl font-bold uppercase tracking-tighter group-hover:translate-x-6 transition-all duration-700 ${isAuric ? 'text-[#D4AF37]' : ''}`}>
                            {project.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-8">
                           <span className={`text-[10px] font-bold tracking-[0.2em] ${project.status === 'LIVE' ? (isAuric ? 'text-[#D4AF37]' : 'text-green-500') : (isAuric ? 'text-[#D4AF37]/20' : 'text-white/20')}`}>
                             {project.status}
                           </span>
                           <ArrowRight className={`w-6 h-6 transition-all duration-500 ${isAuric ? 'text-[#D4AF37]/20 group-hover:text-[#D4AF37] group-hover:translate-x-2' : 'text-white/20 group-hover:text-white group-hover:translate-x-2'}`} />
                        </div>
                     </motion.a>
                   ))}
                </div>
             </div>
             
             <div className="sticky top-40 hidden lg:block">
                <div className={`aspect-[4/5] relative overflow-hidden transition-colors duration-1000 ${isAuric ? 'bg-[#D4AF37]/5' : 'bg-white/5'}`}>
                   <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83e8c230bc9?q=80&w=1920&auto=format&fit=crop" 
                    alt="Premium Design" 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isAuric ? 'opacity-20' : 'opacity-50'}`}
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                         <div className={`text-[10px] uppercase tracking-[1em] mb-4 transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-white/40'}`}>Portfolio</div>
                         <div className={`text-3xl font-bold tracking-tighter uppercase transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>Digital Hub</div>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-32 md:py-60 px-6 md:px-12 transition-colors duration-1000 ${isAuric ? 'bg-[#050505] text-[#D4AF37]' : 'bg-white text-black'}`}>
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className={`relative aspect-square overflow-hidden bg-black rounded-full shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-all duration-1000 ${isAuric ? 'shadow-[#D4AF37]/40 ring-2 ring-[#D4AF37]' : ''}`}>
              <img
                src="/kagujje-profile-new.jpg"
                alt="Kasiba Shardick"
                className={`w-full h-full object-cover scale-150 translate-y-[10%] transition-all duration-1000 ${isAuric ? 'opacity-100 brightness-110 contrast-110' : 'opacity-90'}`}
                style={{
                  maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent pointer-events-none transition-colors duration-1000 ${isAuric ? 'from-[#D4AF37]/40' : 'from-black/80'}`} />
              <div className={`absolute inset-0 ring-1 ring-inset rounded-full transition-colors duration-1000 ${isAuric ? 'ring-[#D4AF37]/20' : 'ring-white/10'}`} />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-center w-full">
                 <div className={`text-sm font-bold uppercase tracking-[0.3em] mb-1 drop-shadow-lg transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>Kasiba Shardick</div>
                 <div className={`text-[10px] font-light uppercase tracking-[0.2em] opacity-60 transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/60' : ''}`}>Founder & Creator</div>
              </div>
            </div>

            <div className="space-y-12">
              <span className={`text-xs uppercase tracking-[0.4em] font-bold block transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-black/40'}`}>
                The Architect
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase">
                Services that <br /> change the world.
              </h2>
              <div className={`space-y-8 text-lg md:text-xl leading-relaxed font-light transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/60' : 'text-black/60'}`}>
                <p>
                  I'm Kasiba Shardick, a Ugandan creator based in Malaba, Kenya. 
                  My journey began at St. Patrick P/S and led through Lordsmeade Vocational 
                  and Cardinal Nsubuga SS, shaping a vision for digital empowerment.
                </p>
                <p>
                  Today, I build digital powerhouses—services that ease daily work, 
                  solve complex problems, and make life enjoyable. From cinema to 
                  finance, excellence is the only standard.
                </p>
              </div>
              
              <div className={`grid grid-cols-2 gap-12 pt-12 border-t transition-colors duration-1000 ${isAuric ? 'border-[#D4AF37]/10' : 'border-black/10'}`}>
                 <div>
                    <div className={`text-[10px] uppercase tracking-widest font-bold mb-2 transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-black/40'}`}>Born</div>
                    <div className="text-lg font-medium">Jinja, Uganda</div>
                    <div className={`text-sm transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-black/40'}`}>12th March 2004</div>
                 </div>
                 <div>
                    <div className={`text-[10px] uppercase tracking-widest font-bold mb-2 transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-black/40'}`}>Presence</div>
                    <div className="text-lg font-medium">Malaba, Kenya</div>
                    <div className={`text-sm transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-black/40'}`}>East African Hub</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 md:py-80 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-[1800px] mx-auto text-center">
            <h2 className={`text-sm uppercase tracking-[1em] font-bold mb-12 transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/20' : 'text-white/20'}`}>Get in touch</h2>
            <a 
              href="mailto:dicksonkagujje@gmail.com" 
              className={`text-4xl md:text-7xl lg:text-[10rem] font-bold tracking-tighter uppercase transition-colors duration-700 block mb-12 ${isAuric ? 'text-[#D4AF37] hover:text-[#D4AF37]/40' : 'hover:text-white/40'}`}
            >
              Let's build.
            </a>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
               <a href="mailto:dicksonkagujje@gmail.com" className="group flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${isAuric ? 'border-[#D4AF37]/10 group-hover:bg-[#D4AF37] group-hover:text-black' : 'border-white/10 group-hover:bg-white group-hover:text-black'}`}>
                     <Mail className="w-5 h-5" />
                  </div>
                  <span className={`text-xs uppercase tracking-widest font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>Email Me</span>
               </a>
               <a href="https://wa.me/254103022997" target="_blank" className="group flex items-center gap-4 text-white">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${isAuric ? 'border-[#D4AF37]/10 group-hover:bg-[#D4AF37] group-hover:text-black' : 'border-white/10 group-hover:bg-white group-hover:text-black'}`}>
                     <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className={`text-xs uppercase tracking-widest font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>WhatsApp</span>
               </a>
               <a href="https://t.me/dicksonkagujje" target="_blank" className="group flex items-center gap-4 text-white">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${isAuric ? 'border-[#D4AF37]/10 group-hover:bg-[#D4AF37] group-hover:text-black' : 'border-white/10 group-hover:bg-white group-hover:text-black'}`}>
                     <Globe className="w-5 h-5" />
                  </div>
                  <span className={`text-xs uppercase tracking-widest font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>Telegram</span>
               </a>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-20 px-6 md:px-12 border-t transition-colors duration-1000 ${isAuric ? 'border-[#D4AF37]/10' : 'border-white/5'}`}>
        <div className="max-w-[1800px] mx-auto">
           <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
              <div className="space-y-8">
                 <div className={`text-3xl font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]' : ''}`}>KAGUJJE</div>
                 <p className={`max-w-sm font-light leading-relaxed transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-white/40'}`}>
                   Transforming beautiful brands into high-performing machines. 
                   Content, ads & websites that deliver real results.
                 </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
                 <div className="space-y-6">
                    <div className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-white/40'}`}>Platform</div>
                    <div className={`flex flex-col gap-4 text-sm transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/60' : 'text-white/60'}`}>
                       <a href="#services" className={`transition-colors ${isAuric ? 'hover:text-[#D4AF37]' : 'hover:text-white'}`}>Services</a>
                       <a href="#work" className={`transition-colors ${isAuric ? 'hover:text-[#D4AF37]' : 'hover:text-white'}`}>Work</a>
                       <a href="#about" className={`transition-colors ${isAuric ? 'hover:text-[#D4AF37]' : 'hover:text-white'}`}>About</a>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-white/40'}`}>Social</div>
                    <div className={`flex flex-col gap-4 text-sm transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/60' : 'text-white/60'}`}>
                       <a href="https://tiktok.com/@kagujje.inc" className={`transition-colors ${isAuric ? 'hover:text-[#D4AF37]' : 'hover:text-white'}`}>TikTok</a>
                       <a href="https://twitter.com/kagujje" className={`transition-colors ${isAuric ? 'hover:text-[#D4AF37]' : 'hover:text-white'}`}>Twitter</a>
                       <a href="https://instagram.com/kagujje" className={`transition-colors ${isAuric ? 'hover:text-[#D4AF37]' : 'hover:text-white'}`}>Instagram</a>
                    </div>
                 </div>
                 <div className="space-y-6 text-white">
                    <div className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/40' : 'text-white/40'}`}>Legal</div>
                    <div className={`flex flex-col gap-4 text-sm transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/60' : 'text-white/60'}`}>
                       <a href="#" className={`transition-colors ${isAuric ? 'hover:text-[#D4AF37]' : 'hover:text-white'}`}>Privacy</a>
                       <a href="#" className={`transition-colors ${isAuric ? 'hover:text-[#D4AF37]' : 'hover:text-white'}`}>Terms</a>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className={`mt-32 flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t transition-colors duration-1000 ${isAuric ? 'border-[#D4AF37]/10' : 'border-white/5'}`}>
              <div className={`text-[10px] uppercase tracking-widest transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/20' : 'text-white/20'}`}>© 2026 KAGUJJE. All Rights Reserved.</div>
              <div className={`text-[10px] uppercase tracking-widest transition-colors duration-1000 ${isAuric ? 'text-[#D4AF37]/20' : 'text-white/20'}`}>Designed by Shardick</div>
           </div>
        </div>
      </footer>
    </div>
  );
}
