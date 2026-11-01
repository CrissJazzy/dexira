/**
 * Structured article content. Presentation lives in components/ArticleBody.astro.
 *
 * WordPress mapping (roadmap Phase "WordPress integration"):
 *   - title            <- title.rendered
 *   - excerpt          <- excerpt.rendered (plain text)
 *   - body / contentHtml <- content.rendered (HTML; render with contentHtml)
 *   - author           <- _embedded.author[0]
 *   - image/imageAlt/imageCaption <- _embedded['wp:featuredmedia'][0]
 *   - category         <- _embedded['wp:term'][0][0]
 *   - publishedAt / updatedAt <- date / modified
 */
export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string };

export interface Author {
  name: string;
  slug: string;
  type: 'Person' | 'Organization';
  bio?: string;
}

/** Editorial fields stored per article, merged into the full Article in articles.ts. */
export interface ArticleContent {
  subtitle: string;
  updatedAt?: string; // ISO date, only when the article has been revised
  related: string[]; // slugs of related articles
  body: ContentBlock[];
}
