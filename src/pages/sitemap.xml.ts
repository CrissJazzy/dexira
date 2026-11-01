import type { APIRoute } from 'astro';
import { PLACEHOLDER_CONTENT, getAllArticles } from '../data/articles';
import { getCategories, getArticlesByCategory } from '../data/categories';

/**
 * XML sitemap, generated at build time.
 *
 * Rule: a URL is listed only if the page itself is indexable. The pages' own robots
 * directives are driven by the same PLACEHOLDER_CONTENT flag (src/data/articles.ts), so
 * this file reuses that flag instead of keeping a second status switch.
 *
 *  - Always indexable (no robots tag): about, contact, privacy, terms.
 *  - Indexable only when PLACEHOLDER_CONTENT is false: the homepage, /articles/, every
 *    article, and every category that has at least one article.
 *  - Never listed: /search/ (noindex, follow), /404.html (noindex), and anything else not
 *    named here. Pages are not discovered from dist/.
 *
 * lastmod is only written when real data exists (an article's updatedAt or publishedAt).
 * Static pages have no reliable modified date, so theirs is omitted.
 */

interface Entry {
  path: string; // site-relative, always with a trailing slash
  lastmod?: string; // YYYY-MM-DD
}

// Static pages that are indexable regardless of placeholder status. Keep in step with
// pages that carry no noindex tag. Adding a new indexable static page means adding it here.
const ALWAYS_INDEXABLE = ['/about/', '/contact/', '/privacy/', '/terms/'];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const isIsoDate = (value: unknown): value is string =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('sitemap.xml: "site" is not set in astro.config.mjs.');
  }

  const entries = new Map<string, Entry>(); // keyed by path, so duplicates cannot occur
  const add = (path: string, lastmod?: string) => {
    const normalised = path.endsWith('/') ? path : `${path}/`;
    if (!entries.has(normalised)) {
      entries.set(normalised, { path: normalised, ...(isIsoDate(lastmod) ? { lastmod } : {}) });
    }
  };

  for (const path of ALWAYS_INDEXABLE) add(path);

  if (!PLACEHOLDER_CONTENT) {
    add('/');
    add('/articles/');

    for (const article of await getAllArticles()) {
      add(`/articles/${article.slug}/`, article.updatedAt ?? article.publishedAt);
    }

    // Empty categories are skipped: they are thin pages with nothing to index.
    for (const category of await getCategories()) {
      const articles = await getArticlesByCategory(category.slug);
      if (articles.length > 0) add(`/category/${category.slug}/`);
    }
  }

  const urls = [...entries.values()]
    .sort((a, b) => a.path.localeCompare(b.path))
    .map(({ path, lastmod }) => {
      const loc = escapeXml(new URL(path, site).href);
      return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
