# Academic Website Template

A fast, accessible personal website for researchers, built with Next.js and Tailwind CSS. It ships as a static site (no server needed) and deploys to GitHub Pages.

**Features**

- One content file (`content.js`) for identity, bio, social links, CV entries, publications, and job market info — the only file you need to edit to make the site your own.
- A data-driven Research page — add a paper by adding one object; it renders into the right section with title link, co-authors, citation, abstract toggle, and resource links (PDF, Code, …).
- System-aware light/dark mode, plus swappable color palettes (a Material 3 default and a legacy Material 2 set) defined in one place.
- SEO-ready: per-page metadata, JSON-LD structured data for papers, sitemap, and `robots.txt`.
- Optional temporary Job Market page (gated by a single boolean toggle).
- Static export for free hosting on GitHub Pages.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Fork the repo, then edit `content.js` with your own content and rebuild.

## What to edit

**All personal content lives in `content.js`.** Fork it, replace the values, and rebuild — no other file needs to be touched for normal use.

| Section | What it controls |
| --- | --- |
| `site` | Name, URL, author, locale, description, keywords, license. |
| `profile` | Role, affiliation, employer, research fields, and the About Me bio. |
| `socialLinks` | Email and social profiles in the sidebar/footer. |
| `papers` | Publications and working papers (see below). |
| `cv` | Education and experience entries rendered on the CV page. |
| `assets` | Profile image and CV file paths (files live in `public/`). |
| `jobMarket` | Job Market page content and toggle (see below). |

`site.settings.js` holds template-level configuration (navigation, page metadata, color palettes, shared Tailwind class strings) that applies to any user of the template. It imports `content.js` and shouldn't normally need editing — colors and layout changes go there, content changes go in `content.js`.

The site font is set in `src/app/font.js` (Next.js requires `next/font` options to be literal values, so it cannot be moved to config).

### About Me bio

`profile.bio` is an array of paragraphs. Each paragraph is either a plain string or an array of segments:

```js
bio: [
  // Plain string paragraph:
  'First paragraph text.',

  // Paragraph with inline links and bold:
  [
    'Some text with a ',
    { text: 'link', href: 'https://example.com' },
    ' and ',
    { text: 'bold text', bold: true },
    '.',
  ],
],
```

### CV entries

`cv.education` and `cv.experience` are arrays of entries. Required fields: `date`, `title`, `institution`. Optional: `dateNote` (rendered below the date, e.g. `'(expected)'`), `note` (a secondary line).

```js
{ date: '2027', dateNote: '(expected)', title: 'PhD in Economics', institution: 'University of Minnesota' },
```

### Adding a paper

Add an object to the `papers` array. Only `slug`, `section`, `title`, `authors`, and `abstract` are required:

```js
{
  slug: 'my-paper-slug',          // unique; used as the anchor id on the Research page
  section: 'workingPapers',       // must match a key in pages.research.sections (site.settings.js)
  title: 'My Paper Title',
  authors: ['Your Name', 'Co Author'],
  coauthorLinks: { 'Co Author': 'https://coauthor.example' },
  abstract: 'Full abstract text…',

  // Optional:
  doiUrl: 'https://doi.org/…',    // published link (title links here first)
  pdf: '/papers/my-paper.pdf',    // title links here if no doiUrl; also shown as a resource link
  code: 'https://doi.org/…',      // adds a "Code" link
  links: [{ label: 'Slides', href: '…' }],
  venue: 'Journal Name',
  citation: 'Vol. 1, 2026.',
  note: 'Draft available soon',   // small status line
  keywords: ['topic', 'topic'],

  // To surface it in the Featured panel on the Research page:
  featured: true,
  highlightLabel: 'Job market paper',
  summary: 'One-line summary for the featured card.',
  featuredNote: '2026',           // optional date/note beside the venue
}
```

Sections and their order come from `pages.research.sections` in `site.settings.js`. The title links to the DOI, else the PDF, else the first entry in `links`; plain text if none are present.

### Job Market page

The Job Market page is a temporary hub for the hiring season. It is gated by a single boolean at the top of `content.js`:

```js
const jobMarketActive = true   // set to false to hide the page and its navbar link
```

Setting it to `false` returns a 404 for the route and removes the navbar link — no other changes needed. Content (pitch, JMP slug, PDF paths, references, placement URL) lives in the `jobMarket` block, with `institution` on each reference accepting a string or an array of strings.

### Colors and palettes

Each palette in `theme.palettes` (`site.settings.js`) defines the same set of tokens (`primary-*` for light mode, `dark-*` for dark mode). These become CSS custom properties consumed by Tailwind, so changing a color is a one-line edit in one file.

- **Light/dark mode** follows the OS by default and can be toggled in the navbar.
- **Palette** is chosen with `theme.palette` (e.g. `'m3'` or `'m2'`). To add your own, add a palette object with the same tokens and point `theme.palette` at it. Individual browsers can override it at runtime via `localStorage.setItem('palette', 'm2')`.

### Assets

Put your profile photo and PDFs in `public/` and reference them in `assets` (for the profile image and CV PDF) and in each paper's `pdf` field.

## Build and deploy

```bash
npm run build        # production build + static export to out/ + sitemap
npm run deploy       # publishes out/ to GitHub Pages via gh-pages
```

`output: 'export'` in `next.config.*` produces a fully static site. For a user/organization GitHub Pages site (`username.github.io`), no base-path config is needed. For a project page served from a subpath, set `basePath` in `next.config.*` accordingly.

## Project structure

```
content.js                 # all user-specific content — edit this to personalize the site
site.settings.js           # template config (theme, navigation, page metadata, styles)
next-sitemap.config.js     # sitemap + robots generation
src/app/
  layout.js                 # HTML shell, metadata, palette CSS injection
  page.js                    # homepage (renders from profile.bio)
  research/page.js           # Research page (renders from papers)
  cv/page.js                 # CV page (renders from cv.education / cv.experience)
  job-market/page.js         # Job Market page (gated by jobMarketActive)
  globals.css                # base styles, focus ring, anchor-flash animation
  font.js                    # site font (edit here to change typeface)
  settings.js                # re-exports settings + builds palette CSS variables
  components/                # navbar, footer, theme toggle, paper helpers, …
public/                     # profile image, PDFs, robots.txt, sitemap
```

## License

Code is provided as a template you can adapt. Replace the content, profile image, and license to suit your own site.
