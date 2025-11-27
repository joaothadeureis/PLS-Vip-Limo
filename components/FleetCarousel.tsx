import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, User, Briefcase } from 'lucide-react';
import { Vehicle } from '../types';

interface FleetCarouselProps {
  fleet: Vehicle[];
}

const FleetCarousel: React.FC<FleetCarouselProps> = ({ fleet }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(fleet.length / itemsPerPage);
  const maxIndex = Math.max(0, fleet.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative group">
      {/* Navigation Buttons */}
      {/* Position: Inside on Mobile/Tablet (left-2), Outside on Desktop (lg:-left-12) */}
      <div className="absolute top-1/2 -translate-y-1/2 z-20 left-2 lg:-left-12">
        <button 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-dark-900/80 backdrop-blur-sm border border-gold-400/50 text-gold-400 hover:bg-gold-400 hover:text-dark-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className="absolute top-1/2 -translate-y-1/2 z-20 right-2 lg:-right-12">
        <button 
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-dark-900/80 backdrop-blur-sm border border-gold-400/50 text-gold-400 hover:bg-gold-400 hover:text-dark-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Carousel Track */}
      <div className="overflow-hidden" ref={containerRef}>
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
        >
          {fleet.map((vehicle) => (
            <div 
              key={vehicle.id} 
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <div className="bg-dark-900 border border-white/5 hover:border-gold-400/30 transition-all duration-300 h-full flex flex-col group/card">
                {/* Image Container - Updated to contain the image nicely */}
                <div className="aspect-[16/10] overflow-hidden bg-dark-800 relative flex items-center justify-center p-6">
                   <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-contain transition-transform duration-700 group-hover/card:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 z-10">
                    <span className="text-gold-400 text-[10px] uppercase tracking-widest font-bold">{vehicle.category}</span>
                  </div>
                </div>
                
                <div className="p-6 text-center flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider font-serif">{vehicle.name}</h3>
                    <div className="flex items-center justify-center gap-4 mb-4 text-gray-400 text-xs">
                         <div className="flex items-center gap-1">
                            <User size={12} className="text-gold-400" />
                            <span>{vehicle.capacity.passengers} Pax</span>
                         </div>
                         <div className="flex items-center gap-1">
                            <Briefcase size={12} className="text-gold-400" />
                            <span>Min {vehicle.description?.split('|')[1]?.trim() || '3 Hrs'}</span>
                         </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 h-4">{vehicle.description}</p>
                      <a 
                        href="#book" 
                        className="inline-block w-full py-3 border border-white/20 text-white text-[10px] uppercase tracking-widest hover:bg-gold-400 hover:text-dark-900 hover:border-gold-400 transition-all font-bold"
                      >
                        Book Now
                      </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
             <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-gold-400' : 'w-2 bg-dark-700 hover:bg-gray-500'}`}
             />
        ))}
      </div>
    </div>
  );
};

export default FleetCarousel;