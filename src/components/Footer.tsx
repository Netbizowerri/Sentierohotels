import React from 'react';
import { SENTIERO_INFO, SUITES_DATA } from '../data/hotelData';
import { RoomSuite } from '../types/hotel';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenDetail: (suite: RoomSuite) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenDetail }) => {
  return (
    <footer className="bg-[#242E51] text-white border-t border-[#CD9A29]/30 pt-10 pb-24 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/ZRhBq64f/Sentiero-Hotels-Suites.jpg"
              alt="Sentiero Hotels & Suites Logo"
              className="h-[54px] w-auto object-contain"
            />
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Luxury, serenity, and top-tier security just 2 minutes from Sam Mbakwe Airport, Imo State.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B233F] border border-[#CD9A29]/40 text-[#CD9A29] font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#CD9A29] animate-pulse"></span>
            24/7 Orashi Power Project · Fortified Security
          </div>
        </div>

        <div>
          <h5 className="font-bold text-xs text-[#CD9A29] uppercase tracking-wider mb-3">Our Suites</h5>
          <ul className="space-y-2">
            {SUITES_DATA.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onOpenDetail(s)}
                  className="text-white/80 hover:text-[#CD9A29] transition text-left"
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-xs text-[#CD9A29] uppercase tracking-wider mb-3">Quick Navigation</h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-[#CD9A29] transition"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('suites');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-[#CD9A29] transition"
              >
                Suites & Booking
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('amenities');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-[#CD9A29] transition"
              >
                Amenities & Facilities
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('airport');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-[#CD9A29] transition"
              >
                Airport Proximity (2 mins)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('blogs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-[#CD9A29] transition"
              >
                Blogs & Stories
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-[#CD9A29] transition"
              >
                Contact & Inquiries
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-xs text-[#CD9A29] uppercase tracking-wider mb-3">Airport Location</h5>
          <p className="text-white/80">{SENTIERO_INFO.address}</p>
          <div className="space-y-0.5 pt-1">
            <p className="font-semibold text-white">Line 1: {SENTIERO_INFO.phone}</p>
            <p className="text-white/80 text-[11px]">Line 2: {SENTIERO_INFO.phoneAlt}</p>
          </div>
          <p className="text-white/80 pt-1">
            <a
              href={SENTIERO_INFO.website}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#CD9A29] transition underline underline-offset-2"
            >
              sentierohotels.com.ng
            </a>
          </p>
          <p className="text-white/80">{SENTIERO_INFO.email}</p>
          <p className="text-white/60 text-[11px] pt-1">
            Check-in: {SENTIERO_INFO.checkInTime} · Check-out: {SENTIERO_INFO.checkOutTime}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
        <span>
          © {new Date().getFullYear()} Sentiero Hotels & Suites. All rights reserved.
        </span>
        <span className="text-[#CD9A29]">
          Sam Mbakwe International Cargo Airport Zone, Imo State, Nigeria.
        </span>
      </div>
    </footer>
  );
};
