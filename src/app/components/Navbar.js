// src/app/components/Navbar.js
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {

  const pathname = usePathname()


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
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/research">Research</NavLink>
            <NavLink href="/cv">CV</NavLink>
          </div>

          <div className="flex items-center ml-4 sm:ml-6">
            <span className="h-6 w-px bg-primary-text dark:bg-dark-text opacity-20 mx-2"></span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}