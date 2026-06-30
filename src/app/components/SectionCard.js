import { styles } from '../settings'

export default function SectionCard({ title, titleAs: Heading = 'h2', children, titleClassName = styles.sectionTitle }) {
  return (
    <section className={styles.card}>
      {title && (
        <Heading className={titleClassName}>
          {title}
        </Heading>
      )}
      {children}
    </section>
  )
}
