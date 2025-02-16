'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-8 p-2 rounded-full bg-primary-navbar dark:bg-dark-navbar text-primary-text dark:text-dark-text shadow-lg  hover:bg-primary-hover hover:bg-opacity-80 dark:hover:bg-dark-hover dark:hover:bg-opacity-70 transition-all duration-300"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  )
}