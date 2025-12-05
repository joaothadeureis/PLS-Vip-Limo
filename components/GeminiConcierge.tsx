import React, { useState, useEffect } from 'react';
import { X, Send, Headset, Phone, Mail, MessageSquare, Loader2, Check } from 'lucide-react';

const ConciergeWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'message' | 'call'>('message');
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Show tooltip after 4 seconds on first visit
  useEffect(() => {
    if (!hasShownTooltip && !isOpen) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setHasShownTooltip(true);
        // Auto-hide after 10 seconds
        setTimeout(() => setShowTooltip(false), 10000);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [hasShownTooltip, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const payload = {
      ...formData,
      ip: '',
      userAgent: navigator.userAgent,
      source: window.location.href,
      submittedAt: new Date().toISOString()
    };

    try {
      // Send to both webhook and mail.php for redundancy
      const [webhookResponse, mailResponse] = await Promise.allSettled([
        fetch('https://n8n.srv981504.hstgr.cloud/webhook/pls-vip-limo-page-offer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
        fetch('/california-services/mail.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      ]);

      // Check if at least one succeeded
      const webhookOk = webhookResponse.status === 'fulfilled' && webhookResponse.value.ok;
      const mailOk = mailResponse.status === 'fulfilled' && mailResponse.value.ok;

      if (webhookOk || mailOk) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Reset status after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-40 md:bottom-8 md:right-8">
          {/* Auto Tooltip - appears after 4s */}
          <div className={`absolute right-full mr-4 bottom-2 transition-all duration-500 ${showTooltip && !isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
            <div className="bg-white text-dark-900 px-5 py-4 rounded-xl shadow-2xl w-[260px] relative border-l-4 border-gold-400">
              <button 
                onClick={() => setShowTooltip(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-dark-900 text-white rounded-full text-sm flex items-center justify-center hover:bg-gold-400 transition-colors"
              >
                ×
              </button>
              <p className="text-base font-bold mb-2">Need help booking? 👋</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Questions about pricing or availability? Our concierge team is here to help!
              </p>
              <p className="text-xs text-gold-600 font-bold">Click to chat or call us →</p>
              {/* Arrow */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"></div>
            </div>
          </div>
          
          {/* Hover Tooltip */}
          <div className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-dark-900 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none ${showTooltip ? 'hidden' : ''}`}>
              Talk with our concierge
          </div>
          
          <button 
            onClick={() => { setIsOpen(true); setShowTooltip(false); }}
            className={`group relative w-[72px] h-[72px] md:w-24 md:h-24 bg-gradient-to-br from-gold-400 to-gold-600 text-dark-900 rounded-full shadow-[0_0_40px_rgba(146,132,84,0.5)] hover:shadow-[0_0_60px_rgba(146,132,84,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
          >
            {/* Subtle pulse ring - slower animation */}
            <span className="absolute inset-0 rounded-full bg-gold-400 animate-[ping_3s_ease-in-out_infinite] opacity-20"></span>
            <Headset className="w-8 h-8 md:w-10 md:h-10 relative z-10" />
          </button>
      </div>

      {/* Modal Window */}
      {isOpen && (
        <div className="fixed z-50 w-[90%] md:w-[380px] bg-dark-800/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-sm overflow-hidden animate-in fade-in duration-300 
          left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
          md:top-auto md:translate-y-0 md:translate-x-0 md:left-auto md:bottom-8 md:right-8"
        >
          
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-dark-900 to-dark-800 border-b border-white/10 relative">
             <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>

            <h3 className="text-white font-serif text-xl mb-2">How can our concierge assist you today?</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
                Enjoy a seamless, elegant and personalized experience before confirming your reservation.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab('message')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'message' ? 'bg-gold-400 text-dark-900' : 'text-gray-400 hover:text-white bg-dark-900'}`}
              >
                  Send Message
              </button>
              <button 
                onClick={() => setActiveTab('call')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'call' ? 'bg-gold-400 text-dark-900' : 'text-gray-400 hover:text-white bg-dark-900'}`}
              >
                  Call Us
              </button>
          </div>

          {/* Content */}
          <div className="p-6 bg-dark-900">
              
              {activeTab === 'message' && (
                  <div className="space-y-4">
                      <div className="mb-4">
                          <h4 className="text-white font-serif text-lg">Send a message now</h4>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Get fast assistance. Our concierge will reach out right away to confirm availability and help with your booking.
                          </p>
                      </div>

                      <form className="space-y-3" onSubmit={handleSubmit}>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name" 
                            required
                            className="w-full bg-dark-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-400 focus:outline-none transition-colors" 
                          />
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email" 
                            required
                            className="w-full bg-dark-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-400 focus:outline-none transition-colors" 
                          />
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone" 
                            required
                            className="w-full bg-dark-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-400 focus:outline-none transition-colors" 
                          />
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3} 
                            placeholder="Message" 
                            required
                            className="w-full bg-dark-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-400 focus:outline-none transition-colors resize-none"
                          ></textarea>
                          
                          <button 
                            type="submit"
                            disabled={status === 'submitting' || status === 'success'}
                            className={`w-full py-3 font-bold uppercase text-xs tracking-widest transition-colors flex items-center justify-center gap-2 ${
                              status === 'success' ? 'bg-green-600 text-white' : 'bg-gold-400 text-dark-900 hover:bg-white'
                            } ${status === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''}`}
                          >
                              {status === 'submitting' ? (
                                <>Sending... <Loader2 className="animate-spin" size={14} /></>
                              ) : status === 'success' ? (
                                <>Request Sent <Check size={14} /></>
                              ) : (
                                <>Send Request <Send size={14} /></>
                              )}
                          </button>
                          
                          {status === 'error' && (
                            <p className="text-red-400 text-[10px] text-center mt-2">
                              Something went wrong. Please try again or call us directly.
                            </p>
                          )}
                      </form>
                  </div>
              )}

              {activeTab === 'call' && (
                  <div className="space-y-6 text-center py-4">
                       <div className="mb-4">
                          <h4 className="text-white font-serif text-lg">Call Us</h4>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Prefer direct assistance? Speak with a chauffeur specialist now.
                          </p>
                      </div>

                      <div className="space-y-4">
                          <a href="tel:+14158701333" className="block w-full py-4 border border-white/10 hover:border-gold-400 bg-dark-800 text-white hover:text-gold-400 transition-all group">
                              <div className="flex items-center justify-center gap-3">
                                  <Phone size={18} className="text-gold-400" />
                                  <span className="font-serif text-lg tracking-wide">+1 (415) 870-1333</span>
                              </div>
                          </a>
                          
                          <a href="tel:+14155488535" className="block w-full py-4 border border-white/10 hover:border-gold-400 bg-dark-800 text-white hover:text-gold-400 transition-all group">
                              <div className="flex items-center justify-center gap-3">
                                  <Phone size={18} className="text-gold-400" />
                                  <span className="font-serif text-lg tracking-wide">+1 (415) 548-8535</span>
                              </div>
                          </a>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          Available 24/7
                      </div>
                  </div>
              )}

          </div>
        </div>
      )}
    </>
  );
};

export default ConciergeWidget;