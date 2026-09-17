import React from 'react';
import { HeroBanner } from './HeroBanner';
import { HotelFeaturesDark } from './HotelFeaturesDark';
import { SuiteCard } from './SuiteCard';
import { SUITES_DATA, TESTIMONIALS } from '../data/hotelData';
import { RoomSuite, Currency } from '../types/hotel';
import {
  Star,
  Sparkles,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Plane,
  Utensils,
  Wifi,
  SlidersHorizontal,
  Play,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react';

interface HomeSectionProps {
  currency: Currency;
  onOpenNotifications: () => void;
  onExploreSuites: () => void;
  onOpenSearchFilter: () => void;
  onSelectSuite: (suite: RoomSuite) => void;
  onQuickBook: (suite: RoomSuite) => void;
  onGoToAirport: () => void;
  onGoToBlogs?: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  currency,
  onOpenNotifications,
  onExploreSuites,
  onOpenSearchFilter,
  onSelectSuite,
  onQuickBook,
  onGoToAirport,
  onGoToBlogs,
}) => {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section with Sliders */}
      <HeroBanner
        onOpenNotifications={onOpenNotifications}
        onExploreSuites={onExploreSuites}
        onOpenSearchFilter={onOpenSearchFilter}
        unreadNotifications={true}
      />

      {/* Cool Dark-Themed Hotel Features Section with Lucide Icons */}
      <HotelFeaturesDark
        onGoToAirport={onGoToAirport}
        onExploreSuites={onExploreSuites}
      />

      {/* Our Suites Section */}
      <section>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#091626] font-display">
              Our Suites
            </h2>
            <p className="text-xs sm:text-sm text-[#091626]/70 mt-0.5">
              Carefully curated suites offering comfort and airport proximity
            </p>
          </div>
          <button
            onClick={onExploreSuites}
            className="text-xs sm:text-sm font-bold text-[#CD9A29] hover:text-[#B88720] transition hover:underline"
          >
            View all 4 suites &rarr;
          </button>
        </div>

        {/* 4 Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {SUITES_DATA.map((suite) => (
            <SuiteCard
              key={suite.id}
              suite={suite}
              currency={currency}
              onSelect={onSelectSuite}
              onQuickBook={onQuickBook}
            />
          ))}
        </div>
      </section>

      {/* Sentiero Security & Proximity Showcase Card */}
      <section className="rounded-3xl p-6 sm:p-8 bg-[#242E51] text-white shadow-xl border border-[#CD9A29]/30 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B233F] border border-[#CD9A29]/40 text-[#CD9A29] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sam Mbakwe Airport Hospitality Leader</span>
            </div>

            <h3
              style={{ color: '#FFFFFF' }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white"
            >
              Why Discerning Travelers Choose Sentiero
            </h3>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              Strategically situated just 2 minutes from the airport runway, we combine uninterrupted 24/7 solar power, fortified round-the-clock professional security, and master chef cuisine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
                <span>Zero power cuts with solar & backup generator</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
                <span>Complimentary airport pickup & drop-off</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
                <span>High-speed optical fiber WiFi in every suite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
                <span>Round-the-clock room service and lounge</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onGoToAirport}
                className="px-6 py-2.5 rounded-full bg-[#CD9A29] text-white text-xs sm:text-sm font-bold hover:bg-[#B88720] transition shadow-md"
              >
                Airport Guide & Shuttle
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Zap className="w-6 h-6 text-[#CD9A29] mx-auto mb-2" />
              <h5 className="font-bold text-xs text-white">24/7 Power</h5>
              <p className="text-[10px] text-white/70 mt-0.5">Solar & Standby</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <ShieldCheck className="w-6 h-6 text-[#CD9A29] mx-auto mb-2" />
              <h5 className="font-bold text-xs text-white">24/7 Security</h5>
              <p className="text-[10px] text-white/70 mt-0.5">CCTV & Patrols</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Plane className="w-6 h-6 text-[#CD9A29] mx-auto mb-2" />
              <h5 className="font-bold text-xs text-white">Airport Shuttle</h5>
              <p className="text-[10px] text-white/70 mt-0.5">2 Min Drive</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Star className="w-6 h-6 text-[#CD9A29] mx-auto mb-2 fill-[#CD9A29]" />
              <h5 className="font-bold text-xs text-white">Master Chef</h5>
              <p className="text-[10px] text-white/70 mt-0.5">Delicious Dishes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials from travelers */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#242E51] bg-[#242E51]/10 px-3 py-1 rounded-full border border-[#242E51]/20">
            Verified Guest Reviews
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#091626] font-display mt-2">
            Trusted by Airport Passengers & Executives
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs space-y-3"
            >
              <div className="flex items-center gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#CD9A29] text-[#CD9A29]" />
                ))}
              </div>
              <p className="text-xs text-[#091626]/80 italic leading-relaxed">
                "{t.comment}"
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-[#091626]">{t.name}</h5>
                  <p className="text-[10px] text-[#091626]/50">{t.role}</p>
                </div>
                <span className="text-[10px] font-medium text-[#091626]/40">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Testimonial Section (Restored after Testimonials) */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#242E51]/10 text-[#242E51] text-xs font-bold border border-[#242E51]/20">
            <Play className="w-3 h-3 fill-[#CD9A29] text-[#CD9A29]" />
            <span>Video Testimonial</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold text-[#091626] font-display">
            Do not take our word for it...
          </h3>
          <p className="text-xs sm:text-sm text-[#091626]/70">
            Watch what popular skit comedian Brain Jotter has to say about his stay at Sentiero Hotels & Suites
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-black shadow-lg border border-[#242E51]/15 aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/nzMRl3R3YLI"
            title="Sentiero Hotels & Suites - Brain Jotter Testimonial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      {/* Reception Section with Image & 2 Major CTAs */}
      <section className="bg-gradient-to-br from-[#1E2746] to-[#0F172A] rounded-3xl overflow-hidden border border-[#242E51]/30 shadow-xl text-white p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Details & 2 Major CTAs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CD9A29]/20 text-[#F5B53B] text-xs font-bold border border-[#CD9A29]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>24/7 Front Desk & Concierge</span>
            </div>

            <div className="space-y-2.5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
                A Warm Welcome Awaits You at Our Reception
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-xl">
                From fast-track arrivals and airport pick-up coordination to 24-hour dedicated room service, our front desk team is always on standby to ensure your stay in Owerri is seamless, luxurious, and completely restful.
              </p>
            </div>

            {/* Key Reception Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-1 max-w-lg">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
                <span>Instant Check-In & Check-Out</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
                <span>24/7 Concierge & Porter</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
                <span>Airport Shuttle Coordination</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#CD9A29] shrink-0" />
                <span>Secure Luggage Storage</span>
              </div>
            </div>

            {/* 2 Major CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* CTA 1: Primary Book Stay */}
              <button
                onClick={onExploreSuites}
                className="px-6 py-3.5 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white font-bold text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Your Stay Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* CTA 2: Secondary Check Availability & Rates */}
              <button
                onClick={onOpenSearchFilter}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm md:text-base border border-white/25 transition-all active:scale-95 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#CD9A29]" />
                <span>Check Rates & Availability</span>
              </button>
            </div>
          </div>

          {/* Right Column: Reception Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3] lg:aspect-auto lg:h-[360px] group">
              <img
                src="https://www.sentierohotels.com.ng/wp-content/uploads/2023/01/untitled-8970.jpg"
                alt="Sentiero Hotels & Suites Reception"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs backdrop-blur-md bg-black/50 px-3.5 py-2.5 rounded-xl border border-white/15">
                <span className="font-semibold text-white/95">Sentiero Reception & Front Desk</span>
                <span className="text-[#CD9A29] font-bold">24/7 Dedicated Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
