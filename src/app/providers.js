'use client'

import { ThemeProvider } from 'next-themes'

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-primary-light dark:bg-dark-primary">
        {children}
      </div>
    </ThemeProvider>
  )
}