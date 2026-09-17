import React from 'react';
import { X, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { SearchFilterState } from '../types/hotel';
import { getTodayDateString, getTomorrowDateString } from '../utils/formatters';

interface SearchFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: SearchFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  onApply: () => void;
}

export const SearchFilterDrawer: React.FC<SearchFilterDrawerProps> = ({
  isOpen,
  onClose,
  filterState,
  setFilterState,
  onApply,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#242E51]/15 animate-in fade-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header in Website Primary #242E51 */}
        <div className="p-4 sm:p-5 border-b border-[#303D6A] flex items-center justify-between bg-[#242E51] text-white shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#CD9A29]" />
            <h3 className="font-bold text-sm sm:text-base text-white font-display">
              Search & Filter Sentiero Suites
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1B233F] text-white flex items-center justify-center hover:bg-[#303D6A] transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Inputs */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 bg-[#F2F2FF]">
          {/* Destination */}
          <div>
            <label className="block text-xs font-semibold text-[#091626] mb-1">
              Location & Proximity
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl border border-[#242E51]/15 bg-white text-xs font-medium text-[#091626]">
              <span className="w-2 h-2 rounded-full bg-[#CD9A29]"></span>
              <span>Near Sam Mbakwe Airport, Owerri, Imo State (2 min drive)</span>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#091626] mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                min={getTodayDateString()}
                value={filterState.checkIn}
                onChange={(e) =>
                  setFilterState((prev) => ({ ...prev, checkIn: e.target.value }))
                }
                className="w-full text-xs py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#091626] mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                min={filterState.checkIn || getTodayDateString()}
                value={filterState.checkOut}
                onChange={(e) =>
                  setFilterState((prev) => ({ ...prev, checkOut: e.target.value }))
                }
                className="w-full text-xs py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-xs font-semibold text-[#091626] mb-1">
              Number of Guests
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFilterState((prev) => ({ ...prev, guests: g }))}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                    filterState.guests === g
                      ? 'bg-[#242E51] text-white border-[#242E51]'
                      : 'bg-white text-[#091626] border-[#242E51]/15 hover:border-[#CD9A29]'
                  }`}
                >
                  {g} {g === 1 ? 'Guest' : 'Guests'}
                </button>
              ))}
            </div>
          </div>

          {/* Suite Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#091626] mb-1">
              Suite Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'All 4 Suites' },
                { id: 'popular', label: 'Deluxe & Popular' },
                { id: 'executive', label: 'Executive & Royal' },
                { id: 'budget', label: 'Solo & Classic' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setFilterState((prev) => ({
                      ...prev,
                      category: cat.id as SearchFilterState['category'],
                    }))
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left transition ${
                    filterState.category === cat.id
                      ? 'bg-[#242E51] text-white border-[#242E51]'
                      : 'bg-white text-[#091626] border-[#242E51]/15 hover:border-[#CD9A29]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-semibold text-[#091626] mb-1">
              Sort Results
            </label>
            <select
              value={filterState.sortBy}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  sortBy: e.target.value as SearchFilterState['sortBy'],
                }))
              }
              className="w-full text-xs py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626]"
            >
              <option value="recommended">Recommended (Sentiero Favorites)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Guest Rating</option>
            </select>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#242E51]/10 flex items-center gap-3 bg-white shrink-0">
          <button
            onClick={() => {
              setFilterState({
                destination: 'Sam Mbakwe Airport, Imo',
                checkIn: getTodayDateString(),
                checkOut: getTomorrowDateString(),
                guests: 1,
                category: 'all',
                sortBy: 'recommended',
              });
            }}
            className="px-4 py-2.5 rounded-full border border-[#242E51]/20 text-[#091626] text-xs font-semibold hover:bg-[#F2F2FF] transition"
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApply();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Show Available Suites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
