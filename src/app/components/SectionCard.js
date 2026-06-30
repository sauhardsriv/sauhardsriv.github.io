import { styles } from '../settings'

export default function SectionCard({ title, titleAs: Heading = 'h2', children, titleClassName = styles.sectionTitle, className = '' }) {
  return (
    <section className={`${styles.card} ${className}`}>
      {title && (
        <Heading className={titleClassName}>
          {title}
        </Heading>
      )}
      {children}
    </section>
  )
}
