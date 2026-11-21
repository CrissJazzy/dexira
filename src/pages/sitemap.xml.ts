import type { APIRoute } from 'astro';
import { getAllArticles } from '../data/articles';
import { getCategories, getArticlesByCategory } from '../data/categories';

interface Entry {
  path: string;
  lastmod?: string;
}

const ALWAYS_INDEXABLE = ['/about/', '/contact/', '/privacy/', '/terms/'];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const isIsoDate = (value: unknown): value is string =>
  typeof value === 'string' && /^\\d{4}-\\d{2}-\\d{2}$/.test(value);

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('sitemap.xml: "site" is not set in astro.config.mjs.');
  }

  const entries = new Map<string, Entry>();
  const add = (path: string, lastmod?: string) => {
    const normalised = path.endsWith('/') ? path : `${path}/`;
    if (!entries.has(normalised)) {
      entries.set(normalised, { path: normalised, ...(isIsoDate(lastmod) ? { lastmod } : {}) });
    }
  };

  for (const path of ALWAYS_INDEXABLE) add(path);

  const articles = await getAllArticles();
  if (articles.length > 0) {
    add('/');
    add('/articles/');

    for (const article of articles) {
      add(`/articles/${article.slug}/`, article.updatedAt ?? article.publishedAt);
    }

    for (const category of await getCategories()) {
      const categoryArticles = await getArticlesByCategory(category.slug);
      if (categoryArticles.length > 0) add(`/category/${category.slug}/`);
    }
  }

  const urls = [...entries.values()]
    .sort((a, b) => a.path.localeCompare(b.path))
    .map(({ path, lastmod }) => {
      const loc = escapeXml(new URL(path, site).href);
      return `  <url>\\n    <loc>${loc}</loc>${lastmod ? `\\n    <lastmod>${lastmod}</lastmod>` : ''}\\n  </url>`;
    })
    .join('\\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n${urls}\\n</urlset>\\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
