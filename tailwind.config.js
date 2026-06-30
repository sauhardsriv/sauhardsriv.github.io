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
      colors: {
        primary: {
          light: 'rgb(var(--primary-light) / <alpha-value>)',
          main: 'rgb(var(--primary-main) / <alpha-value>)',
          dark: 'rgb(var(--primary-dark) / <alpha-value>)',
          navbar: 'rgb(var(--primary-navbar) / <alpha-value>)',
          text: 'rgb(var(--primary-text) / <alpha-value>)',
          hover: 'rgb(var(--primary-hover) / <alpha-value>)',
          url: 'rgb(var(--primary-url) / <alpha-value>)',
          'url-hover': 'rgb(var(--primary-url-hover) / <alpha-value>)',
          outline: 'rgb(var(--primary-outline) / <alpha-value>)',
          variant: 'rgb(var(--primary-variant) / <alpha-value>)',
        },
        dark: {
          primary: 'rgb(var(--dark-primary) / <alpha-value>)',
          surface: 'rgb(var(--dark-surface) / <alpha-value>)',
          navbar: 'rgb(var(--dark-navbar) / <alpha-value>)',
          text: 'rgb(var(--dark-text) / <alpha-value>)',
          hover: 'rgb(var(--dark-hover) / <alpha-value>)',
          url: 'rgb(var(--dark-url) / <alpha-value>)',
          'url-hover': 'rgb(var(--dark-url-hover) / <alpha-value>)',
          outline: 'rgb(var(--dark-outline) / <alpha-value>)',
          variant: 'rgb(var(--dark-variant) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
