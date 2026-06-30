import { DM_Sans } from 'next/font/google'

export const siteFont = DM_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-site',
})
