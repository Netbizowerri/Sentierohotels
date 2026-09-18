export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  dateISO: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  galleryImages?: string[];
  inlineGalleryIndex?: number;
  tags: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'orashi-power-project',
    title: 'Say Goodbye to Power Interruptions! Sentiero Hotels is Officially Connected to the Orashi Power Project! 🎉',
    slug: 'say-goodbye-to-power-interruptions-orashi-power-project',
    category: '24/7 Power & Comfort',
    date: 'September 18, 2026',
    dateISO: '2026-09-18',
    readTime: '2 min read',
    author: 'Sentiero',
    authorRole: 'Editorial',
    coverImage: 'https://i.ibb.co/7Jkx1Kc8/Sentiero-Hotels-Suites-Power.jpg',
    excerpt:
      'Say goodbye to power interruptions! Sentiero Hotels is officially connected to the Orashi Power Project, offering 24/7 uninterrupted power just 2 minutes from Imo State Airport.',
    content: [
      'Say goodbye to power interruptions! Sentiero Hotels is officially connected to the Orashi Power Project! 🎉',
      'Located just a 2-minute drive from the Imo State Airport, we now offer 24/7 uninterrupted power supply to ensure your stay, meetings, and relaxation remain completely smooth and seamless.',
      "Whether you're landing in Owerri for business or leisure, step into total comfort, cool air conditioning, and round-the-clock luxury without a single blink.",
      '✨ Premier comfort. Unbeatable convenience. Zero downtime.',
      'Our direct connection to the Orashi Power Project guarantees that whether you are delivering a high-stakes executive presentation in our VIP boardroom, resting in your deluxe suite, or savoring an evening cocktail by the pool, your power is 100% stable, continuous, and reliable 24 hours a day, 7 days a week.',
      '👉 Landing in Owerri soon? Reserve your room today and experience true 24/7 hospitality!',
      '📍 Imo State Airport Road (Just 2 minutes from the terminal)',
      '📞 Bookings & Inquiries: (+234) 09022842982, (+234) 09060 121 582',
      '🌐 Website: https://www.sentierohotels.com.ng/',
    ],
    inlineGalleryIndex: 3,
    galleryImages: [
      'https://i.ibb.co/Ps2Ppgsm/untitled-8998-768x512.jpg',
      'https://i.ibb.co/NnLgtSJF/untitled-9004-768x512.jpg',
      'https://i.ibb.co/jkkH1nFZ/untitled-9012-768x512.jpg',
      'https://i.ibb.co/0pKqgfdM/untitled-9019-768x512.jpg',
    ],
    tags: ['Orashi Power Project', '24/7 Power', 'Airport Hotel', 'Zero Downtime', 'Owerri Hotels', 'Luxury Stay'],
    featured: true,
  },
  {
    id: 'vip-bar',
    title: 'The Sentiero Hotels & Suites VIP Bar',
    slug: 'the-sentiero-hotels-and-suites-vip-bar',
    category: 'VIP Lounge & Bar',
    date: 'September 18, 2026',
    dateISO: '2026-09-18',
    readTime: '3 min read',
    author: 'Sentiero',
    authorRole: 'Editorial',
    coverImage: 'https://i.ibb.co/jkmGYtZz/untitled-8975.jpg',
    excerpt:
      'Discover the exclusive Sentiero Hotels & Suites VIP Bar, where refined ambience, vintage spirits, master chef bites, and discreet luxury come together for the ultimate evening escape.',
    content: [
      'When you are looking for an exclusive space to unwind, connect with colleagues, or celebrate memorable milestones, having access to an elite lounge experience makes all the difference.',
      'That’s where Sentiero Hotels & Suites comes in, with its signature VIP Bar designed to offer guests an elevated sanctuary of luxury, privacy, and impeccable hospitality.',
      'Nestled within our serene hotel grounds just minutes from Sam Mbakwe Airport, the VIP Bar boasts plush designer seating, warm ambient lighting, and bespoke interior aesthetics that set the tone for sophisticated relaxation.',
      'At the heart of the VIP Bar is a meticulously curated collection of world-class beverages. Guests can indulge in premium aged whiskeys, vintage champagnes, fine wines, and artisanal spirits sourced from renowned vineyards and distilleries worldwide.',
      'Our skilled bartenders and mixologists are always on hand to craft signature cocktails tailored to your personal taste, alongside chilled craft beers and refreshing mocktails.',
      'To complement your drink of choice, the VIP Bar also features an exquisite selection of light bites, savory appetizers, and gourmet finger foods freshly prepared by our master chefs to keep hunger at bay.',
      'One of the defining features of the Sentiero VIP Bar is its dedication to privacy and discretion. With comfortable conversation alcoves, high-definition entertainment screens for sports and global news, and discreet 5-star service, it is the premier meeting spot for business executives, travelers, and guests who value an upscale, quiet setting.',
      'Whether you are winding down after a busy day of meetings, hosting an intimate conversation with associates, or simply savoring a quiet evening cocktail in pure comfort, the VIP Bar delivers an unmatched hospitality experience.',
      'Overall, if you’re looking for a refined atmosphere to truly relax and unwind with friends, family, or business partners, Sentiero Hotels & Suites is the perfect choice.',
      'Step into the Sentiero VIP Bar today, and experience the fine art of luxury leisure.',
    ],
    inlineGalleryIndex: 4,
    galleryImages: [
      'https://i.ibb.co/chnn6tvV/untitled-8966.jpg',
      'https://i.ibb.co/BVsCdv2c/untitled-8987.jpg',
      'https://i.ibb.co/fVwqt5vF/untitled-8964.jpg',
      'https://i.ibb.co/vC8Wd5Wr/Untitled-design79.jpg',
    ],
    tags: ['VIP Bar', 'Lounge', 'Fine Wines', 'Cocktails', 'Sentiero Hotels', 'Luxury Nightlife'],
  },
  {
    id: 'hotel-swimming-pool',
    title: "The Sentiero Hotel's Swimming Pool",
    slug: 'sentiero-hotels-swimming-pool',
    category: 'Pool & Relaxation',
    date: 'September 18, 2026',
    dateISO: '2026-09-18',
    readTime: '3 min read',
    author: 'Sentiero',
    authorRole: 'Editorial',
    coverImage: 'https://i.ibb.co/CpJQ8xjg/untitled-89851.jpg',
    excerpt:
      'Discover the standard swimming pool and poolside bar at Sentiero Hotels and Suites, designed to provide guests with the ultimate in relaxation, refreshing drinks, and sunny leisure.',
    content: [
      'When it comes to finding the perfect vacation spot, there are a few things that everyone wants to have access to – comfortable accommodations, exciting activities, and, of course, a place to relax and unwind.',
      'That’s where Sentiero Hotels and Suites comes in, with its standard swimming pool and poolside bar designed to provide guests with the ultimate in relaxation.',
      'Whether you’re traveling with family, friends, or on your own, there’s nothing quite like lounging by the pool on a hot summer day.',
      'At Sentiero Hotels and Suites, guests have access to a beautifully designed swimming pool that offers the perfect place to cool off, swim a few laps, or simply soak up the sun.',
      'The pool is surrounded by comfortable lounge chairs and umbrellas, making it easy to spend an entire day lounging poolside.',
      'Of course, no day by the pool would be complete without a refreshing drink or a tasty snack, which is why Sentiero Hotels and Suites also features a poolside bar.',
      'Here, guests can order a variety of delicious cocktails, beer, and wine, as well as light bites and snacks to keep hunger at bay. The bar also features a TV, so you can catch up on your favorite shows or sports games while you sip your drink.',
      'One of the best things about Sentiero Hotels and Suites is that the pool and poolside bar are designed to cater to a wide range of guests. Whether you’re traveling with your family, your significant other, or a group of friends, you’ll find plenty of space to relax and enjoy the surroundings.',
      'The pool is also a great place for kids to burn off some energy, while adults can relax in the shaded lounge areas.',
      'Overall, if you’re looking for a place to truly relax and unwind, Sentiero Hotels and Suites is the perfect choice. With its standard swimming pool and poolside bar, you can enjoy all the amenities you need for the ultimate vacation experience.',
      'So why wait? Book your stay today and start planning your poolside getaway.',
    ],
    inlineGalleryIndex: 6,
    galleryImages: [
      'https://i.ibb.co/Kp0Y39SP/senti1.jpg',
      'https://i.ibb.co/7xqdTtR0/SENTIERO-HOTELing3.jpg',
      'https://i.ibb.co/2D20YDC/sentiero-poolside2-768x576.jpg',
    ],
    tags: ['Swimming Pool', 'Poolside Bar', 'Relaxation', 'Vacation', 'Cocktails'],
  },
  {
    id: 'nature-meets-luxury',
    title: 'Sentiero Hotels & Suites: Where Nature Meets Luxury',
    slug: 'where-nature-meets-luxury',
    category: 'Nature & Luxury',
    date: 'September 17, 2026',
    dateISO: '2026-09-17',
    readTime: '3 min read',
    author: 'Sentiero',
    authorRole: 'Editorial',
    coverImage: 'https://i.ibb.co/rKzT2kcQ/untitled-8966-768x512.jpg',
    excerpt:
      'If you’re looking for a hotel that combines the beauty of nature with the comfort of luxury, look no further than Sentiero Hotels & Suites nestled in the heart of nature itself.',
    content: [
      'If you’re looking for a hotel that combines the beauty of nature with the comfort of luxury, look no further than Sentiero Hotels & Suites.',
      'Sentiero Hotels & Suites is nestled in the heart of nature itself, surrounded by towering trees and greenery. But that’s just the beginning of the natural wonder that awaits you.',
      'The rooms and suites at Sentiero Hotels & Suites are the epitome of luxury. Each one is carefully crafted to provide guests with the utmost comfort and relaxation. From plush bedding and spacious bathrooms to private balconies with breathtaking views, our rooms and suites are designed to make you feel pampered and refreshed.',
      'One of the unique features of Sentiero Hotels & Suites is our poolside, which offers panoramic views of the surrounding natural environment. It’s the perfect place to relax and soak up the sun, or to take a refreshing dip after a long day.',
      'After a long day of exploring, guests can unwind at our bars and restaurants, where they can enjoy a wide range of amazing local and international dishes and drinks.',
      'At Sentiero Hotels & Suites, we believe that nature and luxury should go hand in hand. We invite you to come and experience the magic of Sentiero Hotels & Suites, where nature meets luxury.',
    ],
    galleryImages: [
      'https://i.ibb.co/CpJQ8xjg/untitled-89851.jpg',
      'https://i.ibb.co/6MxthBT/SENTIERO-HOTELing5-768x512.jpg',
      'https://i.ibb.co/2YfKvNjS/IMG-20220328-WA0011-768x576.jpg',
      'https://i.ibb.co/fdYtRZN5/SENTIERO-HOTELing61-768x512.jpg',
    ],
    tags: ['Nature & Luxury', 'Sentiero Hotels', 'Poolside', 'Suites', 'Bars & Restaurants'],
  },
];

