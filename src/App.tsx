import { useState, useEffect } from 'react';

const topics = [
  { 
    id: 1, 
    title: "Financial Freedom",
    subtitle: "Decoded",
    description: "Expert forex and crypto solutions for wealth building",
    image: "https://images.unsplash.com/photo-1611974789855-66c8868af4cd?w=1920&q=80",
    accent: "#10b981"
  },
  { 
    id: 2, 
    title: "Cinematic",
    subtitle: "Storytelling",
    description: "Professional film production and visual storytelling",
    image: "https://images.unsplash.com/photo-1485846234645-a62644fbbafa?w=1920&q=80",
    accent: "#3b82f6"
  },
  { 
    id: 3, 
    title: "Digital",
    subtitle: "Powerhouses",
    description: "Services that ease daily work, solve problems, and make life enjoyable",
    image: "https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=1920&q=80",
    accent: "#8b5cf6"
  },
  { 
    id: 4, 
    title: "Streaming",
    subtitle: "Excellence",
    description: "Premium content delivery and streaming solutions",
    image: "https://images.unsplash.com/photo-1522869635300-da034de237de?w=1920&q=80",
    accent: "#ef4444"
  },
  { 
    id: 5, 
    title: "Tech",
    subtitle: "Innovation",
    description: "Cutting-edge technology solutions for modern challenges",
    image: "https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=1920&q=80",
    accent: "#f59e0b"
  }
];

export default function App() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const images = topics.map(t => t.image);
    let loadedCount = 0;
    
    images.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
      img.src = src;
    });

    // Auto-rotate
    const interval = setInterval(() => {
      setCurrentTopic(prev => (prev + 1) % topics.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  if (!loaded) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40,
            height: 40,
            border: '2px solid #333',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#666', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>Loading</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const topic = topics[currentTopic];

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0
      }}>
        {topics.map((t, i) => (
          <div
            key={t.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === currentTopic ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          >
            <img
              src={t.image}
              alt={t.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), #000)'
            }} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '20px 24px',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #111'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="#" style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>KAGUJJE</a>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <a href="#services" style={{ color: '#888', fontSize: 14 }}>Services</a>
            <a href="#projects" style={{ color: '#888', fontSize: 14 }}>Projects</a>
            <a href="#about" style={{ color: '#888', fontSize: 14 }}>About</a>
            <a href="#contact" style={{
              padding: '10px 20px',
              background: '#fff',
              color: '#000',
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 4
            }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', padding: 24, maxWidth: 800 }}>
          <h1 style={{ fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 'bold', marginBottom: 16 }}>
            <span style={{ color: '#666' }}>{topic.title}</span>
            <br />
            <span style={{ color: topic.accent }}>{topic.subtitle}</span>
          </h1>
          <p style={{ fontSize: 18, color: '#aaa', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            {topic.description}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#services" style={{
              padding: '16px 32px',
              background: '#fff',
              color: '#000',
              fontWeight: 500,
              borderRadius: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}>
              Explore Services
              <span>→</span>
            </a>
            <a href="#projects" style={{
              padding: '16px 32px',
              border: '1px solid #333',
              color: '#fff',
              fontWeight: 500,
              borderRadius: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}>
              ▶ View Projects
            </a>
          </div>

          {/* Indicators */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 64 }}>
            {topics.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTopic(i)}
                style={{
                  width: 48,
                  height: 4,
                  border: 'none',
                  borderRadius: 2,
                  background: i === currentTopic ? '#fff' : '#333',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{
        position: 'relative',
        padding: '96px 24px',
        background: '#0a0a0a',
        zIndex: 10
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ color: '#555', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>What We Do</p>
          <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 64 }}>Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { title: 'Forex Trading', desc: 'Expert market analysis and trading strategies', img: 'https://images.unsplash.com/photo-1611974789855-66c8868af4cd?w=800&q=80' },
              { title: 'Crypto Solutions', desc: 'Blockchain and cryptocurrency consulting', img: 'https://images.unsplash.com/photo-1518546305928-5e0c0b2a2e0c?w=800&q=80' },
              { title: 'Film Production', desc: 'Professional video and content creation', img: 'https://images.unsplash.com/photo-1485846234645-a62644fbbafa?w=800&q=80' },
              { title: 'Tech Development', desc: 'Custom software and platform development', img: 'https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=800&q=80' }
            ].map(service => (
              <div key={service.title} style={{
                position: 'relative',
                height: 320,
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
                <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, #000, transparent)'
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>{service.title}</h3>
                  <p style={{ fontSize: 14, color: '#888' }}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{
        position: 'relative',
        padding: '96px 24px',
        background: '#000',
        zIndex: 10
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ color: '#555', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Our Work</p>
          <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 64 }}>Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
            {[
              { title: 'Kagujje Movies', cat: 'Streaming Platform', desc: 'Premium streaming service with curated content', img: 'https://images.unsplash.com/photo-1522869635300-da034de237de?w=800&q=80' },
              { title: 'Financial Dashboard', cat: 'Fintech', desc: 'Real-time trading analytics platform', img: 'https://images.unsplash.com/photo-1611974789855-66c8868af4cd?w=800&q=80' },
              { title: 'Content Studio', cat: 'Media Production', desc: 'Full-service video production facility', img: 'https://images.unsplash.com/photo-1485846234645-a62644fbbafa?w=800&q=80' },
              { title: 'Tech Hub', cat: 'Development', desc: 'Innovation center for digital solutions', img: 'https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=800&q=80' }
            ].map(project => (
              <div key={project.title} style={{
                position: 'relative',
                height: 384,
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
                <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, #000, rgba(0,0,0,0.3))'
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32 }}>
                  <span style={{ fontSize: 12, color: '#888', marginBottom: 8, display: 'block' }}>{project.cat}</span>
                  <h3 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{project.title}</h3>
                  <p style={{ color: '#888' }}>{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{
        position: 'relative',
        padding: '96px 24px',
        background: '#0a0a0a',
        zIndex: 10
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div>
            <p style={{ color: '#555', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>About Us</p>
            <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 24 }}>Building Digital Excellence</h2>
            <p style={{ color: '#888', marginBottom: 16, lineHeight: 1.7 }}>
              Kagujje is a multidisciplinary digital company specializing in financial services, 
              media production, and technology development. We create solutions that transform 
              ideas into impactful digital experiences.
            </p>
            <p style={{ color: '#888', lineHeight: 1.7 }}>
              From forex trading expertise to cinematic storytelling, from streaming platforms 
              to custom tech solutions, we deliver excellence across every domain we touch.
            </p>
          </div>
          <div style={{ position: 'relative', height: 384, borderRadius: 8, overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1518770664539-c5f074030c3a?w=800&q=80" alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{
        position: 'relative',
        padding: '96px 24px',
        background: '#000',
        zIndex: 10
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#555', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Get In Touch</p>
          <h2 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 24 }}>Start Your Project</h2>
          <p style={{ color: '#888', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            Ready to build something exceptional? Contact us today and let's discuss 
            how we can bring your vision to life.
          </p>
          <a href="https://wa.me/256700000000" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 32px',
            background: '#059669',
            color: '#fff',
            fontWeight: 500,
            borderRadius: 4
          }}>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #111',
        padding: '48px 24px',
        background: '#0a0a0a',
        zIndex: 10
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>KAGUJJE</h3>
              <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6 }}>Digital excellence across finance, media, and technology.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8 }}><a href="#services" style={{ color: '#888', fontSize: 14 }}>Forex Trading</a></li>
                <li style={{ marginBottom: 8 }}><a href="#services" style={{ color: '#888', fontSize: 14 }}>Crypto Solutions</a></li>
                <li style={{ marginBottom: 8 }}><a href="#services" style={{ color: '#888', fontSize: 14 }}>Film Production</a></li>
                <li><a href="#services" style={{ color: '#888', fontSize: 14 }}>Tech Development</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8, color: '#888', fontSize: 14 }}>+256 700 000 000</li>
                <li style={{ marginBottom: 8, color: '#888', fontSize: 14 }}>hello@kagujje.com</li>
                <li style={{ color: '#888', fontSize: 14 }}>Kampala, Uganda</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #111', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <p style={{ color: '#555', fontSize: 14 }}>2025 Kagujje. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 24 }}>
              <a href="https://x.com/kagujje" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: 14 }}>X</a>
              <a href="https://instagram.com/kagujje" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: 14 }}>Instagram</a>
              <a href="https://linkedin.com/company/kagujje" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: 14 }}>LinkedIn</a>
              <a href="https://github.com/kagujje256" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: 14 }}>GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a
        href="https://wa.me/256700000000"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          background: '#059669',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 50
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.411z"/>
        </svg>
      </a>
    </div>
  );
}