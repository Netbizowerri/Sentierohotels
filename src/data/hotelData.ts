import { RoomSuite, HotelAmenity } from '../types/hotel';

export const SENTIERO_INFO = {
  name: 'Sentiero Hotels & Suites',
  tagline: 'Luxury & Serenity 2 Minutes from Sam Mbakwe Airport',
  headline: 'ENJOY THE SENTIERO HOSPITALITY',
  description:
    "At Sentiero Hotels and Suites, we'll give you that luxurious and serene environment that you need to truly relax. With your comfort comes security which includes hitech CCTV coverage of the entire facility and fortified 24/7 security.",
  airportPitch:
    "With just a 2-minutes drive to the Sam Mbakwe Airport, Imo State, Sentiero Hotels and Suites is perfectly situated so you'll never miss your flight ever again.",
  address: 'Airport Road, near Sam Mbakwe International Cargo Airport, Owerri, Imo State, Nigeria',
  phone: '+234 803 456 7890',
  whatsapp: '+234 814 990 0012',
  email: 'reservations@sentierohotels.com',
  checkInTime: 'From 2:00 PM',
  checkOutTime: 'Before 12:00 PM',
  coordinates: '5.4267° N, 7.2064° E',
};

export const SUITES_DATA: RoomSuite[] = [
  {
    id: 'classic-suite',
    name: 'Classic Suite',
    shortDesc: "The Sentiero Hotels Classic Room Suite is a beautiful suite that's perfect for one guest.",
    fullDesc:
      "Crafted for the solo traveler or business professional, the Sentiero Classic Suite provides an intimate, peaceful sanctuary. Features a luxurious king-size bed with premium cotton linens, dedicated work console, en-suite bathroom with hot rainfall shower, and whisper-quiet air conditioning powered by our 24/7 uninterrupted solar grid.",
    priceNgn: 24500,
    priceUsd: 32,
    rating: 4.8,
    reviewsCount: 428,
    capacity: { adults: 1, children: 1 },
    bedType: 'King size bed',
    sizeSqMeters: 28,
    distanceAirport: '2 mins from Sam Mbakwe Airport',
    coverImage: 'https://i.ibb.co/Ps2Ppgsm/untitled-8998-768x512.jpg',
    galleryImages: [
      'https://i.ibb.co/Ps2Ppgsm/untitled-8998-768x512.jpg',
      'https://i.ibb.co/NnLgtSJF/untitled-9004-768x512.jpg',
      'https://i.ibb.co/0pKqgfdM/untitled-9019-768x512.jpg',
    ],
    tags: ['Breakfast', 'Swimming pool access', 'AC', 'TV'],
    amenities: [
      { name: 'Free Wi-Fi', icon: 'Wifi' },
      { name: '24/7 Power', icon: 'Zap' },
      { name: 'Smart TV', icon: 'Tv' },
      { name: 'Air Conditioning', icon: 'Wind' },
      { name: 'Work Desk', icon: 'Briefcase' },
    ],
    memberExclusiveRateNgn: 24500,
    memberExclusiveRateUsd: 32,
    bestValueRateNgn: 24500,
    bestValueRateUsd: 32,
  },
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite',
    shortDesc: 'The Sentiero Hotels Deluxe Room Suite is a suite that blends generous space with modern comfort.',
    fullDesc:
      'The Deluxe Suite is our most popular accommodation for couples and travelers seeking enhanced roominess. Featuring a king-size bed, rich warm accent palettes, ergonomic study desk, comfortable armchair lounge, and master-chef in-room dining privileges.',
    priceNgn: 29900,
    priceUsd: 39,
    rating: 4.9,
    reviewsCount: 1320,
    isPopular: true,
    capacity: { adults: 2, children: 1 },
    bedType: 'King size bed',
    sizeSqMeters: 38,
    distanceAirport: '2 mins from Sam Mbakwe Airport',
    coverImage: 'https://i.ibb.co/NnLgtSJF/untitled-9004-768x512.jpg',
    galleryImages: [
      'https://i.ibb.co/NnLgtSJF/untitled-9004-768x512.jpg',
      'https://i.ibb.co/Ps2Ppgsm/untitled-8998-768x512.jpg',
      'https://i.ibb.co/jkkH1nFZ/untitled-9012-768x512.jpg',
    ],
    tags: ['Breakfast', 'Swimming pool access', 'AC', 'TV'],
    amenities: [
      { name: 'Free Wi-Fi', icon: 'Wifi' },
      { name: 'Breakfast Included', icon: 'Coffee' },
      { name: '24/7 Power', icon: 'Zap' },
      { name: 'Free Parking', icon: 'Car' },
      { name: '24/7 Fortified Security', icon: 'ShieldCheck' },
    ],
    memberExclusiveRateNgn: 29900,
    memberExclusiveRateUsd: 39,
    bestValueRateNgn: 29900,
    bestValueRateUsd: 39,
  },
  {
    id: 'royal-suite',
    name: 'Royal Suite',
    shortDesc: 'The Sentiero Hotels Royal Room Suite gives you that royal relaxation that you deserve.',
    fullDesc:
      'Designed for refined indulgence, the Royal Suite elevates your stay with opulent decor, an expansive king-size bed, plush relaxation lounge, mini refrigerator, and complimentary gourmet breakfast prepared by our master chefs.',
    priceNgn: 26900,
    priceUsd: 35,
    rating: 5.0,
    reviewsCount: 890,
    capacity: { adults: 2, children: 2 },
    bedType: 'King size bed',
    sizeSqMeters: 52,
    distanceAirport: '2 mins from Sam Mbakwe Airport',
    coverImage: 'https://i.ibb.co/jkkH1nFZ/untitled-9012-768x512.jpg',
    galleryImages: [
      'https://i.ibb.co/jkkH1nFZ/untitled-9012-768x512.jpg',
      'https://i.ibb.co/0pKqgfdM/untitled-9019-768x512.jpg',
      'https://i.ibb.co/NnLgtSJF/untitled-9004-768x512.jpg',
    ],
    tags: ['Breakfast', 'Swimming pool access', 'AC', 'TV'],
    amenities: [
      { name: 'Free Wi-Fi', icon: 'Wifi' },
      { name: 'Chef Breakfast', icon: 'Utensils' },
      { name: 'Air Conditioning', icon: 'Wind' },
      { name: 'Poolside Access', icon: 'Waves' },
      { name: 'Mini Fridge', icon: 'Wine' },
    ],
    memberExclusiveRateNgn: 26900,
    memberExclusiveRateUsd: 35,
    bestValueRateNgn: 26900,
    bestValueRateUsd: 35,
  },
  {
    id: 'executive-suite',
    name: 'Business Executive Suite',
    shortDesc: 'The Sentiero Hotels Business Executive Room comes with a seating room Suite is perfect for execs.',
    fullDesc:
      'The pinnacle of prestige at Sentiero Hotels & Suites. This dual-room suite features a private living/sitting room designed for confidential business meetings or family relaxation, an executive conference work station, luxury king-size master bedroom, and dedicated round-the-clock concierge.',
    priceNgn: 35000,
    priceUsd: 46,
    rating: 5.0,
    reviewsCount: 654,
    capacity: { adults: 3, children: 2 },
    bedType: 'King size bed',
    sizeSqMeters: 68,
    distanceAirport: '2 mins from Sam Mbakwe Airport',
    coverImage: 'https://i.ibb.co/0pKqgfdM/untitled-9019-768x512.jpg',
    galleryImages: [
      'https://i.ibb.co/0pKqgfdM/untitled-9019-768x512.jpg',
      'https://i.ibb.co/jkkH1nFZ/untitled-9012-768x512.jpg',
      'https://i.ibb.co/Ps2Ppgsm/untitled-8998-768x512.jpg',
    ],
    tags: ['Breakfast', 'Swimming pool access', 'AC', 'TV'],
    amenities: [
      { name: 'Separate Living Room', icon: 'Armchair' },
      { name: 'Free Wi-Fi', icon: 'Wifi' },
      { name: 'Smart TV', icon: 'Tv' },
      { name: '24/7 Room Service', icon: 'Bell' },
      { name: '24/7 Fortified Security', icon: 'ShieldCheck' },
    ],
    memberExclusiveRateNgn: 35000,
    memberExclusiveRateUsd: 46,
    bestValueRateNgn: 35000,
    bestValueRateUsd: 46,
  },
];

export const HOTEL_AMENITIES: HotelAmenity[] = [
  {
    id: 'power-supply',
    title: '24/7 Power Supply',
    description:
      'Connected to the Orashi Power grid project of Imo state, a high-capacity solar array backed by automated dual standby generators guarantees uninterrupted air-conditioning, instant hot water, and continuous device charging.',
    icon: 'Zap',
    badge: '100% Uptime Solar Grid',
    category: 'convenience',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cctv-security',
    title: 'Guaranteed Security',
    description:
      'Round-the-clock perimeter patrols, and high-definition CCTV coverage ensures complete safety for our esteemed guests.',
    icon: 'ShieldCheck',
    badge: 'Fortified Perimeter Defense',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'restaurant',
    title: 'Amazing Dishes',
    description:
      'Savor freshly prepared Nigerian delicacies (Afang, Egusi and all kinds of pepper soup) alongside premium continental menus, breakfast and round-the-clock room dining.',
    icon: 'Utensils',
    badge: 'Authentic African & Continental',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'poolside',
    title: 'Sparkling Poolside',
    description: 'Dip into crystal clean waters and lounge under palm cabanas with poolside refreshments.',
    icon: 'Waves',
    badge: 'Outdoor Pool & Cabanas',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'airport-shuttle',
    title: 'Airport Shuttle',
    description: 'We provide swift airport shuttles to and fro the Imo state airport (Sam Mbakwe).',
    icon: 'Plane',
    badge: '2-Min Transfer Time',
    category: 'convenience',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gym',
    title: 'Exclusive Gym',
    description: 'Come and relax and also stay in shape in our exclusive gym equipped with modern fitness systems.',
    icon: 'Dumbbell',
    badge: 'Cardio & Strength',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bar',
    title: 'Fully Stocked Bar & Lounge',
    description: 'All our bars are fully stocked for your satisfaction with vintage wines, premium spirits, and cocktails.',
    icon: 'GlassWater',
    badge: 'Signature Cocktails',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'free-wifi',
    title: 'Free Wi-Fi',
    description:
      'High-speed low-latency broadband throughout all rooms, lounges, and poolside areas. Stream 4K video, attend Zoom conferences, and work without lag.',
    icon: 'Wifi',
    badge: 'Available In All Suites',
    category: 'convenience',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Dr. Chinedu Okeke',
    role: 'Frequent Business Traveler (Lagos - Owerri)',
    comment:
      "Sentiero is a blessing for anyone using Sam Mbakwe Airport. I literally walked out of the terminal and was checking in under 3 minutes. The 24/7 solar power never flickered once, and the round-the-clock security gave me absolute peace of mind.",
    rating: 5,
    date: '3 days ago',
  },
  {
    id: '2',
    name: 'Amaka Williams',
    role: 'Vacation Guest',
    comment:
      "The Deluxe Suite was sparkling clean and the Master Chef in the restaurant prepared the freshest native Ofe Owerri and continental breakfast. The pool was peaceful and refreshing.",
    rating: 5,
    date: '1 week ago',
  },
  {
    id: '3',
    name: 'Engr. Kenneth Adeleke',
    role: 'Corporate Executive',
    comment:
      "Booked the Executive Suite for 4 days. Having a separate living room to receive colleagues without leaving my room was perfect. The airport shuttle was ready at the curb the second my flight landed.",
    rating: 5,
    date: '2 weeks ago',
  },
];

export const FAQS = [
  {
    q: 'How close is Sentiero Hotels & Suites to Sam Mbakwe Airport?',
    a: 'We are situated approximately 1.2 kilometers away, which is just a 2-minute drive. Our dedicated airport shuttle runs 24 hours a day to meet incoming and departing flights.',
  },
  {
    q: 'Is power supply guaranteed throughout the stay?',
    a: 'Yes! We run an advanced hybrid solar installation backed by dual industrial standby power plants, delivering seamless 24/7 electricity and air conditioning without interruption.',
  },
  {
    q: 'What security measures are in place?',
    a: 'Your safety is our highest priority. The entire facility is covered by high-tech CCTV camera monitoring combined with active professional armed security personnel guarding all access points.',
  },
  {
    q: 'How do I request an airport shuttle pickup?',
    a: 'You can message our front desk directly via WhatsApp with your flight arrival details, or contact our 24/7 reception anytime after booking.',
  },
  {
    q: 'Can I pay upon arrival at check-in?',
    a: 'Yes, you can book online now with zero upfront payment and settle upon arrival at the hotel front desk via card or bank transfer.',
  },
];
