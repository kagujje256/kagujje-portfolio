import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    window.open(`https://wa.me/256700123456?text=${encodeURIComponent(`Hello, I'm ${formState.name}. ${formState.message}`)}`, '_blank');
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Get In Touch</span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white/90">Let's Build </span>
              <span className="text-white/40">Together</span>
            </h2>
            <p className="mt-6 text-lg text-white/40 font-light leading-relaxed">
              Ready to transform your digital presence? Reach out and let's discuss how we can bring your vision to life.
            </p>

            <div className="mt-12 space-y-6">
              <a href="mailto:hello@kagujje.com" className="flex items-center gap-4 text-white/60 hover:text-white transition-colors">
                <span className="text-xs tracking-widest uppercase">Email</span>
                <span className="text-sm">hello@kagujje.com</span>
              </a>
              <a href="https://wa.me/256700123456" target="_blank" rel="noopener" className="flex items-center gap-4 text-white/60 hover:text-white transition-colors">
                <span className="text-xs tracking-widest uppercase">WhatsApp</span>
                <span className="text-sm">+256 700 123 456</span>
              </a>
              <div className="flex items-center gap-4 text-white/60">
                <span className="text-xs tracking-widest uppercase">Location</span>
                <span className="text-sm">Kampala, Uganda</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <label className="text-xs tracking-widest text-white/40 uppercase">Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white/30 outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-xs tracking-widest text-white/40 uppercase">Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white/30 outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-xs tracking-widest text-white/40 uppercase">Message</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white/30 outline-none transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}