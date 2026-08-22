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
        display: ['var(--font-display)', 'serif'],
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
        surface: {
          DEFAULT: 'rgb(var(--light-surface) / <alpha-value>)',
          dim: 'rgb(var(--light-surface-dim) / <alpha-value>)',
          bright: 'rgb(var(--light-surface-bright) / <alpha-value>)',
          lowest: 'rgb(var(--light-surface-lowest) / <alpha-value>)',
          low: 'rgb(var(--light-surface-low) / <alpha-value>)',
          container: 'rgb(var(--light-surface-container) / <alpha-value>)',
          high: 'rgb(var(--light-surface-high) / <alpha-value>)',
          highest: 'rgb(var(--light-surface-highest) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--light-on-surface) / <alpha-value>)',
          muted: 'rgb(var(--light-on-surface-variant) / <alpha-value>)',
          inverse: 'rgb(var(--light-inverse-on-surface) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--light-primary) / <alpha-value>)',
          on: 'rgb(var(--light-on-primary) / <alpha-value>)',
          container: 'rgb(var(--light-primary-container) / <alpha-value>)',
          'on-container': 'rgb(var(--light-on-primary-container) / <alpha-value>)',
          strong: 'rgb(var(--light-on-primary-container) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--light-secondary) / <alpha-value>)',
          on: 'rgb(var(--light-on-secondary) / <alpha-value>)',
          container: 'rgb(var(--light-secondary-container) / <alpha-value>)',
          'on-container': 'rgb(var(--light-on-secondary-container) / <alpha-value>)',
        },
        tertiary: {
          DEFAULT: 'rgb(var(--light-tertiary) / <alpha-value>)',
          on: 'rgb(var(--light-on-tertiary) / <alpha-value>)',
          container: 'rgb(var(--light-tertiary-container) / <alpha-value>)',
          'on-container': 'rgb(var(--light-on-tertiary-container) / <alpha-value>)',
        },
        outline: {
          DEFAULT: 'rgb(var(--light-outline) / <alpha-value>)',
          variant: 'rgb(var(--light-outline-variant) / <alpha-value>)',
        },
        dark: {
          surface: {
            DEFAULT: 'rgb(var(--dark-surface) / <alpha-value>)',
            dim: 'rgb(var(--dark-surface-dim) / <alpha-value>)',
            bright: 'rgb(var(--dark-surface-bright) / <alpha-value>)',
            lowest: 'rgb(var(--dark-surface-lowest) / <alpha-value>)',
            low: 'rgb(var(--dark-surface-low) / <alpha-value>)',
            container: 'rgb(var(--dark-surface-container) / <alpha-value>)',
            high: 'rgb(var(--dark-surface-high) / <alpha-value>)',
            highest: 'rgb(var(--dark-surface-highest) / <alpha-value>)',
          },
          ink: {
            DEFAULT: 'rgb(var(--dark-on-surface) / <alpha-value>)',
            muted: 'rgb(var(--dark-on-surface-variant) / <alpha-value>)',
            inverse: 'rgb(var(--dark-inverse-on-surface) / <alpha-value>)',
          },
          primary: {
            DEFAULT: 'rgb(var(--dark-primary) / <alpha-value>)',
            on: 'rgb(var(--dark-on-primary) / <alpha-value>)',
            container: 'rgb(var(--dark-primary-container) / <alpha-value>)',
            'on-container': 'rgb(var(--dark-on-primary-container) / <alpha-value>)',
            strong: 'rgb(var(--dark-on-primary-container) / <alpha-value>)',
          },
          secondary: {
            DEFAULT: 'rgb(var(--dark-secondary) / <alpha-value>)',
            on: 'rgb(var(--dark-on-secondary) / <alpha-value>)',
            container: 'rgb(var(--dark-secondary-container) / <alpha-value>)',
            'on-container': 'rgb(var(--dark-on-secondary-container) / <alpha-value>)',
          },
          tertiary: {
            DEFAULT: 'rgb(var(--dark-tertiary) / <alpha-value>)',
            on: 'rgb(var(--dark-on-tertiary) / <alpha-value>)',
            container: 'rgb(var(--dark-tertiary-container) / <alpha-value>)',
            'on-container': 'rgb(var(--dark-on-tertiary-container) / <alpha-value>)',
          },
          outline: {
            DEFAULT: 'rgb(var(--dark-outline) / <alpha-value>)',
            variant: 'rgb(var(--dark-outline-variant) / <alpha-value>)',
          },
        },
      },
    },
  },
  plugins: [],
}
