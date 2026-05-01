import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Premium background images for each topic
const slides = [
  {
    id: 1,
    title: ['Financial', 'Freedom', 'Decoded'],
    subtitle: 'Expert forex and crypto solutions for wealth building.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1920&q=95&auto=format&fm=webp',
    topic: 'Finance'
  },
  {
    id: 2,
    title: ['Digital', 'Powerhouses'],
    subtitle: 'Building the next generation of high-performance digital ecosystems.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=95&auto=format&fm=webp',
    topic: 'Innovation'
  },
  {
    id: 3,
    title: ['Cinematic', 'Storytelling', 'Unleashed'],
    subtitle: 'Visual narratives that captivate, inspire, and transform.',
    image: 'https://images.unsplash.com/photo-1492691523567-6119e618ef3e?w=1920&q=95&auto=format&fm=webp',
    topic: 'Media'
  },
  {
    id: 4,
    title: ['Blockchain', 'Consulting'],
    subtitle: 'Strategic guidance for navigating the future of decentralized finance.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=95&auto=format&fm=webp',
    topic: 'Blockchain'
  },
  {
    id: 5,
    title: ['Tech', 'Development'],
    subtitle: 'Engineering robust solutions for the world\'s most complex challenges.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1920&q=95&auto=format&fm=webp',
    topic: 'Technology'
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const SLIDE_DURATION = 6000;

  // Auto-advance slides
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, SLIDE_DURATION);

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
      {/* Background Images with Cinematic Transition */}
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={slide.id}
          initial={{ x: '100%', scale: 1.1, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          exit={{ x: '-20%', scale: 1.05, opacity: 0 }}
          transition={{ 
            duration: 1.4, 
            ease: [0.16, 1, 0.3, 1], // Custom cinematic cubic-bezier
            opacity: { duration: 0.8 }
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.topic}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Topic Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <span className="px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/90 uppercase border border-white/20 bg-white/5 backdrop-blur-md">
                {slide.topic}
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold leading-[0.85] tracking-tighter uppercase">
              {slide.title.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ clipPath: 'inset(100% 0 0 0)', y: 50 }}
                  animate={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block mb-2"
                >
                  {i === slide.title.length - 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30">
                      {line}
                    </span>
                  ) : (
                    <span className="text-white">{line}</span>
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-8 text-base md:text-lg text-white/60 max-w-lg font-normal leading-relaxed tracking-wide"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-12 flex items-center gap-8"
            >
              <button className="group relative px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform overflow-hidden">
                <span className="relative z-10">Explore Case Study</span>
                <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button className="text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors flex items-center gap-4 group">
                View Portfolio
                <div className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-white transition-all duration-500" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 left-8 md:left-16 lg:left-24 flex items-center gap-6">
          <div className="flex gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                  setProgress(0);
                }}
                className="group relative h-12 w-8 flex items-end pb-2"
              >
                <div className={`w-full h-[2px] transition-all duration-500 ${
                  i === current ? 'bg-white' : 'bg-white/20'
                }`} />
                <span className={`absolute top-0 left-0 text-[10px] font-bold transition-all ${
                  i === current ? 'opacity-100' : 'opacity-0'
                }`}>
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>
          
          <div className="h-12 w-px bg-white/10 mx-4" />
          
          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
            <span className="text-white">0{current + 1}</span> / 0{slides.length}
          </div>
        </div>

        {/* Side Progress Text (Vertical) */}
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col items-center gap-12">
            <div className="h-40 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="rotate-90 origin-center whitespace-nowrap">
              <span className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">
                Kagujje Digital Experience 2026
              </span>
            </div>
            <div className="h-40 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Hero Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
        <motion.div
          className="h-full bg-white/40"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </section>
  );
}