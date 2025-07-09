'use client'

import { useState, useEffect } from 'react'
import { MdEmail } from 'react-icons/md'
import { FaLinkedinIn, FaGithub, FaXTwitter } from 'react-icons/fa6'

export default function SocialIcons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-8" /> // Placeholder with same height as icons
  }

  return (
    <div className="flex space-x-2">
      <a 
        href="mailto:sauhardsrivastava@gmail.com" 
        className="text-primary-text dark:text-dark-text hover:text-primary-hover dark:hover:text-dark-hover transition-colors duration-200" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <MdEmail size={20} />
      </a>
      <a 
        href="https://www.linkedin.com/in/sauhard-srivastava/" 
        className="text-primary-text dark:text-dark-text hover:text-primary-hover dark:hover:text-dark-hover transition-colors duration-200" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaLinkedinIn size={20} />
      </a>
      <a 
        href="https://github.com/sauhardsriv" 
        className="text-primary-text dark:text-dark-text hover:text-primary-hover dark:hover:text-dark-hover transition-colors duration-200" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaGithub size={20} />
      </a>
      <a 
        href="https://x.com/sauhardsriv" 
        className="text-primary-text dark:text-dark-text hover:text-primary-hover dark:hover:text-dark-hover transition-colors duration-200" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaXTwitter size={20} />
      </a>
    </div>
  )
}