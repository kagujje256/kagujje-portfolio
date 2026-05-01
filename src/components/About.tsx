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
    <section id="about" ref={ref} className="relative py-32 bg-black overflow-hidden">
      {/* Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-10"
      >
        <img
          src="https://images.unsplash.com/photo-1451187580459-4349027975-89b97f2a6d1b?w=1920&q=80&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Who We Are</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white/90">Building </span>
            <span className="text-white/40">the Future</span>
          </h2>
          <p className="mt-6 text-lg text-white/40 max-w-2xl font-light leading-relaxed">
            We are a team of innovators, developers, and strategists dedicated to transforming ideas into impactful digital experiences.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center md:text-left"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
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