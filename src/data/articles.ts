import { categories } from './site';
import type { Author, ContentBlock } from './content-types';

export type { Author, ContentBlock } from './content-types';

export interface BaseArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  trending: boolean;
  editorPick: boolean;
}

export interface Article extends BaseArticle {
  subtitle: string;
  author: Author;
  updatedAt?: string;
  imageCaption?: string;
  related: string[];
  body: ContentBlock[];
  contentHtml?: string;
}

interface WpTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface WpAuthor {
  name?: string;
  slug?: string;
}

interface WpMedia {
  source_url?: string;
  alt_text?: string;
  caption?: { rendered?: string };
}

interface WpPost {
  id: number;
  slug: string;
  status: string;
  date?: string;
  modified?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  categories?: number[];
  _embedded?: {
    author?: WpAuthor[];
    'wp:featuredmedia'?: WpMedia[];
  };
}

const WORDPRESS_API = 'https://dexira-editor.site.je/wp-json/wp/v2';
const PER_PAGE = 100;
const FALLBACK_IMAGES: Record<string, { image: string; imageAlt: string }> = {
  technology: {
    image: '/images/placeholders/technology.svg',
    imageAlt: 'Abstract illustration of glowing circuit traces on a navy background',
  },
  'artificial-intelligence': {
    image: '/images/placeholders/artificial-intelligence.svg',
    imageAlt: 'Abstract illustration of a network of connected nodes',
  },
  cybersecurity: {
    image: '/images/placeholders/cybersecurity.svg',
    imageAlt: 'Abstract illustration of a shield with a keyhole',
  },
  science: {
    image: '/images/placeholders/science.svg',
    imageAlt: 'Abstract illustration of a laboratory flask with rising bubbles',
  },
  business: {
    image: '/images/placeholders/business.svg',
    imageAlt: 'Abstract illustration of a rising bar chart',
  },
  education: {
    image: '/images/placeholders/education.svg',
    imageAlt: 'Abstract illustration of an open book',
  },
  lifestyle: {
    image: '/images/placeholders/lifestyle.svg',
    imageAlt: 'Abstract illustration of a sun above calm waves',
  },
};

const decodeEntities = (value: string): string =>
  value
    .replace(/&#(\d+);/g, (_match, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_match, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp|rsquo|lsquo|rdquo|ldquo|ndash|mdash|hellip);/gi, (match, entity: string) => {
      const entities: Record<string, string> = {
        amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
        rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
        ndash: '–', mdash: '—', hellip: '…',
      };
      return entities[entity.toLowerCase()] ?? match;
    });

const plainText = (html: string): string =>
  decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );

const dateOnly = (value?: string): string => {
  if (!value || !/^\d{4}-\\d{2}-\\d{2}/.test(value)) {
    throw new Error(`WordPress returned an invalid publication date: ${String(value)}`);
  }
  return value.slice(0, 10);
};

async function fetchJson<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
      signal: AbortSignal.timeout(20000),
    });
  } catch (error) {
    throw new Error(
      `Could not reach the DEXIRA WordPress API at ${url}. Check that WordPress hosting is online. Original error: ${String(error)}`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `DEXIRA WordPress API returned HTTP ${response.status} for ${url}. The Astro build has stopped so the site does not silently publish an empty article list.`,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error(`DEXIRA WordPress API did not return valid JSON for ${url}.`);
  }
}

async function fetchPublishedPosts(): Promise<WpPost[]> {
  const allPosts: WpPost[] = [];

  for (let page = 1; page <= 20; page += 1) {
    const url = `${WORDPRESS_API}/posts?status=publish&_embed=1&per_page=${PER_PAGE}&page=${page}`;
    const posts = await fetchJson<WpPost[]>(url);
    allPosts.push(...posts);

    if (posts.length < PER_PAGE) return allPosts;
  }

  throw new Error(
    'DEXIRA has more than 2,000 published WordPress posts. Increase the pagination limit in src/data/articles.ts.',
  );
}

function mapPost(post: WpPost, termsById: Map<number, WpTerm>): Article {
  const matchedTerm = (post.categories ?? [])
    .map((id) => termsById.get(id))
    .find((term) => term?.taxonomy === 'category' && categories.some((category) => category.slug === term.slug));

  if (!matchedTerm) {
    throw new Error(
      `WordPress article "${post.slug}" is not assigned to one of DEXIRA's seven configured categories. Assign it to Technology, Artificial Intelligence, Cybersecurity, Science, Business, Education or Lifestyle, then rebuild.`,
    );
  }

  const category = categories.find((item) => item.slug === matchedTerm.slug)!;
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const wpAuthor = post._embedded?.author?.[0];
  const title = plainText(post.title?.rendered ?? '');
  const excerptText = plainText(post.excerpt?.rendered ?? '');
  const contentHtml = post.content?.rendered ?? '';
  const bodyText = plainText(contentHtml);
  const excerpt = excerptText || bodyText.slice(0, 240);
  const words = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0;
  const publishedAt = dateOnly(post.date);
  const updatedDate = post.modified ? dateOnly(post.modified) : publishedAt;
  const image = media?.source_url || FALLBACK_IMAGES[category.slug].image;
  const imageAlt = media?.alt_text?.trim() || (media?.source_url ? title : FALLBACK_IMAGES[category.slug].imageAlt);
  const imageCaption = plainText(media?.caption?.rendered ?? '');
  const authorName = wpAuthor?.name?.trim() || 'DEXIRA Editorial';

  if (!post.slug || !title || !contentHtml.trim()) {
    throw new Error(`WordPress article ID ${post.id} is missing a slug, title or body content.`);
  }

  return {
    id: `wp-${post.id}`,
    slug: post.slug,
    title,
    excerpt,
    category: category.name,
    categorySlug: category.slug,
    image,
    imageAlt,
    publishedAt,
    readingTime: Math.max(1, Math.ceil(words / 220)),
    featured: false,
    trending: false,
    editorPick: false,
    subtitle: excerpt,
    author: {
      name: authorName,
      slug: wpAuthor?.slug || 'dexira-editorial',
      type: authorName === 'DEXIRA Editorial' ? 'Organization' : 'Person',
    },
    ...(updatedDate !== publishedAt ? { updatedAt: updatedDate } : {}),
    ...(imageCaption ? { imageCaption } : {}),
    related: [],
    body: [],
    contentHtml,
  };
}

let articlesPromise: Promise<Article[]> | undefined;

async function loadWordPressArticles(): Promise<Article[]> {
  if (!articlesPromise) {
    articlesPromise = (async () => {
      const [posts, terms] = await Promise.all([
        fetchPublishedPosts(),
        fetchJson<WpTerm[]>(`${WORDPRESS_API}/categories?per_page=100`),
      ]);

      const termsById = new Map(terms.map((term) => [term.id, term]));
      const mapped = posts.map((post) => mapPost(post, termsById));
      const slugs = new Set<string>();

      for (const article of mapped) {
        if (slugs.has(article.slug)) {
          throw new Error(`WordPress returned duplicate article slug "${article.slug}".`);
        }
        slugs.add(article.slug);
      }

      return mapped.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    })().catch((error) => {
      articlesPromise = undefined;
      throw error;
    });
  }

  return articlesPromise;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  return (await loadWordPressArticles()).find((article) => article.featured);
}

export async function getTrendingArticles(limit = 3): Promise<Article[]> {
  return (await loadWordPressArticles())
    .filter((article) => article.trending && !article.featured)
    .slice(0, limit);
}

export async function getEditorPicks(limit = 3): Promise<Article[]> {
  return (await loadWordPressArticles())
    .filter((article) => article.editorPick && !article.featured && !article.trending)
    .slice(0, limit);
}

export async function getLatestArticles(limit = 6): Promise<Article[]> {
  return (await loadWordPressArticles()).slice(0, limit);
}

export async function getAllArticles(): Promise<Article[]> {
  return [...(await loadWordPressArticles())];
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return (await loadWordPressArticles()).find((article) => article.slug === slug);
}

export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  const all = await loadWordPressArticles();
  const candidates = all.filter(
    (candidate) => candidate.slug !== article.slug && candidate.categorySlug === article.categorySlug,
  );
  const sameCategory = candidates.slice(0, limit);
  if (sameCategory.length >= limit) return sameCategory;

  const used = new Set([article.slug, ...sameCategory.map((item) => item.slug)]);
  const others = all.filter((item) => !used.has(item.slug));
  return [...sameCategory, ...others].slice(0, limit);
}

export async function getAdjacentArticles(
  article: Article,
): Promise<{ previous?: Article; next?: Article }> {
  const sorted = await loadWordPressArticles();
  const index = sorted.findIndex((item) => item.slug === article.slug);
  return {
    previous: index >= 0 ? sorted[index + 1] : undefined,
    next: index > 0 ? sorted[index - 1] : undefined,
  };
}
