import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Star } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar with Rating */}
      <div className={`bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 py-1.5 transition-all duration-300 ${isScrolled ? '-translate-y-full opacity-0 absolute top-0 w-full' : 'translate-y-0 opacity-100 relative'}`}>
        <div className="container mx-auto px-6">
          <a 
            href="https://share.google/WyRHsaMrefBXLfz8S" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 text-dark-900"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-dark-900 text-dark-900" />
              ))}
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
              5.0 Rating on Google • 25+ Reviews
            </span>
            <span className="hidden md:inline text-[10px] uppercase tracking-wider opacity-80">
              — Read what our clients say →
            </span>
          </a>
        </div>
      </div>

      {/* Top Bar */}
      <div className={`bg-dark-900 border-b border-white/5 py-2 hidden md:block transition-all duration-300 ${isScrolled ? '-translate-y-full opacity-0 absolute top-0 w-full' : 'translate-y-0 opacity-100 relative'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-2"><MapPin size={10} className="text-gold-400" /> San Francisco and Surrounding Areas</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="tel:+14158701333" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Phone size={10} className="text-gold-400" /> +1 (415) 870-1333</a>
                <a href="tel:+14155488535" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Phone size={10} className="text-gold-400" /> +1 (415) 548-8535</a>
            </div>
        </div>
      </div>

      <nav 
        className={`fixed w-full z-50 transition-all duration-500 left-0 ${
          isScrolled 
            ? 'top-0 bg-dark-900/95 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl' 
            : 'top-0 md:top-[69px] bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
              <img 
                src="./pls-vip-limo-1-1.webp" 
                alt="PLS VIP Limo" 
                className="h-10 w-auto object-contain"
              />
          </div>

          {/* Desktop Menu - Landing Page Mode (Anchors only) */}
          <div className="hidden md:flex items-center gap-8">
            {['Fleet', 'Services', 'Reviews', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-gold-400 text-xs tracking-[0.15em] uppercase transition-colors font-medium"
              >
                {item}
              </a>
            ))}
            <a href="#book" className="px-6 py-2 bg-transparent border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900 transition-all duration-300 uppercase text-xs tracking-widest font-bold">
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl">
               {['Fleet', 'Services', 'Reviews', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-gold-400 text-center text-sm tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
            <a 
              href="#book"
              onClick={() => setMobileMenuOpen(false)} 
              className="w-full text-center py-3 bg-gold-400 text-dark-900 font-bold uppercase tracking-widest"
            >
              Book Now
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;