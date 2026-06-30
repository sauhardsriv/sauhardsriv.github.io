// src/app/layout.js
import './globals.css'
import Providers from './providers'
import ClientWrapper from './components/ClientWrapper'
import { siteFont } from './font'
import { assets, site, theme } from './settings'

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
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: theme.colors.primary.light },
    { media: '(prefers-color-scheme: dark)', color: theme.colors.dark.primary },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={siteFont.variable}>
        <Providers>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  )
}
