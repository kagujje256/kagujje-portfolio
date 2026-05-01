import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Mail, ArrowRight, Play, ChevronDown, ExternalLink, Globe } from 'lucide-react';

// High-quality cinematic background images for each topic
const topics = [
  {
    id: 1,
    title: "Financial Freedom",
    subtitle: "Decoded",
    description: "Expert forex and crypto solutions for wealth building",
    image: "https://images.unsplash.com/photo-1611974789851-0e2728e4a0e5?w=1920&q=80",
    icon: "💰",
    gradient: "from-emerald-900/40 to-black"
  },
  {
    id: 2,
    title: "Cinematic",
    subtitle: "Storytelling Unleashed",
    description: "Professional film production and creative video content",
    image: "https://images.unsplash.com/photo-1485846234645-a626d7c08589?w=1920&q=80",
    icon: "🎬",
    gradient: "from-purple-900/40 to-black"
  },
  {
    id: 3,
    title: "Digital",
    subtitle: "Powerhouses",
    description: "We build digital experiences that transform businesses",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    icon: "🚀",
    gradient: "from-blue-900/40 to-black"
  },
  {
    id: 4,
    title: "Streaming",
    subtitle: "Entertainment Hub",
    description: "Kagujje Movies - Your gateway to unlimited entertainment",
    image: "https://images.unsplash.com/photo-1536440136628-849c4e4a9e96?w=1920&q=80",
    icon: "📺",
    gradient: "from-red-900/40 to-black"
  },
  {
    id: 5,
    title: "Tech",
    subtitle: "Innovation Lab",
    description: "Cutting-edge solutions for modern challenges",
    image: "https://images.unsplash.com/photo-1518770660479-3a1fca3d4c7f?w=1920&q=80",
    icon: "⚡",
    gradient: "from-cyan-900/40 to-black"
  }
];

export default function Portfolio() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Preload all images
  useEffect(() => {
    topics.forEach((topic, index) => {
      const img = new Image();
      img.src = topic.image;
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
      };
    });
    setIsLoaded(true);
  }, []);
  
  // Auto-rotate topics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopic((prev) => (prev + 1) % topics.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = topics[currentTopic];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTopic}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ 
              backgroundImage: `url(${current.image})`,
              filter: 'brightness(0.4) contrast(1.1)'
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${current.gradient}`} />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-wider"
          >
            KAGUJJE
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Projects', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-zinc-200 transition-colors"
            >
              Let's Talk
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity }}
        className="relative min-h-screen flex items-center justify-center px-6 z-10"
      >
        <div className="text-center max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTopic}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-5xl mb-4"
              >
                {current.icon}
              </motion.span>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="text-zinc-400">{current.title}</span>
                <br />
                <span className="text-white">{current.subtitle}</span>
              </h1>
              
              <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
                {current.description}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black rounded font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-zinc-700 rounded font-semibold flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Watch Showreel
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Topic Indicators */}
          <div className="mt-16 flex justify-center gap-2">
            {topics.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTopic(i)}
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  i === currentTopic ? 'bg-white w-8' : 'bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-zinc-500">Services</span>
            </h2>
            <p className="mt-4 text-zinc-500 max-w-xl">
              Comprehensive solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Forex Trading", desc: "Expert market analysis and trading strategies", icon: "📈" },
              { title: "Crypto Solutions", desc: "Blockchain and cryptocurrency consulting", icon: "₿" },
              { title: "Film Production", desc: "Professional video and content creation", icon: "🎥" },
              { title: "Tech Development", desc: "Custom software and digital solutions", icon: "💻" }
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all"
              >
                <span className="text-3xl">{service.icon}</span>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{service.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400 group-hover:text-white transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured <span className="text-zinc-500">Projects</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Kagujje Movies", category: "Streaming Platform", image: topics[3].image },
              { title: "Forex Analytics", category: "Financial Tech", image: topics[0].image },
              { title: "Film Productions", category: "Creative Media", image: topics[1].image },
              { title: "Digital Solutions", category: "Tech Innovation", image: topics[2].image }
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-sm text-zinc-400">{project.category}</span>
                  <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold">
                About <span className="text-zinc-500">Kagujje</span>
              </h2>
              <p className="mt-6 text-zinc-400 leading-relaxed">
                We are a multidisciplinary team building digital experiences that matter. 
                From financial technology to cinematic storytelling, we transform ideas into reality.
              </p>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Our mission is to create services that ease daily work, solve problems, 
                and make life enjoyable for millions across Africa and beyond.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { value: "50+", label: "Projects" },
                  { value: "10M+", label: "Users" },
                  { value: "25+", label: "Countries" },
                  { value: "100%", label: "Dedication" }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 px-6 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Let's Build <span className="text-zinc-500">Together</span>
            </h2>
            <p className="mt-6 text-zinc-400 max-w-xl mx-auto">
              Ready to transform your ideas into reality? Let's discuss your next project.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/256700000000"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-emerald-600 text-white rounded font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors"
              >
                WhatsApp Us
              </motion.a>
              <motion.a
                href="mailto:hello@kagujje.com"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 border border-zinc-700 rounded font-semibold flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold">KAGUJJE</div>
              <p className="mt-4 text-sm text-zinc-500">
                Building digital experiences that transform businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white">Forex Trading</a></li>
                <li><a href="#" className="hover:text-white">Crypto Solutions</a></li>
                <li><a href="#" className="hover:text-white">Film Production</a></li>
                <li><a href="#" className="hover:text-white">Tech Development</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Projects</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white">Kagujje Movies</a></li>
                <li><a href="#" className="hover:text-white">Forex Analytics</a></li>
                <li><a href="#" className="hover:text-white">Film Studio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://x.com/kagujje256" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
            <p>© 2025 Kagujje. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <motion.a
        href="https://wa.me/256700000000"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.377l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.411z"/>
        </svg>
      </motion.a>
    </div>
  );
}