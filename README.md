# Sauhard Srivastava Academic Website

Next.js academic website configured for GitHub Pages static export, responsive display, system-aware light/dark themes, and search engine discoverability.

## Project Structure

- `site.settings.js`: central site identity, theme colors, navigation, social links, asset paths, and shared style recipes.
- `src/app/layout.js`: root HTML shell, global metadata, viewport settings, SEO defaults, and app providers.
- `src/app/page.js`: homepage route.
- `src/app/research/page.js`: research route.
- `src/app/cv/page.js`: CV route.
- `src/app/components/`: reusable UI components.
- `public/`: static assets, PDFs, robots file, sitemap, and verification files.

## Centralized Settings

Adjust shared site configuration in `site.settings.js` before editing individual pages:

- Site name, URL, author, description, keywords, and license.
- Light and dark theme colors.
- Default theme behavior through `next-themes`.
- Navigation links and social links.
- Profile/CV asset paths.
- Shared Tailwind class recipes used across pages and components.

Font loading is centralized in `src/app/font.js`. Next.js requires `next/font` options to be literal values, so font-loader options should be changed there.

## Theme Behavior

The site uses `next-themes` with:

- `defaultTheme: 'system'`
- `enableSystem: true`
- `storageKey: 'theme'`
- `disableTransitionOnChange: true`

This means first load follows the visitor's OS/browser preference, then persists any manual toggle choice.

## SEO And Static Export

SEO-critical settings are implemented in the Next.js App Router:

- Root metadata and viewport settings live in `src/app/layout.js`.
- Page-specific metadata lives in each route file.
- `next.config.js` enables `output: 'export'` for static HTML generation.
- `next-sitemap.config.js` generates `public/sitemap.xml` and `public/robots.txt`.
- Static assets and PDFs live under `public/` for direct indexing and linking.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build Check

```bash
npm run build
```

This runs the Next.js production build, static export, and sitemap generation.

## Deploy

```bash
npm run predeploy
npm run deploy
```

`predeploy` builds the static site and creates `out/.nojekyll`. `deploy` publishes the `out/` directory to GitHub Pages through `gh-pages`.
