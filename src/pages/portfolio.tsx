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
    title: ["Changing", "the world", "through code"],
    subtitle: "Building the Future, One Idea at a Time. Services that ease daily work, solve problems and make life enjoyable.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop",
    topic: "Innovation"
  },
  {
    title: ["Cinematic", "storytelling", "unleashed"],
    subtitle: "From vision to screen. Movies that move audiences worldwide and define digital excellence.",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1920&auto=format&fit=crop",
    topic: "Media"
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
    <div ref={containerRef} className="bg-[#050505] text-white overflow-x-hidden selection:bg-white/20 font-sans">
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
              <div className="text-6xl md:text-8xl font-bold tracking-[-0.04em] mb-4">KAGUJJE</div>
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
            className="text-2xl font-bold tracking-tight"
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
                className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-500"
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
             <a href="/admin" className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Admin</a>
             <a
              href="#contact"
              className="px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.1em] hover:bg-white/90 transition-all duration-500"
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
                  <div className="h-[1px] w-12 bg-white/40" />
                  <span className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-bold">
                    {slides[currentSlide].topic}
                  </span>
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
                        className={`text-6xl md:text-8xl lg:text-[11rem] font-bold leading-[0.85] tracking-[-0.04em] uppercase ${
                          i === 1 ? "text-white" : "text-white/20"
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
                  className="mt-12 text-lg md:text-2xl text-white/60 max-w-2xl leading-relaxed font-light"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide navigation */}
        <div className="absolute bottom-20 left-12 flex items-center gap-8">
          <div className="flex gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-12 h-[2px] transition-all duration-500 ${
                  i === currentSlide ? "bg-white" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>
      </section>

      {/* Services Slider (Moving Right to Left) */}
      <section id="services" className="py-24 border-y border-white/5 overflow-hidden">
        <div className="mb-20 px-6 md:px-12 max-w-[1800px] mx-auto">
          <h2 className="text-sm uppercase tracking-[0.5em] text-white/30 font-bold mb-4">Our Expertise</h2>
          <div className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Exceptional by Design</div>
        </div>

        <div className="flex relative">
          <div 
            ref={sliderRef}
            className="flex gap-6 pr-6 w-max"
          >
            {[...services, ...services].map((service, i) => (
              <div 
                key={`${service.title}-${i}`}
                className="relative w-[400px] md:w-[600px] aspect-[16/10] overflow-hidden group"
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                  <service.icon className="w-8 h-8 text-white/40 mb-6 group-hover:text-white transition-colors duration-500" />
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-sm text-white/50 max-w-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 md:py-60 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
             <div>
                <h2 className="text-sm uppercase tracking-[0.5em] text-white/30 font-bold mb-8">Selected Work</h2>
                <div className="space-y-12">
                   {projects.map((project, i) => (
                     <motion.a
                       key={project.name}
                       href={project.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group flex items-center justify-between py-10 border-b border-white/5 hover:border-white/20 transition-all duration-500"
                     >
                        <div className="flex items-center gap-12">
                          <span className="text-[10px] font-bold text-white/20">{project.year}</span>
                          <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter group-hover:translate-x-6 transition-transform duration-700">
                            {project.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-8">
                           <span className={`text-[10px] font-bold tracking-[0.2em] ${project.status === 'LIVE' ? 'text-green-500' : 'text-white/20'}`}>
                             {project.status}
                           </span>
                           <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                        </div>
                     </motion.a>
                   ))}
                </div>
             </div>
             
             <div className="sticky top-40 hidden lg:block">
                <div className="aspect-[4/5] bg-white/5 relative overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83e8c230bc9?q=80&w=1920&auto=format&fit=crop" 
                    alt="Premium Design" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                         <div className="text-[10px] uppercase tracking-[1em] text-white/40 mb-4">Portfolio</div>
                         <div className="text-3xl font-bold tracking-tighter uppercase">Digital Hub</div>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 md:py-60 px-6 md:px-12 bg-white text-black">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-square overflow-hidden bg-black/5">
              <img
                src="/kagujje-profile.png"
                alt="Kasiba Shardick"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 left-10 text-white mix-blend-difference">
                 <div className="text-sm font-bold uppercase tracking-widest mb-2">Kasiba Shardick</div>
                 <div className="text-xs font-light uppercase tracking-widest">Founder & Creator</div>
              </div>
            </div>

            <div className="space-y-12">
              <span className="text-xs uppercase tracking-[0.4em] text-black/40 font-bold block">
                The Architect
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase">
                Services that <br /> change the world.
              </h2>
              <div className="space-y-8 text-lg md:text-xl text-black/60 leading-relaxed font-light">
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
              
              <div className="grid grid-cols-2 gap-12 pt-12 border-t border-black/10">
                 <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Born</div>
                    <div className="text-lg font-medium">Jinja, Uganda</div>
                    <div className="text-sm text-black/40">12th March 2004</div>
                 </div>
                 <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Presence</div>
                    <div className="text-lg font-medium">Malaba, Kenya</div>
                    <div className="text-sm text-black/40">East African Hub</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 md:py-80 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-[1800px] mx-auto text-center">
            <h2 className="text-sm uppercase tracking-[1em] text-white/20 font-bold mb-12">Get in touch</h2>
            <a 
              href="mailto:dicksonkagujje@gmail.com" 
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold tracking-tighter uppercase hover:text-white/40 transition-colors duration-700 block mb-12"
            >
              Let's build.
            </a>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
               <a href="mailto:dicksonkagujje@gmail.com" className="group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                     <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold">Email Me</span>
               </a>
               <a href="https://wa.me/254103022997" target="_blank" className="group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                     <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold">WhatsApp</span>
               </a>
               <a href="https://t.me/dicksonkagujje" target="_blank" className="group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                     <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold">Telegram</span>
               </a>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1800px] mx-auto">
           <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
              <div className="space-y-8">
                 <div className="text-3xl font-bold">KAGUJJE</div>
                 <p className="text-white/40 max-w-sm font-light leading-relaxed">
                   Transforming beautiful brands into high-performing machines. 
                   Content, ads & websites that deliver real results.
                 </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
                 <div className="space-y-6">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-white/40">Platform</div>
                    <div className="flex flex-col gap-4 text-sm text-white/60">
                       <a href="#services" className="hover:text-white transition-colors">Services</a>
                       <a href="#work" className="hover:text-white transition-colors">Work</a>
                       <a href="#about" className="hover:text-white transition-colors">About</a>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-white/40">Social</div>
                    <div className="flex flex-col gap-4 text-sm text-white/60">
                       <a href="https://tiktok.com/@kagujje.inc" className="hover:text-white transition-colors">TikTok</a>
                       <a href="https://twitter.com/kagujje" className="hover:text-white transition-colors">Twitter</a>
                       <a href="https://instagram.com/kagujje" className="hover:text-white transition-colors">Instagram</a>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-white/40">Legal</div>
                    <div className="flex flex-col gap-4 text-sm text-white/60">
                       <a href="#" className="hover:text-white transition-colors">Privacy</a>
                       <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
              <div className="text-[10px] uppercase tracking-widest text-white/20">© 2026 KAGUJJE. All Rights Reserved.</div>
              <div className="text-[10px] uppercase tracking-widest text-white/20">Designed by Shardick</div>
           </div>
        </div>
      </footer>
    </div>
  );
}
