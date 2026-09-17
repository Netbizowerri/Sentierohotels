import React, { useState } from 'react';
import { Plane, Clock, ShieldCheck, Car, PhoneCall, Check, ArrowRight } from 'lucide-react';

interface AirportGuideSectionProps {
  onBookShuttle: () => void;
}

export const AirportGuideSection: React.FC<AirportGuideSectionProps> = ({ onBookShuttle }) => {
  const [flightNo, setFlightNo] = useState('');
  const [terminalType, setTerminalType] = useState('arrival');
  const [shuttleRequested, setShuttleRequested] = useState(false);

  const handleQuickShuttleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setShuttleRequested(true);
  };

  return (
    <section className="py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#242E51] bg-[#242E51]/10 px-3 py-1 rounded-full border border-[#242E51]/20">
          Prime Airport Proximity
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#091626] font-display mt-3">
          Never Miss Your Flight Ever Again
        </h2>
        <p className="text-xs sm:text-sm text-[#091626]/70 mt-2 leading-relaxed">
          Situated just a 2-minute drive from Sam Mbakwe Airport (QOW), Imo State. Fast, effortless transfers with our dedicated executive shuttle fleet.
        </p>
      </div>

      {/* 2-Minute Proximity Visual Card in Primary #242E51 */}
      <div className="rounded-3xl bg-[#242E51] text-white p-6 sm:p-10 shadow-xl border border-[#CD9A29]/30 overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 items-center">
          {/* Step 1: Airport */}
          <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-[#CD9A29]/20 text-[#CD9A29] flex items-center justify-center mb-3">
              <Plane className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-base text-white">Sam Mbakwe Airport</h4>
            <p className="text-xs text-white/70 mt-1">
              Arrivals / Departures Hall · Imo State
            </p>
            <span className="mt-3 text-[10px] uppercase font-bold text-white bg-[#1B233F] px-2 py-0.5 rounded border border-white/10">
              Terminal Gate
            </span>
          </div>

          {/* Drive Time Infographic */}
          <div className="flex flex-col items-center text-center py-4">
            <div className="flex items-center gap-2 text-[#CD9A29] font-extrabold text-2xl sm:text-3xl font-display">
              <Clock className="w-6 h-6 animate-pulse" />
              <span>2 MINUTES</span>
            </div>
            <p className="text-xs text-white/80 mt-1 font-medium">
              Average transfer time (1.2 km)
            </p>

            {/* Connecting visual dotted line */}
            <div className="w-full max-w-xs flex items-center justify-center gap-1.5 my-4">
              <div className="h-0.5 w-16 bg-gradient-to-r from-white/30 to-[#CD9A29]"></div>
              <div className="p-2 rounded-full bg-[#CD9A29] text-white shadow-md">
                <Car className="w-4 h-4" />
              </div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-[#CD9A29] to-white/30"></div>
            </div>

            <span className="text-[11px] text-white/80">
              Air-conditioned shuttle with luggage assistance
            </span>
          </div>

          {/* Step 3: Sentiero */}
          <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-[#CD9A29]/20 text-[#CD9A29] flex items-center justify-center mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-base text-white">Sentiero Hotels & Suites</h4>
            <p className="text-xs text-white/70 mt-1">
              High-Security Entrance Gates & Welcome Lounge
            </p>
            <span className="mt-3 text-[10px] uppercase font-bold text-[#CD9A29] bg-[#1B233F] px-2 py-0.5 rounded border border-[#CD9A29]/30">
              24/7 Power Active
            </span>
          </div>
        </div>
      </div>

      {/* Two columns: Shuttle Request & Traveler Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rapid Shuttle Booking Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Plane className="w-5 h-5 text-[#CD9A29]" />
              <h3 className="font-bold text-lg text-[#091626] font-display">
                Request Swift Airport Shuttle
              </h3>
            </div>
            <p className="text-xs text-[#091626]/70 mb-5 leading-relaxed">
              Arriving on an Air Peace, United Nigeria, or Ibom Air flight into Sam Mbakwe? Let our driver meet you curbside with a personalized name card.
            </p>

            {shuttleRequested ? (
              <div className="p-4 rounded-2xl bg-[#CD9A29]/10 border border-[#CD9A29]/30 text-[#091626] text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#CD9A29]">
                  <Check className="w-4 h-4" />
                  Shuttle Pickup Request Logged!
                </div>
                <p>
                  Our airport logistics team has recorded your flight {flightNo ? `(${flightNo})` : ''}. A driver will be stationed at the arrival terminal curb.
                </p>
                <button
                  onClick={() => setShuttleRequested(false)}
                  className="mt-2 text-xs text-[#242E51] underline font-bold"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickShuttleRequest} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#091626] mb-1">
                      Service Type
                    </label>
                    <select
                      value={terminalType}
                      onChange={(e) => setTerminalType(e.target.value)}
                      className="w-full text-xs py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626]"
                    >
                      <option value="arrival">Airport Pickup (Arrival)</option>
                      <option value="departure">Airport Drop-off (Departure)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#091626] mb-1">
                      Flight Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. APK7120 / UN540"
                      value={flightNo}
                      onChange={(e) => setFlightNo(e.target.value)}
                      className="w-full text-xs py-2 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Dispatch Airport Shuttle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-[#091626]/70">
            <span>Direct Airport Dispatch Hotline:</span>
            <a
              href="tel:+2348034567890"
              className="font-bold text-[#242E51] hover:text-[#CD9A29] flex items-center gap-1 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#CD9A29]" />
              +234 803 456 7890
            </a>
          </div>
        </div>

        {/* Strategic Advantages Checklist */}
        <div className="p-6 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs space-y-4">
          <h3 className="font-bold text-lg text-[#091626] font-display">
            Why Travelers Choose Sentiero Near Imo Airport
          </h3>

          <div className="space-y-3">
            {[
              {
                title: 'Zero Flight Anxiety',
                desc: 'With a 2-minute drive, avoid Owerri city traffic jams and comfortably catch morning flights without rushing.',
              },
              {
                title: 'Flight Delay Comfort Haven',
                desc: 'If your flight is rescheduled or delayed, enjoy our air-conditioned lounge, poolside, master chef lunch, and gigabit Wi-Fi.',
              },
              {
                title: '24/7 Professional Security Detail',
                desc: 'Guarded continuously by professional armed security officers and round-the-clock CCTV surveillance throughout the hotel grounds.',
              },
              {
                title: 'Guaranteed Uninterrupted Power',
                desc: 'Solar installations and heavy-duty standby power plants ensure your AC, hot shower, and laptop chargers work 24/7.',
              },
            ].map((adv, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#CD9A29]/15 text-[#CD9A29] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-[#091626]">{adv.title}</h5>
                  <p className="text-xs text-[#091626]/70 leading-relaxed mt-0.5">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
