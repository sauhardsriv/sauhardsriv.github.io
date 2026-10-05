# Academic Website Template

A static academic website built with Next.js and Tailwind CSS. The template provides an editorial Material 3 theme, responsive light and dark modes, structured research records, an optional job-market section, and metadata suitable for search engines and social previews.

## Architecture

Personal information is separated from template implementation:

- `content.js` contains identity, biography, links, research records, CV entries, asset paths, verification tokens, and job-market content.
- `site.settings.js` contains reusable navigation, metadata derivation, theme tokens, and shared presentation styles.
- `src/app/` contains route and component templates. Components consume data exported through `src/app/settings.js`.
- `public/` contains user-supplied images and documents referenced by `content.js`.

Normal personalization requires changes only to `content.js` and files under `public/`. Theme or layout changes belong in `site.settings.js` and `src/app/font.js`.

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

The development site is available at `http://localhost:3000`.

## Content configuration

### Site identity

The `site` object defines the canonical URL and global metadata:

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
    label: 'CC BY-NC 4.0',
    url: 'https://creativecommons.org/licenses/by-nc/4.0/',
  },
  verification: {
    google: 'verification-token',
  },
}
```

The `verification` object is optional. Next.js renders supported verification values as metadata, so provider-specific HTML files are not required.

### Profile and biography

The `profile` object defines the academic role, affiliations, research fields, and home-page biography. Each `bio` entry is either a string or an array of text segments:

```js
bio: [
  'A paragraph containing plain text.',
  [
    'A paragraph with an ',
    { text: 'external link', href: 'https://example.edu' },
    ' and ',
    { text: 'bold statement', bold: true },
    '.',
  ],
]
```

### Social links

Supported social-link types are `email`, `linkedin`, `github`, and `x`. Email addresses may be split into `emailUser` and `emailDomain` fields.

```js
socialLinks: [
  { type: 'email', label: 'Email', emailUser: 'name', emailDomain: 'example.edu' },
  { type: 'github', label: 'GitHub', href: 'https://github.com/username' },
]
```

### Research papers

A paper requires `slug`, `section`, `title`, `authors`, and `abstract`:

```js
{
  slug: 'paper-slug',
  section: 'workingPapers',
  title: 'Paper Title',
  authors: ['Researcher Name', 'Coauthor Name'],
  abstract: 'Abstract text.',

  // Optional publication and resource data
  coauthorLinks: { 'Coauthor Name': 'https://example.edu/coauthor' },
  doi: '10.0000/example',
  doiUrl: 'https://doi.org/10.0000/example',
  pdf: '/papers/paper.pdf',
  code: 'https://github.com/username/project',
  links: [{ label: 'Slides', href: '/papers/slides.pdf' }],
  venue: 'Journal Name',
  citation: 'Vol. 1, No. 1, 2026.',
  note: 'Status note',
  keywords: ['topic', 'method'],

  // Optional Research-page tag
  tag: 'New',
  // tag: { label: 'Job Market Paper', jobMarketOnly: true },

  // Optional Featured panel content
  featured: true,
  highlightLabel: 'Featured paper',
  summary: 'Short summary for the Featured panel.',
  featuredNote: '2026',

  // Optional media used by paper-feature layouts
  featuredImage: '/papers/paper-preview.png',
  featuredImageAlt: 'Description of the paper preview',
}
```

Paper titles in the Publications and Working Papers sections are plain text. Available actions render in this order: `Journal`, `PDF`, `Code`, custom links, and `Abstract`. The `Journal` action uses `doiUrl` for publications. Missing resources are omitted.

A string-valued `tag` is always visible. An object with `jobMarketOnly: true` is visible only while the Job Market page is active.

### Curriculum vitae

The `cv.education` and `cv.experience` arrays use the same entry structure:

```js
{
  date: '2027',
  dateNote: '(expected)',
  title: 'Degree or position',
  institution: 'Institution Name',
  note: 'Optional secondary line',
}
```

`date`, `title`, and `institution` are required. `dateNote` and `note` are optional.

### Assets

Store profile images and documents under `public/`, then reference them with root-relative paths:

```js
assets: {
  profileImage: '/profile.png',
  profileImageDark: '/profile-dark.png',
  profileImageAlt: 'Researcher profile photograph',
  profileImageSizes: '(max-width: 768px) 144px, 192px',
  cvPdf: '/resume/cv.pdf',
}
```

Spaces in public URLs should be percent-encoded as `%20`.

### Job Market page

The Job Market page and all associated UI are controlled by one boolean:

```js
const jobMarketActive = true
```

Setting the value to `false` removes the navigation item, renders a `noindex` not-found response, omits the route from the sitemap, hides the home-page notice, and suppresses paper tags marked `jobMarketOnly`.

The `jobMarket` object supports the following fields:

| Field | Purpose |
| --- | --- |
| `active` | Enables the Job Market feature. |
| `homeStatus` | Bold status sentence shown after the home-page biography. |
| `homeLink.text` and `homeLink.label` | Text and linked label for the home-page notice. |
| `jmpSlug` | Slug of the paper displayed as the Job Market Paper. |
| `jmpPdf` | Optional PDF override; the selected paper's `pdf` is used when omitted. |
| `cvPdf` and `cvDescription` | Job-market CV file and accompanying text. |
| `pitch` | Overview text. |
| `references` | Reference records with `name`, `institution`, and optional `url` or `linkLabel`. |
| `placementUrl`, `placementLabel`, `placementDescription` | Placement section content. |

The overview, CV, references, and placement sections are omitted when their required content is absent. A reference institution may be a string or an array of strings.

## Theme configuration

`site.settings.js` defines Material 3 semantic color roles for light and dark modes. Components use role names rather than direct color values, allowing a palette to be replaced without editing individual pages.

The active palette is selected by `theme.palette`. Additional palettes must provide the same semantic tokens as the existing palette.

Typography is configured in `src/app/font.js`:

- Newsreader for display and heading roles
- IBM Plex Sans for body text, metadata, and controls

Next.js requires font configuration values to remain statically analyzable, so font definitions are maintained separately from `content.js`.

## Search metadata

Page metadata and JSON-LD records are derived from `content.js`. The post-build process generates `sitemap.xml` and `robots.txt` from `site.url`; these files should not be edited manually. PDF files under `public/` are added to the sitemap automatically.

## Production build

```bash
npm run build
```

The command creates the static export in `out/` and updates the generated search-engine files. The deployment command adds `out/.nojekyll` and copies the generated SEO files into the export before publishing.

To publish through the configured `gh-pages` workflow:

```bash
npm run deploy
```

For a user or organization GitHub Pages repository (`username.github.io`), the default empty `basePath` is appropriate. A project site hosted below a path requires corresponding `basePath` and `assetPrefix` values in `next.config.js`.

## Project structure

```text
content.js                    Personal content and asset references
site.settings.js              Template settings, metadata derivation, and styles
next.config.js                Static-export configuration
next-sitemap.config.js        Sitemap and robots generation
src/app/
  layout.js                   Document shell and global metadata
  page.js                     Home page
  research/page.js            Research page
  cv/page.js                  Curriculum vitae page
  job-market/page.js          Optional Job Market page
  settings.js                 Settings exports and palette variables
  font.js                     Font configuration
  globals.css                 Global styles and interaction states
  components/                 Shared interface components
public/                       User-supplied images and documents
out/                          Generated static export
```

## License

The template may be adapted for an individual academic website. Site content, documents, images, and the displayed content license remain the responsibility of the site owner.
