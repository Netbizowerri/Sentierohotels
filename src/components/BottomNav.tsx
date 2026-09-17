import React from 'react';
import { Home, Compass, Bookmark, Sparkles, PhoneCall } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingsCount: number;
  openBookingsModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  bookingsCount,
  openBookingsModal,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'suites', label: 'Suites', icon: Compass },
    { id: 'amenities', label: 'Amenities', icon: Sparkles },
    { id: 'bookings', label: 'Bookings', icon: Bookmark, isModal: true },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#242E51] text-white border-t border-[#303D6A] px-4 py-2 flex items-center justify-around shadow-2xl lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.isModal) {
                openBookingsModal();
              } else {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-[#CD9A29] font-bold' : 'text-white/70 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] text-[#CD9A29]' : 'stroke-2 text-white/70'}`} />
              {item.isModal && bookingsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#CD9A29] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {bookingsCount}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5">{item.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#CD9A29] mt-0.5"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
