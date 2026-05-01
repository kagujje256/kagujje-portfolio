import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    title: 'Forex Trading',
    desc: 'Expert market analysis and institutional strategies for consistent returns.',
    image: 'https://images.unsplash.com/photo-1611974789855-66c8868af4cd?w=800&q=80',
    stat: 'Institutional Grade'
  },
  {
    title: 'Crypto Solutions',
    desc: 'Strategic blockchain consulting and digital asset management.',
    image: 'https://images.unsplash.com/photo-1518546305928-5e0c0b2a2e0c?w=800&q=80',
    stat: 'Blockchain Native'
  },
  {
    title: 'MDM Services',
    desc: 'Enterprise-scale mobile device management and security.',
    image: 'https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=800&q=80',
    stat: '10K+ Managed'
  },
  {
    title: 'Media Production',
    desc: 'Cinematic storytelling and high-end visual content creation.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644fbbafa?w=800&q=80',
    stat: 'Premium Content'
  },
  {
    title: 'Tech Innovation',
    desc: 'Custom software architecture and platform engineering.',
    image: 'https://images.unsplash.com/photo-1451187580459-4349027975-89b97f2a6d1b?w=800&q=80',
    stat: 'Full Stack'
  },
  {
    title: 'Digital Marketing',
    desc: 'Strategic brand amplification and performance marketing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    stat: 'Global Reach'
  }
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="relative py-40 bg-black overflow-hidden">
      <div className="px-8 md:px-16 lg:px-24 mb-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase">Core Capabilities</span>
          <h2 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase">
            Our <span className="text-white/20">Services</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Sliding Marquee */}
      <div className="relative">
        <div className="flex animate-marquee hover:pause whitespace-nowrap gap-6 px-6">
          {[...services, ...services].map((service, i) => (
            <div
              key={`${service.title}-${i}`}
              className="relative w-[400px] md:w-[500px] h-[600px] flex-shrink-0 group overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase mb-4">{service.stat}</span>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6 transition-transform duration-500 group-hover:-translate-y-2">
                  {service.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                  {service.desc}
                </p>
                <div className="mt-8 h-px w-0 bg-white/40 group-hover:w-full transition-all duration-700" />
              </div>

              {/* Overlay for professionalism */}
              <div className="absolute top-10 left-10 text-[10px] font-bold text-white/20">
                {String(i % services.length + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Bottom Subtext */}
      <div className="mt-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto flex justify-end">
        <p className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase max-w-md text-right">
          Engineered for performance. Built for the future. Kagujje 2026 Digital Ecosystem.
        </p>
      </div>
    </section>
  );
}