import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { DisintegrationSlider, DisintegrationStyle } from './DisintegrationSlider';

interface ReceptionSlide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
}

/** Autoplay dwell time. Kept in sync with the progress-bar animation in index.css. */
const AUTOPLAY_MS = 5500;

/** Dramatic spiral transition — deliberately distinct from the hero's 'shatter'. */
const RECEPTION_STYLE: DisintegrationStyle = 'vortex';

const RECEPTION_SLIDES: ReceptionSlide[] = [
  {
    id: 1,
    image: 'https://www.sentierohotels.com.ng/wp-content/uploads/2023/01/untitled-8970.jpg',
    badge: 'Reception',
    title: 'Sentiero Reception & Front Desk',
    subtitle: '24/7 Dedicated Service',
  },
  {
    id: 2,
    image: 'https://i.ibb.co/xSXvp2Gw/Sentiero-Hotel-1.jpg',
    badge: 'Arrival',
    title: 'Sentiero Hotels & Suites',
    subtitle: 'Where Luxury Meets Comfort',
  },
];

/**
 * Auto-playing reception gallery driven by the shared disintegration /
 * reintegration transition engine. Pauses on hover, supports touch swipe,
 * and surfaces the active slide through dots, a counter and an autoplay
 * progress bar.
 */
export const ReceptionSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setPreviousImage(RECEPTION_SLIDES[currentSlide].image);
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % RECEPTION_SLIDES.length);
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    setPreviousImage(RECEPTION_SLIDES[currentSlide].image);
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + RECEPTION_SLIDES.length) % RECEPTION_SLIDES.length);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setPreviousImage(RECEPTION_SLIDES[currentSlide].image);
    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  // Auto-play, suspended while the guest is hovering
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const current = RECEPTION_SLIDES[currentSlide];

  return (
    <div
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3] lg:aspect-auto lg:h-[360px] group select-none bg-[#242E51]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Disintegration & reintegration transition engine */}
      <DisintegrationSlider
        currentImage={current.image}
        previousImage={previousImage}
        slideId={current.id}
        direction={slideDirection}
        style={RECEPTION_STYLE}
      />

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/45 to-transparent pointer-events-none" />

      {/* TOP BAR: slide badge + index counter */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#CD9A29] text-white text-[10px] sm:text-[11px] font-bold tracking-wide shadow-md">
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>{current.badge}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold border border-white/20">
          <span className="text-[#CD9A29]">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/70">{String(RECEPTION_SLIDES.length).padStart(2, '0')}</span>
        </span>
      </div>

      {/* PREV / NEXT ARROWS */}
      <button
        onClick={prevSlide}
        aria-label="Previous reception photo"
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-[#CD9A29] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next reception photo"
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-[#CD9A29] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* BOTTOM: live caption, dots and autoplay progress */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-3.5 sm:p-4 space-y-2.5">
        <div
          key={current.id}
          className="flex items-center justify-between gap-3 text-white rounded-xl border border-white/15 bg-black/55 backdrop-blur-md px-3.5 py-2.5"
          style={{ animation: 'sentiero-reception-caption 550ms ease-out both' }}
        >
          <div className="min-w-0">
            <span className="block font-semibold text-white/95 text-xs sm:text-sm truncate">
              {current.title}
            </span>
            <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-white/70 mt-0.5">
              <Clock className="w-3 h-3 text-[#CD9A29] shrink-0" />
              {current.subtitle}
            </span>
          </div>
          <span className="hidden sm:block text-[#CD9A29] font-bold text-[10px] sm:text-[11px] text-right shrink-0">
            24/7 Dedicated Service
          </span>
        </div>

        {/* Dots + autoplay progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            {RECEPTION_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to reception photo ${idx + 1}`}
                  aria-current={isActive}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-5 sm:w-7 bg-[#CD9A29] shadow-sm'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex-1 h-0.5 rounded-full bg-white/15 overflow-hidden">
            <div
              key={current.id}
              className="h-full w-full origin-left bg-gradient-to-r from-[#CD9A29] to-[#F5B53B]"
              style={{
                animation: `sentiero-reception-progress ${AUTOPLAY_MS}ms linear forwards`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};