// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL can be overridden in Netlify.
export default defineConfig({
  site: process.env.SITE_URL || 'https://dexira.netlify.app',
  // Every page URL ends in a slash (/about/), matching the canonical URLs and internal links.
  trailingSlash: 'always',
  // One folder per page (about/index.html), the layout Netlify serves as /about/.
  build: { format: 'directory' },
});
