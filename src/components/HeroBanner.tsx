import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Bell,
  SlidersHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
  Plane,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { DisintegrationSlider, DisintegrationStyle } from './DisintegrationSlider';

interface HeroBannerProps {
  onOpenNotifications: () => void;
  onExploreSuites: () => void;
  onOpenSearchFilter: () => void;
  unreadNotifications: boolean;
}

interface HeroSlide {
  id: number;
  image: string;
  tag: string;
  caption: string;
}

// Utility to ensure the beginning of every word is capital (e.g. "Poolside View")
const toTitleCase = (str: string): string => {
  return str.replace(/\b([a-z])/g, (_, char) => char.toUpperCase());
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: 'https://i.ibb.co/GQLK37J5/Untitled-design321-600x400-1.png',
    tag: 'Welcome To Sentiero Hotels & Suites',
    caption: 'Welcome To Sentiero Hotels & Suites · Luxury & hospitality just 2 minutes from Sam Mbakwe Airport with 24/7 security.',
  },
  {
    id: 2,
    image: 'https://i.ibb.co/fVwqt5vF/untitled-8964.jpg',
    tag: 'World-Class Luxury',
    caption: 'World-Class Luxury · Executive VIP boardroom, high-speed fiber internet, and premium business services.',
  },
  {
    id: 3,
    image: 'https://i.ibb.co/ZzPmMSbF/untitled-8961-1.jpg',
    tag: 'Elegantly Furnished Suites',
    caption: 'Elegantly Furnished Suites · Artisan interior décor, plush bedding, and 24/7 climate-controlled comfort.',
  },
  {
    id: 4,
    image: 'https://i.ibb.co/vC8Wd5Wr/Untitled-design79.jpg',
    tag: 'Refined Ambience',
    caption: 'Refined Ambience · Serene guest chambers designed for tranquil rest, productivity, and peace of mind.',
  },
  {
    id: 5,
    image: 'https://i.ibb.co/1YgtMPCq/untitled-8984.jpg',
    tag: 'Poolside View',
    caption: 'Poolside View · Crystal clear swimming pool surrounded by tranquil cabanas and lush outdoor landscaping.',
  },
  {
    id: 6,
    image: 'https://i.ibb.co/bMKDG4pW/untitled-89851.jpg',
    tag: 'The Poolside',
    caption: 'The Poolside · Unwind under the sun, take a refreshing dip, or enjoy daytime relaxation with poolside cocktail service.',
  },
  {
    id: 7,
    image: 'https://i.ibb.co/chnn6tvV/untitled-8966.jpg',
    tag: 'Well-Stocked Main Bar',
    caption: 'Well-Stocked Main Bar · Fine vintage wines, premium spirits, craft cocktails, and master chef delicacies.',
  },
  {
    id: 8,
    image: 'https://i.ibb.co/BVsCdv2c/untitled-8987.jpg',
    tag: 'Cosy Poolside Bar',
    caption: 'Cosy Poolside Bar · Intimate evening drinks, tropical cocktails, and open-air refreshments under the stars.',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenNotifications,
  onExploreSuites,
  onOpenSearchFilter,
  unreadNotifications,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const disintegrationStyle: DisintegrationStyle = 'shatter';
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setPreviousImage(HERO_SLIDES[currentSlide].image);
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    setPreviousImage(HERO_SLIDES[currentSlide].image);
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setPreviousImage(HERO_SLIDES[currentSlide].image);
    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const current = HERO_SLIDES[currentSlide];

  return (
    <section className="relative pt-1 pb-4 sm:pb-8">
      {/* Search Bar & Quick Notifications Row */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5">
        <div
          onClick={onOpenSearchFilter}
          className="flex-1 cursor-pointer group flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3.5 rounded-2xl border border-[#242E51]/15 bg-white shadow-xs hover:border-[#CD9A29] hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
            <Search className="w-4 h-4 text-[#242E51]/60 group-hover:text-[#CD9A29] transition shrink-0" />
            <div className="truncate">
              <span className="text-xs sm:text-sm font-semibold text-[#091626] block sm:inline truncate">
                Find Your Suite
              </span>
              <span className="hidden sm:inline text-xs text-[#091626]/60 ml-2">
                · Sam Mbakwe Airport, Imo State
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#242E51] bg-[#242E51]/10 px-2 py-0.5 sm:px-2.5 rounded-full">
              2 Mins to Airport
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sentiero-dots text-[#242E51] flex items-center justify-center group-hover:bg-[#CD9A29] group-hover:text-white transition">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Bell notification button */}
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border border-[#242E51]/15 bg-white flex items-center justify-center hover:border-[#CD9A29] hover:bg-sentiero-dots transition shadow-xs shrink-0"
          title="Hotel Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#242E51]" />
          {unreadNotifications && (
            <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-2.5 h-2.5 rounded-full bg-[#CD9A29] ring-2 ring-white"></span>
          )}
        </button>
      </div>

      {/* Hero Banner Card with Image Slider */}
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#242E51]/15 group select-none bg-[#242E51]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slider viewport: Generous height so images have huge visible area on both mobile and desktop */}
        <div className="relative h-[340px] xs:h-[380px] sm:h-[480px] md:h-[540px] w-full overflow-hidden flex flex-col justify-between p-3.5 sm:p-7 md:p-10">
          {/* Disintegration and Reintegration Slide Transition Engine */}
          <DisintegrationSlider
            currentImage={current.image}
            previousImage={previousImage}
            slideId={current.id}
            direction={slideDirection}
            style={disintegrationStyle}
          />

          {/* Luxury Bottom-Focused Gradient Overlays: Subtle on mobile so 75%+ of the image is 100% visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091626]/90 via-[#091626]/25 to-transparent pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

          {/* TOP BAR: Minimalistic & unobtrusive to leave photo open */}
          <div className="relative z-20 flex items-center justify-between gap-2">
            {/* Value Props Badge */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[#242E51]/80 text-white backdrop-blur-md border border-white/20 shadow-xs">
                <Plane className="w-3.5 h-3.5 text-[#CD9A29]" />
                2 Mins to Airport
              </span>
            </div>

            {/* Slide Index Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-[11px] sm:text-xs font-mono font-bold border border-white/20">
              <span className="text-[#CD9A29]">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="text-white/40">/</span>
              <span className="text-white/70">{String(HERO_SLIDES.length).padStart(2, '0')}</span>
              <span className="hidden md:inline text-white/30">·</span>
              <span className="hidden md:inline font-sans font-medium text-white/90 truncate max-w-[240px]">
                {toTitleCase(current.tag)}
              </span>
            </div>
          </div>

          {/* Left / Right Slider Navigation Arrows: subtle semi-transparent so image is clearly seen */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#CD9A29] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-md transition-all transform active:scale-95 opacity-70 hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#CD9A29] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-md transition-all transform active:scale-95 opacity-70 hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* BOTTOM HERO CONTENT: Compact on mobile so users clearly see the entire image */}
          <div className="relative z-20 max-w-2xl mt-auto">
            {/* Slide Tag: prominent label for each slide with Title Case */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#CD9A29] text-white text-[10px] sm:text-xs font-bold tracking-wide mb-1.5 sm:mb-2.5 shadow-md">
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
              <span>{toTitleCase(current.tag)}</span>
            </div>

            {/* "Sentiero Hotels & Suites" text with WHITE BACKGROUND COLOR */}
            <div className="mb-2 sm:mb-3">
              <div className="inline-block bg-white text-[#242E51] px-3 py-1 sm:px-6 sm:py-2.5 rounded-xl sm:rounded-3xl shadow-xl border border-white/90">
                <h1 className="text-base xs:text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight font-display text-[#242E51] leading-tight">
                  Sentiero Hotels & Suites
                </h1>
              </div>
            </div>

            {/* Description: Shown only on tablets/desktop to prevent covering photos on mobile */}
            <p className="hidden sm:block text-xs sm:text-sm md:text-base text-white/95 mb-4 font-medium max-w-lg drop-shadow-md leading-relaxed bg-black/35 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              {current.caption}
            </p>

            {/* Action Buttons & Indicator Row */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={onExploreSuites}
                  className="inline-flex items-center justify-center px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#CD9A29] hover:bg-[#B88720] shadow-md transition transform active:scale-95 border border-[#CD9A29]"
                >
                  <span>Explore Suites</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
                <button
                  onClick={onOpenSearchFilter}
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#242E51]/85 hover:bg-[#242E51] backdrop-blur-md border border-white/30 transition"
                >
                  Check Rates & Dates
                </button>
              </div>

              {/* Slider Dots Indicator */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-5 sm:w-7 bg-[#CD9A29] shadow-sm'
                          : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
