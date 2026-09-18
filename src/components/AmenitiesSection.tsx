import React, { useState } from 'react';
import {
  Zap,
  ShieldCheck,
  Utensils,
  Waves,
  Plane,
  Dumbbell,
  GlassWater,
  Wifi,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { HOTEL_AMENITIES, SENTIERO_INFO } from '../data/hotelData';
import { HotelAmenity } from '../types/hotel';

interface AmenitiesSectionProps {
  onBookNow: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ onBookNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAmenity, setActiveAmenity] = useState<HotelAmenity | null>(null);

  const filteredAmenities =
    selectedCategory === 'all'
      ? HOTEL_AMENITIES
      : HOTEL_AMENITIES.filter((a) => a.category === selectedCategory);

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#CD9A29]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#242E51]" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-[#CD9A29]" />;
      case 'Waves':
        return <Waves className="w-6 h-6 text-[#242E51]" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#CD9A29]" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-[#242E51]" />;
      case 'GlassWater':
        return <GlassWater className="w-6 h-6 text-[#CD9A29]" />;
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-[#242E51]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#CD9A29]" />;
    }
  };

  return (
    <section className="py-8 sm:py-12 space-y-8">
      {/* Hospitality Intro Card in Primary #242E51 and Accent #CD9A29 */}
      <div className="relative rounded-3xl overflow-hidden bg-[#242E51] text-white p-6 sm:p-10 shadow-xl border border-[#CD9A29]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#CD9A29]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B233F] text-[#CD9A29] text-xs font-bold uppercase tracking-wider mb-4 border border-[#CD9A29]/40">
            <Sparkles className="w-3.5 h-3.5" />
            Sentiero Hospitality Redefined
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-4 text-white">
            {SENTIERO_INFO.headline}
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
            {SENTIERO_INFO.description}
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Plane className="w-5 h-5 text-[#CD9A29] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              {SENTIERO_INFO.airportPitch}
            </p>
          </div>
        </div>
      </div>

      {/* Amenities Grid & Category filter */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#242E51] bg-[#242E51]/10 px-2.5 py-1 rounded-md border border-[#242E51]/20">
              World-Class Comfort
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#091626] font-display mt-2">
              Hotel Features & Amenities
            </h3>
            <p className="text-xs sm:text-sm text-[#091626]/70 mt-1">
              Everything you need for an unforgettable stay in Imo State
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Amenities' },
              { id: 'security', label: 'Security & Power' },
              { id: 'dining', label: 'Dining & Lounge' },
              { id: 'wellness', label: 'Wellness & Pool' },
              { id: 'convenience', label: 'Airport & Tech' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#242E51] text-white shadow-xs'
                    : 'bg-white text-[#091626] border border-[#242E51]/15 hover:border-[#CD9A29]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amenity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAmenities.map((amenity) => (
            <div
              key={amenity.id}
              onClick={() => setActiveAmenity(amenity)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl border border-[#242E51]/15 bg-white p-5 shadow-xs hover:shadow-lg hover:border-[#CD9A29] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sentiero-dots border border-[#242E51]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getAmenityIcon(amenity.icon)}
                  </div>
                  {amenity.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#242E51]/10 text-[#242E51]">
                      {amenity.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-base text-[#091626] mb-2 group-hover:text-[#CD9A29] transition">
                  {amenity.title}
                </h4>

                <p className="text-xs text-[#091626]/75 leading-relaxed">
                  {amenity.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#CD9A29]">
                <span>View Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Deep Dive Modal if an amenity is clicked */}
      {activeAmenity && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#242E51]/15 animate-in fade-in duration-200">
            <div className="relative h-44 w-full bg-[#242E51]">
              <img
                src={activeAmenity.image}
                alt={activeAmenity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#242E51] via-[#242E51]/40 to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#CD9A29] text-white">
                  {activeAmenity.badge}
                </span>
                <h4 className="text-xl font-extrabold mt-1 font-display text-white">
                  {activeAmenity.title}
                </h4>
              </div>
            </div>

            <div className="p-5 space-y-4 bg-sentiero-dots">
              <p className="text-xs sm:text-sm text-[#091626]/80 leading-relaxed">
                {activeAmenity.description}
              </p>

              <div className="p-3 rounded-2xl bg-white border border-[#242E51]/10 text-xs text-[#091626]/80 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#091626]">
                  <CheckCircle2 className="w-4 h-4 text-[#CD9A29]" />
                  Available 24 hours to all registered hotel guests
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#242E51]" />
                  Included with Classic, Deluxe, Royal & Executive Suites
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveAmenity(null)}
                  className="flex-1 py-2.5 rounded-full border border-[#242E51]/20 bg-white text-[#091626] text-xs font-semibold hover:bg-neutral-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveAmenity(null);
                    onBookNow();
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold transition shadow-xs"
                >
                  Book a Suite Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
