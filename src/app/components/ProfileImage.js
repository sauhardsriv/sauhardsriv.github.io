'use client'

import Image from 'next/image'
import { assets, styles } from '../settings'

export default function ProfileImage() {
  const block = (event) => event.preventDefault()

  return (
    <div className={styles.profileImageFrame}>
      <Image
        src={assets.profileImage}
        alt={assets.profileImageAlt}
        fill
        className={styles.profileImage}
        priority
        sizes={assets.profileImageSizes}
        draggable={false}
        onContextMenu={block}
        onDragStart={block}
      />
      {/* Transparent overlay: makes right-click / drag target a div, not the <img>,
          so the browser offers no "Save image" / "Open image" options. */}
      <div
        className={styles.profileImageGuard}
        aria-hidden="true"
        onContextMenu={block}
        onDragStart={block}
      />
    </div>
  )
}
