import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, ChevronDown, ExternalLink, Phone, MapPin } from 'lucide-react';

const topics = [
  { 
    id: 1, 
    title: "Financial Freedom",
    subtitle: "Decoded",
    description: "Expert forex and crypto solutions for wealth building",
    image: "https://images.unsplash.com/photo-1611974789855-66c8868af4cd?w=1920&q=80",
    accent: "#10b981"
  },
  { 
    id: 2, 
    title: "Cinematic",
    subtitle: "Storytelling",
    description: "Professional film production and visual storytelling",
    image: "https://images.unsplash.com/photo-1485846234645-a62644fbbafa?w=1920&q=80",
    accent: "#3b82f6"
  },
  { 
    id: 3, 
    title: "Digital",
    subtitle: "Powerhouses",
    description: "Services that ease daily work, solve problems, and make life enjoyable",
    image: "https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=1920&q=80",
    accent: "#8b5cf6"
  },
  { 
    id: 4, 
    title: "Streaming",
    subtitle: "Excellence",
    description: "Premium content delivery and streaming solutions",
    image: "https://images.unsplash.com/photo-1522869635300-da034de237de?w=1920&q=80",
    accent: "#ef4444"
  },
  { 
    id: 5, 
    title: "Tech",
    subtitle: "Innovation",
    description: "Cutting-edge technology solutions for modern challenges",
    image: "https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=1920&q=80",
    accent: "#f59e0b"
  }
];

const services = [
  {
    title: "Forex Trading",
    description: "Expert market analysis and trading strategies",
    image: "https://images.unsplash.com/photo-1611974789855-66c8868af4cd?w=800&q=80"
  },
  {
    title: "Crypto Solutions",
    description: "Blockchain and cryptocurrency consulting",
    image: "https://images.unsplash.com/photo-1518546305928-5e0c0b2a2e0c?w=800&q=80"
  },
  {
    title: "Film Production",
    description: "Professional video and content creation",
    image: "https://images.unsplash.com/photo-1485846234645-a62644fbbafa?w=800&q=80"
  },
  {
    title: "Tech Development",
    description: "Custom software and platform development",
    image: "https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=800&q=80"
  }
];

const projects = [
  {
    title: "Kagujje Movies",
    category: "Streaming Platform",
    description: "Premium streaming service with curated content",
    image: "https://images.unsplash.com/photo-1522869635300-da034de237de?w=800&q=80"
  },
  {
    title: "Financial Dashboard",
    category: "Fintech",
    description: "Real-time trading analytics platform",
    image: "https://images.unsplash.com/photo-1611974789855-66c8868af4cd?w=800&q=80"
  },
  {
    title: "Content Studio",
    category: "Media Production",
    description: "Full-service video production facility",
    image: "https://images.unsplash.com/photo-1485846234645-a62644fbbafa?w=800&q=80"
  },
  {
    title: "Tech Hub",
    category: "Development",
    description: "Innovation center for digital solutions",
    image: "https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=800&q=80"
  }
];

export default function App() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  // Preload all images
  useEffect(() => {
    const allImages = [
      ...topics.map(t => t.image),
      ...services.map(s => s.image),
      ...projects.map(p => p.image)
    ];
    
    let loaded = 0;
    const total = allImages.length;
    
    allImages.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === total) {
          setImagesLoaded(true);
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) {
          setImagesLoaded(true);
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      img.src = src;
    });
  }, []);

  // Auto-rotate topics
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setCurrentTopic((prev) => (prev + 1) % topics.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-zinc-700 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400 text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tight text-white"
          >
            KAGUJJE
          </motion.a>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-8 items-center"
          >
            <a href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">Services</a>
            <a href="#projects" className="text-sm text-zinc-400 hover:text-white transition-colors">Projects</a>
            <a href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</a>
            <a href="#contact" className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded hover:bg-zinc-200 transition-colors">
              Contact
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Background Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTopic}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={topics[currentTopic].image}
              alt={topics[currentTopic].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTopic}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
                <span className="text-zinc-400">{topics[currentTopic].title}</span>
                <br />
                <span style={{ color: topics[currentTopic].accent }}>{topics[currentTopic].subtitle}</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
                {topics[currentTopic].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#services"
                  className="px-8 py-4 bg-white text-black font-medium rounded hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="#projects"
                  className="px-8 py-4 border border-zinc-700 text-white font-medium rounded hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  View Projects
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Topic Indicators */}
          <div className="flex gap-3 justify-center mt-16">
            {topics.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTopic(index)}
                className={`w-12 h-1 rounded transition-all ${
                  index === currentTopic ? 'bg-white' : 'bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Accent Line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: topics[currentTopic].accent }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.section>

      {/* Services Section */}
      <section id="services" className="relative py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm text-zinc-500 tracking-widest uppercase mb-2">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold">Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-80 rounded overflow-hidden cursor-pointer"
              >
                <img 
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-zinc-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm text-zinc-500 tracking-widest uppercase mb-2">Our Work</p>
            <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-96 rounded overflow-hidden cursor-pointer"
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-sm text-zinc-400 mb-2 block">{project.category}</span>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-zinc-400">{project.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400 group-hover:text-white transition-colors">
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-zinc-500 tracking-widest uppercase mb-2">About Us</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Building Digital Excellence</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Kagujje is a multidisciplinary digital company specializing in financial services, 
                media production, and technology development. We create solutions that transform 
                ideas into impactful digital experiences.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                From forex trading expertise to cinematic storytelling, from streaming platforms 
                to custom tech solutions, we deliver excellence across every domain we touch.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=800&q=80"
                alt="About Kagujje"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-zinc-500 tracking-widest uppercase mb-2">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Project</h2>
            <p className="text-zinc-400 mb-10 max-w-2xl mx-auto">
              Ready to build something exceptional? Contact us today and let's discuss 
              how we can bring your vision to life.
            </p>
            <a 
              href="https://wa.me/256700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-500 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4">KAGUJJE</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Digital excellence across finance, media, and technology.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-zinc-400 hover:text-white transition-colors text-sm">Forex Trading</a></li>
                <li><a href="#services" className="text-zinc-400 hover:text-white transition-colors text-sm">Crypto Solutions</a></li>
                <li><a href="#services" className="text-zinc-400 hover:text-white transition-colors text-sm">Film Production</a></li>
                <li><a href="#services" className="text-zinc-400 hover:text-white transition-colors text-sm">Tech Development</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Phone className="w-4 h-4" />
                  +256 700 000 000
                </li>
                <li className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Mail className="w-4 h-4" />
                  hello@kagujje.com
                </li>
                <li className="flex items-center gap-2 text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  Kampala, Uganda
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">2025 Kagujje. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://x.com/kagujje" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm">X</a>
              <a href="https://instagram.com/kagujje" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm">Instagram</a>
              <a href="https://linkedin.com/company/kagujje" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="https://github.com/kagujje256" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/256700000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-lg z-50"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.411z"/>
        </svg>
      </a>
    </div>
  );
}