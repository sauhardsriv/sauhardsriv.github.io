# Academic Website Template

A static academic website built with Next.js and Tailwind CSS. It provides a Material 3 theme with light and dark modes, a home page, a research page, a CV page, an optional job-market page, and search-engine and AI-assistant metadata generated from a single content file. The site exports to static HTML and can be hosted on GitHub Pages or any static host.

## Architecture

Personal content is kept separate from the template:

- `content.js` holds everything specific to one person: identity, biography, links, papers, CV entries, asset paths, feature switches, and optional text overrides.
- `public/` holds that person's images and documents, referenced from `content.js`.
- `site.settings.js` holds the template: navigation, page metadata derivation, default interface text, theme tokens, and shared styles.
- `src/app/` holds the routes and components. They read data only through `src/app/settings.js`.

Personalizing the site requires changes only to `content.js` and `public/`. Theme or layout changes belong in `site.settings.js` and `src/app/font.js`.

## Using this template

If you start from a repository that already hosts someone's site, its `content.js` and `public/` contain that person's content. Replace them rather than reusing them:

1. Fork or clone the repository.
2. Replace every value in `content.js` with your own. Set `site.url` to your site's address, and replace or remove `site.verification`.
3. Delete the files in `public/` (images, papers, CV, and any `google*.html` verification file), add your own, and reference them from `content.js`. `robots.txt` and `sitemap.xml` are regenerated on every build.
4. Choose the optional features you want (see [Options at a glance](#options-at-a-glance)).
5. Run `npm install`, then `npm run dev` to preview and `npm run build` to check the static export.
6. Publish as described under [Publishing](#publishing).

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

The development site is available at `http://localhost:3000`.

## Options at a glance

Every option lives in `content.js`. Omitted optional fields fall back to the defaults shown.

| Option | Default | Effect |
| --- | --- | --- |
| `jobMarketActive` (constant at the top of the file) | — | Shows or hides the Job Market page and all job-market UI. |
| `features.paperPages` | `false` | Builds a page per paper at `/research/<slug>` with Google Scholar metadata. |
| `features.citations` | `false` | Adds a **Cite** action to each paper that copies a BibTeX entry. |
| `site.crawlers.aiTraining` | allowed | `false` asks AI-training crawlers not to use the site, while search engines and AI assistants can still read and cite it. |
| `site.verification` | none | Search-console verification tokens. |
| `site.license` | — | Content license shown in the footer. |
| `assets.socialImage` | `profileImage` | Image used for link previews. |
| `assets.icon`, `assets.appleIcon` | none | Favicon and home-screen icon. No icon is emitted when omitted. |
| `jobMarket.fields` | none | Interests line on the Job Market page. |
| `jobMarket.contact` | none | Contact Me section on the Job Market page. |
| paper `date` | none | Publication or version date; feeds structured data, Google Scholar tags, citations, and the Job Market "Last updated" line. |
| paper `slides`, `code`, `links` | none | Additional resource links for a paper. |
| paper `bibtex` | generated | Exact BibTeX entry for the Cite action. |
| `pages`, `labels` | template text | Override any heading, section title, or interface label. |

## Content reference

**Minimum content.** A working site needs `site` (`name`, `url`, `author`, `description`), `profile.title`, `assets.profileImage` and `profileImageAlt`, and `jobMarket: { active: jobMarketActive }`. Everything else is optional: empty sections, papers without resources, and missing social links, CV entries, or a dark-mode photo are handled without placeholders.

### Site identity

```js
site: {
  name: 'Researcher Name',
  url: 'https://username.github.io',
  author: 'Researcher Name',
  language: 'en',
  locale: 'en_US',
  description: 'Academic profile and research description.',
  keywords: ['research field', 'research topic'],
  license: {
    label: 'CC BY 4.0',
    url: 'https://creativecommons.org/licenses/by/4.0/',
  },
  verification: {
    google: 'verification-token',
  },
  crawlers: {
    aiTraining: false,
  },
}
```

`verification` is optional; Next.js renders supported values as metadata, so provider-specific HTML files are not required.

`crawlers` is optional. With `aiTraining: false`, known AI-training crawlers (such as GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, and CCBot) are disallowed in `robots.txt`, and the `User-agent: *` group carries `Content-Signal: search=yes, ai-input=yes, ai-train=no`. Search engines and the agents that AI assistants use to retrieve and cite pages remain allowed. When `crawlers` is omitted, all crawlers are allowed. `robots.txt` is advisory: compliant crawlers honor it.

### Profile and biography

```js
profile: {
  title: 'PhD candidate in Field',
  affiliation: 'University Name',
  affiliationUrl: 'https://example.edu/department',
  employer: 'Employer Name',
  employerUrl: 'https://example.org',
  jobMarket: '2026-2027 academic job market',
  fields: ['Field one', 'Field two'],
  bio: [
    'A paragraph containing plain text.',
    [
      'A paragraph with an ',
      { text: 'external link', href: 'https://example.edu' },
      ' and ',
      { text: 'bold statement', bold: true },
      '.',
    ],
  ],
}
```

`fields` are not displayed; they feed page descriptions, keywords, structured data, and `llms.txt`. `jobMarket` is used in job-market metadata. Each `bio` entry is a string or an array of text segments.

### Social links

Supported types are `email`, `linkedin`, `github`, and `x`. Email addresses are split into `emailUser` and `emailDomain` and assembled in the browser, so they never appear in the page source.

```js
socialLinks: [
  { type: 'email', label: 'Email', emailUser: 'name', emailDomain: 'example.edu' },
  { type: 'github', label: 'GitHub', href: 'https://github.com/username' },
]
```

Profile links are rendered in the static HTML with `rel="me"` so search engines can associate them with the site. Adding another type requires an icon in `src/app/components/SocialIcons.js`.

### Features

```js
features: {
  paperPages: false,
  citations: false,
},
```

**Paper pages.** When `paperPages` is `true`, each paper has its own page at `/research/<slug>`, linked from its title on the Research page and listed in the sitemap; `/research#<slug>` anchors continue to work. A paper page shows the authors, citation, resources, abstract, and keywords, and carries Google Scholar citation tags (`citation_title`, `citation_author`, `citation_publication_date`, `citation_journal_title`, `citation_doi`, `citation_pdf_url`, `citation_abstract_html_url`), `ScholarlyArticle` and breadcrumb structured data, and article Open Graph metadata. `citation_pdf_url` is emitted only for PDFs hosted on the site, as Google Scholar requires. When `false`, titles are plain text, no paper pages are built, and structured data and `llms.txt` reference each paper by its `/research#<slug>` anchor. The page template is `src/app/research/[slug]/page.paper.js`; `next.config.js` registers the `paper.js` page extension only when the option is on, so the route is excluded from the build otherwise.

**Citations.** When `citations` is `true`, each paper's actions include **Cite**, which copies a BibTeX entry to the clipboard. Entries are generated at build time: publications become `@article` entries (journal, year, month, volume, number, and pages read from `citation` strings such as "Vol. 16 No. 1, pp. 41-73", and DOI); other papers become `@unpublished` entries noted as working papers, with a link to the PDF. Supply `bibtex` on a paper to use an exact entry instead.

### Research papers

A paper requires `slug`, `section`, `title`, `authors`, and `abstract`. List `authors` in published order; the order is used for citations and structured data.

```js
{
  slug: 'paper-slug',
  section: 'workingPapers',
  title: 'Paper Title',
  authors: ['Coauthor Name', 'Researcher Name'],
  abstract: 'Abstract text.',

  // Optional publication and resource data
  date: '2026-08',
  coauthorLinks: { 'Coauthor Name': 'https://example.edu/coauthor' },
  venue: 'Journal Name',
  citation: 'Vol. 1, No. 1, pp. 1-20, August 2026.',
  doi: '10.0000/example',
  doiUrl: 'https://doi.org/10.0000/example',
  pdf: '/papers/paper.pdf',
  slides: '/papers/paper-slides.pdf',
  code: 'https://github.com/username/project',
  links: [{ label: 'Appendix', href: '/papers/appendix.pdf' }],
  note: 'Status note',
  keywords: ['topic', 'method'],
  bibtex: '@article{...}',

  // Optional Research-page tag
  tag: 'New',
  // tag: { label: 'Job Market Paper', jobMarketOnly: true },

  // Optional Featured panel content
  featured: true,
  highlightLabel: 'Featured paper',
  summary: 'Short summary for the Featured panel.',
  featuredNote: '2026',

  // Optional preview image, shown on the Job Market page for the job market paper
  featuredImage: '/papers/paper-preview.webp',
  featuredImageAlt: 'Description of the preview image',
}
```

`section` must match a key in `pages.research.sections` (`workingPapers` and `publications` by default). `date` is the publication or version date as `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`.

Paper actions render in this order: `Journal` (publications with a `doiUrl`), `PDF`, `Slides`, `Code`, custom links, `Cite` (when enabled), and `Abstract`. Missing resources are omitted. `pdf` and `slides` accept files under `public/` or external URLs.

A string `tag` is always visible. An object with `jobMarketOnly: true` is visible only while the Job Market page is active.

### Curriculum vitae

```js
cv: {
  education: [
    { date: '2027', dateNote: '(expected)', title: 'Degree', institution: 'University Name' },
  ],
  experience: [
    { date: '2023–present', title: 'Position', institution: 'Organization', note: 'Optional secondary line' },
  ],
}
```

`date`, `title`, and `institution` are required; `dateNote` and `note` are optional. Education institutions also appear as `alumniOf` in structured data. The CV page links `assets.cvPdf` from a download button.

### Assets

Store images and documents under `public/` and reference them with root-relative paths:

```js
assets: {
  profileImage: '/profile.webp',
  profileImageDark: '/profile-dark.webp',
  profileImageAlt: 'Researcher profile photograph',
  profileImageSizes: '(max-width: 768px) 144px, 192px',
  socialImage: '/profile-social.jpg',
  icon: '/icon.png',
  appleIcon: '/apple-icon.png',
  cvPdf: '/cv/researcher-name-cv.pdf',
}
```

Static export serves images without resizing, so prepare them at display size. The profile frame is at most 192 CSS pixels wide; a 384 × 384 WebP covers high-density screens. `socialImage` is used for link previews (Open Graph and X cards); a JPEG or PNG of about 600 × 600 pixels is widely supported. `icon` is the favicon shown in browser tabs and search results; Google requires a square image whose size is a multiple of 48 pixels. `appleIcon` (180 × 180) defaults to `icon`.

Use lowercase, URL-safe file names without spaces.

### Job Market page

The page and all job-market UI are controlled by one constant at the top of `content.js`:

```js
const jobMarketActive = true
```

Setting it to `false` removes the navigation item, renders a `noindex` not-found response at `/job-market`, omits the route from the sitemap, hides the home-page notice, and hides paper tags marked `jobMarketOnly`.

| Field | Purpose |
| --- | --- |
| `active` | Set from `jobMarketActive`. |
| `homeStatus` | Bold status sentence shown after the home-page biography. |
| `homeLink.text`, `homeLink.label` | Text and linked label for the home-page notice. |
| `pitch` | Overview text. |
| `fields` | Fields as listed on the job-market CV, shown as an "Interests" line in the Overview section. Independent of `profile.fields`. |
| `contact` | `{ emailUser, emailDomain }` for the Contact Me section at the bottom of the page, followed by the profile links from `socialLinks`. The address is assembled in the browser and never appears in the page source, structured data, or `llms.txt`. |
| `jmpSlug` | Slug of the paper presented as the job market paper. |
| `jmpPdf` | Optional PDF override; the paper's `pdf` is used when omitted. |
| `cvPdf`, `cvDescription` | Job-market CV file and accompanying text. |
| `references` | Reference records with `name`, `institution` (string or array), and optional `url` or `linkLabel`. |
| `placementUrl`, `placementLabel`, `placementDescription` | Placement section content. |

The job market paper section shows "Last updated" with the paper's `date` (for example, `date: '2026-10-05'` renders "October 5, 2026"); update it with each new version. If the paper has `slides`, a **View slides** button appears beside the download button. Sections without content are omitted.

### Page text and labels

Headings, section titles, and interface labels have defaults in `site.settings.js` (`pages` and `labels`). Override any of them from `content.js`:

```js
pages: {
  home: { heading: 'About' },
  jobMarket: { fieldsLabel: 'Fields', contactTitle: 'Contact' },
  research: {
    sections: [
      { key: 'publications', title: 'Publications' },
      { key: 'workingPapers', title: 'Working Papers' },
    ],
  },
},
labels: {
  coauthorsPrefix: 'Joint with',
  paperActions: { code: 'Replication files' },
},
```

Overrides merge one level deep: an object such as `pages.jobMarket` keeps every default it does not replace, while an array such as `pages.research.sections` is replaced as a whole. Navigation labels use each page's `title`.

## Search engines and AI assistants

- **Metadata.** Every page sets its own title, description, canonical URL, and Open Graph and X card metadata. The root layout sets no canonical or Open Graph URL, so pages without their own (such as the not-found page) never point at another page. The not-found page and a disabled Job Market page are marked `noindex`.
- **Structured data.** `src/app/structuredData.js` builds JSON-LD: one `Person` record (affiliation, employer, schools, research fields, and profile links) shared by every page, plus `ProfilePage`, `CollectionPage`, `ScholarlyArticle`, and `BreadcrumbList` records as appropriate.
- **Sitemap and robots.** The post-build step generates `sitemap.xml` and `robots.txt` from `site.url`; do not edit them manually. The sitemap lists every page (including paper pages when enabled) and every PDF under `public/` with its file modification date.
- **`llms.txt`.** `/llms.txt` is generated at build time from `content.js` (`src/app/llms.txt/route.js`) in the llmstxt.org format: a summary of the person, the main pages, and each paper's link, PDF, slides, DOI, venue, and abstract. Email addresses are never included.
- **Privacy.** Email addresses never appear in the static HTML; they are assembled in the browser.

## Theme

`site.settings.js` defines Material 3 color roles for light and dark modes, generated as a Tonal Spot scheme from a source color. Components use role names rather than color values, so a palette can be replaced without editing pages. The active palette is selected by `theme.palette`; additional palettes must provide the same tokens.

Interactive components follow Material 3: small square-shaped buttons (`styles.buttons.filled` for the main action, `styles.buttons.outlined` for secondary actions) with state layers, standard icon buttons for the theme toggle and social links, and a small surface-colored FAB for returning to the top. Motion uses the Material 3 easing curves (`ease-m3`, `ease-m3-decelerate`, and `ease-m3-accelerate` in `tailwind.config.js`), and smooth scrolling is disabled when the visitor prefers reduced motion. Interface icons are Material Symbols (outlined, weight 400), inlined as SVG by `src/app/components/MaterialSymbol.js`; add a symbol by copying its path from the Material Symbols repository into that file.

Typography is configured in `src/app/font.js`: Newsreader for display and heading roles, and IBM Plex Sans for body text, metadata, and controls. Next.js requires font configuration to be statically analyzable, so fonts are defined outside `content.js`.

## Publishing

```bash
npm run build
```

This creates the static export in `out/` and regenerates `sitemap.xml` and `robots.txt`.

To publish to GitHub Pages through the `gh-pages` branch:

```bash
npm run deploy
```

The deploy script builds the site, adds `out/.nojekyll`, copies the generated search files into the export, and pushes `out/` to the `gh-pages` branch. For a user or organization site (`username.github.io`), the default empty `basePath` is correct; a project site served below a path needs matching `basePath` and `assetPrefix` values in `next.config.js`.

After the first deployment, submit `https://<your-site>/sitemap.xml` in Google Search Console.

## Project structure

```text
content.js                          Personal content, feature switches, and asset references
site.settings.js                    Template settings, default text, metadata, theme, and styles
next.config.js                      Static export and optional paper-page route
next-sitemap.config.js              Sitemap and robots.txt generation
tailwind.config.js                  Color roles and Material 3 easing
src/app/
  layout.js                         Document shell and global metadata
  page.js                           Home page
  research/page.js                  Research page
  research/[slug]/page.paper.js     Optional per-paper pages (features.paperPages)
  cv/page.js                        CV page
  job-market/page.js                Optional Job Market page
  not-found.js                      Not-found page
  llms.txt/route.js                 Generated llms.txt
  structuredData.js                 JSON-LD builders
  papers.js                         Paper URLs, dates, actions, and BibTeX
  settings.js                       Settings exports and palette variables
  font.js                           Font configuration
  globals.css                       Global styles and interaction states
  components/                       Shared interface components
public/                             Images and documents
out/                                Generated static export
```

## License

The template source code (`src/`, `site.settings.js`, configuration files, and scripts) is released under the [MIT License](LICENSE).

The personal content in `content.js` and the documents and images in `public/` belong to the site's author and are not covered by the MIT License. The site's content license is set by `site.license` in `content.js`.
