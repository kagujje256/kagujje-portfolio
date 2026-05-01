import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="text-xl font-bold tracking-widest text-white">
              KAGUJJE
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm tracking-wide text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="px-6 py-3 bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
              >
                Let's Talk
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`h-px bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-px bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-px bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          style={{ width: progressWidth }}
          className="absolute bottom-0 left-0 h-px bg-white/30"
        />
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-light tracking-wide text-white/80 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </>
  );
}