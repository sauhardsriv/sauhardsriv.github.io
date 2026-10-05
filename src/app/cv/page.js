import SectionCard from '../components/SectionCard'
import { JsonLd, personNode, profilePageNode } from '../structuredData'
import { assets, cv, openGraphBase, pages, styles } from '../settings'

export const metadata = {
  title: pages.cv.title,
  description: pages.cv.description,
  keywords: pages.cv.keywords,
  alternates: {
    canonical: pages.cv.path,
  },
  openGraph: {
    ...openGraphBase,
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
      <JsonLd graph={[personNode(), profilePageNode(pages.cv)]} />

      <div className={styles.pageHeader}>
        <h1 className={styles.pageHeaderTitle}>{pages.cv.heading}</h1>
        {assets.cvPdf && (
          <a
            href={assets.cvPdf}
            className={styles.buttons.filled}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pages.cv.downloadLabel}
          </a>
        )}
      </div>

      <div className={styles.sectionStackCompact}>
        {cv.education?.length > 0 && (
          <SectionCard title={pages.cv.educationTitle} titleClassName={styles.sectionTitleSpacious}>
            <div className={styles.cvEntryList}>
              {cv.education.map((entry) => (
                <CvEntry key={`${entry.title}-${entry.institution}`} entry={entry} />
              ))}
            </div>
          </SectionCard>
        )}

        {cv.experience?.length > 0 && (
          <SectionCard title={pages.cv.experienceTitle} titleClassName={styles.sectionTitleSpacious}>
            <div className={styles.cvEntryList}>
              {cv.experience.map((entry) => (
                <CvEntry key={`${entry.title}-${entry.institution}-${entry.date}`} entry={entry} />
              ))}
            </div>
          </SectionCard>
        )}
      </div>
    </article>
  )
}
