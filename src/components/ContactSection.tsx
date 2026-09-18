import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronDown,
  Building2,
  Navigation,
  Globe,
} from 'lucide-react';
import { SENTIERO_INFO, FAQS } from '../data/hotelData';
import { HotelLocationMap } from './HotelLocationMap';
import { ErrorBoundary } from './ErrorBoundary';
import { sendLeadToCrm } from '../services/crmService';
import {
  sanitizeText,
  sanitizeName,
  sanitizePhone,
  sanitizeEmail,
  isValidName,
  isValidPhone,
  isValidEmail,
} from '../utils/sanitize';

const CONTACT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdekkoae';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Room Reservation',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const safeName = sanitizeName(formData.name);
    const safeEmail = sanitizeEmail(formData.email);
    const safePhone = sanitizePhone(formData.phone);
    const safeInquiryType = sanitizeText(formData.inquiryType, 120);
    const safeMessage = sanitizeText(formData.message);

    if (!isValidName(safeName)) {
      setFormError('Please enter your full name (letters only).');
      return;
    }
    if (safeEmail && !isValidEmail(safeEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (safePhone && !isValidPhone(safePhone)) {
      setFormError('Please enter a valid phone / WhatsApp number.');
      return;
    }
    if (!safeMessage || safeMessage.length < 5) {
      setFormError('Please write a message of at least 5 characters.');
      return;
    }
    if (!safeEmail && !safePhone) {
      setFormError('Please provide an email address or a phone number so we can reply.');
      return;
    }

    setSubmitted(true);

    sendLeadToCrm(
      {
        name: safeName,
        email: safeEmail || undefined,
        phone: safePhone,
        source: 'Contact Inquiry',
        notes: `Inquiry Type: ${safeInquiryType}. Message: ${safeMessage}`,
        custom_fields: {
          'Inquiry Type': safeInquiryType,
          'Message': safeMessage,
        },
      },
      CONTACT_FORMSPREE_ENDPOINT,
    );
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#242E51] bg-[#242E51]/10 px-3 py-1 rounded-full border border-[#242E51]/20">
          Get in Touch
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#091626] font-display mt-3">
          Contact Sentiero Hotels & Suites
        </h2>
        <p className="text-xs sm:text-sm text-[#091626]/70 mt-2">
          We are at your service 24 hours a day, 7 days a week. Reach out for suite inquiries, arrivals coordination, or corporate bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#242E51]/15 shadow-xs">
          <h3 className="text-lg sm:text-xl font-bold text-[#091626] font-display mb-2">
            Send an Inquiry Message
          </h3>
          <p className="text-xs text-[#091626]/60 mb-6">
            Our guest concierge desk responds within 15 minutes.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#CD9A29]/10 border border-[#CD9A29]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#CD9A29]/20 text-[#CD9A29] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#091626] font-display">
                Thank You, {formData.name || 'Esteemed Guest'}!
              </h4>
              <p className="text-xs text-[#091626]/80 leading-relaxed">
                Your message regarding "{formData.inquiryType}" has been forwarded to our front desk. We will contact you at {formData.phone || formData.email || 'your contact details'}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-5 py-2 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-semibold transition shadow-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2" role="alert">
                  {formError}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    placeholder="e.g. Chief Raymond"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: sanitizeName(e.target.value) })}
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={30}
                    placeholder="+234 803 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: sanitizePhone(e.target.value) })}
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    maxLength={254}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: sanitizeEmail(e.target.value) })}
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#091626] mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: sanitizeText(e.target.value, 120) })}
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                  >
                    <option value="Room Reservation">Room / Suite Reservation</option>
                    <option value="Airport Arrival Coordination">Airport Arrival / Pick-Up Help</option>
                    <option value="Master Chef Catering">Restaurant / Event Catering</option>
                    <option value="Executive Meeting Hall">Executive Meeting / Corporate</option>
                    <option value="Security Detail">VIP Security Escort Request</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#091626] mb-1">
                  Your Message or Special Request *
                </label>
                <textarea
                  rows={4}
                  required
                  maxLength={2000}
                  placeholder="Tell us how we can make your visit comfortable..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: sanitizeText(e.target.value) })}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-[#242E51]/15 bg-white text-[#091626] focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#242E51] hover:bg-[#1B233F] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#CD9A29]" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Cards & Location Info */}
        <div className="lg:col-span-5 space-y-4">
          {/* Direct WhatsApp Quick Chat */}
          <div className="p-5 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#091626]">Chat on WhatsApp</h4>
                <p className="text-xs text-[#091626]/60">Instant concierge booking & inquiries</p>
                <a
                  href={`https://wa.me/${SENTIERO_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sentiero Hotels & Suites, I would like to make an inquiry.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#CD9A29] hover:underline"
                >
                  {SENTIERO_INFO.whatsapp}
                </a>
              </div>
            </div>
            <a
              href={`https://wa.me/${SENTIERO_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sentiero Hotels & Suites, I would like to make an inquiry.')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition shrink-0 shadow-xs"
            >
              Open Chat
            </a>
          </div>

          {/* Contact Details List */}
          <div className="p-6 rounded-3xl bg-white border border-[#242E51]/15 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#242E51]/10 flex items-center justify-center text-[#242E51] shrink-0">
                <Phone className="w-4 h-4 text-[#CD9A29]" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase text-[#091626]/50">
                  Bookings & Inquiries (24/7)
                </span>
                <div className="space-y-1 mt-1">
                  <div>
                    <a
                      href={`tel:${SENTIERO_INFO.phone1Raw}`}
                      className="text-xs font-bold text-[#091626] hover:text-[#CD9A29] transition inline-flex items-center gap-2"
                    >
                      <span>Line 1: {SENTIERO_INFO.phone}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25D366]/15 text-[#25D366] font-bold">
                        WhatsApp
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${SENTIERO_INFO.phone2Raw}`}
                      className="text-xs font-bold text-[#091626] hover:text-[#CD9A29] transition inline-block"
                    >
                      Line 2: {SENTIERO_INFO.phoneAlt}
                    </a>
                  </div>
                </div>
                <span className="text-[11px] text-[#CD9A29] font-semibold block mt-1">
                  24/7 Front Desk Hotline · Orashi Power Connection
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#242E51]/10 flex items-center justify-center text-[#242E51] shrink-0">
                <Globe className="w-4 h-4 text-[#CD9A29]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#091626]/50">
                  Official Website
                </span>
                <p className="text-xs font-bold text-[#091626] mt-0.5">
                  <a
                    href={SENTIERO_INFO.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#242E51] hover:text-[#CD9A29] underline underline-offset-2 transition"
                  >
                    {SENTIERO_INFO.website}
                  </a>
                </p>
                <span className="text-[11px] text-[#091626]/60">Direct room reservations & verified rates</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#242E51]/10 flex items-center justify-center text-[#242E51] shrink-0">
                <Mail className="w-4 h-4 text-[#CD9A29]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#091626]/50">
                  Email Inquiries
                </span>
                <p className="text-xs font-bold text-[#091626] mt-0.5">{SENTIERO_INFO.email}</p>
                <span className="text-[11px] text-[#091626]/60">Corporate & Group reservations</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#242E51]/10 flex items-center justify-center text-[#242E51] shrink-0">
                <MapPin className="w-4 h-4 text-[#CD9A29]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#091626]/50">Location</span>
                <p className="text-xs font-bold text-[#091626] mt-0.5">{SENTIERO_INFO.address}</p>
                <span className="text-[11px] text-[#CD9A29] font-bold">
                  Just 2 Minutes from Airport Terminal Gates
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Map Quick Card in Primary #242E51 */}
          <div className="rounded-3xl overflow-hidden border border-[#CD9A29]/30 bg-[#242E51] text-white p-5 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#CD9A29]" />
                <span className="font-bold text-xs">Hotel Location & Proximity</span>
              </div>
              <span className="text-[10px] text-[#CD9A29] font-mono font-bold">
                {SENTIERO_INFO.coordinates}
              </span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Directly on Imo Airport Road, off Owerri-Aba Express Way, Ngor-Okpala, Imo State. 2 minutes from Sam Mbakwe International Cargo Airport gates.
            </p>
            <a
              href="#hotel-map-directions"
              className="w-full py-2.5 px-4 rounded-xl bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions on Interactive Map</span>
            </a>
          </div>
        </div>
      </div>

      {/* Exact Location Map & Surrounding Owerri Area */}
      <div id="hotel-map-directions" className="pt-2">
        <ErrorBoundary fallbackTitle="Sentiero Hotels Map & Location">
          <HotelLocationMap />
        </ErrorBoundary>
      </div>

      {/* Frequently Asked Questions */}
      <div className="pt-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#091626] font-display">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-[#091626]/60 mt-1">
            Common questions from arriving passengers and hotel guests
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#242E51]/15 bg-white overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#091626] hover:text-[#CD9A29] transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#CD9A29] transition-transform ${
                      isOpen ? 'rotate-180 text-[#242E51]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#091626]/75 leading-relaxed border-t border-[#242E51]/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
