'use client'

import Image from 'next/image'
import { assets, styles } from '../settings'

export default function ProfileImage() {
  const block = (event) => event.preventDefault()
  const imageProps = {
    fill: true,
    sizes: assets.profileImageSizes,
    alt: assets.profileImageAlt,
    draggable: false,
    onContextMenu: block,
    onDragStart: block,
  }

  return (
    <div className={styles.profileImageFrame}>
      <Image
        src={assets.profileImage}
        priority
        className={assets.profileImageDark
          ? `${styles.profileImage} transition-opacity duration-300 dark:opacity-0`
          : styles.profileImage}
        {...imageProps}
      />
      {assets.profileImageDark && (
        <Image
          src={assets.profileImageDark}
          priority
          className={`${styles.profileImage} transition-opacity duration-300 opacity-0 dark:opacity-100`}
          {...imageProps}
        />
      )}
      {/* Prevent direct pointer interaction with the rendered images. */}
      <div
        className={styles.profileImageGuard}
        aria-hidden="true"
        onContextMenu={block}
        onDragStart={block}
      />
    </div>
  )
}
