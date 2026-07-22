'use client'

import Link from 'next/link'
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa'
import { styles } from './settings'

export default function NotFound() {
  return (
    <div className={styles.notFound.root}>
      <FaExclamationTriangle className={styles.notFound.icon} />

      <h1 className={styles.notFound.title}>
        404 - Page Not Found
      </h1>
      <p className={styles.notFound.message}>
        The page you're looking for doesn't exist.
      </p>

      <Link href="/" className={styles.notFound.button}>
        <FaArrowLeft className={styles.notFound.buttonIcon} />
        Go to Homepage
      </Link>
    </div>
  )
}
