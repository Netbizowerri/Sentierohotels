import React, { useState } from 'react';
import {
  Plane,
  Zap,
  ShieldCheck,
  Waves,
  UtensilsCrossed,
  Wifi,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface HotelFeaturesDarkProps {
  onGoToAirport?: () => void;
  onExploreSuites?: () => void;
}

interface FeatureItem {
  id: string;
  category: 'airport' | 'comfort' | 'dining' | 'security';
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  highlight: string;
}

const HOTEL_FEATURES: FeatureItem[] = [
  {
    id: 'airport-transit',
    category: 'airport',
    icon: Plane,
    title: '2-Minute Airport Transit',
    tagline: 'Curbside Arrival Within 2 Minutes',
    description:
      'Direct 1.2km transit to Sam Mbakwe International Cargo Airport (QOW). Never worry about traffic jams or missing early morning flights.',
    highlight: '2 Min Drive to Runway',
  },
  {
    id: 'solar-power',
    category: 'comfort',
    icon: Zap,
    title: '24/7 Power Supply',
    tagline: 'Orashi Power Grid & High-Capacity Solar',
    description:
      'Connected to the Orashi Power grid project of Imo state, a high-capacity solar array backed by automated dual standby generators guarantees uninterrupted air-conditioning, instant hot water, and continuous device charging.',
    highlight: 'Orashi Grid & Solar Array',
  },
  {
    id: 'security-detail',
    category: 'security',
    icon: ShieldCheck,
    title: 'Guaranteed Security',
    tagline: 'Fortified Perimeter Defense',
    description:
      'Round-the-clock perimeter patrols, and high-definition CCTV coverage ensures complete safety for our esteemed guests.',
    highlight: 'Guaranteed Safety',
  },
  {
    id: 'swimming-pool',
    category: 'comfort',
    icon: Waves,
    title: 'Crystal Swimming Pool',
    tagline: 'Resort Oasis & Sun Deck',
    description:
      'Unwind after flight travel in our pristine freshwater swimming pool close to the poolside bar.',
    highlight: 'Poolside Bar & Oasis',
  },
  {
    id: 'master-chef',
    category: 'dining',
    icon: UtensilsCrossed,
    title: 'Amazing Dishes',
    tagline: 'Authentic African & Continental Menus',
    description:
      'Savor freshly prepared Nigerian delicacies (Afang, Egusi and all kinds of pepper soup) alongside premium continental menus, breakfast and round-the-clock room dining.',
    highlight: '24/7 Kitchen Service',
  },
  {
    id: 'gigabit-wifi',
    category: 'comfort',
    icon: Wifi,
    title: 'Free Wi-Fi',
    tagline: 'Available In All Suites',
    description:
      'High-speed low-latency broadband throughout all rooms, lounges, and poolside areas. Stream 4K video, attend Zoom conferences, and work without lag.',
    highlight: 'Available In All Suites',
  },
];

export const HotelFeaturesDark: React.FC<HotelFeaturesDarkProps> = ({
  onGoToAirport,
  onExploreSuites,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFeatures =
    activeCategory === 'all'
      ? HOTEL_FEATURES
      : HOTEL_FEATURES.filter((f) => f.category === activeCategory);

  return (
    <section className="relative rounded-3xl sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#091626] via-[#141C31] to-[#091626] text-white p-5 sm:p-8 md:p-10 border border-[#CD9A29]/30 shadow-2xl">
      {/* Background glowing ambient effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CD9A29]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#242E51]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CD9A29]/20 border border-[#CD9A29]/60 text-[#E5B54A] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#CD9A29]" />
              <span className="text-[#E5B54A]">World-Class Hospitality Features</span>
            </div>

            <h2
              style={{ color: '#FFFFFF' }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white leading-tight"
            >
              Crafted for Luxury, Safety & Total Peace of Mind
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed max-w-2xl font-medium" style={{ color: '#E2E8F0' }}>
              From our fortified round-the-clock security escort to the Orashi-connected 24/7 power grid and 2-minute runway proximity, experience the premier sanctuary in Imo State.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All 6 Features' },
            { id: 'airport', label: 'Airport & Transit' },
            { id: 'comfort', label: 'Comfort & Power' },
            { id: 'security', label: 'Guaranteed Security' },
            { id: 'dining', label: 'Dining & Lounge' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#CD9A29] text-white shadow-md'
                    : 'bg-[#1B233F] text-white/80 hover:text-white hover:bg-[#242E51] border border-white/15'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Features Bento Grid with Cool Lucide Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-[#1B233F]/70 hover:bg-[#1B233F] border border-white/10 hover:border-[#CD9A29]/50 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                {/* Glowing top-right border accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#CD9A29]/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    {/* Cool Lucide Icon in golden glowing badge */}
                    <div className="w-12 h-12 rounded-2xl bg-[#CD9A29]/15 text-[#CD9A29] group-hover:bg-[#CD9A29] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md border border-[#CD9A29]/30">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#CD9A29] group-hover:border-[#CD9A29]/40 transition">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-white font-display group-hover:text-[#CD9A29] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[11px] font-semibold text-white/60 mb-2">
                    {item.tagline}
                  </p>

                  <p className="text-xs text-white/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-white/50 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#CD9A29]" />
                    Sentiero Verified
                  </span>
                  <span className="text-[11px] text-[#CD9A29] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Explore
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141C31]/90 p-4 sm:p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CD9A29]/20 text-[#CD9A29] flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white">
                Flying into Sam Mbakwe Airport soon?
              </h4>
              <p className="text-[11px] text-white/70">
                Check daily non-stop flights from QOW to Lagos & Abuja in our airport guide.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            {onGoToAirport && (
              <button
                onClick={onGoToAirport}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition text-center"
              >
                Airport Guide
              </button>
            )}
            {onExploreSuites && (
              <button
                onClick={onExploreSuites}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold transition shadow-md text-center"
              >
                Book Your Stay
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
