// src/app/components/ThemeToggle.js
'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(() => {
    // We'll set this properly after mounting
    return false
  })

  useEffect(() => {
    setMounted(true)
    // Check sessionStorage first, then system preference
    const saved = sessionStorage.getItem('theme')
    if (saved) {
      setDarkMode(saved === 'dark')
      setTheme(saved)
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(systemDark)
      setTheme(systemDark ? 'dark' : 'light')
    }
  }, [setTheme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!sessionStorage.getItem('theme')) {
        setDarkMode(e.matches)
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setTheme])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    const newTheme = newMode ? 'dark' : 'light'
    setTheme(newTheme)
    sessionStorage.setItem('theme', newTheme)
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-primary-hover hover:bg-opacity-10 dark:hover:bg-dark-hover dark:hover:bg-opacity-20 transition-all duration-200"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-primary-text dark:text-dark-text" />
      ) : (
        <Moon className="h-5 w-5 text-primary-text dark:text-dark-text" />
      )}
    </button>
  )
}