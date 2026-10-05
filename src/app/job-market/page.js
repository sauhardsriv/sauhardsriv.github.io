import { notFound } from 'next/navigation'
import Image from 'next/image'
import MaterialSymbol from '../components/MaterialSymbol'
import ContactLinks from '../components/ContactLinks'
import SectionCard from '../components/SectionCard'
import { formatPaperDate } from '../papers'
import { JsonLd, personNode, profilePageNode, scholarlyArticleNode } from '../structuredData'
import { jobMarket, labels, openGraphBase, pages, papers, styles } from '../settings'

const jmp = papers.find((paper) => paper.slug === jobMarket.jmpSlug)

export const metadata = {
  title: pages.jobMarket.title,
  description: pages.jobMarket.description,
  keywords: pages.jobMarket.keywords,
  alternates: {
    canonical: pages.jobMarket.path,
  },
  openGraph: {
    ...openGraphBase,
    url: pages.jobMarket.path,
    title: pages.jobMarket.title,
    description: pages.jobMarket.description,
  },
  ...(!jobMarket.active && { robots: { index: false, follow: true } }),
}

function PaperFeatureMedia({ paper }) {
  if (paper.featuredImage) {
    return (
      <Image
        src={paper.featuredImage}
        alt={paper.featuredImageAlt || `${labels.imagePreviewPrefix} ${paper.title}`}
        fill
        sizes="(max-width: 767px) 100vw, 32vw"
        className={styles.jobMarket.paperImage}
      />
    )
  }

  return (
    <div className={styles.jobMarket.paperImagePlaceholder} role="img" aria-label={pages.jobMarket.imagePlaceholderLabel}>
      <MaterialSymbol name="image" className={styles.jobMarket.paperImagePlaceholderIcon} />
      <span className={styles.jobMarket.paperImagePlaceholderLabel}>{pages.jobMarket.imagePlaceholderLabel}</span>
    </div>
  )
}

export default function JobMarket() {
  if (!jobMarket.active || !jmp) notFound()
  const paperPdf = jobMarket.jmpPdf || jmp.pdf
  const paperVersion = formatPaperDate(jmp)
  const fields = jobMarket.fields || []

  return (
    <article className={styles.page}>
      <JsonLd graph={[personNode(), profilePageNode(pages.jobMarket), scholarlyArticleNode(jmp)]} />

      <h1 className={styles.pageTitle}>{pages.jobMarket.heading}</h1>

      <div className={styles.sectionStack}>
        {(jobMarket.pitch || fields.length > 0) && (
          <SectionCard title={pages.jobMarket.overviewTitle}>
            {jobMarket.pitch && (
              <div className={styles.bodyCopy}>
                <p>{jobMarket.pitch}</p>
              </div>
            )}
            {fields.length > 0 && (
              <p className={styles.jobMarket.fieldsLine}>
                <span className={styles.jobMarket.fieldsLabel}>{pages.jobMarket.fieldsLabel}:</span>{' '}
                {fields.join(', ')}
              </p>
            )}
          </SectionCard>
        )}

        <SectionCard
          title={pages.jobMarket.paperTitle}
          className={styles.jobMarket.paperCard}
          titleAside={paperVersion && (
            <p className={styles.jobMarket.version}>{pages.jobMarket.versionLabel}: {paperVersion}</p>
          )}
        >
          <div className={styles.jobMarket.paperFeatureGrid}>
            <div className={styles.jobMarket.paperMedia}>
              <PaperFeatureMedia paper={jmp} />
            </div>

            <div className={styles.jobMarket.paperFeatureBody}>
              <h3 className={styles.jobMarket.paperTitle}>{jmp.title}</h3>
              <div className={styles.jobMarket.abstractWrap}>
                <p className={styles.jobMarket.abstractText}>{jmp.abstract}</p>
              </div>
            </div>
          </div>

          <div className={styles.jobMarket.paperFooter}>
            {(paperPdf || jmp.slides) && (
              <div className={styles.jobMarket.paperActions}>
                {paperPdf && (
                  <a className={styles.buttons.filled} href={paperPdf} target="_blank" rel="noopener noreferrer">
                    {pages.jobMarket.paperDownloadLabel}
                  </a>
                )}
                {jmp.slides && (
                  <a className={styles.buttons.outlined} href={jmp.slides} target="_blank" rel="noopener noreferrer">
                    {pages.jobMarket.slidesLabel}
                  </a>
                )}
              </div>
            )}
            <a className={`${styles.link} ${styles.jobMarket.researchLink}`} href={pages.research.path}>{pages.jobMarket.researchLinkLabel}</a>
          </div>
        </SectionCard>

        {jobMarket.cvPdf && (
          <SectionCard title={pages.jobMarket.cvTitle}>
            {jobMarket.cvDescription && (
              <p className={styles.jobMarket.cvNote}>{jobMarket.cvDescription}</p>
            )}
            <div className={styles.jobMarket.actions}>
              <a className={styles.buttons.filled} href={jobMarket.cvPdf} target="_blank" rel="noopener noreferrer">
                {pages.jobMarket.cvDownloadLabel}
              </a>
            </div>
          </SectionCard>
        )}

        {jobMarket.references?.length > 0 && (
          <SectionCard title={pages.jobMarket.referencesTitle}>
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
                        {reference.linkLabel || labels.referenceLink}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </SectionCard>
        )}

        {jobMarket.placementUrl && (
          <SectionCard title={pages.jobMarket.placementTitle}>
            {jobMarket.placementDescription && (
              <p className={styles.jobMarket.cvNote}>{jobMarket.placementDescription}</p>
            )}
            <a className={styles.link} href={jobMarket.placementUrl} target="_blank" rel="noopener noreferrer">
              {jobMarket.placementLabel || labels.placementLink}
            </a>
          </SectionCard>
        )}

        {jobMarket.contact && (
          <SectionCard title={pages.jobMarket.contactTitle}>
            <ContactLinks email={jobMarket.contact} />
          </SectionCard>
        )}
      </div>
    </article>
  )
}
