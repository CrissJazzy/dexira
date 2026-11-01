import type { Article } from '../data/articles';

/**
 * Search helpers (Phase 5). Pure functions, no DOM access, so the same code runs
 * at build time (to prepare each article's searchable text) and in the browser
 * (to read the query and match it).
 *
 * They depend only on the Article shape, not on where articles come from, so
 * they keep working unchanged when articles are loaded from WordPress.
 */
export const MAX_QUERY_LENGTH = 100;

/** Lower-case, strip accents and punctuation, collapse whitespace. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’‘`]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

/** Text a visitor can search in for one article, already normalized. */
export function buildSearchText(article: Article): string {
  const headings = (article.body ?? [])
    .filter((b) => b.type === 'h2' || b.type === 'h3')
    .map((b) => ('text' in b ? b.text : ''));
  return normalize(
    [
      article.title,
      article.subtitle,
      article.excerpt,
      article.category,
      article.author?.name ?? '',
      ...headings,
    ].join(' '),
  );
}

/** Reads the q parameter from a location.search string. Returns '' when absent or blank. */
export function parseQuery(search: string): string {
  const q = new URLSearchParams(search).get('q') ?? '';
  return q.replace(/\s+/g, ' ').trim().slice(0, MAX_QUERY_LENGTH);
}

export function tokenize(query: string): string[] {
  const n = normalize(query.slice(0, MAX_QUERY_LENGTH));
  return n ? n.split(' ') : [];
}

/**
 * Every search word must match. Words of 3+ characters match anywhere in the
 * text (so "security" finds "cybersecurity"); shorter words must start a word.
 */
export function matchesAll(searchText: string, tokens: string[]): boolean {
  const padded = ` ${searchText}`;
  return tokens.every((t) => (t.length >= 3 ? searchText.includes(t) : padded.includes(` ${t}`)));
}

export function describeResults(count: number, query: string, total: number): string {
  if (!query) return `${total} ${total === 1 ? 'story' : 'stories'}`;
  if (count === 0) return `No results for \u201C${query}\u201D`;
  return `${count} ${count === 1 ? 'result' : 'results'} for \u201C${query}\u201D`;
}
