export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  tags: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'world-class-luxury',
    title: 'World-Class Luxury & Executive Boardroom Facilities at Sentiero',
    slug: 'world-class-luxury-boardroom-services',
    category: 'Executive Stays',
    date: 'September 12, 2026',
    readTime: '4 min read',
    author: 'Sentiero Editorial',
    authorRole: 'Hospitality Concierge',
    coverImage: 'https://i.ibb.co/fVwqt5vF/untitled-8964.jpg',
    excerpt:
      'Discover our executive VIP boardroom, high-speed optical fiber internet, and dedicated business services designed specifically for executives and corporate travelers visiting Imo State.',
    content: [
      'In today’s fast-paced business environment, executive travelers need more than just a comfortable bed—they require an environment that fosters sharp focus, discreet privacy, and seamless global connectivity.',
      'At Sentiero Hotels & Suites, our Executive VIP Boardroom is tailored for corporate retreats, high-level shareholder meetings, and confidential business consultations. Equipped with ultra-high-speed fiber broadband, ergonomic leather seating, and advanced multimedia presentation displays, conducting business just 2 minutes from Sam Mbakwe Airport has never been smoother.',
      'Our dedicated concierge team is always on standby to provide gourmet catering, printing services, and personalized assistance to ensure your business engagements achieve maximum success.',
    ],
    tags: ['Executive Stay', 'VIP Boardroom', 'Business Travel', 'Imo State'],
    featured: true,
  },
  {
    id: 'elegantly-furnished-suites',
    title: 'Elegantly Furnished Suites: Where Comfort Meets Serenity',
    slug: 'elegantly-furnished-suites-comfort',
    category: 'Suite Showcase',
    date: 'September 08, 2026',
    readTime: '3 min read',
    author: 'Interior Design Team',
    authorRole: 'Sentiero Design Studio',
    coverImage: 'https://i.ibb.co/ZzPmMSbF/untitled-8961-1.jpg',
    excerpt:
      'Step inside our meticulously crafted chambers featuring artisan interior décor, plush orthopedic bedding, whisper-quiet air conditioning, and peaceful sanctuary vibes.',
    content: [
      'Every suite at Sentiero Hotels & Suites is an expression of thoughtful architectural craftsmanship. From the Classic Solo Suite to the expansive Business Executive Suite, every detail is engineered to offer tranquil rest.',
      'Guests enjoy custom orthopedic king-sized mattresses dressed in 400-thread-count Egyptian cotton linens, private living lounges with smart televisions, and en-suite rainfall showers with continuous instant hot water.',
      'Powered by our 24/7 continuous energy supply and acoustic noise-dampening windows, your stay remains completely peaceful from the moment you step through our doors.',
    ],
    tags: ['Suites', 'Luxury Interior', 'Comfort', 'King Bed'],
    featured: true,
  },
  {
    id: 'poolside-relaxation',
    title: 'Unwind at the Poolside: Sun Cabanas & Refreshing Waters',
    slug: 'poolside-relaxation-cabana-experience',
    category: 'Leisure & Wellness',
    date: 'August 29, 2026',
    readTime: '3 min read',
    author: 'Chidinma Eze',
    authorRole: 'Guest Experience Manager',
    coverImage: 'https://i.ibb.co/1YgtMPCq/untitled-8984.jpg',
    excerpt:
      'Take a refreshing dip in crystal-clear waters surrounded by tranquil outdoor cabanas, lush tropical landscaping, and attentive poolside cocktail service.',
    content: [
      'Whether recovering from a long interstate flight or unwinding after a productive day of business, the Sentiero swimming pool is an oasis of calm.',
      'Surrounded by manicured green palms, shaded sun loungers, and private poolside cabanas, guests can soak in the tropical sunshine or enjoy an afternoon swim in pristine, filtered water.',
      'Our poolside waitstaff is at your service with refreshing fruit smoothies, signature chilled cocktails, and freshly grilled barbecue bites right at your cabana.',
    ],
    tags: ['Swimming Pool', 'Cabanas', 'Relaxation', 'Cocktails'],
  },
  {
    id: 'well-stocked-bar',
    title: 'Fine Spirits & Vintage Wines: The Sentiero Bar Experience',
    slug: 'well-stocked-main-bar-cocktails',
    category: 'Food & Drink',
    date: 'August 20, 2026',
    readTime: '4 min read',
    author: 'Chef Obi',
    authorRole: 'Head Mixologist & Sommelier',
    coverImage: 'https://i.ibb.co/chnn6tvV/untitled-8966.jpg',
    excerpt:
      'Explore our curated collection of vintage wines, single-malt whiskeys, craft cocktails, and cosy poolside evening drinks under the stars.',
    content: [
      'The Sentiero Main Bar brings a cosmopolitan nightlife atmosphere to the serenity of Owerri. Featuring an opulent mahogany counter and top-shelf liquor displays, our bar is the ultimate destination for discerning connoisseurs.',
      'Our skilled mixologists prepare both timeless classics—such as the Old Fashioned and French 75—as well as bespoke Nigerian-inspired botanical infusions.',
      'For a more relaxed, open-air ambiance, transition to our Cosy Poolside Bar as dusk falls to enjoy cool evening breezes, mellow jazz, and chilled refreshments under the stars.',
    ],
    tags: ['Main Bar', 'Cocktails', 'Vintage Wine', 'Nightlife'],
  },
  {
    id: 'airport-transit-guide',
    title: '2-Minute Runway Transit: Your Sam Mbakwe Cargo Airport Guide',
    slug: 'sam-mbakwe-airport-proximity-guide',
    category: 'Travel Guide',
    date: 'August 14, 2026',
    readTime: '5 min read',
    author: 'Sentiero Transport Bureau',
    authorRole: 'Logistics Division',
    coverImage: 'https://i.ibb.co/GQLK37J5/Untitled-design321-600x400-1.png',
    excerpt:
      'Located just 1.2km from Sam Mbakwe International Cargo Airport (QOW), Sentiero eliminates the stress of missing morning flights or navigating highway traffic.',
    content: [
      'Sam Mbakwe International Cargo Airport is the bustling aviation hub of Imo State, serving thousands of travelers connecting through Abuja, Lagos, and surrounding southeastern commercial centers.',
      'Sentiero Hotels & Suites was intentionally positioned along the Airport Access Corridor—just a 2-minute drive from runway gates. This strategic location means you can wake up refreshed, savor a gourmet breakfast, and arrive at the departure terminal in minutes without highway rush hour bottlenecks.',
      'Our VIP airport transit service ensures seamless arrival pickup and departure drop-offs directly at the terminal doors.',
    ],
    tags: ['Sam Mbakwe Airport', 'Owerri Transit', 'Travel Tips', 'Airport Hotel'],
  },
  {
    id: 'master-chef-cuisine',
    title: 'Master Chef Delicacies: From Authentic Ofe Owerri to Continental Classics',
    slug: 'master-chef-delicacies-local-continental',
    category: 'Culinary',
    date: 'August 02, 2026',
    readTime: '4 min read',
    author: 'Executive Chef Emmanuel',
    authorRole: 'Culinary Director',
    coverImage: 'https://i.ibb.co/vC8Wd5Wr/Untitled-design79.jpg',
    excerpt:
      'Savor locally sourced organic ingredients prepared by master chefs, celebrating authentic Imo heritage soups alongside international continental favorites.',
    content: [
      'At Sentiero, dining is an elevated sensory experience. Our kitchen is guided by executive culinary masters who believe in celebrating indigenous Southeastern culinary traditions with Michelin-caliber precision.',
      'Signature specialties include our slow-simmered Ofe Owerri prepared with stockfish, dry fish, fresh snails, and aromatic uziza leaves, served alongside piping hot pounded yam or oatmeal.',
      'For guests preferring international flavors, our daily à la carte menu presents tender grilled ribeye steaks, creamy chicken alfredo, and freshly tossed Mediterranean salads, available round the clock through 24/7 in-room dining.',
    ],
    tags: ['Dining', 'Ofe Owerri', 'Master Chef', 'Gourmet Cuisine'],
  },
];
