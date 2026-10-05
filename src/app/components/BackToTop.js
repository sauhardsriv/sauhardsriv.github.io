'use client'

import { useState, useEffect } from 'react'
import MaterialSymbol from './MaterialSymbol'
import { labels, styles } from '../settings'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300)

    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.buttons.backToTop} ${isVisible ? styles.buttons.backToTopVisible : styles.buttons.backToTopHidden}`}
      type="button"
      aria-label={labels.backToTop}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <MaterialSymbol name="vertical_align_top" className={styles.buttons.backToTopIcon} />
    </button>
  )
}
