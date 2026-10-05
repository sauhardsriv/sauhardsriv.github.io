'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import MaterialSymbol from './MaterialSymbol'
import { labels, styles } from '../settings'

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
      aria-label={labels.themeToggle}
    >
      {isDark ? (
        <MaterialSymbol name="light_mode" className={styles.buttons.themeIcon} />
      ) : (
        <MaterialSymbol name="dark_mode" className={styles.buttons.themeIcon} />
      )}
    </button>
  )
}
