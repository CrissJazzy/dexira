# DEXIRA

**Knowledge. Innovation. Perspective.**

DEXIRA is an independent digital publication that aims to deliver useful information, insight, analysis and perspective. It is built as a static website with [Astro](https://astro.build) and is designed for static hosting on Netlify.

This repository contains the frontend only. Article content is currently **placeholder content** (see [Placeholder content warning](#placeholder-content-warning)).

## Contents

- [Project status at a glance](#project-status-at-a-glance)
- [Content categories](#content-categories)
- [Technology stack](#technology-stack)
- [Development environment](#development-environment)
- [Node.js version requirements](#nodejs-version-requirements)
- [Installation](#installation)
- [Local development](#local-development)
- [Production build](#production-build)
- [Preview the production build](#preview-the-production-build)
- [Project structure](#project-structure)
- [Netlify deployment configuration](#netlify-deployment-configuration)
- [Environment variables and SITE_URL](#environment-variables-and-site_url)
- [SEO and indexing behaviour](#seo-and-indexing-behaviour)
- [Placeholder content warning](#placeholder-content-warning)
- [Newsletter and contact form status](#newsletter-and-contact-form-status)
- [Contact form (Netlify Forms)](#contact-form-netlify-forms)
- [Future WordPress integration](#future-wordpress-integration)
- [Critical technical note: the satteri override](#critical-technical-note-the-satteri-override)
- [Working rules](#working-rules)

## Project status at a glance

| Area | Status |
| --- | --- |
| Frontend (pages, components, design system) | Implemented |
| Article content | Placeholder content only |
| Search | Implemented (runs in the browser, no backend) |
| Newsletter | Disabled until a real provider is configured |
| Contact form | Set up for Netlify Forms in the code. Not confirmed working until it has been deployed and a real test message has arrived (see [Contact form (Netlify Forms)](#contact-form-netlify-forms)). |
| WordPress integration | Not integrated (planned) |
| Analytics | Not configured |
| Advertising | Not configured |
| Custom domain | Not connected |
| Netlify deployment | Not confirmed by this repository. The site URL in the configuration is provisional. |

Nothing in this document should be read as saying that the site is live, that a service is connected, or that a domain exists.

## Content categories

Category names and slugs are defined in one place, `src/data/site.ts`.

- Technology (`technology`)
- Artificial Intelligence (`artificial-intelligence`)
- Cybersecurity (`cybersecurity`)
- Science (`science`)
- Business (`business`)
- Education (`education`)
- Lifestyle (`lifestyle`)

## Technology stack

- **Framework:** Astro (`astro@^7.4.4`), static output.
- **Typography:** Inter Variable for the interface and Source Serif 4 Variable for editorial headlines, both through `@fontsource-variable` packages.
- **Styling:** plain CSS with design tokens (CSS variables) in `src/styles/global.css`, plus scoped styles inside components.
- **Language:** TypeScript for data and helpers (`strict` Astro TypeScript configuration).
- **Hosting target:** Netlify (static).
- **Planned CMS:** WordPress through its REST API (not yet integrated).

There are no runtime front-end frameworks. The only dependencies are Astro and the two font packages.

## Development environment

DEXIRA is developed primarily on an Android phone using Termux (Android ARM64). This environment is the reason for the `satteri` override described below, so please read that section before changing any dependency.

## Node.js version requirements

- `.nvmrc` pins **Node.js 24**. Netlify uses this file to choose the Node version for builds.
- `package.json` declares `"engines": { "node": ">=22.23.4" }` as the minimum supported version.
- Local development has been done with a newer Node.js release than 24 in Termux. If you hit a problem that only appears locally, compare against Node.js 24 first, because that is what the Netlify build uses.

## Installation

Run these from the project root (the folder that contains `package.json`).

```sh
npm install
```

Do not run `npm update`, `npm audit fix`, or install new packages without approval. See [the satteri override](#critical-technical-note-the-satteri-override).

## Local development

```sh
npm run dev
```

Astro prints the local address (by default `http://localhost:4321/`). Stop the server with `Ctrl + C`.

`AGENTS.md` also documents Astro's background mode (`astro dev --background`) for tools that need the server to keep running.

## Production build

```sh
npm run build
```

The generated site is written to `dist/`. The build uses directory output, so every page is `folder/index.html` and every page URL ends in a slash (for example `/about/`).

## Preview the production build

After a successful build:

```sh
npm run preview
```

This serves the contents of `dist/` locally so you can check the production output.

## Project structure

```text
dexira/
├── .nvmrc                    Node.js version for Netlify (24)
├── AGENTS.md                 Notes for AI coding tools
├── README.md                 This file
├── README.txt                Short pointer to this file
├── astro.config.mjs          Astro configuration (site URL, trailing slash, build format)
├── netlify.toml              Netlify build settings
├── package.json              Dependencies, scripts, and the satteri override
├── package-lock.json         Locked dependency tree
├── tsconfig.json
├── public/
│   ├── _headers              Netlify security and caching headers
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── og-default.png        Default social sharing image (1200x630)
│   └── images/placeholders/  Seven category illustrations (SVG)
└── src/
    ├── components/           Header, Footer, SEO, article and category components, etc.
    ├── data/
    │   ├── site.ts               Site name, tagline, description, categories
    │   ├── articles.ts           Article data, getters, PLACEHOLDER_CONTENT flag
    │   ├── article-content.ts    Placeholder article bodies
    │   ├── content-types.ts      Article content types and WordPress field mapping
    │   ├── categories.ts         Category data access
    │   ├── category-content.ts   Category descriptions and intro copy
    │   └── contact-config.ts     Contact form configuration (Netlify Forms switch, success page path)
    ├── layouts/
    │   └── Layout.astro      Base page layout
    ├── lib/
    │   └── search.ts         Search text helper
    ├── pages/
    │   ├── index.astro           Homepage
    │   ├── about.astro
    │   ├── contact.astro
    │   ├── contact/
    │   │   └── success.astro     Page shown after a message is submitted
    │   ├── privacy.astro
    │   ├── terms.astro
    │   ├── search.astro
    │   ├── 404.astro
    │   ├── articles/
    │   │   ├── index.astro       Articles index
    │   │   └── [slug].astro      Article pages
    │   ├── category/
    │   │   └── [slug].astro      Category pages
    │   ├── sitemap.xml.ts        XML sitemap (generated at build)
    │   └── robots.txt.ts         robots.txt (generated at build)
    └── styles/
        └── global.css        Design tokens and global styles
```

## Netlify deployment configuration

The repository already contains the Netlify settings:

- `netlify.toml` sets the build command to `npm run build` and the publish directory to `dist`. No base directory is set, so the repository root is used.
- `.nvmrc` selects Node.js 24.
- `public/_headers` is copied into `dist/` by the build. It sets security headers on all paths (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`), `Cache-Control: public, max-age=0, must-revalidate` for pages, and a one-year immutable cache for `/_astro/*` (fingerprinted CSS, JS and fonts).
- Environment variables are set in the Netlify dashboard, never in `netlify.toml`.

**Deployment status is not confirmed.** This repository has not been confirmed as deployed. Before relying on production behaviour, verify the following on a real Netlify build:

1. The build succeeds on Netlify's Linux x64 environment.
2. The response headers are applied as intended (for example, that `/_astro/*` files receive the immutable cache header and pages do not).

## Environment variables and SITE_URL

| Variable | Used by | Purpose |
| --- | --- | --- |
| `SITE_URL` | `astro.config.mjs` | The public base URL. Used for canonical URLs, Open Graph URLs, structured data, `sitemap.xml` and `robots.txt`. |
| `PUBLIC_NEWSLETTER_ACTION` | `Newsletter.astro`, `privacy.astro` | Form-post URL of a real newsletter provider. Enables the newsletter form. |

**SITE_URL.** If `SITE_URL` is not set, the configuration falls back to `https://dexira.netlify.app`. **This address is provisional.** It is a default in the configuration file, and this repository does not confirm that a Netlify site exists at that address. When the real address or a custom domain is known, set `SITE_URL` in the Netlify dashboard (for example `https://example.com`, with no trailing slash) and rebuild, so every canonical URL and sitemap entry uses it.

To build locally with a different base URL:

```sh
SITE_URL=https://example.com npm run build
```

**PUBLIC_NEWSLETTER_ACTION.** Values prefixed with `PUBLIC_` are included in the built site, so only use a public form-post URL. Never put secrets or credentials in these variables.

Local variables can go in a `.env` file, which is ignored by Git.

## SEO and indexing behaviour

SEO tags are produced by `src/components/SEO.astro` (title, description, canonical URL, Open Graph and Twitter tags). Article and category pages also output JSON-LD structured data.

Indexing is controlled by the single flag `PLACEHOLDER_CONTENT` in `src/data/articles.ts`.

| Page | While `PLACEHOLDER_CONTENT = true` | When `false` |
| --- | --- | --- |
| Homepage | `noindex, nofollow` | Indexable |
| Articles index (`/articles/`) | `noindex, follow` | Indexable |
| Article pages | `noindex, nofollow` | Indexable |
| Category pages | `noindex, nofollow` | Indexable |
| Search (`/search/`) | `noindex, follow` | Same (always `noindex, follow`) |
| 404 page | `noindex, nofollow` | Same (always `noindex, nofollow`) |
| About, Contact, Privacy, Terms | Indexable | Indexable |
| Contact success page (`/contact/success/`) | `noindex, nofollow` | Same (always `noindex, nofollow`) |

**Sitemap.** `/sitemap.xml` lists only pages that are indexable. While the flag is `true` it lists About, Contact, Privacy and Terms. When the flag is `false` it also lists the homepage, the articles index, every article, and every category that has at least one article. If you add a new indexable static page, add it to `ALWAYS_INDEXABLE` in `src/pages/sitemap.xml.ts`.

**robots.txt.** `/robots.txt` allows all crawling and points to the sitemap. Nothing is disallowed on purpose: crawlers must be able to fetch a page to read its `noindex` tag.

## Placeholder content warning

**All current articles are placeholder content.** They are sample text, written to build and test the design, and use a placeholder author ("DEXIRA Editorial") and placeholder illustrations. They are not real editorial work.

- Do not set `PLACEHOLDER_CONTENT` to `false` until real editorial content has replaced the placeholders. Doing so makes the homepage, articles and categories indexable and adds them to the sitemap.
- Pages that show placeholder content also display a visible "development preview" notice. These notices disappear when the flag is `false`.
- The placeholder author and image captions are defined in `src/data/articles.ts` and must be replaced when real authors and images exist.

## Newsletter and contact form status

The newsletter is intentionally **disabled**. Nothing is faked: no placeholder endpoints, no invented email addresses.

- **Newsletter.** The form stays disabled until `PUBLIC_NEWSLETTER_ACTION` is set to a real provider's form-post URL. The privacy policy changes its wording automatically when the variable is set.
- **Contact form.** The form on `/contact/` is set up for Netlify Forms (`netlifyForms: true` in `src/data/contact-config.ts`). It is **not confirmed working** until the site has been deployed to Netlify and a real test message has arrived in the Netlify dashboard. No public email address is shown until `email` in the same file is set to a real, monitored address.

## Contact form (Netlify Forms)

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/). There is no separate backend.

**How Netlify finds the form.** On every deploy Netlify reads the built HTML and registers any `<form>` marked `data-netlify="true"` that has a `name`. Here that is the form named `contact` in `dist/contact/index.html`. Netlify removes the `data-netlify` and `netlify-honeypot` attributes from the deployed page and adds its own hidden `form-name` field, so do not look for those attributes in the live page source; look for the form in the Netlify dashboard instead.

**Netlify dashboard (once, after the first deploy).**

1. In the site's **Forms** section of the Netlify dashboard, make sure **form detection is enabled** (menu names can differ slightly between dashboard versions). If you enable it now, trigger a new deploy.
2. Once the **contact** form appears there, add an **email notification** for it (in the form or Forms notification settings) to a real, monitored address. Without this, messages only appear in the dashboard.

**How the form behaves.**

- Fields: full name, email address, subject (a list of enquiry types) and message. Both name and message must contain more than spaces, and the message needs at least 10 characters.
- Spam: a hidden honeypot field (`bot-field`) plus Netlify's own spam filtering. Messages Netlify treats as spam appear under **Spam submissions**, not **Verified submissions**, so check both when testing.
- With JavaScript the message is sent in the background. If sending fails, an error appears on the page, the text stays in the form, and the success page is **not** shown. Without JavaScript the browser posts the form normally.
- On success the visitor is taken to `/contact/success/`. That page is `noindex` and is not in the sitemap. When opened directly it says that no message has been sent.
- The form never sends from `localhost` or a private network address. It says so instead of pretending, because Netlify only receives messages on a deployed site.

**Testing after deployment.** Deploy, open `/contact/` on the live site, submit a real message using a real email address and a few full sentences (obvious test text can be flagged as spam), and confirm you reach the success page and the message appears under **Forms** in the Netlify dashboard (and by email once notifications are set up). Also try an empty field and, if you like, turn off your network connection to confirm that an error appears instead of a success page.

**Limits.** Netlify limits how many submissions a site can receive depending on your plan. Check your own plan's current Forms limits in the Netlify dashboard. The privacy policy (`src/pages/privacy.astro`) names Netlify; if the form is ever moved to another provider, update it.

## Future WordPress integration

WordPress has **not** been integrated. The intended architecture is:

```text
WordPress (REST API)  →  Astro frontend (static build)  →  Netlify
```

WordPress would handle publishing and content management. Astro would fetch content from the WordPress REST API at build time and generate static pages, and Netlify would host the result.

The code is arranged to make this change contained:

- The data getters in `src/data/articles.ts` and `src/data/categories.ts` are the layer to replace with REST API calls (for example `/wp/v2/posts` and `/wp/v2/categories`). Pages and components depend on the article shape, not on where the data comes from.
- `src/data/content-types.ts` documents how WordPress fields map to the article fields.
- Real content must be in place before `PLACEHOLDER_CONTENT` is turned off.

## Critical technical note: the satteri override

`package.json` contains this block:

```json
"overrides": {
  "satteri": "0.11.6"
}
```

**This override is critical. Do not remove it, change it, or downgrade it.**

Astro's Markdown dependency (`satteri`) initially hit a native binding compatibility problem on Android ARM64 (Termux). Pinning `satteri` to `0.11.6` resolved it, and the lockfile records that version.

Rules:

- Do not edit `package.json` or `package-lock.json` casually.
- Do not run `npm update`, `npm audit fix`, or any command that rewrites the lockfile, without explicit approval.
- Do not add dependencies without approval.
- The lockfile includes the Linux x64 `satteri` bindings that Netlify would need, but this has not yet been proven by a Netlify build. See [Netlify deployment configuration](#netlify-deployment-configuration).

After any dependency-related change, confirm that the override is still present:

```sh
grep -A2 '"overrides"' package.json
```

## Working rules

- Preserve the established visual identity: a premium editorial look with white and light-grey backgrounds, navy and charcoal text, a blue accent and generous whitespace, mobile first.
- DEXIRA keeps its own independent identity. Do not connect its public pages to other businesses or to personal names or brands.
- Do not activate the newsletter or contact form with fake endpoints, and never commit credentials.
- Do not commit, push or deploy without explicit approval.
