// src/app/components/Navbar.js
'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`
          relative py-2 text-primary-text dark:text-dark-text 
          hover:text-primary-hover dark:hover:text-dark-hover 
          transition-colors duration-20
          ${isActive ? 'font-semibold' : 'font-normal'}
        `}
      >
        {children}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-url dark:bg-dark-url"></span>
        )}
      </Link>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-navbar dark:bg-dark-navbar text-primary-text dark:text-dark-text py-[6px] text-base   
      transition-shadow duration-300
      hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)]">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-4 md:px-4 lg:px-16">

        <Link
          href="/"
          className="text-lg sm:text-xl md:text-2xl font-medium hover:text-primary-hover dark:hover:text-dark-hover text-primary-text dark:text-dark-text transition-colors duration-0"
        >
          Sauhard Srivastava
        </Link>

        <div className="flex items-center">
          {/* Name on the left - links to homepage */}


          {/* Navigation links - centered */}

          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/research">Research</NavLink>
            <NavLink href="/cv">CV</NavLink>
          </div>


          {/* Theme toggle button - subtle in the corner */}
          <div className="flex items-center ml-4 sm:ml-6">
          <span className="h-6 w-px bg-primary-text dark:bg-dark-text opacity-20 mx-2"></span>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-primary-hover hover:bg-opacity-10 dark:hover:bg-dark-hover dark:hover:bg-opacity-20 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}