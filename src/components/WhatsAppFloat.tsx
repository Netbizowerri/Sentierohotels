import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const whatsappUrl = `https://wa.me/2349022842982?text=${encodeURIComponent(
    'Hello Sentiero Hotels & Suites, I would like to inquire about room booking and airport shuttle.'
  )}`;

  return (
    <aside aria-label="Quick contact" className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white"
        title="Chat with Sentiero Concierge on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"></span>

        {/* Floating tooltip */}
        <div className="absolute left-16 bg-[#242E51] text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 border border-[#CD9A29]/30">
          Chat with Front Desk
        </div>
      </a>
    </aside>
  );
};
