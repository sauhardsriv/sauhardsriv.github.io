import { styles } from '../settings'

// titleAside renders beside the title (for example, a row of icon links).
export default function SectionCard({ title, titleAs: Heading = 'h2', titleAside = null, children, titleClassName = styles.sectionTitle, className = '' }) {
  const heading = title && (
    <Heading className={titleClassName}>
      {title}
    </Heading>
  )

  return (
    <section className={`${styles.card} ${className}`}>
      {titleAside ? (
        <div className={styles.cardHeader}>
          {heading}
          {titleAside}
        </div>
      ) : heading}
      {children}
    </section>
  )
}
