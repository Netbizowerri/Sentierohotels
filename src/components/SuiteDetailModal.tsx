import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Wifi,
  Coffee,
  Car,
  Zap,
  ShieldCheck,
  Plane,
  Tv,
  Wind,
  Briefcase,
  Utensils,
  Waves,
  Wine,
  Armchair,
  Bell,
  Check,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { RoomSuite, Currency } from '../types/hotel';
import { formatPrice } from '../utils/formatters';
import { DisintegrationSlider } from './DisintegrationSlider';

interface SuiteDetailModalProps {
  suite: RoomSuite | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onBookRate: (suite: RoomSuite, rateType: 'member' | 'standard') => void;
}

export const SuiteDetailModal: React.FC<SuiteDetailModalProps> = ({
  suite,
  isOpen,
  onClose,
  currency,
  onBookRate,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isLiked, setIsLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !suite) return null;

  const nextImage = () => {
    setPreviousImage(suite.galleryImages[activeImageIndex]);
    setSlideDirection('next');
    setActiveImageIndex((prev) => (prev + 1) % suite.galleryImages.length);
  };

  const prevImage = () => {
    setPreviousImage(suite.galleryImages[activeImageIndex]);
    setSlideDirection('prev');
    setActiveImageIndex((prev) => (prev - 1 + suite.galleryImages.length) % suite.galleryImages.length);
  };

  const goToImage = (idx: number) => {
    if (idx === activeImageIndex) return;
    setPreviousImage(suite.galleryImages[activeImageIndex]);
    setSlideDirection(idx > activeImageIndex ? 'next' : 'prev');
    setActiveImageIndex(idx);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Map icon strings to Lucide components
  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#242E51]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#242E51]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#242E51]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#CD9A29]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#242E51]" />;
      case 'Plane':
        return <Plane className="w-5 h-5 text-[#CD9A29]" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#242E51]" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-[#242E51]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#242E51]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#242E51]" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#242E51]" />;
      case 'Wine':
        return <Wine className="w-5 h-5 text-[#CD9A29]" />;
      case 'Armchair':
        return <Armchair className="w-5 h-5 text-[#242E51]" />;
      case 'Bell':
        return <Bell className="w-5 h-5 text-[#242E51]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#CD9A29]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#242E51]/15 my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header / Gallery Carousel */}
        <div className="relative aspect-16/10 sm:aspect-16/9 bg-[#242E51] w-full overflow-hidden">
          <DisintegrationSlider
            currentImage={suite.galleryImages[activeImageIndex]}
            previousImage={previousImage}
            slideId={activeImageIndex}
            direction={slideDirection}
            style="shatter"
          />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#242E51]/80 hover:bg-[#242E51] text-white flex items-center justify-center backdrop-blur-md transition shadow-md border border-white/20"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-[#242E51]/80 hover:bg-[#242E51] text-white flex items-center justify-center backdrop-blur-md transition shadow-md border border-white/20"
                title="Share suite link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-9 h-9 rounded-full bg-[#242E51]/80 hover:bg-[#242E51] text-white flex items-center justify-center backdrop-blur-md transition shadow-md border border-white/20"
                title="Save to favorites"
              >
                <Heart
                  className={`w-4 h-4 ${isLiked ? 'fill-[#CD9A29] text-[#CD9A29]' : 'text-white'}`}
                />
              </button>
            </div>
          </div>

          {/* Gallery Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Dots & Counter */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-1.5">
              {suite.galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToImage(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === activeImageIndex ? 'w-5 bg-[#CD9A29]' : 'w-1.5 bg-white/60 hover:bg-white/90'
                  }`}
                />
              ))}
            </div>

            <span className="text-[11px] font-semibold text-white bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
              {activeImageIndex + 1} of {suite.galleryImages.length}
            </span>
          </div>

          {copiedLink && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#CD9A29] text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-fade-in">
              Link copied to clipboard!
            </div>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Header Title & Badges */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CD9A29] bg-[#CD9A29]/10 px-2.5 py-0.5 rounded-full border border-[#CD9A29]/30">
                {suite.bedType}
              </span>
              <span className="text-xs text-[#091626]/60">·</span>
              <span className="text-xs text-[#091626]/70 font-semibold">
                {suite.sizeSqMeters} m² / {Math.round(suite.sizeSqMeters * 10.764)} sq ft
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#091626] font-display">
              {suite.name}
            </h3>

            <p className="text-xs sm:text-sm text-[#091626]/70">
              Luxury accommodation · King size bed & premium comfort
            </p>
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#F2F2FF] border border-[#242E51]/10 text-center">
              <span className="block text-[10px] uppercase font-bold text-[#091626]/50">Bed Type</span>
              <span className="font-bold text-xs text-[#091626]">{suite.bedType}</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#F2F2FF] border border-[#242E51]/10 text-center">
              <span className="block text-[10px] uppercase font-bold text-[#091626]/50">Max Guests</span>
              <span className="font-bold text-xs text-[#091626]">
                {suite.capacity.adults} Adults, {suite.capacity.children} Child
              </span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#F2F2FF] border border-[#242E51]/10 text-center">
              <span className="block text-[10px] uppercase font-bold text-[#091626]/50">Power Supply</span>
              <span className="font-bold text-xs text-[#CD9A29]">24/7 Solar + Gen</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#F2F2FF] border border-[#242E51]/10 text-center">
              <span className="block text-[10px] uppercase font-bold text-[#091626]/50">Security</span>
              <span className="font-bold text-xs text-[#242E51]">24/7 Security</span>
            </div>
          </div>

          {/* Amenity Icons Row */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#091626]/60 mb-3">
              Included Suite Amenities
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {suite.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#F2F2FF] border border-[#242E51]/10 hover:border-[#CD9A29] transition text-center"
                >
                  <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center mb-1.5">
                    {renderAmenityIcon(amenity.icon)}
                  </div>
                  <span className="text-[11px] font-semibold text-[#091626] leading-tight">
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suite Description */}
          <div className="bg-[#F2F2FF] rounded-2xl p-4 border border-[#242E51]/10 text-xs sm:text-sm text-[#091626]/80 leading-relaxed">
            <h4 className="font-bold text-[#091626] mb-1.5 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#CD9A29]" />
              About This Suite
            </h4>
            <p>{suite.fullDesc}</p>
          </div>

          {/* Pricing Option Card - Single Rate */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#091626]/60">
              Room Rate
            </h4>

            <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#CD9A29] bg-[#CD9A29]/5 relative shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white bg-[#242E51]">
                  Official Room Rate
                </span>
                <span className="text-xs font-bold text-[#CD9A29] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 100% Guaranteed 24/7 Power
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h5 className="font-bold text-sm sm:text-base text-[#091626]">
                    Book Now, Pay Later
                  </h5>
                  <p className="text-xs text-[#091626]/60 mt-0.5">
                    Free cancellation available until 24 hours before check-in
                  </p>
                  <div className="mt-2 text-xl sm:text-2xl font-extrabold text-[#091626]">
                    {formatPrice(suite.priceNgn, suite.priceUsd, currency)}
                    <span className="text-xs font-normal text-[#091626]/60">/night</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookRate(suite, 'standard')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold shadow-md transition active:scale-95 shrink-0 text-center"
                >
                  Book This Suite
                </button>
              </div>
            </div>
          </div>

          {/* Hotel Policy Footer */}
          <div className="pt-2 border-t border-neutral-100 text-xs text-[#091626]/60 space-y-1">
            <p className="flex items-center gap-1.5 font-semibold text-[#091626]">
              <Check className="w-3.5 h-3.5 text-[#CD9A29]" />
              No payment required until check-in
            </p>
            <p className="flex items-center gap-1.5 text-[#091626]/60">
              <Clock className="w-3.5 h-3.5 text-[#242E51]" />
              Check-in: From 2:00 PM · Check-out: Before 12:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
