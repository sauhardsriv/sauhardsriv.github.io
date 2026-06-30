'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'
import { styles } from '../settings'

export default function ClientWrapper({ children }) {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
