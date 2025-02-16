// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['Noto Sans', 'sans-serif'],
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
          light: '#FFFFFF',
          main: '#F5F5F5',
          dark: '#E7EBF0',
          navbar: '#F5F5F5',
          text: '#2e2e2e',
          hover: '#2196F3',
          url: '#2196F3',
          'url-hover': '#E91E63',
        },
        dark: {
          primary: '#0d1117',
          surface: '#242A33',
          navbar: '#242A33',
          text: '#FFFFFF',
          hover: '#64B5F6',
          url: '#64B5F6',
          'url-hover': '#F06292',
        }
      }
    },
  },
  plugins: [],
}