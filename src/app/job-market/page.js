import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
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

function PaperFeatureMedia({ paper }) {
  if (paper.featuredImage) {
    return (
      <Image
        src={paper.featuredImage}
        alt={paper.featuredImageAlt || `Preview for ${paper.title}`}
        fill
        sizes="(max-width: 767px) 100vw, 32vw"
        className={styles.jobMarket.paperImage}
      />
    )
  }

  return (
    <div className={styles.jobMarket.paperImagePlaceholder} role="img" aria-label="Paper image placeholder">
      <ImageIcon className={styles.jobMarket.paperImagePlaceholderIcon} aria-hidden="true" />
      <span className={styles.jobMarket.paperImagePlaceholderLabel}>Paper image</span>
    </div>
  )
}

export default function JobMarket() {
  if (!jobMarket.active || !jmp) notFound()
  const structuredData = buildStructuredData()
  const paperPdf = jobMarket.jmpPdf || jmp.pdf

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className={styles.pageTitle}>Job Market Information</h1>

      <div className={styles.sectionStack}>
        {jobMarket.pitch && (
          <SectionCard title="Overview">
            <div className={styles.bodyCopy}>
              <p>{jobMarket.pitch}</p>
            </div>
          </SectionCard>
        )}

        <SectionCard title="Job Market Paper" className={styles.jobMarket.paperCard}>
          <div className={styles.jobMarket.paperFeatureGrid}>
            <div className={styles.jobMarket.paperMedia}>
              <PaperFeatureMedia paper={jmp} />
            </div>

            <div className={styles.jobMarket.paperFeatureBody}>
              <h3 className={styles.jobMarket.paperTitle}>{jmp.title}</h3>
              <div className={styles.jobMarket.abstractWrap}>
                <p className={styles.jobMarket.abstractText}>{jmp.abstract}</p>
              </div>
              {paperPdf && (
                <div className={styles.jobMarket.actions}>
                  <a className={styles.buttons.primary} href={paperPdf} target="_blank" rel="noopener noreferrer">
                    Download Paper (PDF)
                  </a>
                </div>
              )}
              <p className={styles.jobMarket.researchLink}>
                <a className={styles.link} href={pages.research.path}>See all research →</a>
              </p>
            </div>
          </div>
        </SectionCard>

        {jobMarket.cvPdf && (
          <SectionCard title="Curriculum Vitae">
            {jobMarket.cvDescription && (
              <p className={styles.jobMarket.cvNote}>{jobMarket.cvDescription}</p>
            )}
            <div className={styles.jobMarket.actions}>
              <a className={styles.buttons.primary} href={jobMarket.cvPdf} target="_blank" rel="noopener noreferrer">
                Download CV (PDF)
              </a>
            </div>
          </SectionCard>
        )}

        {jobMarket.references?.length > 0 && (
          <SectionCard title="References">
            <div className={styles.jobMarket.referenceList}>
              {jobMarket.references.map((reference) => {
                const institutions = (Array.isArray(reference.institution)
                  ? reference.institution
                  : [reference.institution]).filter(Boolean)
                return (
                  <div key={reference.name} className={styles.jobMarket.referenceItem}>
                    <span className={styles.jobMarket.referenceName}>{reference.name}</span>
                    {institutions.map((institution) => (
                      <span key={institution} className={styles.jobMarket.referenceInstitution}>{institution}</span>
                    ))}
                    {reference.url && (
                      <a className={styles.jobMarket.referenceLink} href={reference.url} target="_blank" rel="noopener noreferrer">
                        {reference.linkLabel || 'Website ↗'}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </SectionCard>
        )}

        {jobMarket.placementUrl && (
          <SectionCard title="Placement">
            {jobMarket.placementDescription && (
              <p className={styles.jobMarket.cvNote}>{jobMarket.placementDescription}</p>
            )}
            <a className={styles.link} href={jobMarket.placementUrl} target="_blank" rel="noopener noreferrer">
              {jobMarket.placementLabel || 'Placement information ↗'}
            </a>
          </SectionCard>
        )}
      </div>
    </article>
  )
}
