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
  galleryImages?: string[];
  tags: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'nature-meets-luxury',
    title: 'Sentiero Hotels & Suites: Where Nature Meets Luxury',
    slug: 'where-nature-meets-luxury',
    category: 'Nature & Luxury',
    date: 'September 17, 2026',
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
    featured: true,
  },
];

