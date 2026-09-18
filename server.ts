import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { BLOG_POSTS } from './src/data/blogData';
import { SENTIERO_INFO } from './src/data/hotelData';
import {
  escapeHtml,
  blogPostAbsoluteUrl,
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
} from './src/utils/blogSeo';

const isProduction = process.env.NODE_ENV === 'production';

// Strict Content-Security-Policy for production. Dev mode stays relaxed so Vite
// HMR (inline scripts + WebSocket) keeps working locally.
function buildCsp(): string {
  if (!isProduction) {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      `img-src 'self' data: blob: https://i.ibb.co https://images.unsplash.com https://maps.gstatic.com https://maps.googleapis.com https://maps.google.com`,
      `connect-src 'self' ws: wss: https://formspree.io https://*.googleapis.com https://maps.gstatic.com https://maps.google.com`,
      'frame-src https://maps.google.com https://www.google.com',
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io https://wa.me",
    ].join('; ');
  }
  return [
    "default-src 'self'",
    'script-src \'self\' https://maps.googleapis.com https://maps.gstatic.com',
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    `img-src 'self' data: blob: https://i.ibb.co https://images.unsplash.com https://maps.gstatic.com https://maps.googleapis.com https://maps.google.com`,
    `connect-src 'self' https://formspree.io https://*.googleapis.com https://maps.gstatic.com https://maps.google.com`,
    'frame-src https://maps.google.com https://www.google.com',
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formspree.io https://wa.me",
  ].join('; ');
}

function setSecurityHeaders(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.setHeader('Content-Security-Policy', buildCsp());
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(self), camera=(), microphone=(), payment=(), usb=()');
  if (isProduction) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  res.setHeader('X-XSS-Protection', '0');
  next();
}

// Minimal in-memory rate limiter for the health endpoint.
function healthRateLimit() {
  const windowMs = 60_000;
  const maxRequests = 120;
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const bucket = hits.get(ip);
    if (!bucket || bucket.resetAt < now) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }
    bucket.count += 1;
    if (bucket.count > maxRequests) {
      res.status(429).json({ status: 'rate_limited', error: 'Too many requests' });
      return;
    }
    next();
  };
}

// Build a semantic article body (crawlers that don't run JS still see full content).
function renderBlogArticleHtml(post: (typeof BLOG_POSTS)[number]): string {
  const gallery = post.galleryImages ?? [];
  const parts: string[] = [];

  parts.push('<article>');
  parts.push(
    `<header><p class="category">${escapeHtml(post.category)}</p>` +
      `<h1>${escapeHtml(post.title)}</h1>` +
      `<p class="meta">Written by ${escapeHtml(post.author)} · ${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</p></header>`,
  );
  parts.push(
    `<div class="cover"><img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.title)}" loading="lazy" /></div>`,
  );

  post.content.forEach((para, i) => {
    parts.push(`<p>${escapeHtml(para)}</p>`);
    if (post.inlineGalleryIndex === i && gallery.length > 0) {
      parts.push('<div class="gallery">');
      gallery.forEach((url, idx) => {
        parts.push(
          `<img src="${escapeHtml(url)}" alt="${escapeHtml(post.title)} photo ${idx + 1}" loading="lazy" />`,
        );
      });
      parts.push('</div>');
    }
  });

  if (post.inlineGalleryIndex === undefined && gallery.length > 0) {
    parts.push('<div class="gallery">');
    gallery.forEach((url, idx) => {
      parts.push(
        `<img src="${escapeHtml(url)}" alt="${escapeHtml(post.title)} photo ${idx + 1}" loading="lazy" />`,
      );
    });
    parts.push('</div>');
  }

  if (post.tags.length > 0) {
    parts.push(`<p class="tags">Tags: ${post.tags.map((t) => escapeHtml(t)).join(', ')}</p>`);
  }
  parts.push('</article>');

  return parts.join('\n');
}

// Minimal inline styles so a non-JS crawler still reads a clean page.
function renderBlogPostPage(template: string, post: (typeof BLOG_POSTS)[number]): string {
  const canonical = blogPostAbsoluteUrl(post.slug);
  const sdJson = JSON.stringify([buildBlogPostingJsonLd(post), buildBreadcrumbJsonLd(post)]);

  const headInject =
    `<title>${escapeHtml(post.title)} | Sentiero Hotels &amp; Suites Blog</title>\n` +
    `<meta name="description" content="${escapeHtml(post.excerpt)}" />\n` +
    `<link rel="canonical" href="${escapeHtml(canonical)}" />\n` +
    `<meta name="robots" content="index, follow, max-image-preview:large" />\n` +
    `<meta property="og:type" content="article" />\n` +
    `<meta property="og:site_name" content="Sentiero Hotels &amp; Suites" />\n` +
    `<meta property="og:title" content="${escapeHtml(post.title)}" />\n` +
    `<meta property="og:description" content="${escapeHtml(post.excerpt)}" />\n` +
    `<meta property="og:url" content="${escapeHtml(canonical)}" />\n` +
    `<meta property="og:image" content="${escapeHtml(post.coverImage)}" />\n` +
    `<meta property="og:image:alt" content="${escapeHtml(post.title)}" />\n` +
    `<meta property="article:published_time" content="${post.dateISO}T00:00:00+01:00" />\n` +
    `<meta name="twitter:card" content="summary_large_image" />\n` +
    `<meta name="twitter:title" content="${escapeHtml(post.title)}" />\n` +
    `<meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />\n` +
    `<meta name="twitter:image" content="${escapeHtml(post.coverImage)}" />\n` +
    `<meta name="twitter:url" content="${escapeHtml(canonical)}" />\n` +
    `<script type="application/ld+json">${sdJson}</script>`;

  const rootInject = `<div id="root">${renderBlogArticleHtml(post)}</div>`;

  // The static index.html already includes the SPA bundle; a real browser mounts
  // React over the pre-rendered article. Crawlers that skip JS still read content.
  return template
    .replace('<title>Sentiero Hotels &amp; Suites | Nearest Hotel to Sam Mbakwe Imo Airport, Owerri</title>', headInject)
    .replace('<div id="root"></div>', rootInject);
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.disable('x-powered-by');
  app.use(setSecurityHeaders);
  app.use(express.json({ limit: '10kb' }));

  // API Health check
  app.get('/api/health', healthRateLimit(), (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware for development
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexTemplate = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');

    // Prerender individual blog posts with full article HTML + SEO head for crawlers.
    app.get('/blog/:slug', (req, res) => {
      const slug = decodeURIComponent(req.params.slug);
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (!post) {
        return res.send(indexTemplate);
      }
      res.send(renderBlogPostPage(indexTemplate, post));
    });

    app.use(
      express.static(distPath, {
        setHeaders: (res) => {
          res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        },
      }),
    );
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sentiero Server running on port ${PORT}`);
  });
}

startServer();