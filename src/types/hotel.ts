export type Currency = 'NGN' | 'USD';

export interface RoomSuite {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  priceNgn: number;
  priceUsd: number;
  rating: number;
  reviewsCount: number;
  capacity: {
    adults: number;
    children: number;
  };
  bedType: string;
  sizeSqMeters: number;
  distanceAirport: string;
  coverImage: string;
  galleryImages: string[];
  tags: string[];
  amenities: {
    name: string;
    icon: string;
  }[];
  memberExclusiveRateNgn: number;
  memberExclusiveRateUsd: number;
  bestValueRateNgn: number;
  bestValueRateUsd: number;
  isPopular?: boolean;
}

export interface HotelAmenity {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  category: 'security' | 'dining' | 'wellness' | 'convenience';
  image: string;
}

export interface Reservation {
  id: string;
  bookingRef: string;
  suiteId: string;
  suiteName: string;
  suiteImage: string;
  rateType: 'member' | 'standard';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  airportShuttleRequested: boolean;
  flightNumber?: string;
  specialRequests?: string;
  totalPriceNgn: number;
  totalPriceUsd: number;
  status: 'Confirmed' | 'Checked-in' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface SearchFilterState {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  category: 'all' | 'popular' | 'executive' | 'budget';
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating';
}
