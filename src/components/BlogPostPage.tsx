import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Tag,
  Images,
  Maximize2,
  Share2,
  Check,
  ArrowLeft,
  BookOpen,
  Sparkles,
  X,
} from 'lucide-react';
import { BlogPost } from '../data/blogData';
import {
  blogPostAbsoluteUrl,
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
} from '../utils/blogSeo';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  onBookNow: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack, onBookNow }) => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const canonical = blogPostAbsoluteUrl(post.slug);

    document.title = `${post.title} | Sentiero Hotels & Suites Blog`;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsertMeta('name', 'description', post.excerpt);
    upsertMeta('property', 'og:title', `${post.title} | Sentiero Hotels & Suites`);
    upsertMeta('property', 'og:description', post.excerpt);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', post.coverImage);
    upsertMeta('property', 'og:type', 'article');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', post.title);
    upsertMeta('name', 'twitter:description', post.excerpt);
    upsertMeta('name', 'twitter:image', post.coverImage);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    document.head.querySelectorAll('script[data-blogposting]').forEach((s) => s.remove());
    const posting = document.createElement('script');
    posting.type = 'application/ld+json';
    posting.setAttribute('data-blogposting', 'true');
    posting.textContent = JSON.stringify([buildBlogPostingJsonLd(post), buildBreadcrumbJsonLd(post)]);
    document.head.appendChild(posting);

    return () => {
      document.title = 'Sentiero Hotels & Suites | Nearest Hotel to Sam Mbakwe Imo Airport, Owerri';
    };
  }, [post]);

  const handleShare = () => {
    const url = blogPostAbsoluteUrl(post.slug);
    if (navigator.share) {
      navigator
        .share({ title: post.title, text: post.excerpt, url })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const renderGallery = (images: string[], colsClass: string) => (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${colsClass} gap-3`}>
      {images.map((imgUrl, idx) => (
        <div
          key={idx}
          onClick={() => setEnlargedImage(imgUrl)}
          className="group/img relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100 border border-[#242E51]/10 cursor-pointer shadow-xs hover:shadow-md transition"
        >
          <img
            src={imgUrl}
            alt={`${post.title} photo ${idx + 1}`}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#091626] text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
              <Maximize2 className="w-3.5 h-3.5 text-[#CD9A29]" />
              <span>Enlarge Photo</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-6 sm:py-10 space-y-6">
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#242E51] hover:text-[#CD9A29] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </button>

      {/* Article Header */}
      <div className="rounded-3xl bg-[#242E51] text-white p-6 sm:p-10 border border-[#CD9A29]/30 relative overflow-hidden shadow-xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#CD9A29]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#CD9A29] text-white text-xs font-bold">
              {post.category}
            </span>
            <span className="text-xs text-white/60 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-1">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#CD9A29]" />
              Written by {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#CD9A29]" />
              {post.date}
            </span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B233F] text-white hover:bg-[#303D6A] transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#CD9A29]" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Link Copied' : 'Share Article'}
            </button>
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div
        onClick={() => setEnlargedImage(post.coverImage)}
        className="group/cover relative rounded-3xl overflow-hidden h-64 sm:h-96 bg-neutral-100 shadow-inner cursor-pointer border border-[#242E51]/10"
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover/cover:scale-102 transition duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/cover:opacity-100 transition flex items-center justify-center">
          <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#091626] text-xs font-bold flex items-center gap-1.5 shadow-md">
            <Maximize2 className="w-3.5 h-3.5 text-[#CD9A29]" />
            <span>View Cover Image</span>
          </span>
        </div>
      </div>

      {/* Article body */}
      <div className="bg-white rounded-3xl border border-[#242E51]/15 shadow-xs p-6 sm:p-8 md:p-10">
        <div className="space-y-4 text-sm sm:text-base text-[#091626]/85 leading-relaxed font-sans max-w-3xl mx-auto">
          {post.content.map((para, i) => (
            <React.Fragment key={i}>
              <p className="leading-relaxed">{para}</p>
              {post.inlineGalleryIndex === i &&
                post.galleryImages &&
                post.galleryImages.length > 0 && (
                  <div className="py-4 my-2 border-y border-neutral-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#091626]">
                        <Images className="w-4 h-4 text-[#CD9A29]" />
                        <span>Property & Experience Photo Highlights</span>
                      </div>
                      <span className="text-xs text-[#091626]/50">
                        {post.galleryImages.length} photos · Click to enlarge
                      </span>
                    </div>
                    {renderGallery(
                      post.galleryImages,
                      post.galleryImages.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4',
                    )}
                  </div>
                )}
            </React.Fragment>
          ))}
        </div>

        {/* Gallery if not inline */}
        {post.inlineGalleryIndex === undefined &&
          post.galleryImages &&
          post.galleryImages.length > 0 && (
            <div className="pt-6 border-t border-neutral-100 space-y-3 max-w-3xl mx-auto mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#091626]">
                  <Images className="w-4 h-4 text-[#CD9A29]" />
                  <span>Property Photo Highlights</span>
                </div>
                <span className="text-xs text-[#091626]/50">
                  {post.galleryImages.length} photos · Click to enlarge
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setEnlargedImage(imgUrl)}
                    className="group/img relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100 border border-[#242E51]/10 cursor-pointer shadow-xs hover:shadow-md transition"
                  >
                    <img
                      src={imgUrl}
                      alt={`${post.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#091626] text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                        <Maximize2 className="w-3.5 h-3.5 text-[#CD9A29]" />
                        <span>Enlarge Photo</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Tags */}
        <div className="pt-6 border-t border-neutral-100 flex flex-wrap gap-2 mt-6 max-w-3xl mx-auto">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sentiero-dots text-[#242E51] text-xs font-medium border border-[#242E51]/10"
            >
              <Tag className="w-3 h-3 text-[#CD9A29]" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl bg-[#242E51] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#CD9A29]/30">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B233F] items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#CD9A29]" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-bold font-display">
              Experience this hospitality at Sentiero
            </h4>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              Just 2 minutes from Sam Mbakwe Airport with 24/7 power. Book directly with zero upfront deposit.
            </p>
          </div>
        </div>
        <button
          onClick={onBookNow}
          className="px-6 py-3 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 whitespace-nowrap shrink-0"
        >
          Book Your Suite Now
        </button>
      </div>

      {/* Back to blog */}
      <div className="text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#242E51]/20 text-[#242E51] text-xs font-bold hover:border-[#CD9A29] hover:text-[#091626] transition"
        >
          <BookOpen className="w-4 h-4 text-[#CD9A29]" />
          Read More Stories
        </button>
      </div>

      {/* Enlarged Image Lightbox */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
              title="Close image"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};