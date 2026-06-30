'use client'

import { useState, useEffect } from 'react'
import { MdEmail } from 'react-icons/md'
import { FaLinkedinIn, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { socialLinks, styles } from '../settings'

const iconMap = {
  email: MdEmail,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  x: FaXTwitter,
}

export default function SocialIcons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={styles.iconLinks.placeholder} />
  }

  return (
    <div className={styles.iconLinks.list}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.type]
        const href = link.href || `mailto:${link.emailUser}@${link.emailDomain}`

        return (
          <a
            key={link.type}
            href={href}
            aria-label={link.label}
            className={styles.iconLinks.link}
            target={link.type === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            <Icon size={20} />
          </a>
        )
      })}
    </div>
  )
}
