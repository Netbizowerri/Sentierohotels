import React, { useState } from 'react';
import {
  Bookmark,
  Menu,
  X,
  Home,
  Info,
  Sparkles,
  CalendarCheck,
  PhoneCall,
  BookOpen,
} from 'lucide-react';
import { Currency } from '../types/hotel';

interface HeaderNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency?: Currency;
  setCurrency?: (c: Currency) => void;
  bookingsCount: number;
  openBookingsModal: () => void;
  isMobilePreview?: boolean;
  setIsMobilePreview?: (v: boolean) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  bookingsCount,
  openBookingsModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile menu items strictly matching user request:
  // Home, About us, Amenities, Book now, Contact us, Blogs
  const mobileMenuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About us', icon: Info },
    { id: 'amenities', label: 'Amenities', icon: Sparkles },
    { id: 'suites', label: 'Book now', icon: CalendarCheck },
    { id: 'contact', label: 'Contact us', icon: PhoneCall },
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#242E51] text-white shadow-md border-b border-[#303D6A] transition-all">
      {/* Main navigation (Header color: Pry color #242E51) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-22 sm:h-26 md:h-28 flex items-center justify-between gap-4">
        {/* Brand with Sentiero Logo (increased by another 20%) */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer group shrink-0"
          title="Sentiero Hotels & Suites"
        >
          <img
            src="https://i.ibb.co/ZRhBq64f/Sentiero-Hotels-Suites.jpg"
            alt="Sentiero Hotels & Suites Logo"
            className="h-[65px] sm:h-[82px] md:h-[94px] w-auto object-contain group-hover:opacity-95 transition"
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About us' },
            { id: 'amenities', label: 'Amenities' },
            { id: 'suites', label: 'Suites & Booking' },
            { id: 'blogs', label: 'Blogs' },
            { id: 'contact', label: 'Contact us' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#CD9A29] text-white shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right action items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* My Bookings Button */}
          <button
            onClick={openBookingsModal}
            className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1B233F] hover:bg-[#303D6A] text-white text-xs sm:text-sm font-semibold border border-white/10 transition"
            title="View your saved reservations"
          >
            <Bookmark className="w-4 h-4 text-[#CD9A29]" />
            <span className="hidden sm:inline">My Bookings</span>
            {bookingsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#CD9A29] text-white text-[10px] rounded-full font-bold">
                {bookingsCount}
              </span>
            )}
          </button>

          {/* CTA: Quick Book Now Action */}
          <button
            onClick={() => handleNavClick('suites')}
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs sm:text-sm font-bold shadow-md transition transform active:scale-95 whitespace-nowrap"
          >
            Book Suite
          </button>

          {/* Menu icon for mobile version after the CTA */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-[#1B233F] hover:bg-[#303D6A] text-white border border-white/10 transition active:scale-95 flex items-center justify-center shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#CD9A29]" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#303D6A] bg-[#1E2746] shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {mobileMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition ${
                    isActive
                      ? 'bg-[#CD9A29] text-white shadow-md'
                      : 'text-white/85 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#CD9A29]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </button>
              );
            })}

            {/* Quick Mobile Info Footer */}
            <div className="pt-3 mt-2 border-t border-white/10 px-4 flex items-center justify-between text-[11px] text-white/60">
              <span>Sam Mbakwe Airport · 2 Mins</span>
              <span>24/7 Front Desk</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
