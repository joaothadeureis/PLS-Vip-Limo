import React from 'react';
import Navbar from './components/Navbar';
import BookingWidget from './components/BookingWidget';
import ConciergeWidget from './components/GeminiConcierge';
import FleetCarousel from './components/FleetCarousel';
import { SERVICES, FLEET, FEATURES } from './constants';
import { Shield, Star, Map, CheckCircle, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-gold-400 selection:text-dark-900 bg-dark-900">
      <Navbar />
      <ConciergeWidget />

      {/* Hero Section */}
      {/* Added extra bottom padding (pb-32 lg:pb-48) to prevent the booking widget overlap from cutting off the stats */}
      <header className="relative min-h-[85vh] flex items-center pt-24 pb-32 lg:pb-48 overflow-hidden bg-dark-900">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-dark-800 to-dark-900/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-dark-900 to-transparent z-10"></div>
        
        {/* Spotlights */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left pt-10 lg:pt-0">
              <div className="inline-block px-4 py-1.5 mb-6 border border-gold-400/30 rounded-full bg-dark-800/50 backdrop-blur-sm">
                <span className="text-gold-400 text-xs tracking-[0.2em] uppercase font-bold">Premium Chauffeur Service</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[1.1]">
                Luxury <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600 italic">Limousine</span> <br/>
                & VIP Transfers
              </h1>
              
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Experience high-end transportation across the Bay Area. Whether for airport transfers, corporate travel, or weddings, PLS VIP Limo ensures a stress-free journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#book" className="px-8 py-4 bg-gold-400 text-dark-900 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    Instant Quote
                </a>
                <a href="#fleet" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-gold-400 hover:text-gold-400 transition-all duration-300 flex items-center justify-center gap-2 group">
                    View All Fleet <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-16 flex justify-center lg:justify-start gap-12 border-t border-white/10 pt-8 relative z-20">
                  <div>
                      <span className="block text-2xl font-serif text-white mb-1">500+</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">VIP Clients</span>
                  </div>
                  <div>
                      <span className="block text-2xl font-serif text-white mb-1">24/7</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Support</span>
                  </div>
                   <div>
                      <span className="block text-2xl font-serif text-white mb-1">100%</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Reliability</span>
                  </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 transform lg:translate-x-10 lg:scale-110">
                  <img 
                    src="/posts-petstar-1-1-1.webp" 
                    alt="Luxury Cadillac Escalade" 
                    className="w-full h-auto drop-shadow-2xl"
                  />
               </div>
               {/* Decorative Circle behind car */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square border border-white/5 rounded-full z-0"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square border border-white/5 rounded-full z-0"></div>
            </div>

          </div>
        </div>
      </header>

      {/* Booking Widget Dedicated Section */}
      <section id="book" className="py-12 bg-dark-800 border-b border-white/5 relative -mt-10 lg:-mt-20 z-30">
        <div className="container mx-auto px-6 relative z-10">
           <BookingWidget />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-dark-900 relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-gold-400 text-xs tracking-[0.2em] uppercase font-bold mb-3 block">Luxury Cars</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Our Premium Chauffeur Services</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Enjoy tailored, high-end transportation throughout the entire Bay Area.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.map((service) => (
                    <div key={service.id} className="group relative bg-dark-800 border border-white/5 hover:border-gold-400/30 transition-all duration-500 flex flex-col">
                        <div className="aspect-[4/3] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                            <img 
                                src={service.image} 
                                alt={service.title} 
                                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80"></div>
                        </div>
                        
                        <div className="p-8 flex-grow flex flex-col items-center text-center -mt-12 relative z-10">
                            <h3 className="text-xl font-serif text-white mb-4 uppercase tracking-wide">{service.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">
                                {service.description}
                            </p>
                            <a href="#book" className="w-full py-3 bg-white/5 hover:bg-gold-400 text-gray-300 hover:text-dark-900 text-[10px] uppercase tracking-widest font-bold transition-all duration-300">
                                Instant Quote
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-dark-800 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
             <div className="text-center mb-16">
                 <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10">
                    <span className="text-gold-400 text-[10px] tracking-[0.2em] uppercase font-bold">Why Us?</span>
                 </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white">Why Choose Us?</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image Composition */}
                <div className="relative order-2 lg:order-1 max-w-md mx-auto lg:max-w-none">
                     <div className="relative rounded-sm overflow-hidden border border-white/5 shadow-2xl">
                         <img 
                            src="/Why Choose Us.png" 
                            className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" 
                            alt="Chauffeur opening door"
                         />
                         <div className="absolute inset-0 bg-gradient-to-tr from-gold-400/20 to-transparent mix-blend-overlay"></div>
                     </div>
                </div>

                {/* Features List */}
                <div className="order-1 lg:order-2 space-y-12">
                    {FEATURES.map((feature, idx) => (
                        <div key={idx} className="flex gap-6 group">
                            <div className="shrink-0 mt-1 w-12 h-12 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center group-hover:border-gold-400 transition-colors">
                                {feature.icon === 'shield' && <Shield className="text-gold-400 w-5 h-5" />}
                                {feature.icon === 'check' && <CheckCircle className="text-gold-400 w-5 h-5" />}
                                {feature.icon === 'star' && <Star className="text-gold-400 w-5 h-5" />}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                    
                    {/* Location Feature */}
                    <div className="flex gap-6 group">
                         <div className="shrink-0 mt-1 w-12 h-12 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center group-hover:border-gold-400 transition-colors">
                            <Map className="text-gold-400 w-5 h-5" />
                        </div>
                        <div>
                             <h4 className="text-xl font-bold text-white mb-2">Serving the Entire Bay Area</h4>
                             <p className="text-gray-400 text-sm leading-relaxed">
                                San Francisco • San Jose • Palo Alto • Mountain View • Oakland • Napa Valley
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Story / About Section */}
      <section id="about" className="py-24 bg-black relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Text Content */}
                <div className="text-center lg:text-left">
                    <div className="inline-block px-3 py-1 mb-6 rounded-full border border-gold-400/30">
                        <span className="text-gold-400 text-[10px] tracking-[0.2em] uppercase font-bold">About Us</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Our Story</h2>
                    
                    <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
                        At PLS VIP Limo, we believe luxury transportation should be seamless, reliable and memorable. With years of experience serving the Bay Area, we’ve delivered exceptional service to thousands of clients — families, executives, travelers and event-goers.
                    </p>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-10">
                        <span className="text-5xl md:text-6xl font-serif text-gold-400">+80k</span>
                        <span className="text-gray-500 text-xs uppercase tracking-widest mt-2 max-w-[150px] text-center lg:text-left">Passengers transported across California</span>
                    </div>

                    <a href="#book" className="inline-block px-10 py-4 bg-gold-400 text-dark-900 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300">
                        Instant Quote
                    </a>
                </div>

                {/* Image */}
                <div className="relative max-w-md mx-auto lg:max-w-none">
                    <div className="relative z-10 p-2 border border-white/10 bg-dark-800/50 backdrop-blur-sm">
                        <img 
                            src="/Rectangle-28-1.webp" 
                            alt="Chauffeur opening car door" 
                            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold-400/20 z-0"></div>
                </div>
            </div>
         </div>
      </section>

      {/* Fleet Showcase */}
      <section id="fleet" className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-dark-900 border border-white/10">
                    <span className="text-gold-400 text-[10px] tracking-[0.2em] uppercase font-bold">Fleet</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white">Our Fleet</h2>
            </div>

            {/* Replaced Grid with Carousel */}
            <div className="max-w-6xl mx-auto">
               <FleetCarousel fleet={FLEET} />
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-dark-900 relative border-t border-white/5">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                   
                   {/* Left Side: Image */}
                   <div className="relative order-1 max-w-md mx-auto lg:max-w-none">
                       <div className="relative z-10">
                           <img 
                             src="/Talk to us.webp" 
                             alt="Concierge Team" 
                             className="w-full h-auto object-contain drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-500 transform hover:scale-105 transition-transform"
                           />
                       </div>
                       {/* Background decoration */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square bg-gold-400/5 rounded-full blur-3xl -z-0"></div>
                   </div>

                   {/* Right Side: Content */}
                   <div className="text-center lg:text-left order-2">
                       <span className="text-gold-400 text-xs tracking-[0.2em] uppercase font-bold mb-4 block">Contact</span>
                       <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Talk to us</h2>
                       <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Connect with our concierge team to calculate trip costs instantly and reserve your luxury ride in minutes.
                       </p>
                       
                       <a href="#book" className="inline-block px-10 py-4 bg-gold-400 text-dark-900 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            Instant Quote
                        </a>
                   </div>

              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-16 pb-8 border-t border-white/10">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                 <div className="flex items-center gap-3">
                    <img 
                      src="/pls-vip-limo-1-1.webp" 
                      alt="PLS VIP Limo" 
                      className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
                    />
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 text-center md:text-right">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Call Us</p>
                        <a href="tel:+14158701333" className="block text-white hover:text-gold-400 transition-colors">+1 (415) 870-1333</a>
                        <a href="tel:+14155488535" className="block text-white hover:text-gold-400 transition-colors">+1 (415) 548-8535</a>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Email Us</p>
                        <a href="mailto:info@plsviplimo.com" className="text-white hover:text-gold-400 transition-colors">info@plsviplimo.com</a>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
                <p>© 2015–2025 All rights reserved.</p>
                <p>Made w/ ❤️ by <a href="https://wedomarketing.pro/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-400 transition-colors">WeDo Marketing</a>.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;