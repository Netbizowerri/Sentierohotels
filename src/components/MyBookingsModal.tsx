import React from 'react';
import { X, Calendar, Trash2, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Reservation, Currency } from '../types/hotel';
import { formatPrice } from '../utils/formatters';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Reservation[];
  onCancelBooking: (id: string) => void;
  currency: Currency;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  currency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#242E51]/15 my-4 max-h-[90vh] flex flex-col">
        {/* Header with Website Primary Color #242E51 */}
        <div className="p-4 sm:p-5 border-b border-[#303D6A] flex items-center justify-between bg-[#242E51] text-white shrink-0">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-white font-display">
              My Hotel Reservations
            </h3>
            <p className="text-xs text-white/70">
              {bookings.length} {bookings.length === 1 ? 'reservation' : 'reservations'} saved locally
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1B233F] text-white flex items-center justify-center hover:bg-[#303D6A] transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-[#F2F2FF]">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-white rounded-2xl border border-[#242E51]/10 p-6">
              <div className="w-12 h-12 rounded-full bg-[#242E51]/10 text-[#242E51] flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-[#091626]">No Reservations Yet</h4>
              <p className="text-xs text-[#091626]/60 max-w-xs mx-auto">
                Explore our Classic, Deluxe, Royal, and Executive Suites to book your stay near Sam Mbakwe Airport.
              </p>
            </div>
          ) : (
            bookings.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#242E51]/15 bg-white p-4 shadow-xs space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.suiteImage}
                      alt={item.suiteName}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <span className="text-[10px] font-mono font-bold text-white bg-[#242E51] px-2 py-0.5 rounded">
                        {item.bookingRef}
                      </span>
                      <h4 className="font-bold text-sm text-[#091626] mt-1">
                        {item.suiteName}
                      </h4>
                      <p className="text-[11px] text-[#091626]/60">
                        {item.guestsCount} {item.guestsCount === 1 ? 'Guest' : 'Guests'} · Standard Reservation
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CD9A29] text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#F2F2FF] p-2.5 rounded-xl border border-[#242E51]/10">
                  <div>
                    <span className="text-[10px] text-[#091626]/50 block">Check-in</span>
                    <span className="font-medium text-[#091626]">{item.checkInDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#091626]/50 block">Check-out</span>
                    <span className="font-medium text-[#091626]">{item.checkOutDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#091626]/50 block">Amount Due at Desk</span>
                    <span className="font-bold text-[#242E51]">
                      {formatPrice(item.totalPriceNgn, item.totalPriceUsd, currency)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#091626]/50 block">Airport Shuttle</span>
                    <span className="font-medium text-[#091626]">
                      {item.airportShuttleRequested ? 'Yes (Requested)' : 'Not needed'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={`https://wa.me/2348149900012?text=${encodeURIComponent(`Hello Sentiero Front Desk, inquiry about my reservation ref ${item.bookingRef} for ${item.guestName}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#25D366] hover:text-[#20ba59] font-bold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Front Desk</span>
                  </a>

                  <button
                    onClick={() => onCancelBooking(item.id)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition"
                    title="Cancel reservation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
