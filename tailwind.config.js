// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const { theme } = require('./site.settings')

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './site.settings.js',
  ],
  darkMode: theme.darkMode,
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-site)', 'sans-serif'],
        'site-sans': ['var(--font-site)', 'sans-serif'],
      },
      fontWeight: {
        'thin': 100,
        'extralight': 200,
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
        'black': 900,
      },
      colors: theme.colors,
    },
  },
  plugins: [],
}
