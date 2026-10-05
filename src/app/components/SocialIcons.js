'use client'

import { useState, useEffect } from 'react'
import MaterialSymbol from './MaterialSymbol'
import { FaLinkedinIn, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { socialLinks, styles } from '../settings'

const MailIcon = (props) => <MaterialSymbol name="mail_filled" {...props} />

export const iconMap = {
  email: MailIcon,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  x: FaXTwitter,
}

// Profile links are rendered in the static HTML; the email address is assembled
// only in the browser so it never appears in the page source.
export default function SocialIcons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={styles.iconLinks.list}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.type]
        const isEmail = link.type === 'email'
        const href = isEmail
          ? (mounted ? `mailto:${link.emailUser}@${link.emailDomain}` : undefined)
          : link.href

        return (
          <a
            key={link.type}
            href={href}
            aria-label={link.label}
            className={styles.iconLinks.link}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'me noopener noreferrer'}
          >
            <Icon className={styles.iconLinks.icon} aria-hidden="true" />
          </a>
        )
      })}
    </div>
  )
}
