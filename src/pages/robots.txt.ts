import type { APIRoute } from 'astro';

/**
 * robots.txt, generated at build time from the configured site URL.
 *
 * Nothing is disallowed on purpose. Pages that must stay out of search results
 * (placeholder content, /search/, the 404 page) carry a robots meta tag, and crawlers can
 * only read that tag if they are allowed to fetch the page. Blocking them here would hide
 * the noindex instruction. The sitemap lists only indexable pages.
 */
export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('robots.txt: "site" is not set in astro.config.mjs.');
  }

  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
