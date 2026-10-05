'use client'

import Link from 'next/link'
import MaterialSymbol from './components/MaterialSymbol'
import { pages, styles } from './settings'

export default function NotFound() {
  return (
    <div className={styles.notFound.root}>
      <MaterialSymbol name="error" className={styles.notFound.icon} />

      <h1 className={styles.notFound.title}>
        {pages.notFound.heading}
      </h1>
      <p className={styles.notFound.message}>
        {pages.notFound.message}
      </p>

      <Link href={pages.home.path} className={styles.notFound.button}>
        <MaterialSymbol name="arrow_back" className={styles.notFound.buttonIcon} />
        {pages.notFound.buttonLabel}
      </Link>
    </div>
  )
}
