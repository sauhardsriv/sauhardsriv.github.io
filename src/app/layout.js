import './globals.css'
import Providers from './providers'
import ClientWrapper from './components/ClientWrapper'
import { displayFont, siteFont } from './font'
import { assets, openGraphBase, paletteVariablesCss, site, socialImage, theme } from './settings'

// Canonical and Open Graph URLs are set per page, so pages without their own
// (such as the not-found page) never inherit another page's URL.
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  ...(assets.icon && {
    icons: {
      icon: assets.icon,
      apple: assets.appleIcon || assets.icon,
    },
  }),
  openGraph: {
    ...openGraphBase,
    title: site.name,
    description: site.description,
  },
  // X reads each page's Open Graph title and description when these are omitted.
  twitter: {
    card: 'summary',
    images: [socialImage],
  },
  // Pages are indexable by default; only preview limits are set here, so a
  // page's noindex (for example, the not-found page) is never contradicted.
  robots: {
    googleBot: {
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: site.verification,
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: theme.palettes[theme.palette]['light-surface'] },
    { media: '(prefers-color-scheme: dark)', color: theme.palettes[theme.palette]['dark-surface'] },
  ],
}

const paletteNames = JSON.stringify(Object.keys(theme.palettes))
const paletteInitScript = `(function(){try{var p=localStorage.getItem('palette');if(${paletteNames}.indexOf(p)!==-1){document.documentElement.setAttribute('data-palette',p);}}catch(e){}})();`

export default function RootLayout({ children }) {
  return (
    <html lang={site.language || 'en'} data-palette={theme.palette} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: paletteVariablesCss() }} />
      </head>
      <body className={`${siteFont.variable} ${displayFont.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript }} />
        <Providers>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  )
}
