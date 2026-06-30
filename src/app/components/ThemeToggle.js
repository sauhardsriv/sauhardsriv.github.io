// src/app/components/ThemeToggle.js
'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { styles } from '../settings'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={styles.buttons.themeToggle}
      type="button"
      aria-label="Toggle color theme"
    >
      {isDark ? (
        <Sun className={styles.buttons.themeIcon} />
      ) : (
        <Moon className={styles.buttons.themeIcon} />
      )}
    </button>
  )
}
