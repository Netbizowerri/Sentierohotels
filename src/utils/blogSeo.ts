import { BlogPost } from '../data/blogData';
import { SENTIERO_INFO } from '../data/hotelData';

export const SITE_URL = 'https://www.sentierohotels.com.ng';

export function blogPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

export function blogPostAbsoluteUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildBlogPostingJsonLd(post: BlogPost): unknown {
  const canonical = blogPostAbsoluteUrl(post.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    image: [
      post.coverImage,
      ...(post.galleryImages ?? []).slice(0, 4),
    ],
    datePublished: `${post.dateISO}T00:00:00+01:00`,
    dateModified: `${post.dateISO}T00:00:00+01:00`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SENTIERO_INFO.name,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: 'https://i.ibb.co/99fp2mWK/Sentiero-Logo.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  };
}

export function buildBreadcrumbJsonLd(post: BlogPost): unknown {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/#blogs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: blogPostAbsoluteUrl(post.slug),
      },
    ],
  };
}