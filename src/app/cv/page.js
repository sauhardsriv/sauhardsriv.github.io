import SectionCard from '../components/SectionCard'
import { assets, pages, styles } from '../settings'

const education = [
  {
    date: '2027',
    dateNote: '(expected)',
    title: 'PhD in Economics',
    institution: 'University of Minnesota',
  },
  {
    date: '2024',
    title: 'MA in Economics',
    institution: 'University of Minnesota',
  },
  {
    date: '2019',
    title: 'MSc in Economics',
    institution: 'The London School of Economics and Political Science',
  },
  {
    date: '2018',
    title: 'BA (Hons.) in Economics',
    institution: 'Shri Ram College of Commerce, University of Delhi',
  },
]

const experience = [
  {
    date: 'Sep 2023-present',
    title: 'Research Analyst',
    institution: 'Federal Reserve Bank of Minneapolis',
  },
  {
    date: 'Sep 2021-Jul 2023',
    title: 'Teaching Assistant',
    institution: 'CLA, University of Minnesota',
  },
  {
    date: 'Jan 2020-Jun 2021',
    title: 'Research Assistant/Intern',
    institution: 'Reserve Bank of India',
  },
  {
    date: 'Aug 2019-Dec 2019',
    title: 'Research Assistant/Intern',
    institution: 'United Nations Development Programme (UNDP) in India',
  },
  {
    date: 'Sep 2018-May 2019',
    title: 'Graduate Teaching Assistant',
    institution: 'Department of Economics, LSE',
  },
]

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
            {education.map((entry) => (
              <CvEntry key={`${entry.title}-${entry.institution}`} entry={entry} />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Professional Experience" titleClassName={styles.sectionTitleSpacious}>
          <div className={styles.cvEntryList}>
            {experience.map((entry) => (
              <CvEntry key={`${entry.title}-${entry.institution}-${entry.date}`} entry={entry} />
            ))}
          </div>
        </SectionCard>
      </div>
    </article>
  )
}
