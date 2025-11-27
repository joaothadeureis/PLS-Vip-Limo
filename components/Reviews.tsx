import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  service?: string;
}

const REVIEWS: Review[] = [
  // Most recent first
  {
    id: 1,
    name: 'Kerry Winn',
    date: '3 months ago',
    rating: 5,
    text: 'We love the PLS VIP LIMO team! Rafael is our main guy and he is always on time, friendly and communicative! We use them for airport transfers and private parties. We recently rented a van for a trip to Napa and the van we got was spacious, comfortable and a great price. Our driver Alex was so awesome and accommodating! I wouldn\'t go anywhere else!',
    service: 'Airport Transfers & Private Parties'
  },
  {
    id: 2,
    name: 'Eduardo Souza',
    date: 'a month ago',
    rating: 5,
    text: 'Excellent service, extremely clean car, super attentive driver, I recommend it to everyone.',
    service: 'City Tours & Private Tours'
  },
  {
    id: 3,
    name: 'Victor Alves',
    date: 'a year ago',
    rating: 5,
    text: 'I can\'t thank Rafael enough for the incredible limo service provided on our wedding day. The limo was stunning and impeccably maintained, adding a touch of luxury to our special day. Rafael was punctual, professional, and incredibly attentive, ensuring everything went smoothly and stress-free. It truly made our celebration even more memorable.',
    service: 'Wedding Services'
  },
  {
    id: 4,
    name: 'Claudia Rezende',
    date: 'a year ago',
    rating: 5,
    text: 'I recently hired an airport transfer from PLS VIP Limo Company and was blown away by the exceptional service provided by the driver. Not only was the driver punctual and professional, but they also displayed a great sense of courtesy and attentiveness throughout the entire journey.',
    service: 'Airport Transfers'
  },
  {
    id: 5,
    name: 'Rafaelly Design',
    date: 'a year ago',
    rating: 5,
    text: 'Recently I had the pleasure of riding with PLS VIP LIMO, and I was thoroughly impressed, it was a five-star experience. The vehicle was very clean and luxurious, the driver was professional, punctual and well-dressed. PLS VIP LIMO pays attention to every detail, ensuring a comfortable and enjoyable ride.',
    service: 'Premium Service'
  },
  {
    id: 6,
    name: 'Cecilia Calvelo',
    date: 'a year ago',
    rating: 5,
    text: 'The best service I\'ve ever had. A great value for the $$. Our driver were absolutely outstanding. I would recommend PLS VIP Limo service to anyone who wants professional, dependable service.',
    service: 'Premium Service'
  },
  {
    id: 7,
    name: 'Francisco Carlos',
    date: 'a year ago',
    rating: 5,
    text: 'PLS vip limo serves all our customers in the bay area and our customers are very happy with their drivers, cars and time of arrival at the origin as they are never late but fifteen minutes early. We recommend PLS.',
    service: 'Corporate Transportation'
  },
  {
    id: 8,
    name: 'Pacifica California',
    date: 'a year ago',
    rating: 5,
    text: 'I recently had an exceptional experience going to Napa and I was surprised by the clean car and the polite and well dressed driver, I felt very comfortable and safe. I highly recommend the work of PLS VIP LIMO.',
    service: 'Napa Valley Tours'
  },
  {
    id: 9,
    name: 'Olive Minimo',
    date: 'a year ago',
    rating: 5,
    text: 'Without hesitation, you get 5 star ++ rating. The vehicle were perfect and driver were great... hard to ask for more.',
    service: 'Premium Service'
  },
  {
    id: 10,
    name: 'Thomas McIntyre',
    date: '2 years ago',
    rating: 5,
    text: 'Rafael was an early to appointed time which worked out great. The vehicle was a shiny new Escalade, water provided. Made great time to our destination. We\'d certainly use this service again, highly recommended.',
    service: 'Private Tours'
  },
  {
    id: 11,
    name: 'Kate Flowers',
    date: '2 years ago',
    rating: 5,
    text: 'They got us safely from Santa Rosa to San Francisco and even made a stop at Muir Woods. It was a very efficient, convenient, and relaxing trip! I would highly recommend this company for any transportation needs.',
    service: 'Private Tours'
  },
  {
    id: 12,
    name: 'Greg Hardy',
    date: '2 years ago',
    rating: 5,
    text: 'Wow, very professional, on time, immaculate interior. Truly a great experience and the driver was amazing. I\'ll be using them again and soon.',
    service: 'Premium Service'
  }
];

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={size} 
        className={i < rating ? 'text-gold-400 fill-gold-400' : 'text-gray-600'} 
      />
    ))}
  </div>
);

const ReviewCard: React.FC<{ review: Review; isVisible: boolean }> = ({ review, isVisible }) => (
  <div 
    className={`bg-dark-800 border border-white/5 p-8 h-full flex flex-col group hover:border-gold-400/30 transition-all duration-500 ${
      isVisible 
        ? 'opacity-100 translate-x-0 scale-100' 
        : 'opacity-0 translate-x-8 scale-95'
    }`}
  >
    <Quote className="text-gold-400/20 w-10 h-10 mb-4" />
    
    <p className="text-gray-300 text-sm leading-relaxed flex-grow mb-6">
      "{review.text}"
    </p>
    
    <div className="border-t border-white/10 pt-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-semibold">{review.name}</span>
        <StarRating rating={review.rating} size={14} />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{review.date}</span>
        {review.service && (
          <span className="text-gold-400/70">{review.service}</span>
        )}
      </div>
    </div>
  </div>
);

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [visibleCards, setVisibleCards] = useState<boolean[]>([true, true, true]);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(REVIEWS.length / itemsPerPage);

  const animateSlide = (newIndex: number, direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection(direction);
    
    // Fade out current cards with stagger
    setVisibleCards([false, false, false]);
    
    // After fade out, change index and fade in new cards
    setTimeout(() => {
      setCurrentIndex(newIndex);
      
      // Stagger fade in
      setTimeout(() => setVisibleCards([true, false, false]), 50);
      setTimeout(() => setVisibleCards([true, true, false]), 150);
      setTimeout(() => {
        setVisibleCards([true, true, true]);
        setIsAnimating(false);
      }, 250);
    }, 300);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % totalPages;
      animateSlide(newIndex, 'right');
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages, currentIndex, isAnimating]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAutoPlaying(false);
    const newIndex = (currentIndex - 1 + totalPages) % totalPages;
    animateSlide(newIndex, 'left');
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAutoPlaying(false);
    const newIndex = (currentIndex + 1) % totalPages;
    animateSlide(newIndex, 'right');
  };

  const goToPage = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAutoPlaying(false);
    const direction = index > currentIndex ? 'right' : 'left';
    animateSlide(index, direction);
  };

  const currentReviews = REVIEWS.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section id="reviews" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-dark-800 border border-white/10">
            <span className="text-gold-400 text-[10px] tracking-[0.2em] uppercase font-bold">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">What Our Clients Say</h2>
          
          {/* Google Rating Summary */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-white">5.0</span>
              <StarRating rating={5} size={24} />
            </div>
          </div>
          <a 
            href="https://share.google/WyRHsaMrefBXLfz8S" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Based on 25+ Google Reviews
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} isVisible={visibleCards[index]} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-400 transition-all"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Dots */}
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-gold-400 w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={goToNext}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-400 transition-all"
            aria-label="Next reviews"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a 
            href="https://share.google/WyRHsaMrefBXLfz8S" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900 font-bold uppercase tracking-widest text-xs transition-all duration-300"
          >
            Read All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
