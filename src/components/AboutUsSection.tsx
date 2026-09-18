import React from 'react';
import {
  Sparkles,
  Plane,
  ShieldCheck,
  Zap,
  Utensils,
  Waves,
  Wifi,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface AboutUsSectionProps {
  onBookNow: () => void;
  onExploreAmenities: () => void;
  onGoToContact: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  onBookNow,
  onExploreAmenities,
  onGoToContact,
}) => {
  return (
    <div className="py-6 sm:py-10 space-y-10 animate-in fade-in duration-300">
      {/* Hero / Vision Card */}
      <div className="rounded-3xl bg-[#242E51] text-white p-6 sm:p-12 border border-[#CD9A29]/30 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#CD9A29]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B233F] text-[#CD9A29] text-xs font-bold border border-[#CD9A29]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Sentiero Hotels & Suites</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            Where Luxury Meets Unrivaled Runway Convenience
          </h1>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            Welcome to Sentiero Hotels & Suites, Imo State’s benchmark for executive hospitality.
            Nestled along the Airport Access Corridor, exactly 2 minutes (1.2km) from Sam Mbakwe
            International Cargo Airport, we provide a serene oasis designed for solo business executives,
            dignitaries, families, and discerning travelers.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onBookNow}
              className="px-6 py-3 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95"
            >
              Book Your Suite
            </button>
            <button
              onClick={onExploreAmenities}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition active:scale-95"
            >
              Explore Hotel Amenities
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#242E51]/10 text-[#242E51] flex items-center justify-center">
            <Plane className="w-6 h-6 text-[#CD9A29]" />
          </div>
          <h3 className="text-lg font-bold text-[#091626] font-display">
            Strategic Airport Proximity
          </h3>
          <p className="text-xs sm:text-sm text-[#091626]/70 leading-relaxed">
            Located just 1.2km from the departure gates, you can completely sidestep highway gridlock
            and enjoy swift, complimentary airport transfers on your schedule.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#242E51]/10 text-[#242E51] flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#CD9A29]" />
          </div>
          <h3 className="text-lg font-bold text-[#091626] font-display">
            Guaranteed 24/7 Power
          </h3>
          <p className="text-xs sm:text-sm text-[#091626]/70 leading-relaxed">
            Connected to the Orashi energy infrastructure and fortified with high-capacity solar
            arrays and automated dual backup generators, your power never flickers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#242E51]/10 text-[#242E51] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#CD9A29]" />
          </div>
          <h3 className="text-lg font-bold text-[#091626] font-display">
            Fortified Security & Peace
          </h3>
          <p className="text-xs sm:text-sm text-[#091626]/70 leading-relaxed">
            Rest easy with perimeter surveillance, high-definition CCTV coverage across all common
            areas, access-controlled entryways, and 24/7 security personnel.
          </p>
        </div>
      </div>

      {/* Story & Heritage */}
      <div className="rounded-3xl bg-white border border-[#242E51]/15 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#CD9A29]">
            The Sentiero Hospitality Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#091626] font-display">
            Crafted for the Traveler Who Refuses to Compromise
          </h2>
          <p className="text-xs sm:text-sm text-[#091626]/70 leading-relaxed">
            At Sentiero Hotels and Suites, we recognize that hospitality is defined by attention to
            the small details: a bed that guarantees rejuvenating sleep, whisper-quiet air
            conditioning that keeps the climate perfect, swift high-speed internet to conduct
            business, and a kitchen that serves rich, unforgettable culinary delights.
          </p>
          <p className="text-xs sm:text-sm text-[#091626]/70 leading-relaxed">
            Our mission is simple: to be the trusted haven in Imo State for discerning travelers,
            business executives, and vacationers seeking luxury, serenity, and absolute peace of mind.
          </p>

          <div className="space-y-2 pt-2 text-xs sm:text-sm text-[#091626]/80 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
              <span>Dedicated 24/7 Front Desk and VIP Concierge Services</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
              <span>Master Chef — Amazing African &amp; Continental Dishes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
              <span>Crystal-clear Swimming Pool & Outdoor Relaxing Cabanas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
              <span>Well-stocked Main Bar and Intimate Evening Poolside Lounge</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl overflow-hidden shadow-md h-48 bg-neutral-100">
            <img
              src="https://i.ibb.co/fVwqt5vF/untitled-8964.jpg"
              alt="Sentiero Executive VIP Boardroom"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md h-48 bg-neutral-100">
            <img
              src="https://i.ibb.co/ZzPmMSbF/untitled-8961-1.jpg"
              alt="Sentiero Furnished Suite"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md h-48 bg-neutral-100">
            <img
              src="https://i.ibb.co/1YgtMPCq/untitled-8984.jpg"
              alt="Sentiero Swimming Pool"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md h-48 bg-neutral-100">
            <img
              src="https://i.ibb.co/chnn6tvV/untitled-8966.jpg"
              alt="Sentiero Main Bar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Location & Quick Contact card */}
      <div className="rounded-3xl bg-[#242E51] text-white p-6 sm:p-8 border border-[#CD9A29]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#CD9A29] text-xs font-bold">
            <MapPin className="w-4 h-4" />
            <span>Sam Mbakwe International Cargo Airport Access Road, Owerri, Imo State</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Plan Your Stay or Make an Inquiry
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl">
            Our reservation and concierge team is available 24 hours a day, 7 days a week.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onGoToContact}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition"
          >
            Contact Desk
          </button>
          <button
            onClick={onBookNow}
            className="px-5 py-2.5 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold shadow-md transition"
          >
            Book Room Now
          </button>
        </div>
      </div>
    </div>
  );
};
