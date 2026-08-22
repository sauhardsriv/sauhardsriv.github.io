import { IBM_Plex_Sans, Newsreader } from 'next/font/google'

export const siteFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-site',
})

export const displayFont = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-display',
})
