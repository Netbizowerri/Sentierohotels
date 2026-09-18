import React, { useMemo, useState } from 'react';
import {
  Plane,
  Clock,
  ShieldCheck,
  MapPin,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  Info,
} from 'lucide-react';
import { sanitizeDate } from '../utils/sanitize';

interface FlightSchedule {
  airline: string;
  website: string;
  flightNo: string;
  departs: string;
  arrives: string;
  aircraft: string;
  days: number[];
}

interface DestinationSchedule {
  code: string;
  city: string;
  airport: string;
  distanceKm: number;
  duration: string;
  flights: FlightSchedule[];
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

const DESTINATIONS: DestinationSchedule[] = [
  {
    code: 'LOS',
    city: 'Lagos',
    airport: 'Murtala Muhammed International Airport (LOS)',
    distanceKm: 447,
    duration: '1h 10m',
    flights: [
      {
        airline: 'Air Peace',
        website: 'https://www.flyairpeace.com',
        flightNo: 'P4 7169',
        departs: '07:20',
        arrives: '08:30',
        aircraft: 'Embraer ERJ145',
        days: ALL_DAYS,
      },
      {
        airline: 'United Nigeria Airlines',
        website: 'https://www.flyunitednigeria.com',
        flightNo: 'UN 513',
        departs: '12:00',
        arrives: '13:00',
        aircraft: 'Embraer E190',
        days: ALL_DAYS,
      },
      {
        airline: 'Air Peace',
        website: 'https://www.flyairpeace.com',
        flightNo: 'P4 7153',
        departs: '12:30',
        arrives: '13:40',
        aircraft: 'Airbus A320',
        days: [1, 3, 5, 0],
      },
      {
        airline: 'Air Peace',
        website: 'https://www.flyairpeace.com',
        flightNo: 'P4 7163',
        departs: '15:10',
        arrives: '16:20',
        aircraft: 'Embraer ERJ145',
        days: [2, 4, 6],
      },
      {
        airline: 'Air Peace',
        website: 'https://www.flyairpeace.com',
        flightNo: 'P4 7157',
        departs: '15:55',
        arrives: '17:05',
        aircraft: 'Embraer E195 / B737-800',
        days: ALL_DAYS,
      },
      {
        airline: 'United Nigeria Airlines',
        website: 'https://www.flyunitednigeria.com',
        flightNo: 'UN 510',
        departs: '18:30',
        arrives: '19:30',
        aircraft: 'Embraer ERJ145',
        days: [1, 2, 3, 4, 5],
      },
    ],
  },
  {
    code: 'ABV',
    city: 'Abuja',
    airport: 'Nnamdi Azikiwe International Airport (ABV)',
    distanceKm: 398,
    duration: '1h 10m',
    flights: [
      {
        airline: 'United Nigeria Airlines',
        website: 'https://www.flyunitednigeria.com',
        flightNo: 'UN 511',
        departs: '08:40',
        arrives: '09:40',
        aircraft: 'Embraer E190',
        days: ALL_DAYS,
      },
      {
        airline: 'Air Peace',
        website: 'https://www.flyairpeace.com',
        flightNo: 'P4 7151',
        departs: '08:50',
        arrives: '10:00',
        aircraft: 'Airbus A320',
        days: [1, 3, 5, 0],
      },
      {
        airline: 'Air Peace',
        website: 'https://www.flyairpeace.com',
        flightNo: 'P4 7161',
        departs: '11:40',
        arrives: '12:50',
        aircraft: 'Embraer ERJ145',
        days: [2, 4, 6],
      },
      {
        airline: 'Air Peace',
        website: 'https://www.flyairpeace.com',
        flightNo: 'P4 7165',
        departs: '14:55',
        arrives: '16:05',
        aircraft: 'Airbus A320 / E190',
        days: ALL_DAYS,
      },
    ],
  },
];

const formatDays = (days: number[]) => {
  if (days.length === 7) return 'Daily';
  return days.map((d) => DAY_NAMES[d]).join(', ');
};

export const AirportGuideSection: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState('LOS');
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split('T')[0]);

  const destination = DESTINATIONS.find((d) => d.code === selectedCode) ?? DESTINATIONS[0];

  const weekday = useMemo(() => {
    const date = new Date(`${travelDate}T00:00:00`);
    return Number.isNaN(date.getTime()) ? new Date().getDay() : date.getDay();
  }, [travelDate]);

  const availableFlights = useMemo(
    () =>
      destination.flights
        .filter((f) => f.days.includes(weekday))
        .sort((a, b) => a.departs.localeCompare(b.departs)),
    [destination, weekday],
  );

  const formattedDate = useMemo(() => {
    const date = new Date(`${travelDate}T00:00:00`);
    if (Number.isNaN(date.getTime())) return 'Selected date';
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [travelDate]);

  const googleFlightsUrl = useMemo(
    () =>
      `https://www.google.com/travel/flights?q=flights%20from%20QOW%20to%20${destination.code}%20on%20${travelDate}`,
    [destination, travelDate],
  );

  return (
    <section className="py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#242E51] bg-[#242E51]/10 px-3 py-1 rounded-full border border-[#242E51]/20">
          Prime Airport Proximity
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#091626] font-display mt-3">
          Fly Out of Sam Mbakwe Airport With Ease
        </h2>
        <p className="text-xs sm:text-sm text-[#091626]/70 mt-2 leading-relaxed">
          Check daily non-stop flights from Sam Mbakwe International Airport (QOW), Imo State, to
          major Nigerian cities — just a 2-minute drive from our front gate.
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
            <p className="text-xs text-white/70 mt-1">Departures Hall · Imo State (QOW)</p>
            <span className="mt-3 text-[10px] uppercase font-bold text-white bg-[#1B233F] px-2 py-0.5 rounded border border-white/10">
              Direct Flights to Lagos & Abuja
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
                <MapPin className="w-4 h-4" />
              </div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-[#CD9A29] to-white/30"></div>
            </div>

            <span className="text-[11px] text-white/80">
              Board your early morning Lagos or Abuja flight with zero stress
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

      {/* Two columns: Flight Checker & Traveler Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Flight Checker Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-5 h-5 text-[#CD9A29]" />
            <h3 className="font-bold text-lg text-[#091626] font-display">
              Check Flights From Sam Mbakwe
            </h3>
          </div>
          <p className="text-xs text-[#091626]/70 mb-5 leading-relaxed">
            Pick a destination and travel date to see scheduled non-stop departures from QOW
            (IATA: QOW).
          </p>

          {/* Destination picker */}
          <div className="flex gap-2 mb-4">
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.code}
                onClick={() => setSelectedCode(dest.code)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-0.5 ${
                  selectedCode === dest.code
                    ? 'bg-[#242E51] text-white border-[#242E51] shadow-sm'
                    : 'bg-white text-[#091626] border-[#242E51]/20 hover:border-[#CD9A29]'
                }`}
              >
                <span>{dest.city}</span>
                <span
                  className={`text-[10px] font-semibold ${
                    selectedCode === dest.code ? 'text-[#CD9A29]' : 'text-[#091626]/50'
                  }`}
                >
                  {dest.code} · {dest.distanceKm} km
                </span>
              </button>
            ))}
          </div>

          {/* Date picker */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-[#091626] mb-1">
              Travel Date
            </label>
            <div className="relative">
              <CalendarDays className="w-4 h-4 text-[#CD9A29] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                value={travelDate}
                onChange={(e) => sanitizeDate(e.target.value) && setTravelDate(sanitizeDate(e.target.value) || travelDate)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full text-xs py-2.5 pl-9 pr-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
              />
            </div>
          </div>

          {/* Flights list */}
          <div className="space-y-3">
            {availableFlights.length === 0 ? (
              <div className="p-5 rounded-2xl bg-sentiero-dots border border-[#242E51]/15 text-center space-y-2">
                <Plane className="w-6 h-6 text-[#CD9A29] mx-auto" />
                <p className="text-sm font-bold text-[#091626]">
                  No direct flights scheduled on {FULL_DAY_NAMES[weekday]}
                </p>
                <p className="text-xs text-[#091626]/70">
                  Try another travel date, or reach our front desk at (+234) 09022842982 for
                  transfer advice.
                </p>
              </div>
            ) : (
              availableFlights.map((flight, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-[#242E51]/12 bg-white hover:border-[#CD9A29]/50 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#242E51]/10 text-[#242E51] flex items-center justify-center">
                        <Plane className="w-4 h-4 text-[#CD9A29]" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#091626]">{flight.airline}</p>
                        <p className="text-[10px] text-[#091626]/50 font-semibold">
                          {flight.flightNo} · {flight.aircraft}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#CD9A29]/10 text-[#B88720] font-bold">
                      {formatDays(flight.days)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="text-left">
                      <p className="font-extrabold text-sm text-[#091626]">{flight.departs}</p>
                      <p className="text-[10px] text-[#091626]/50">QOW</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full max-w-[90px] border-t border-dashed border-[#242E51]/30 relative">
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2">✈</span>
                      </div>
                      <p className="text-[10px] text-[#CD9A29] font-bold">{destination.duration} · Non-stop</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-sm text-[#091626]">{flight.arrives}</p>
                      <p className="text-[10px] text-[#091626]/50">{destination.code}</p>
                    </div>
                  </div>

                  <a
                    href={flight.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 w-full py-2 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                  >
                    Book on {flight.airline}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ))
            )}
          </div>

          {/* Live fares helper */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs text-[#091626]/70">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#CD9A29]" />
              {formattedDate} · {FULL_DAY_NAMES[weekday]}
            </span>
            <a
              href={googleFlightsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#242E51] hover:text-[#CD9A29] flex items-center gap-1 transition"
            >
              Check live prices & times
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="mt-3 text-[10px] text-[#091626]/45 leading-relaxed">
            Indicative airline schedules for Sam Mbakwe Airport (QOW). Timings, aircraft and daily
            frequency change frequently — always confirm with the airline or Google Flights before
            traveling.
          </p>
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
                desc: 'With a 2-minute drive, avoid Owerri city traffic jams and comfortably catch morning flights to Lagos or Abuja without rushing.',
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
                  <ShieldCheck className="w-3.5 h-3.5" />
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