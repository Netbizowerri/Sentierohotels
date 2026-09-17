import React from 'react';
import { Star, Check, Bed } from 'lucide-react';
import { RoomSuite, Currency } from '../types/hotel';
import { formatPrice } from '../utils/formatters';

interface SuiteCardProps {
  suite: RoomSuite;
  currency: Currency;
  onSelect: (suite: RoomSuite) => void;
  onQuickBook: (suite: RoomSuite) => void;
}

export const SuiteCard: React.FC<SuiteCardProps> = ({
  suite,
  currency,
  onSelect,
  onQuickBook,
}) => {
  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border border-[#242E51]/15 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#CD9A29] transition-all duration-300 flex flex-col">
      {/* Image container */}
      <div className="relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden bg-neutral-100">
        <img
          src={suite.coverImage}
          alt={suite.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Price badge in Website Primary #242E51 */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-[#242E51] border border-[#CD9A29]/40 shadow-md backdrop-blur-xs">
            {formatPrice(suite.priceNgn, suite.priceUsd, currency)}/night
          </span>
        </div>

        {/* Popular / Member badge in Accent #CD9A29 */}
        {suite.isPopular && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-[#CD9A29] shadow-xs">
              ★ Most Booked
            </span>
          </div>
        )}

        {/* Gallery count indicator */}
        <div className="absolute bottom-2.5 right-3 z-10 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
          1/{suite.galleryImages.length}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-base sm:text-lg text-[#091626] group-hover:text-[#CD9A29] transition">
              {suite.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#091626] shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#CD9A29] text-[#CD9A29]" />
              <span>{suite.rating.toFixed(1)}</span>
              <span className="text-[#091626]/50 font-normal">({suite.reviewsCount})</span>
            </div>
          </div>

          {/* Bed specification */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#091626]/80 mb-2.5">
            <Bed className="w-3.5 h-3.5 text-[#CD9A29] shrink-0" />
            <span>King size bed</span>
          </div>

          {/* Short description */}
          <p className="text-xs text-[#091626]/80 line-clamp-2 mb-3 leading-relaxed">
            {suite.shortDesc}
          </p>

          {/* Suite inclusions */}
          <div className="grid grid-cols-2 gap-1.5 mb-4 py-2 px-2.5 rounded-xl bg-[#091626]/[0.03] border border-[#242E51]/10">
            <div className="flex items-center gap-1.5 text-xs text-[#091626]/85 font-medium">
              <Check className="w-3.5 h-3.5 text-[#CD9A29] shrink-0" />
              <span>Breakfast</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#091626]/85 font-medium">
              <Check className="w-3.5 h-3.5 text-[#CD9A29] shrink-0" />
              <span>Swimming pool access</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#091626]/85 font-medium">
              <Check className="w-3.5 h-3.5 text-[#CD9A29] shrink-0" />
              <span>AC</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#091626]/85 font-medium">
              <Check className="w-3.5 h-3.5 text-[#CD9A29] shrink-0" />
              <span>TV</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div className="text-xs text-[#091626]/70">
            <span>Capacity: </span>
            <span className="font-bold text-[#091626]">
              {suite.capacity.adults} {suite.capacity.adults > 1 ? 'Adults' : 'Adult'}
              {suite.capacity.children > 0 && ` · ${suite.capacity.children} Child`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(suite)}
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#242E51] hover:bg-[#1B233F] text-white transition shadow-xs active:scale-95 flex items-center gap-1"
            >
              <span>View Rooms</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
