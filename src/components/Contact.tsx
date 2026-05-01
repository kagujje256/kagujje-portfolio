import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/256700123456?text=${encodeURIComponent(`Hello, I'm ${formState.name}. ${formState.message}`)}`, '_blank');
  };

  return (
    <section id="contact" ref={ref} className="relative py-48 bg-black">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-32">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase">Contact</span>
            <h2 className="mt-8 text-5xl md:text-7xl font-black tracking-tighter uppercase">
              Let's <br />
              <span className="text-white/20">Connect</span>
            </h2>
            <p className="mt-10 text-base md:text-lg text-white/40 font-normal leading-relaxed tracking-wide max-w-md">
              Ready to architect your next digital empire? Reach out and let's define the future of your brand.
            </p>

            <div className="mt-20 space-y-12">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase block mb-4">Direct</span>
                <a href="mailto:hello@kagujje.com" className="text-2xl font-light text-white/60 hover:text-white transition-colors block mb-2">
                  hello@kagujje.com
                </a>
                <a href="https://wa.me/256700123456" target="_blank" rel="noopener" className="text-2xl font-light text-white/60 hover:text-white transition-colors block">
                  +256 700 123 456
                </a>
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase block mb-4">Studio</span>
                <p className="text-xl font-light text-white/40">
                  Kampala, Uganda
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-12"
          >
            <div className="relative group">
              <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase group-focus-within:text-white transition-colors">Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-6 text-xl text-white focus:border-white transition-all outline-none font-light"
                required
              />
            </div>
            <div className="relative group">
              <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase group-focus-within:text-white transition-colors">Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-6 text-xl text-white focus:border-white transition-all outline-none font-light"
                required
              />
            </div>
            <div className="relative group">
              <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase group-focus-within:text-white transition-colors">Vision</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-white/10 py-6 text-xl text-white focus:border-white transition-all outline-none resize-none font-light"
                required
              />
            </div>
            <button
              type="submit"
              className="group relative w-full py-8 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:scale-[1.02] transition-transform overflow-hidden"
            >
              <span className="relative z-10">Commence Project</span>
              <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}