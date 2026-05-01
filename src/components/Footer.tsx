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
    <footer className="relative py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-3 gap-12 md:gap-24 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold tracking-widest text-white mb-4">KAGUJJE</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Building digital experiences that transform businesses and captivate audiences worldwide.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-widest text-white/40 uppercase mb-6">Services</h4>
            <div className="space-y-3">
              {links.services.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs tracking-widest text-white/40 uppercase mb-6">Connect</h4>
            <div className="flex gap-6">
              {links.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © 2025 Kagujje. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Powered by Groq AI
          </p>
        </div>
      </div>
    </footer>
  );
}