import { categories } from './site';
import { content } from './article-content';
import type { Author, ContentBlock } from './content-types';

export type { Author, ContentBlock } from './content-types';

/**
 * DEVELOPMENT PLACEHOLDER CONTENT
 * Everything below is placeholder copy awaiting real editorial content.
 * Set to false once real articles exist; the homepage notice then disappears.
 * In Phase 3 the getters at the bottom are replaced by WordPress REST calls.
 * Components only depend on the Article shape, not on where it comes from.
 */
export const PLACEHOLDER_CONTENT = true;

export interface BaseArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  image: string;
  imageAlt: string;
  publishedAt: string; // ISO date, YYYY-MM-DD
  readingTime: number; // minutes
  featured: boolean;
  trending: boolean;
  editorPick: boolean;
}

/** Full article as used by pages. Extra fields come from article-content.ts (or WordPress later). */
export interface Article extends BaseArticle {
  subtitle: string;
  author: Author;
  updatedAt?: string; // ISO date; only when revised
  imageCaption?: string;
  related: string[]; // slugs
  body: ContentBlock[]; // structured content
  contentHtml?: string; // raw HTML body (WordPress content.rendered); wins over body when set
}

// Local placeholder illustrations, one per category (see public/images/placeholders).
const art = (slug: string, alt: string) => ({
  image: `/images/placeholders/${slug}.svg`,
  imageAlt: alt,
});
const artwork = {
  technology: art('technology', 'Abstract illustration of glowing circuit traces on a navy background'),
  'artificial-intelligence': art('artificial-intelligence', 'Abstract illustration of a network of connected nodes'),
  cybersecurity: art('cybersecurity', 'Abstract illustration of a shield with a keyhole'),
  science: art('science', 'Abstract illustration of a laboratory flask with rising bubbles'),
  business: art('business', 'Abstract illustration of a rising bar chart'),
  education: art('education', 'Abstract illustration of an open book'),
  lifestyle: art('lifestyle', 'Abstract illustration of a sun above calm waves'),
};

const flags = { featured: false, trending: false, editorPick: false };

const baseArticles: BaseArticle[] = [
  {
    id: 'a-001',
    slug: 'how-ai-is-changing-the-way-scientists-work',
    title: 'How artificial intelligence is changing the way scientists work',
    excerpt:
      'From sorting vast datasets to suggesting new hypotheses, AI tools are becoming part of the research process. What do they add, and where does human judgement still matter most?',
    category: 'Artificial Intelligence',
    categorySlug: 'artificial-intelligence',
    ...artwork['artificial-intelligence'],
    publishedAt: '2026-10-28',
    readingTime: 8,
    ...flags,
    featured: true,
  },
  {
    id: 'a-002',
    slug: 'cybersecurity-basics-growing-businesses-overlook',
    title: 'The cybersecurity basics growing businesses often overlook',
    excerpt:
      'Most security failures start with simple gaps: weak access controls, unpatched software and unclear responsibilities. A practical look at the foundations worth getting right first.',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    ...artwork.cybersecurity,
    publishedAt: '2026-10-27',
    readingTime: 6,
    ...flags,
    trending: true,
  },
  {
    id: 'a-003',
    slug: 'what-digital-classrooms-get-right',
    title: 'What digital classrooms get right, and where they still fall short',
    excerpt:
      'Online tools can widen access to learning, but technology alone does not teach. A balanced look at what works, what does not, and why teachers remain central.',
    category: 'Education',
    categorySlug: 'education',
    ...artwork.education,
    publishedAt: '2026-10-25',
    readingTime: 7,
    ...flags,
    trending: true,
  },
  {
    id: 'a-004',
    slug: 'emerging-technologies-reshaping-everyday-life',
    title: 'Emerging technologies quietly reshaping everyday life',
    excerpt:
      'Some of the most significant changes arrive without announcement. A guide to the technologies already shifting how we work, travel, pay and communicate.',
    category: 'Technology',
    categorySlug: 'technology',
    ...artwork.technology,
    publishedAt: '2026-10-24',
    readingTime: 5,
    ...flags,
    trending: true,
  },
  {
    id: 'a-005',
    slug: 'why-scientific-uncertainty-is-a-strength',
    title: 'Why scientific uncertainty is a strength, not a weakness',
    excerpt:
      'Good science states what it does not yet know. Understanding uncertainty helps readers judge claims more clearly and trust the process of discovery.',
    category: 'Science',
    categorySlug: 'science',
    ...artwork.science,
    publishedAt: '2026-10-10',
    readingTime: 9,
    ...flags,
    editorPick: true,
  },
  {
    id: 'a-006',
    slug: 'the-case-for-slower-more-deliberate-work',
    title: 'The case for slower, more deliberate work',
    excerpt:
      'In a culture of constant speed, deliberate attention is becoming a rare advantage. Why depth beats volume, and how to protect time for it.',
    category: 'Lifestyle',
    categorySlug: 'lifestyle',
    ...artwork.lifestyle,
    publishedAt: '2026-10-05',
    readingTime: 6,
    ...flags,
    editorPick: true,
  },
  {
    id: 'a-007',
    slug: 'what-makes-a-small-business-resilient',
    title: 'What makes a small business resilient',
    excerpt:
      'Resilience is rarely about size. It comes from clear priorities, healthy cash habits and the ability to adapt. A framework for building a business that lasts.',
    category: 'Business',
    categorySlug: 'business',
    ...artwork.business,
    publishedAt: '2026-09-28',
    readingTime: 7,
    ...flags,
    editorPick: true,
  },
  {
    id: 'a-008',
    slug: 'understanding-the-cloud-where-your-data-lives',
    title: 'Understanding the cloud: where your data actually lives',
    excerpt:
      'The cloud is not a place so much as someone else’s computers. A plain explanation of what that means for storage, privacy and reliability.',
    category: 'Technology',
    categorySlug: 'technology',
    ...artwork.technology,
    publishedAt: '2026-10-30',
    readingTime: 5,
    ...flags,
  },
  {
    id: 'a-009',
    slug: 'plain-language-guide-to-large-language-models',
    title: 'A plain-language guide to how large language models work',
    excerpt:
      'Without the jargon: how these systems learn patterns from text, why they can be useful, and why they sometimes get things confidently wrong.',
    category: 'Artificial Intelligence',
    categorySlug: 'artificial-intelligence',
    ...artwork['artificial-intelligence'],
    publishedAt: '2026-10-29',
    readingTime: 8,
    ...flags,
  },
  {
    id: 'a-010',
    slug: 'passwords-passkeys-and-the-future-of-signing-in',
    title: 'Passwords, passkeys and the future of signing in',
    excerpt:
      'Passwords have long been the weakest link in online security. How passkeys work, what they fix, and what to do while the transition is under way.',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    ...artwork.cybersecurity,
    publishedAt: '2026-10-26',
    readingTime: 6,
    ...flags,
  },
  {
    id: 'a-011',
    slug: 'how-researchers-read-the-evidence-behind-a-headline',
    title: 'How researchers read the evidence behind a headline',
    excerpt:
      'Sample size, controls, replication: a short guide to the questions that separate a promising result from a settled finding.',
    category: 'Science',
    categorySlug: 'science',
    ...artwork.science,
    publishedAt: '2026-10-22',
    readingTime: 7,
    ...flags,
  },
  {
    id: 'a-012',
    slug: 'pricing-digital-products-principles-before-tactics',
    title: 'Pricing digital products: principles before tactics',
    excerpt:
      'Before discounts and tiers, there is value. A grounded approach to deciding what a digital product is worth and how to communicate it.',
    category: 'Business',
    categorySlug: 'business',
    ...artwork.business,
    publishedAt: '2026-10-21',
    readingTime: 6,
    ...flags,
  },
  {
    id: 'a-013',
    slug: 'learning-to-learn-habits-that-make-study-stick',
    title: 'Learning to learn: habits that make study stick',
    excerpt:
      'Re-reading feels productive but rarely is. Evidence-based study habits, from spaced practice to self-testing, and how to build them into a routine.',
    category: 'Education',
    categorySlug: 'education',
    ...artwork.education,
    publishedAt: '2026-10-20',
    readingTime: 6,
    ...flags,
  },
];

// Fail the build early if an article uses a category that does not exist in site.ts.
for (const a of baseArticles) {
  const match = categories.find((c) => c.slug === a.categorySlug);
  if (!match || match.name !== a.category) {
    throw new Error(`Article "${a.slug}" has an unknown or mismatched category: ${a.category} / ${a.categorySlug}`);
  }
}


// Development placeholder author. Not a real person; replace when real authors exist.
const placeholderAuthor: Author = {
  name: 'DEXIRA Editorial',
  slug: 'dexira-editorial',
  type: 'Organization',
};
const placeholderCaption = 'Development placeholder illustration. Real editorial imagery will replace it.';

// Merge editorial content into each article; fail the build on missing or inconsistent content.
const articles: Article[] = baseArticles.map((a) => {
  const c = content[a.slug];
  if (!c) throw new Error(`Missing article content for slug "${a.slug}" in article-content.ts`);
  return { ...a, author: placeholderAuthor, imageCaption: placeholderCaption, ...c };
});

{
  const slugs = new Set<string>();
  const ids = new Set<string>();
  for (const a of articles) {
    if (slugs.has(a.slug)) throw new Error(`Duplicate article slug: ${a.slug}`);
    if (ids.has(a.id)) throw new Error(`Duplicate article id: ${a.id}`);
    slugs.add(a.slug);
    ids.add(a.id);
  }
  for (const a of articles) {
    for (const r of a.related) {
      if (r === a.slug) throw new Error(`Article "${a.slug}" lists itself as related`);
      if (!slugs.has(r)) throw new Error(`Article "${a.slug}" has unknown related slug "${r}"`);
    }
  }
  for (const slug of Object.keys(content)) {
    if (!slugs.has(slug)) throw new Error(`article-content.ts has content for unknown slug "${slug}"`);
  }
}

const byDateDesc = (a: Article, b: Article) => b.publishedAt.localeCompare(a.publishedAt);

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

// Data access. Async on purpose: swap these bodies for WordPress REST calls in Phase 3.
export async function getFeaturedArticle(): Promise<Article | undefined> {
  return articles.find((a) => a.featured);
}

export async function getTrendingArticles(limit = 3): Promise<Article[]> {
  return articles.filter((a) => a.trending && !a.featured).slice(0, limit);
}

export async function getEditorPicks(limit = 3): Promise<Article[]> {
  return articles.filter((a) => a.editorPick && !a.featured && !a.trending).slice(0, limit);
}

// Latest excludes stories already shown elsewhere on the page, so nothing repeats.
export async function getLatestArticles(limit = 6): Promise<Article[]> {
  return articles
    .filter((a) => !a.featured && !a.trending && !a.editorPick)
    .sort(byDateDesc)
    .slice(0, limit);
}

// ---- Article page data (Phase 3) ----

export async function getAllArticles(): Promise<Article[]> {
  return [...articles].sort(byDateDesc);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return articles.find((a) => a.slug === slug);
}

// Explicit related picks first, then same-category stories, then the newest others.
export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const picked = article.related
    .map((s) => bySlug.get(s))
    .filter((a): a is Article => Boolean(a));
  const seen = new Set([article.slug, ...picked.map((a) => a.slug)]);
  const rest = [...articles].sort(byDateDesc).filter((a) => !seen.has(a.slug));
  const sameCategory = rest.filter((a) => a.categorySlug === article.categorySlug);
  const others = rest.filter((a) => a.categorySlug !== article.categorySlug);
  return [...picked, ...sameCategory, ...others].slice(0, limit);
}

// Chronological neighbours: "previous" is the next-older story, "next" the next-newer.
export async function getAdjacentArticles(
  article: Article,
): Promise<{ previous?: Article; next?: Article }> {
  const sorted = [...articles].sort(byDateDesc);
  const i = sorted.findIndex((a) => a.slug === article.slug);
  return {
    previous: i >= 0 ? sorted[i + 1] : undefined,
    next: i > 0 ? sorted[i - 1] : undefined,
  };
}
