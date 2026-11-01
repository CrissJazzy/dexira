import { categories } from './site';

/**
 * Editorial copy for category pages, keyed by category slug.
 *
 * Category names and slugs live ONLY in site.ts. This file adds the descriptive
 * text and never redefines a category. The checks at the bottom fail the build if
 * a category has no copy or if a key here is not a real category slug.
 *
 * WordPress mapping (later): description <- term.description, slug <- term.slug.
 */
export interface CategoryContent {
  /** One or two sentences. Used as the page lead and the meta description. */
  description: string;
  /** Optional longer paragraph shown under the lead. */
  intro?: string;
}

export const categoryContent: Record<string, CategoryContent> = {
  technology: {
    description:
      'Clear reporting on the tools, platforms and infrastructure changing how we work, travel, pay and communicate.',
    intro:
      'We explain what a technology does, who it affects and what it means in practice, without the hype.',
  },
  'artificial-intelligence': {
    description:
      'Plain-language coverage of artificial intelligence: how it works, where it helps, and where human judgement still matters.',
    intro:
      'From language models to research tools, we look at real uses and real limits.',
  },
  cybersecurity: {
    description:
      'Practical security coverage for people and organisations: threats, defences and the habits that keep data safe.',
    intro:
      'Most security failures start with simple gaps. We focus on the foundations worth getting right first.',
  },
  science: {
    description:
      'Discoveries, methods and evidence explained carefully, so readers can judge scientific claims for themselves.',
    intro:
      'We cover what researchers have found, how they know it, and what remains uncertain.',
  },
  business: {
    description:
      'Grounded analysis of strategy, pricing, resilience and growth for founders, operators and curious readers.',
    intro:
      'We favour principles that last over tactics that expire.',
  },
  education: {
    description:
      'How people learn and how teaching is changing, from digital classrooms to study habits backed by evidence.',
    intro:
      'We look at what works for learners and teachers, and what does not.',
  },
  lifestyle: {
    description:
      'Thoughtful writing on work, attention and daily life, for readers who want depth over noise.',
    intro:
      'Ideas for living and working more deliberately.',
  },
};

// Build-time consistency checks against the single source of truth (site.ts).
{
  const slugs = new Set(categories.map((c) => c.slug));
  for (const c of categories) {
    if (!categoryContent[c.slug]) {
      throw new Error(`category-content.ts is missing copy for category "${c.slug}"`);
    }
  }
  for (const key of Object.keys(categoryContent)) {
    if (!slugs.has(key)) {
      throw new Error(`category-content.ts has copy for unknown category slug "${key}"`);
    }
  }
}
