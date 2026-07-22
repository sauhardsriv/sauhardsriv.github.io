import SectionCard from '../components/SectionCard'
import { assets, cv, pages, styles } from '../settings'

export const metadata = {
  title: pages.cv.title,
  description: pages.cv.description,
  keywords: pages.cv.keywords,
  alternates: {
    canonical: pages.cv.path,
  },
  openGraph: {
    url: pages.cv.path,
    title: pages.cv.title,
    description: pages.cv.description,
  },
}

function CvEntry({ entry }) {
  return (
    <article className={styles.cvEntry}>
      <div className={styles.cvDate}>
        <p>{entry.date}</p>
        {entry.dateNote && (
          <p className={styles.cvDateNote}>{entry.dateNote}</p>
        )}
      </div>
      <div className={styles.cvEntryBody}>
        <h3 className={styles.cvEntryTitle}>{entry.title}</h3>
        <p className={styles.cvEntryInstitution}>{entry.institution}</p>
        {entry.note && (
          <p className={styles.paperSecondary}>{entry.note}</p>
        )}
      </div>
    </article>
  )
}

export default function CV() {
  return (
    <article className={styles.page}>
      <h1 className={styles.pageTitle}>
        Curriculum Vitae{' '}
        <a
          href={assets.cvPdf}
          className={styles.pdfLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          [PDF]
        </a>
      </h1>

      <div className={styles.sectionStackCompact}>
        <SectionCard title="Education" titleClassName={styles.sectionTitleSpacious}>
          <div className={styles.cvEntryList}>
            {cv.education.map((entry) => (
              <CvEntry key={`${entry.title}-${entry.institution}`} entry={entry} />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Professional Experience" titleClassName={styles.sectionTitleSpacious}>
          <div className={styles.cvEntryList}>
            {cv.experience.map((entry) => (
              <CvEntry key={`${entry.title}-${entry.institution}-${entry.date}`} entry={entry} />
            ))}
          </div>
        </SectionCard>
      </div>
    </article>
  )
}
