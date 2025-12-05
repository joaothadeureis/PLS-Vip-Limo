import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Star, Mail } from 'lucide-react';

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Announcement Bar with Rating */}
      <div className={`bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 py-1.5 transition-all duration-300 z-40 ${isScrolled ? 'hidden' : 'relative'}`}>
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

      {/* Top Bar - Desktop only */}
      <div className={`bg-dark-900 border-b border-white/5 py-2.5 hidden md:block transition-all duration-300 ${isScrolled ? 'hidden' : 'relative'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-400">
                <span className="flex items-center gap-2"><MapPin size={10} className="text-gold-400" /> Serving All Bay Area</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Available 24/7</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="tel:+14158701333" className="flex items-center gap-2 text-gold-400 hover:text-white transition-colors">
                  <Phone size={14} />
                  <span className="text-sm font-semibold">(415) 870-1333</span>
                </a>
                <a href="tel:+14155488535" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors">
                  <Phone size={14} />
                  <span className="text-sm font-semibold">(415) 548-8535</span>
                </a>
            </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 left-0 ${
          isScrolled 
            ? 'top-0 bg-dark-900/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' 
            : 'top-[30px] md:top-[69px] bg-dark-900/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
              <img 
                src="./pls-vip-limo-1-1.webp" 
                alt="PLS VIP Limo" 
                className="h-10 md:h-14 w-auto object-contain"
              />
          </div>

          {/* Desktop Menu */}
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
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
                  <Menu size={24} />
              </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-dark-900 z-[70] transform transition-transform duration-300 ease-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <img 
            src="./pls-vip-limo-1-1.webp" 
            alt="PLS VIP Limo" 
            className="h-8 w-auto"
          />
          <button onClick={() => setMobileMenuOpen(false)} className="text-white p-1">
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-[calc(100%-70px)]">
          {/* Navigation Links */}
          <div className="flex-1 py-6 px-5">
            {['Fleet', 'Services', 'Reviews', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-gray-300 hover:text-gold-400 text-sm tracking-widest uppercase border-b border-white/5 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="px-5 py-4 border-t border-white/10 bg-dark-800/50">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Contact Us</p>
            
            <a 
              href="tel:+14158701333"
              className="flex items-center gap-3 py-2.5 text-gold-400 font-semibold"
            >
              <Phone size={16} /> (415) 870-1333
            </a>
            <a 
              href="tel:+14155488535"
              className="flex items-center gap-3 py-2.5 text-white/80"
            >
              <Phone size={16} /> (415) 548-8535
            </a>
            <a 
              href="mailto:info@plsviplimo.com"
              className="flex items-center gap-3 py-2.5 text-white/80"
            >
              <Mail size={16} /> info@plsviplimo.com
            </a>
          </div>

          {/* CTA Button */}
          <div className="p-5 border-t border-white/10">
            <a 
              href="#book"
              onClick={() => setMobileMenuOpen(false)} 
              className="block w-full text-center py-3 bg-gold-400 text-dark-900 font-bold uppercase tracking-widest text-sm"
            >
              Book Now
            </a>
            <p className="text-center text-[10px] text-gray-500 flex items-center justify-center gap-2 mt-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Phone Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-t border-gold-400/30 safe-area-pb">
        <div className="flex">
          <a 
            href="tel:+14158701333" 
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gold-400 text-dark-900 font-bold text-sm"
          >
            <Phone size={14} />
            <span>Call Now</span>
          </a>
          <a 
            href="#book" 
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-dark-800 text-white font-bold text-sm border-l border-white/10"
          >
            <span>Book Online</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;