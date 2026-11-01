import { categories } from './site';
import { categoryContent } from './category-content';
import { getAllArticles } from './articles';
import type { Article } from './articles';

/**
 * Category data access (Phase 4).
 *
 * site.ts remains the source of truth for names and slugs. Articles are matched
 * by categorySlug, never by display name. Async on purpose: when WordPress is
 * connected, swap these bodies for REST calls (/wp/v2/categories, and
 * /wp/v2/posts?categories=<id>). Pages only depend on the shapes below.
 */
export interface Category {
  name: string;
  slug: string;
  description: string;
  intro?: string;
  /** WordPress term ID. Unused until the CMS is connected. */
  wpId?: number;
}

export async function getCategories(): Promise<Category[]> {
  return categories.map((c) => ({ ...c, ...categoryContent[c.slug] }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return (await getCategories()).find((c) => c.slug === slug);
}

// getAllArticles() already returns newest first, so the existing order is preserved.
export async function getArticlesByCategory(slug: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.categorySlug === slug);
}

// Editor-flagged featured story if the category has one, otherwise the newest.
export function pickCategoryFeatured(articles: Article[]): Article | undefined {
  return articles.find((a) => a.featured) ?? articles[0];
}
