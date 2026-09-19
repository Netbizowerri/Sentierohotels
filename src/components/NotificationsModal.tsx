import React from 'react';
import { X, Bell, ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { blogPostUrl } from '../utils/blogSeo';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPost?: (post: BlogPost) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose, onOpenPost }) => {
  if (!isOpen) return null;

  const latestPosts = BLOG_POSTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#CD9A29]/30 animate-in fade-in duration-200">
        <div className="p-4 bg-[#242E51] text-white flex items-center justify-between border-b border-[#303D6A]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#CD9A29]" />
            <h3 className="font-bold text-sm text-white">Latest Stories</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1B233F] text-white flex items-center justify-center hover:bg-[#2F3C69] transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-96 overflow-y-auto bg-sentiero-dots">
          {latestPosts.map((post) => (
            <a
              key={post.id}
              href={blogPostUrl(post.slug)}
              onClick={(e) => {
                e.preventDefault();
                if (onOpenPost) {
                  onOpenPost(post);
                }
                onClose();
              }}
              className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-[#CD9A29]/60 hover:shadow-md transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-xs text-[#091626] truncate">{post.title}</h5>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#CD9A29] shrink-0">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-neutral-400">
                  <span className="px-1.5 py-0.5 rounded-md bg-[#242E51]/10 text-[#242E51] font-bold">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-[#CD9A29]" />
                    {post.readTime}
                  </span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="p-3 border-t border-neutral-200 bg-white text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#242E51] hover:text-[#CD9A29] transition"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
