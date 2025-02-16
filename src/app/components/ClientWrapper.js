'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'

export default function ClientWrapper({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}