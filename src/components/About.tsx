import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '10M+', label: 'Users Reached' },
  { value: '25+', label: 'Countries' },
  { value: '99%', label: 'Satisfaction' },
];

const timeline = [
  { year: '2020', title: 'Founded', desc: 'Started as a small digital agency' },
  { year: '2021', title: 'Expansion', desc: 'Launched Forex & Crypto services' },
  { year: '2022', title: 'Growth', desc: 'Reached 1M+ users across platforms' },
  { year: '2023', title: 'Innovation', desc: 'Introduced AI-powered solutions' },
  { year: '2024', title: 'Global', desc: 'Expanded to 25+ countries' },
  { year: '2025', title: 'Scale', desc: '10M+ users and growing' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={ref} className="relative py-48 bg-black overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-20 grayscale"
      >
        <img
          src="https://images.unsplash.com/photo-1451187580459-4349027975-89b97f2a6d1b?w=1920&q=80&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase">Vision & Philosophy</span>
            <h2 className="mt-8 text-5xl md:text-7xl font-black tracking-tighter uppercase">
              Beyond <br />
              <span className="text-white/20">Expectation</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base md:text-lg text-white/40 font-normal leading-relaxed tracking-wide"
          >
            Kagujje is a global multidisciplinary digital ecosystem. We specialize in engineering high-performance solutions across finance, media, and technology, transforming complex challenges into elegant digital experiences.
          </motion.p>
        </div>

        {/* Stats - Refined */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-y border-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              className="space-y-2"
            >
              <div className="text-4xl md:text-6xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className={`relative flex items-center mb-12 md:mb-16 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <span className="text-xs tracking-widest text-white/30">{item.year}</span>
                <h3 className="text-lg font-medium text-white mt-2">{item.title}</h3>
                <p className="text-sm text-white/40 mt-1">{item.desc}</p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}