import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  MessageCircle,
  Copy,
  Printer,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RoomSuite, Reservation, Currency } from '../types/hotel';
import {
  formatPrice,
  calculateNights,
  generateBookingRef,
  getTodayDateString,
  getTomorrowDateString,
} from '../utils/formatters';
import { sendLeadToCrm } from '../services/crmService';

interface BookingModalProps {
  suite: RoomSuite | null;
  rateType: 'member' | 'standard';
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onReservationComplete: (reservation: Reservation) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  suite,
  rateType,
  isOpen,
  onClose,
  currency,
  onReservationComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [checkInDate, setCheckInDate] = useState<string>(getTodayDateString());
  const [checkOutDate, setCheckOutDate] = useState<string>(getTomorrowDateString());
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  if (!isOpen || !suite) return null;

  const nights = calculateNights(checkInDate, checkOutDate);
  const ratePerNightNgn = suite.priceNgn;
  const ratePerNightUsd = suite.priceUsd;

  const totalNgn = ratePerNightNgn * nights;
  const totalUsd = ratePerNightUsd * nights;

  const handleProceedToDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const reservation: Reservation = {
      id: 'res_' + Date.now(),
      bookingRef: generateBookingRef(),
      suiteId: suite.id,
      suiteName: suite.name,
      suiteImage: suite.coverImage,
      rateType,
      guestName,
      guestEmail: guestEmail || 'guest@sentierohotels.com',
      guestPhone,
      checkInDate,
      checkOutDate,
      guestsCount: adults + children,
      airportShuttleRequested: false,
      flightNumber: undefined,
      specialRequests,
      totalPriceNgn: totalNgn,
      totalPriceUsd: totalUsd,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedReservation(reservation);
    onReservationComplete(reservation);
    setStep(3);

    // Forward lead securely to Privyr CRM via backend server proxy
    sendLeadToCrm({
      name: guestName,
      email: guestEmail || undefined,
      phone: guestPhone,
      source: 'Room Booking',
      notes: `New Room Reservation for ${suite.name} (${nights} night${nights > 1 ? 's' : ''}). Check-in: ${checkInDate}, Check-out: ${checkOutDate}. Guests: ${adults} Adult(s), ${children} Child(ren). Ref: ${reservation.bookingRef}. Special requests: ${specialRequests || 'None'}. Total: ₦${totalNgn.toLocaleString()} ($${totalUsd}).`,
      custom_fields: {
        'Booking Ref': reservation.bookingRef,
        'Suite Name': suite.name,
        'Check-In Date': checkInDate,
        'Check-Out Date': checkOutDate,
        'Nights': nights,
        'Adults': adults,
        'Children': children,
        'Total NGN': `₦${totalNgn.toLocaleString()}`,
        'Total USD': `$${totalUsd}`,
        'Special Requests': specialRequests || 'None',
      },
    });

    // Festive confetti animation
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#242E51', '#CD9A29', '#FFFFFF'],
      });
    } catch {
      // ignore
    }
  };

  const handleCopyBookingRef = () => {
    if (confirmedReservation) {
      navigator.clipboard?.writeText(confirmedReservation.bookingRef);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleWhatsAppConfirmation = () => {
    if (!confirmedReservation) return;
    const text = encodeURIComponent(
      `Hello Sentiero Hotels & Suites, I just booked the ${confirmedReservation.suiteName}!\nBooking Ref: ${confirmedReservation.bookingRef}\nGuest: ${confirmedReservation.guestName}\nCheck-in: ${confirmedReservation.checkInDate}\nCheck-out: ${confirmedReservation.checkOutDate}`
    );
    window.open(`https://wa.me/2349022842982?text=${text}`, '_blank');
  };

  const handleEmailAdminConfirmation = () => {
    if (!confirmedReservation) return;
    const subject = encodeURIComponent(
      `New Room Booking: ${confirmedReservation.suiteName} (Ref: ${confirmedReservation.bookingRef})`
    );
    const body = encodeURIComponent(
      `Hello Sentiero Admin,\n\nA new room booking has been completed on the website:\n\nBooking Ref: ${confirmedReservation.bookingRef}\nGuest Name: ${confirmedReservation.guestName}\nGuest Phone: ${confirmedReservation.guestPhone}\nGuest Email: ${confirmedReservation.guestEmail}\nSuite: ${confirmedReservation.suiteName}\nCheck-in: ${confirmedReservation.checkInDate}\nCheck-out: ${confirmedReservation.checkOutDate}\nTotal Guests: ${confirmedReservation.guestsCount}\nSpecial Requests: ${confirmedReservation.specialRequests || 'None'}\n\nPlease review and attend to this guest promptly.`
    );
    window.open(`mailto:netbiz0925@gmail.com,reservations@sentierohotels.com.ng?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#242E51]/15 my-4 max-h-[94vh] flex flex-col">
        {/* Header with Website Primary Color #242E51 */}
        <div className="p-4 sm:p-5 border-b border-[#303D6A] flex items-center justify-between bg-[#242E51] text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#CD9A29] text-white flex items-center justify-center text-xs font-bold">
              {step === 3 ? '✓' : step}
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                {step === 1 && 'Select Stay Dates'}
                {step === 2 && 'Guest Contact Details'}
                {step === 3 && 'Booking Confirmed!'}
              </h3>
              <p className="text-xs text-white/70">
                {suite.name} · Official Rate
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1B233F] text-white flex items-center justify-center hover:bg-[#303D6A] transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-[#F2F2FF]">
          {/* STEP 1: Dates & Perks */}
          {step === 1 && (
            <form onSubmit={handleProceedToDetails} className="space-y-4">
              {/* Suite snapshot */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#242E51]/10 shadow-xs">
                <img
                  src={suite.coverImage}
                  alt={suite.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-[#091626] truncate">{suite.name}</h4>
                  <p className="text-xs text-[#091626]/60">King size bed · Breakfast, Pool, AC, TV</p>
                  <p className="text-xs font-bold text-[#CD9A29] mt-0.5">
                    {formatPrice(ratePerNightNgn, ratePerNightUsd, currency)} / night
                  </p>
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
                    value={checkInDate}
                    min={getTodayDateString()}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                    className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    min={checkInDate || getTodayDateString()}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                    className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  />
                </div>
              </div>

              {/* Number of guests */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  >
                    {[0, 1, 2, 3].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Child' : 'Children'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price summary in Website Primary Color #242E51 */}
              <div className="p-4 rounded-2xl bg-[#242E51] text-white space-y-1.5 mt-4 border border-[#CD9A29]/30">
                <div className="flex justify-between text-xs text-white/80">
                  <span>
                    {formatPrice(ratePerNightNgn, ratePerNightUsd, currency)} × {nights}{' '}
                    {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span>{formatPrice(ratePerNightNgn * nights, ratePerNightUsd * nights, currency)}</span>
                </div>
                <div className="pt-2 border-t border-white/20 flex justify-between text-sm font-bold">
                  <span>Total Payable at Check-in</span>
                  <span className="text-[#CD9A29] font-extrabold">{formatPrice(totalNgn, totalUsd, currency)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Continue to Guest Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Guest Details */}
          {step === 2 && (
            <form onSubmit={handleConfirmReservation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#091626] mb-1">
                  Full Name (as on ID) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emeka Okafor"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 123 4567"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="guest@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#091626] mb-1">
                  Special Requests / Arrival Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Any dietary preferences, early check-in request, or airport arrival note..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                ></textarea>
              </div>

              {/* Guarantees Box */}
              <div className="p-3 rounded-2xl bg-white border border-[#242E51]/15 text-xs text-[#091626] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#242E51]">
                  <ShieldCheck className="w-4 h-4 text-[#CD9A29]" />
                  Sentiero Hospitality Guarantee
                </div>
                <p className="text-[11px] text-[#091626]/70">
                  Pay upon arrival at the front desk. 24/7 continuous electricity & fortified security guaranteed.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-full border border-[#242E51]/20 text-[#091626] text-xs font-semibold hover:bg-white transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#242E51] hover:bg-[#1B233F] text-white text-xs font-bold shadow-md transition"
                >
                  Confirm & Reserve Now
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Booking Confirmation & Digital Voucher */}
          {step === 3 && confirmedReservation && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#CD9A29]/15 text-[#CD9A29] flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-[#091626] font-display">
                  Reservation Confirmed!
                </h4>
                <p className="text-xs text-[#091626]/60 mt-1">
                  We look forward to welcoming you to Sentiero Hotels & Suites.
                </p>
              </div>

              {/* Digital Boarding Pass style voucher */}
              <div className="p-4 rounded-3xl bg-white border border-[#242E51]/15 text-left relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#242E51]/10">
                  <div>
                    <span className="text-[10px] text-[#091626]/50 uppercase font-bold tracking-wider">
                      Booking Reference
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-[#242E51] font-mono">
                        {confirmedReservation.bookingRef}
                      </span>
                      <button
                        onClick={handleCopyBookingRef}
                        className="text-[#091626]/40 hover:text-[#091626]"
                        title="Copy reference code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {copiedRef && (
                        <span className="text-[10px] text-[#CD9A29] font-bold">Copied!</span>
                      )}
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#CD9A29] text-white">
                    Confirmed
                  </span>
                </div>

                <div className="py-3 grid grid-cols-2 gap-3 text-xs border-b border-[#242E51]/10">
                  <div>
                    <span className="text-[#091626]/50 block text-[10px]">Suite</span>
                    <span className="font-bold text-[#091626]">{confirmedReservation.suiteName}</span>
                  </div>
                  <div>
                    <span className="text-[#091626]/50 block text-[10px]">Guest</span>
                    <span className="font-bold text-[#091626]">{confirmedReservation.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[#091626]/50 block text-[10px]">Check-in</span>
                    <span className="font-medium text-[#091626]">
                      {confirmedReservation.checkInDate} (2:00 PM)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#091626]/50 block text-[10px]">Check-out</span>
                    <span className="font-medium text-[#091626]">
                      {confirmedReservation.checkOutDate} (12:00 PM)
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#091626]/50 text-[10px] block">Amount Due at Front Desk</span>
                    <span className="font-bold text-[#242E51] text-sm">
                      {formatPrice(
                        confirmedReservation.totalPriceNgn,
                        confirmedReservation.totalPriceUsd,
                        currency
                      )}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#CD9A29] bg-[#CD9A29]/10 px-2.5 py-1 rounded-md">
                    ✓ Pay at Check-in
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppConfirmation}
                  className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to Hotel WhatsApp</span>
                </button>

                <button
                  onClick={handleEmailAdminConfirmation}
                  className="w-full py-2.5 rounded-full bg-[#242E51] hover:bg-[#1B233F] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#CD9A29]" />
                  <span>Send Reservation to Admin Gmail</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-full border border-[#242E51]/20 text-[#091626] text-xs font-semibold hover:bg-white transition"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
