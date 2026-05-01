import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    title: 'Forex Trading',
    desc: 'Expert market analysis and trading strategies for consistent returns.',
    stat: '500+ clients',
    link: 'https://forex.kagujje.com'
  },
  {
    title: 'Crypto Investment',
    desc: 'Navigate the crypto markets with expert guidance and portfolio management.',
    stat: '300+ clients',
    link: 'https://crypto.kagujje.com'
  },
  {
    title: 'MDM Services',
    desc: 'Mobile Device Management solutions for enterprise security and efficiency.',
    stat: '10K+ devices',
    link: 'https://mdm.kagujje.com'
  },
  {
    title: 'Social Media',
    desc: 'Amplify your brand presence across all major social platforms.',
    stat: '50M+ reach',
    link: 'https://social.kagujje.com'
  },
  {
    title: 'Movies Streaming',
    desc: 'Premium streaming platform with curated content from around the world.',
    stat: '100K+ users',
    link: 'https://movies.kagujje.com'
  },
  {
    title: 'Tech Solutions',
    desc: 'Custom software development and IT consulting for modern businesses.',
    stat: '80+ projects',
    link: 'https://tech.kagujje.com'
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-xs tracking-[0.3em] text-white/40 uppercase">What We Do</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white/90">Our </span>
            <span className="text-white/40">Services</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {services.map((service, i) => (
            <motion.a
              key={service.title}
              href={service.link}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative bg-black p-8 md:p-12 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="flex flex-col h-full">
                <span className="text-xs tracking-widest text-white/30 mb-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl md:text-2xl font-medium text-white mb-4 group-hover:text-white/80 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-8 flex-grow">
                  {service.desc}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-xs text-white/30">{service.stat}</span>
                  <span className="text-xs text-white/50 group-hover:text-white transition-colors flex items-center gap-2">
                    Explore
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}