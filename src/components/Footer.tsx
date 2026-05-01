import { motion } from 'framer-motion';

const links = {
  services: [
    { label: 'Forex', href: 'https://forex.kagujje.com' },
    { label: 'Crypto', href: 'https://crypto.kagujje.com' },
    { label: 'Movies', href: 'https://movies.kagujje.com' },
    { label: 'Tech', href: 'https://tech.kagujje.com' },
  ],
  social: [
    { label: 'X', href: 'https://twitter.com/kagujje' },
    { label: 'IG', href: 'https://instagram.com/kagujje' },
    { label: 'IN', href: 'https://linkedin.com/company/kagujje' },
    { label: 'GH', href: 'https://github.com/kagujje256' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-4 gap-16 md:gap-24 mb-24">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black tracking-[0.3em] text-white uppercase mb-8">Kagujje</h3>
            <p className="text-base text-white/40 leading-relaxed max-w-sm font-light">
              Engineering the digital future. We architect high-performance experiences that redefine industries.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-8">Ecosystem</h4>
            <div className="space-y-4">
              {links.services.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-xs font-medium text-white/40 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-8">Global</h4>
            <div className="grid grid-cols-2 gap-4">
              {links.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="text-xs font-medium text-white/40 hover:text-white transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
              © 2026 Kagujje Digital
            </p>
            <div className="h-4 w-px bg-white/5" />
            <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
              Premium Experience
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}