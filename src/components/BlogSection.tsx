import React, { useState, useMemo } from 'react';
import {
  Clock,
  User,
  Tag,
  ArrowRight,
  Search,
  BookOpen,
  Sparkles,
  Images,
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { sanitizeText } from '../utils/sanitize';
import { blogPostUrl } from '../utils/blogSeo';

interface BlogSectionProps {
  onBookNow: () => void;
  onOpenPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onBookNow, onOpenPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    BLOG_POSTS.forEach((p) => cats.add(p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'all' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  return (
    <div className="py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Blog Hero Header */}
      <div className="rounded-3xl bg-[#242E51] text-white p-6 sm:p-10 border border-[#CD9A29]/30 relative overflow-hidden shadow-xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#CD9A29]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B233F] text-[#CD9A29] text-xs font-bold border border-[#CD9A29]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sentiero Stories & Journal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Insights, Luxury Guides & Hospitality Stories
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Discover life at Sentiero Hotels & Suites—from executive boardroom amenities
            and poolside relaxation to culinary secrets and Sam Mbakwe Airport transit guides.
          </p>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-full whitespace-nowrap font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-[#242E51] text-white shadow-xs'
                  : 'bg-white text-[#091626]/70 border border-[#242E51]/15 hover:border-[#CD9A29] hover:text-[#091626]'
              }`}
            >
              {cat === 'all' ? 'All Stories' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#242E51]/50" />
          <input
            type="text"
            placeholder="Search articles & guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(sanitizeText(e.target.value, 80))}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[#242E51]/20 bg-white text-[#091626] focus:outline-none focus:ring-2 focus:ring-[#CD9A29]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#091626]/40 hover:text-[#091626]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Featured Story (Shown if viewing 'all' and no active search) */}
      {selectedCategory === 'all' && !searchQuery && featuredPost && (
        <a
          href={blogPostUrl(featuredPost.slug)}
          onClick={(e) => {
            e.preventDefault();
            onOpenPost(featuredPost);
          }}
          className="block group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#242E51]/15 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto relative overflow-hidden bg-neutral-100">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#CD9A29] shadow-md">
                Featured Highlight
              </span>
              {featuredPost.galleryImages && featuredPost.galleryImages.length > 0 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-black/60 backdrop-blur-xs flex items-center gap-1">
                  <Images className="w-3.5 h-3.5 text-[#CD9A29]" />
                  <span>{featuredPost.galleryImages.length + 1} Photos</span>
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#091626]/60">
                <span className="px-2.5 py-0.5 rounded-md bg-[#242E51]/10 text-[#242E51] font-bold">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#CD9A29]" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#091626] font-display group-hover:text-[#242E51] transition">
                {featuredPost.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#091626]/70 line-clamp-3 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#091626]/70">
                <User className="w-3.5 h-3.5 text-[#CD9A29]" />
                <span className="font-medium">Written by {featuredPost.author}</span>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#CD9A29] group-hover:translate-x-1 transition">
                Read Story <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </a>
      )}

      {/* Stories Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#091626] font-display">
            {searchQuery
              ? `Results for "${searchQuery}" (${filteredPosts.length})`
              : selectedCategory === 'all'
              ? 'All Articles & Stories'
              : `${selectedCategory} (${filteredPosts.length})`}
          </h3>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#242E51]/15 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-[#242E51]/40 mx-auto" />
            <p className="text-sm text-[#091626]/80 font-medium">
              No stories match your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#242E51] text-white text-xs font-bold hover:bg-[#1B233F]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <a
                key={post.id}
                href={blogPostUrl(post.slug)}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPost(post);
                }}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#242E51]/15 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="h-48 relative overflow-hidden bg-neutral-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#242E51] bg-white/95 shadow-xs">
                      {post.category}
                    </span>
                    {post.galleryImages && post.galleryImages.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs flex items-center gap-1">
                        <Images className="w-3 h-3 text-[#CD9A29]" />
                        <span>{post.galleryImages.length + 1} Photos</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-[#091626]/50">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#CD9A29]" />
                        {post.readTime}
                      </span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>

                    <h4 className="font-bold text-base text-[#091626] group-hover:text-[#242E51] transition line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-xs text-[#091626]/70 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#091626]/70 truncate max-w-[150px]">
                      Written by {post.author}
                    </span>
                    <span className="text-xs font-bold text-[#CD9A29] flex items-center gap-1 group-hover:translate-x-0.5 transition">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Book CTA Banner */}
      <div className="rounded-3xl bg-[#242E51] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#CD9A29]/30">
        <div>
          <h4 className="text-lg sm:text-xl font-bold font-display">
            Ready to Experience Sentiero in Person?
          </h4>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Book directly online with zero upfront deposit. Pay comfortably at check-in.
          </p>
        </div>
        <button
          onClick={onBookNow}
          className="px-6 py-3 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 whitespace-nowrap"
        >
          Book Your Suite Now
        </button>
      </div>
    </div>
  );
};