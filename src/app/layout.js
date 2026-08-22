import './globals.css'
import Providers from './providers'
import ClientWrapper from './components/ClientWrapper'
import { displayFont, siteFont } from './font'
import { assets, paletteVariablesCss, site, theme } from './settings'

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.author }],
  creator: site.author,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: '/',
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [
      {
        url: assets.profileImage,
        alt: assets.profileImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: site.name,
    description: site.description,
    images: [assets.profileImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    <html lang={site.language || 'en'} data-palette={theme.palette} suppressHydrationWarning>
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
