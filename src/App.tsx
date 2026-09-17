import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { BottomNav } from './components/BottomNav';
import { HomeSection } from './components/HomeSection';
import { Footer } from './components/Footer';
import { SuiteCard } from './components/SuiteCard';
import { SuiteDetailModal } from './components/SuiteDetailModal';
import { BookingModal } from './components/BookingModal';
import { AmenitiesSection } from './components/AmenitiesSection';
import { AirportGuideSection } from './components/AirportGuideSection';
import { ContactSection } from './components/ContactSection';
import { AboutUsSection } from './components/AboutUsSection';
import { BlogSection } from './components/BlogSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MyBookingsModal } from './components/MyBookingsModal';
import { NotificationsModal } from './components/NotificationsModal';
import { SearchFilterDrawer } from './components/SearchFilterDrawer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { SUITES_DATA } from './data/hotelData';
import { RoomSuite, Currency, Reservation, SearchFilterState } from './types/hotel';
import { SlidersHorizontal, ArrowUpDown, Calendar } from 'lucide-react';
import { getTodayDateString, getTomorrowDateString } from './utils/formatters';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [isMobilePreview, setIsMobilePreview] = useState<boolean>(false);

  // Modals
  const [selectedSuite, setSelectedSuite] = useState<RoomSuite | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const [bookingSuite, setBookingSuite] = useState<RoomSuite | null>(null);
  const [bookingRateType, setBookingRateType] = useState<'member' | 'standard'>('member');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState<boolean>(false);

  // Stored reservations in localStorage
  const [bookings, setBookings] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('sentiero_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sentiero_reservations', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  // Search and filter state
  const [filterState, setFilterState] = useState<SearchFilterState>({
    destination: 'Sam Mbakwe Airport, Imo',
    checkIn: getTodayDateString(),
    checkOut: getTomorrowDateString(),
    guests: 2,
    category: 'all',
    sortBy: 'recommended',
  });

  // Filtered suites
  const filteredSuites = SUITES_DATA.filter((suite) => {
    if (filterState.category === 'popular' && !suite.isPopular) return false;
    if (
      filterState.category === 'executive' &&
      suite.id !== 'executive-suite' &&
      suite.id !== 'royal-suite'
    )
      return false;
    if (filterState.category === 'budget' && suite.id !== 'classic-suite') return false;
    if (suite.capacity.adults + suite.capacity.children < filterState.guests) return false;
    return true;
  }).sort((a, b) => {
    if (filterState.sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
    if (filterState.sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
    if (filterState.sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended default
  });

  // Handlers
  const handleOpenDetail = (suite: RoomSuite) => {
    setSelectedSuite(suite);
    setIsDetailOpen(true);
  };

  const handleBookRate = (suite: RoomSuite, rateType: 'member' | 'standard') => {
    setIsDetailOpen(false);
    setBookingSuite(suite);
    setBookingRateType(rateType);
    setIsBookingOpen(true);
  };

  const handleQuickBook = (suite: RoomSuite) => {
    setBookingSuite(suite);
    setBookingRateType('member');
    setIsBookingOpen(true);
  };

  const handleReservationComplete = (newRes: Reservation) => {
    setBookings((prev) => [newRes, ...prev]);
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Main content body
  const renderMainContent = () => {
    switch (activeTab) {
      case 'suites':
        return (
          <div className="py-6 space-y-6">
            {/* Search Header & Filter Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#242E51]/15 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#CD9A29]">
                    <span className="w-2 h-2 rounded-full bg-[#CD9A29]"></span>
                    <span>2 Mins from Sam Mbakwe Airport, Imo State</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#091626] font-display mt-0.5">
                    Available Suites & Rooms
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#091626]/80 bg-[#F2F2FF] border border-[#242E51]/10 px-3 py-1.5 rounded-full self-start sm:self-auto font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#242E51]" />
                  <span>
                    {filterState.checkIn} to {filterState.checkOut}
                  </span>
                  <span>·</span>
                  <span>{filterState.guests} Guests</span>
                </div>
              </div>

              {/* Filter Pills row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setIsSearchFilterOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-[#242E51] text-white font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-xs hover:bg-[#1B233F] transition"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#CD9A29]" />
                  <span>Filter</span>
                </button>

                {/* Quick categories */}
                {[
                  { id: 'all', label: 'All 4 Suites' },
                  { id: 'popular', label: 'Most Popular' },
                  { id: 'executive', label: 'Executive & Royal' },
                  { id: 'budget', label: 'Solo Classic' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        category: cat.id as SearchFilterState['category'],
                      }))
                    }
                    className={`px-3 py-1.5 rounded-full border whitespace-nowrap font-medium transition ${
                      filterState.category === cat.id
                        ? 'bg-[#242E51] text-white border-[#242E51]'
                        : 'bg-white text-[#091626] border-[#242E51]/20 hover:border-[#CD9A29]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}

                {/* Sort selector pill */}
                <div className="ml-auto flex items-center gap-1 shrink-0">
                  <ArrowUpDown className="w-3 h-3 text-[#242E51]/60" />
                  <select
                    value={filterState.sortBy}
                    onChange={(e) =>
                      setFilterState((prev) => ({
                        ...prev,
                        sortBy: e.target.value as SearchFilterState['sortBy'],
                      }))
                    }
                    aria-label="Sort suites"
                    className="text-xs bg-transparent border-none font-semibold text-[#091626] focus:ring-0 cursor-pointer"
                  >
                    <option value="recommended">Sort: Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Rating: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredSuites.map((suite) => (
                <SuiteCard
                  key={suite.id}
                  suite={suite}
                  currency={currency}
                  onSelect={handleOpenDetail}
                  onQuickBook={handleQuickBook}
                />
              ))}
            </div>

            {/* Empty state safeguard */}
            {filteredSuites.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-[#242E51]/15 p-8 space-y-3">
                <p className="text-sm text-[#091626]/80 font-medium">
                  No suites match your specific guest capacity filter.
                </p>
                <button
                  onClick={() =>
                    setFilterState((prev) => ({ ...prev, category: 'all', guests: 1 }))
                  }
                  className="px-4 py-2 rounded-full bg-[#242E51] text-white text-xs font-semibold hover:bg-[#1B233F]"
                >
                  Show All 4 Sentiero Suites
                </button>
              </div>
            )}
          </div>
        );

      case 'amenities':
        return (
          <AmenitiesSection
            onBookNow={() => {
              setActiveTab('suites');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'airport':
        return (
          <AirportGuideSection
            onBookShuttle={() => {
              setActiveTab('suites');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'about':
        return (
          <AboutUsSection
            onBookNow={() => {
              setActiveTab('suites');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreAmenities={() => {
              setActiveTab('amenities');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToContact={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'blogs':
        return (
          <BlogSection
            onBookNow={() => {
              setActiveTab('suites');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'contact':
        return (
          <ErrorBoundary fallbackTitle="Contact & Front Desk Support">
            <ContactSection />
          </ErrorBoundary>
        );

      case 'home':
      default:
        return (
          <HomeSection
            currency={currency}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onExploreSuites={() => {
              setActiveTab('suites');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSearchFilter={() => setIsSearchFilterOpen(true)}
            onSelectSuite={handleOpenDetail}
            onQuickBook={handleQuickBook}
            onGoToAirport={() => {
              setActiveTab('airport');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToBlogs={() => {
              setActiveTab('blogs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen font-sans text-[#091626] antialiased ${
        isMobilePreview ? 'bg-[#1B233F] py-6 px-2 sm:px-4' : 'bg-[#F2F2FF]'
      }`}
    >
      {/* If Mobile Preview Mode is active, wrap in phone frame */}
      <div
        className={
          isMobilePreview
            ? 'max-w-sm mx-auto bg-[#F2F2FF] rounded-[44px] shadow-2xl border-8 border-[#091626] overflow-hidden relative min-h-[840px] flex flex-col'
            : 'w-full'
        }
      >
        {/* Phone Frame Status Bar */}
        {isMobilePreview && (
          <div className="bg-[#242E51] pt-3 px-6 pb-2 flex items-center justify-between text-xs font-semibold text-white select-none z-30 border-b border-[#303D6A]">
            <span>9:41</span>
            {/* Dynamic Island / notch */}
            <div className="w-20 h-4 bg-[#091626] rounded-full"></div>
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-[10px]">5G</span>
              <div className="w-4 h-2 border border-white rounded-xs relative">
                <div className="h-full bg-white w-3"></div>
              </div>
            </div>
          </div>
        )}

        {/* Top App / Web Header (Primary Color #242E51) */}
        <HeaderNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currency={currency}
          setCurrency={setCurrency}
          bookingsCount={bookings.length}
          openBookingsModal={() => setIsBookingsModalOpen(true)}
          isMobilePreview={isMobilePreview}
          setIsMobilePreview={setIsMobilePreview}
        />

        {/* Main Content Area with Background #F2F2FF */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pb-20 sm:pb-16 bg-[#F2F2FF]">
          {renderMainContent()}
        </main>

        {/* Footer (Primary Color #242E51 with Accent #CD9A29) */}
        <Footer
          setActiveTab={setActiveTab}
          onOpenDetail={handleOpenDetail}
        />

        {/* Mobile bottom navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bookingsCount={bookings.length}
          openBookingsModal={() => setIsBookingsModalOpen(true)}
        />
      </div>

      {/* Floating WhatsApp Contact Button */}
      <WhatsAppFloat />

      {/* MODALS */}
      <SuiteDetailModal
        suite={selectedSuite}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        currency={currency}
        onBookRate={handleBookRate}
      />

      <BookingModal
        suite={bookingSuite}
        rateType={bookingRateType}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currency={currency}
        onReservationComplete={handleReservationComplete}
      />

      <MyBookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        currency={currency}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <SearchFilterDrawer
        isOpen={isSearchFilterOpen}
        onClose={() => setIsSearchFilterOpen(false)}
        filterState={filterState}
        setFilterState={setFilterState}
        onApply={() => {
          setActiveTab('suites');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
