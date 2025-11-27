import React, { useEffect } from 'react';

const BookingWidget: React.FC = () => {
  useEffect(() => {
    // Dynamically load the MyLimoBiz widget script
    const script = document.createElement('script');
    script.src = "https://book.mylimobiz.com/v4/widgets/widget-loader.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto relative z-20 px-2 md:px-4">
      {/* Glassmorphism Container to house the external widget */}
      <div className="bg-dark-800/80 backdrop-blur-xl border border-white/10 p-2 md:p-8 shadow-2xl rounded-sm min-h-[400px] flex flex-col items-center justify-center">
        
        <div className="w-full text-center mb-6 pt-4 md:pt-0">
            <h3 className="text-white font-serif text-2xl mb-2">Reserve Your Ride</h3>
            <p className="text-gray-400 text-xs uppercase tracking-widest">Instant Online Booking</p>
        </div>

        {/* The required anchor tag for the widget */}
        <div className="w-full flex justify-center booking-widget-wrapper">
             <a 
                href="https://book.mylimobiz.com/v4/plslimo" 
                data-ores-widget="website" 
                data-ores-alias="plslimo"
                className="hidden" // The script usually replaces this or appends, hiding default just in case until loaded
             >
                Online Reservations
             </a>
        </div>
      </div>
      
      <style>{`
        /* Overrides to ensure the widget blends with our dark/luxury theme if iframe allows transparent bg */
        iframe[data-ores-widget] {
            width: 100% !important;
            min-height: 450px;
            border: none;
        }
      `}</style>
    </div>
  );
};

export default BookingWidget;