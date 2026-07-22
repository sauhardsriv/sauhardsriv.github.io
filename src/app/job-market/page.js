import { notFound } from 'next/navigation'
import AbstractDetails from '../components/AbstractDetails'
import SectionCard from '../components/SectionCard'
import { jobMarket, pages, papers, profile, site, socialLinks, styles } from '../settings'

const jmp = papers.find((paper) => paper.slug === jobMarket.jmpSlug)

export const metadata = {
  title: pages.jobMarket.title,
  description: pages.jobMarket.description,
  keywords: pages.jobMarket.keywords,
  alternates: {
    canonical: pages.jobMarket.path,
  },
  openGraph: {
    url: pages.jobMarket.path,
    title: pages.jobMarket.title,
    description: pages.jobMarket.description,
  },
}

function buildStructuredData() {
  const sameAs = socialLinks
    .filter((link) => link.type !== 'email' && link.href)
    .map((link) => link.href)

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${site.url}${pages.jobMarket.path}#webpage`,
    name: `${site.author} — Job Market`,
    url: `${site.url}${pages.jobMarket.path}`,
    description: pages.jobMarket.description,
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.author,
      url: site.url,
      jobTitle: profile.title,
      description: `${profile.title}; ${profile.jobMarket}`,
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: profile.affiliation,
      },
      worksFor: {
        '@type': 'Organization',
        name: profile.employer,
      },
      sameAs,
    },
  }
}

export default function JobMarket() {
  if (!jobMarket.active) notFound()
  const structuredData = buildStructuredData()

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className={styles.pageTitle}>Job Market Information</h1>

      <div className={styles.sectionStack}>
        <SectionCard title="Overview">
          <div className={styles.bodyCopy}>
            <p>{jobMarket.pitch}</p>
          </div>
        </SectionCard>

        <SectionCard title="Job Market Paper" className={`${styles.featuredCard} !mb-0`}>
          <div className={styles.featuredItem}>
            <h3 className={styles.jobMarket.paperTitle}>{jmp.title}</h3>
            <div className={styles.jobMarket.abstractWrap}>
              <AbstractDetails>
                <p>{jmp.abstract}</p>
              </AbstractDetails>
            </div>
            <div className={styles.jobMarket.actions}>
              <a className={styles.buttons.primary} href={jobMarket.jmpPdf} target="_blank" rel="noopener noreferrer">
                Download Paper (PDF)
              </a>
            </div>
          </div>
          <p className={styles.jobMarket.researchLink}>
            <a className={styles.link} href={pages.research.path}>See all research →</a>
          </p>
        </SectionCard>

        <SectionCard title="Curriculum Vitae">
          <p className={styles.jobMarket.cvNote}>
            A PDF of my current job-market curriculum vitae.
          </p>
          <div className={styles.jobMarket.actions}>
            <a className={styles.buttons.primary} href={jobMarket.cvPdf} target="_blank" rel="noopener noreferrer">
              Download CV (PDF)
            </a>
          </div>
        </SectionCard>

        <SectionCard title="References">
          <div className={styles.jobMarket.referenceList}>
            {jobMarket.references.map((reference) => {
              const institutions = Array.isArray(reference.institution) ? reference.institution : [reference.institution]
              return (
                <div key={reference.name} className={styles.jobMarket.referenceItem}>
                  <span className={styles.jobMarket.referenceName}>{reference.name}</span>
                  {institutions.map((institution) => (
                    <span key={institution} className={styles.jobMarket.referenceInstitution}>{institution}</span>
                  ))}
                  <a className={styles.jobMarket.referenceLink} href={reference.url} target="_blank" rel="noopener noreferrer">
                    Website ↗
                  </a>
                </div>
              )
            })}
          </div>
        </SectionCard>

        <SectionCard title="Placement">
          <p className={styles.jobMarket.cvNote}>
            Placement information, including how to contact the placement coordinator and directors.
          </p>
          <a className={styles.link} href={jobMarket.placementUrl} target="_blank" rel="noopener noreferrer">
            umn.edu ↗
          </a>
        </SectionCard>
      </div>
    </article>
  )
}
