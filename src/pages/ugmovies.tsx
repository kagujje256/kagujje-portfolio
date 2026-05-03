import { useState, useEffect } from "react";
import { Play, Search, Star, Clock, Film, Tv, ArrowRight, Heart, Share2, Download } from "lucide-react";

// Ugandan Entertainment Platform - UGMovies
// Streaming site for Uganda with MarzPay integration

const featuredMovies = [
  {
    id: 1,
    title: "The Last King of Scotland",
    genre: "Drama",
    year: "2006",
    rating: 7.7,
    duration: "2h 3m",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=500",
    description: "A gripping thriller set in Uganda during Idi Amin's regime."
  },
  {
    id: 2,
    title: "Queen of Katwe",
    genre: "Biography",
    year: "2016",
    rating: 7.4,
    duration: "2h 4m",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f8afaq?q=80&w=500",
    description: "The inspiring true story of Phiona Mutesi, chess prodigy from Kampala."
  },
  {
    id: 3,
    title: "Nairobi Half Life",
    genre: "Thriller",
    year: "2012",
    rating: 7.1,
    duration: "1h 52m",
    image: "https://images.unsplash.com/photo-1536440256693-1c19a0b0d777?q=80&w=500",
    description: "East African crime thriller with raw urban storytelling."
  }
];

const categories = [
  { name: "Action", icon: "💥", count: 45 },
  { name: "Drama", icon: "🎭", count: 67 },
  { name: "Comedy", icon: "😂", count: 32 },
  { name: "Romance", icon: "💕", count: 28 },
  { name: "Thriller", icon: "🔪", count: 19 },
  { name: "Local Ugandan", icon: "🇺🇬", count: 15 }
];

export default function UGMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <Film className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold tracking-tight">
                UG<span className="text-yellow-500">MOVIES</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Movies</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Series</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Local</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-yellow-500/50 w-48 md:w-64"
              />
            </div>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1920"
            alt="Featured"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center px-6 md:px-12 pt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              <span className="inline-block bg-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Featured
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                The Best of <span className="text-yellow-500">Ugandan</span> Cinema
              </h1>
              <p className="text-lg text-white/60 mb-8 max-w-xl">
                Stream the finest movies and series from Uganda and East Africa. 
                Local stories, global standards.
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors">
                  <Play className="w-5 h-5" />
                  Watch Now
                </button>
                <button className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors border border-white/20">
                  Browse All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-white/40 mb-6">Categories</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all group"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="text-sm font-medium group-hover:text-yellow-500 transition-colors">{cat.name}</div>
                <div className="text-xs text-white/40 mt-1">{cat.count} movies</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Featured <span className="text-yellow-500">Movies</span>
            </h2>
            <a href="#" className="text-sm text-white/60 hover:text-yellow-500 flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredMovies.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/30 transition-all cursor-pointer"
                onClick={() => setSelectedMovie(movie.id)}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-0.5 rounded-full">
                      {movie.genre}
                    </span>
                    <span className="text-xs text-white/40">{movie.year}</span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {movie.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-500 transition-colors">
                    {movie.title}
                  </h3>
                  
                  <p className="text-sm text-white/60 line-clamp-2 mb-3">
                    {movie.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{movie.rating}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Ugandan Section */}
      <section className="py-12 px-6 md:px-12 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl">🇺🇬</span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Local Ugandan Content</h2>
              <p className="text-sm text-white/60">Support local filmmakers and storytellers</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="group relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={`https://images.unsplash.com/photo-${1500000000 + i * 1000}?q=80&w=400`}
                  alt={`Local movie ${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs text-yellow-500 mb-1">UGANDAN</div>
                  <div className="font-bold">Local Film {i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Subscribe */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Unlimited Streaming
          </h2>
          <p className="text-white/60 mb-12 max-w-xl mx-auto">
            Get access to thousands of movies and series from Uganda and beyond. 
            Pay with Mobile Money, MarzPay, or Crypto.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-sm text-white/40 mb-2">Basic</div>
              <div className="text-3xl font-bold mb-2">UGX 15K</div>
              <div className="text-sm text-white/60 mb-4">per month</div>
              <ul className="text-sm text-white/60 text-left space-y-2 mb-6">
                <li>✓ SD Quality</li>
                <li>✓ 1 Device</li>
                <li>✓ Limited Library</li>
              </ul>
              <button className="w-full bg-white/10 text-white py-2 rounded-full text-sm font-bold hover:bg-white/20 transition-colors">
                Choose Basic
              </button>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="text-sm text-yellow-500 mb-2">Premium</div>
              <div className="text-3xl font-bold mb-2">UGX 35K</div>
              <div className="text-sm text-white/60 mb-4">per month</div>
              <ul className="text-sm text-white/60 text-left space-y-2 mb-6">
                <li>✓ HD Quality</li>
                <li>✓ 3 Devices</li>
                <li>✓ Full Library</li>
                <li>✓ Downloads</li>
              </ul>
              <button className="w-full bg-yellow-500 text-black py-2 rounded-full text-sm font-bold hover:bg-yellow-400 transition-colors">
                Choose Premium
              </button>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-sm text-white/40 mb-2">Family</div>
              <div className="text-3xl font-bold mb-2">UGX 60K</div>
              <div className="text-sm text-white/60 mb-4">per month</div>
              <ul className="text-sm text-white/60 text-left space-y-2 mb-6">
                <li>✓ 4K Quality</li>
                <li>✓ 6 Devices</li>
                <li>✓ Full Library</li>
                <li>✓ Downloads</li>
                <li>✓ Kids Mode</li>
              </ul>
              <button className="w-full bg-white/10 text-white py-2 rounded-full text-sm font-bold hover:bg-white/20 transition-colors">
                Choose Family
              </button>
            </div>
          </div>
          
          <p className="text-xs text-white/40 mt-8">
            Pay with MTN Mobile Money, Airtel Money, MarzPay, or Crypto
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-bold">UGMOVIES</span>
              </div>
              <p className="text-sm text-white/40 max-w-xs">
                The premier streaming platform for Ugandan and East African entertainment.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-4">Browse</div>
                <div className="space-y-2 text-sm text-white/60">
                  <a href="#" className="block hover:text-yellow-500 transition-colors">Movies</a>
                  <a href="#" className="block hover:text-yellow-500 transition-colors">Series</a>
                  <a href="#" className="block hover:text-yellow-500 transition-colors">Local</a>
                  <a href="#" className="block hover:text-yellow-500 transition-colors">New Releases</a>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-4">Support</div>
                <div className="space-y-2 text-sm text-white/60">
                  <a href="#" className="block hover:text-yellow-500 transition-colors">Help Center</a>
                  <a href="#" className="block hover:text-yellow-500 transition-colors">Contact</a>
                  <a href="#" className="block hover:text-yellow-500 transition-colors">FAQ</a>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-4">Legal</div>
                <div className="space-y-2 text-sm text-white/60">
                  <a href="#" className="block hover:text-yellow-500 transition-colors">Privacy</a>
                  <a href="#" className="block hover:text-yellow-500 transition-colors">Terms</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-white/40">
              © 2026 UGMovies. A Kagujje Digital Platform.
            </div>
            <div className="text-xs text-white/40">
              Powered by Kagujje AI Gateway
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}