'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { navigation, site, styles } from '../settings'

export default function Navbar() {
  const pathname = usePathname()

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`${styles.navbar.linkBase} ${isActive ? styles.navbar.linkActive : styles.navbar.linkInactive}`}
      >
        {children}
        {isActive && (
          <span className={styles.navbar.activeIndicator}></span>
        )}
      </Link>
    )
  }

  return (
    <nav className={styles.navbar.root}>
      <div className={styles.navbar.container}>

        <Link
          href="/"
          className={styles.navbar.brand}
        >
          {site.name}
        </Link>

        <div className={styles.navbar.rightGroup}>
          <div className={styles.navbar.links}>
            {navigation.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className={styles.navbar.actions}>
            <span className={styles.navbar.divider}></span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
