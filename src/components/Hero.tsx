import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Premium background images for each topic
const slides = [
  {
    id: 1,
    title: ['We Build', 'Digital Empires'],
    subtitle: 'Transform ideas into powerful digital experiences',
    image: 'https://images.unsplash.com/photo-1451187580459-4349027975-89b97f2a6d1b?w=1920&q=95&auto=format&fm=webp',
    topic: 'Digital Innovation'
  },
  {
    id: 2,
    title: ['Forex Trading', 'Expertise'],
    subtitle: 'Expert market analysis for consistent returns',
    image: 'https://images.unsplash.com/photo-1611974789855-0c27eeb73c25?w=1920&q=95&auto=format&fm=webp',
    topic: 'Forex'
  },
  {
    id: 3,
    title: ['Crypto', 'Investment'],
    subtitle: 'Navigate crypto markets with expert guidance',
    image: 'https://images.unsplash.com/photo-1621761193190-e36f7d45b30b?w=1920&q=95&auto=format&fm=webp',
    topic: 'Crypto'
  },
  {
    id: 4,
    title: ['Movies &', 'Streaming'],
    subtitle: 'Premium content from around the world',
    image: 'https://images.unsplash.com/photo-1489599827-2-6b71e5d7f7b1?w=1920&q=95&auto=format&fm=webp',
    topic: 'Movies'
  },
  {
    id: 5,
    title: ['Tech', 'Solutions'],
    subtitle: 'Custom software development for modern businesses',
    image: 'https://images.unsplash.com/photo-1518770664919-447be79de8f3?w=1920&q=95&auto=format&fm=webp',
    topic: 'Tech'
  },
  {
    id: 6,
    title: ['Social Media', 'Growth'],
    subtitle: 'Amplify your brand across all platforms',
    image: 'https://images.unsplash.com/photo-1611162616305-c8db00cb30ee?w=1920&q=95&auto=format&fm=webp',
    topic: 'Social'
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Auto-advance slides
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, SLIDE_DURATION);

    // Progress bar
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.topic}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Topic Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-xs md:text-sm font-medium tracking-[0.3em] text-white/50 uppercase">
                {slide.topic}
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              {slide.title.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="block"
                >
                  {i === slide.title.length - 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                      {line}
                    </span>
                  ) : (
                    <span className="text-white/90">{line}</span>
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-white/50 max-w-xl font-light"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex gap-4"
            >
              <button className="px-8 py-4 bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-colors">
                Explore Service
              </button>
              <button className="px-8 py-4 border border-white/20 text-white text-sm font-medium tracking-wide hover:bg-white/5 transition-colors">
                View All
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
          <div className="flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  setProgress(0);
                }}
                className={`h-1 transition-all duration-300 ${
                  i === current 
                    ? 'w-12 bg-white' 
                    : 'w-6 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 right-8 md:right-16 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-white/40 uppercase rotate-90 origin-center translate-x-4">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}