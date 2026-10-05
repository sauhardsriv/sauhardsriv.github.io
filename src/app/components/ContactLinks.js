'use client'

import { useEffect, useState } from 'react'
import MaterialSymbol from './MaterialSymbol'
import { iconMap } from './SocialIcons'
import { socialLinks, styles } from '../settings'

// Shows an email address, assembled in the browser so it never appears in the page
// source, followed by the site's profile links as outlined buttons.
export default function ContactLinks({ email }) {
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (email) setAddress(`${email.emailUser}@${email.emailDomain}`)
  }, [email])

  const profiles = socialLinks.filter((link) => link.type !== 'email' && link.href)

  return (
    <div>
      {email && (
        <p className={styles.contact.email}>
          <MaterialSymbol name="mail_filled" className={styles.contact.emailIcon} />
          {address && <a href={`mailto:${address}`} className={styles.link}>{address}</a>}
        </p>
      )}
      {profiles.length > 0 && (
        <div className={styles.contact.profiles}>
          {profiles.map((link) => {
            const Icon = iconMap[link.type]
            return (
              <a
                key={link.type}
                href={link.href}
                className={styles.buttons.outlined}
                target="_blank"
                rel="me noopener noreferrer"
              >
                {Icon && <Icon className={styles.contact.profileIcon} aria-hidden="true" />}
                {link.label}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
