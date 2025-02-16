// src/app/not-found.js
'use client'

import Link from 'next/link'
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa'; // Import icons

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-16 overflow-hidden">
      {/* Icon */}
      <FaExclamationTriangle
        className="text-primary-text dark:text-dark-text text-[50pt] md:text-[75pt] lg:text-[90pt] font-semibold mb-12"
      />
      
      {/* Heading */}
      <h1 className="text-primary-text dark:text-dark-text text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 text-center">
        404 - Page Not Found
      </h1>
      {/* Paragraph */}
      <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50 text-xl md:text-2xl lg:text-2xl font-normal mb-6 text-center">
        The page you're looking for doesn't exist.
      </p>
      
      {/* Back to Home Button */}
      <Link
        href="/"
        className="flex items-center bg-primary-main dark:bg-dark-surface text-primary-text dark:text-dark-text 
                   opacity-80 dark:opacity-70 hover:text-primary-hover dark:hover:text-dark-hover 
                   transition-all duration-200 px-6 py-3 rounded-3xl text-lg md:text-xl lg:text-xl font-medium 
                   hover:bg-primary-hover hover:bg-opacity-10 dark:hover:bg-dark-hover dark:hover:bg-opacity-20"
      >
        <FaArrowLeft className="mr-2 h-5 w-5" />
        Go to Homepage
      </Link>
    </div>
  )
}