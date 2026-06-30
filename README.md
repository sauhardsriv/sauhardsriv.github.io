# Academic Website Template

A fast, accessible personal website for researchers, built with Next.js and Tailwind CSS. It ships as a static site (no server needed), deploys to GitHub Pages, and is configured almost entirely from a single file.

**Features**

- One config file (`site.settings.js`) for identity, navigation, social links, publications, colors, and styles.
- A data-driven Research page — add a paper by adding one object; it renders into the right section with title link, co-authors, citation, abstract toggle, and resource links (PDF, Code, …).
- System-aware light/dark mode, plus swappable color palettes (a Material 3 default and a legacy Material 2 set) defined in one place.
- SEO-ready: per-page metadata, JSON-LD structured data for papers, sitemap, and `robots.txt`.
- Static export for free hosting on GitHub Pages.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Fork the repo, then work through the configuration below and replace the content with your own.

## Configuration

Almost everything lives in **`site.settings.js`**:

| Section | What it controls |
| --- | --- |
| `site` | Name, URL, author, description, keywords, license. |
| `navigation` | Navbar links. |
| `pages` | Per-route title/description/keywords; the Research page's section list. |
| `socialLinks` | Email and social profiles in the sidebar/footer. |
| `profile` | Role, affiliation, employer, research fields. |
| `papers` | Your publications and working papers (see below). |
| `assets` | Profile image and CV file paths (files live in `public/`). |
| `theme.palettes` | All color values, per palette. **The only place colors are defined.** |
| `styles` | Shared Tailwind class strings used across the site. |

Prose pages are edited in their route files: the homepage intro in `src/app/page.js`, and the CV in `src/app/cv/page.js`. The site font is set in `src/app/font.js` (Next.js requires `next/font` options to be literal values, so change them there).

### Adding a paper

Add an object to the `papers` array in `site.settings.js`. Only `slug`, `section`, `title`, `authors`, and `abstract` are required:

```js
{
  slug: 'my-paper-slug',          // unique; used as the anchor id
  section: 'workingPapers',       // must match a key in pages.research.sections
  title: 'My Paper Title',
  authors: ['Your Name', 'Co Author'],
  coauthorLinks: { 'Co Author': 'https://coauthor.example' },
  abstract: 'Full abstract text…',

  // Optional:
  doiUrl: 'https://doi.org/…',    // published link (title links here first)
  pdf: '/papers/my-paper.pdf',    // else the title links to the PDF; if both, PDF shows as a resource
  code: 'https://doi.org/…',      // adds a "Code" link by the abstract
  links: [{ label: 'Slides', href: '…' }],
  venue: 'Journal Name',          // shown with `citation`
  citation: 'Vol. 1, 2026.',
  note: 'Draft available soon',   // small status line
  keywords: ['topic', 'topic'],

  // To surface it in the Featured panel:
  featured: true,
  highlightLabel: 'Job market paper',
  summary: 'One-line summary for the featured card.',
  featuredNote: '2026',           // optional date/note beside the venue
}
```

Sections and their order/headings come from `pages.research.sections`. The title links to the DOI, else the PDF, else the first entry in `links`; if none are present it renders as plain text.

### Colors and palettes

Each palette in `theme.palettes` defines the same set of tokens (`primary-*` for light mode, `dark-*` for dark mode). These are turned into CSS variables and consumed by Tailwind, so changing a color is a one-line edit in one file.

- **Light/dark mode** is automatic (follows the OS) and toggled in the navbar; handled by `next-themes`.
- **Palette** is chosen with `theme.palette` (e.g. `'m3'` or `'m2'`). To add your own, add a palette object with the same tokens and point `theme.palette` at it. It can also be overridden per-browser at runtime via `localStorage.setItem('palette', 'm2')`.

### Assets

Put your profile photo and PDFs in `public/` and reference them in `assets` and in each paper's `pdf`. The profile image path defaults to `/profile.png`.

## Build and deploy

```bash
npm run build        # production build + static export to out/ + sitemap
npm run deploy       # publishes out/ to GitHub Pages via gh-pages
```

`output: 'export'` (in `next.config.*`) produces a fully static site. For a user/organization GitHub Pages site, no extra base-path config is needed; for a project page served from a subpath, set `basePath` accordingly.

## Project structure

```
site.settings.js          # all configuration: identity, papers, palettes, styles
next-sitemap.config.js     # sitemap + robots generation
src/app/
  layout.js                # HTML shell, metadata, palette CSS injection
  page.js                  # homepage
  research/page.js          # Research page (renders from `papers`)
  cv/page.js                # CV
  globals.css               # base styles, focus ring, anchor-flash animation
  font.js                   # site font
  settings.js               # re-exports settings + builds palette CSS
  components/                # navbar, footer, theme toggle, paper helpers, …
public/                     # profile image, PDFs, robots, sitemap
```

## License

Code is provided as a template you can adapt. Replace the content, the profile image, and the license to suit your own site.
