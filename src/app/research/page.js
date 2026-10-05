import Link from 'next/link'
import AbstractDetails from '../components/AbstractDetails'
import CiteButton from '../components/CiteButton'
import FlashLink from '../components/FlashLink'
import SectionCard from '../components/SectionCard'
import { Coauthors, PaperTag } from '../components/PaperMeta'
import { citationsEnabled, paperActions, paperBibtex, paperPagesEnabled, paperPath } from '../papers'
import { JsonLd, personNode, researchCollectionNode, scholarlyArticleNode } from '../structuredData'
import { openGraphBase, pages, papers, profile, styles } from '../settings'

const researchKeywords = Array.from(new Set([
  ...pages.research.keywords,
  ...(profile.fields || []),
  ...papers.flatMap((paper) => paper.keywords || []),
]))

export const metadata = {
  title: pages.research.title,
  description: pages.research.description,
  keywords: researchKeywords,
  alternates: {
    canonical: pages.research.path,
  },
  openGraph: {
    ...openGraphBase,
    url: pages.research.path,
    title: pages.research.title,
    description: pages.research.description,
  },
}

function PaperItem({ paper }) {
  const actions = paperActions(paper)
  return (
    <article id={paper.slug} className={styles.paperItem}>
      <div className={styles.itemStack}>
        <div className={styles.paperHeadingRow}>
          <h3 className={styles.paperTitle}>
            {paperPagesEnabled
              ? <Link href={paperPath(paper)} className={styles.paperTitleLink}>{paper.title}</Link>
              : paper.title}
          </h3>
          <PaperTag tag={paper.tag} />
        </div>
        <Coauthors paper={paper} />
        {paper.note && <p className={styles.paperSecondary}><em>{paper.note}</em></p>}
        {paper.venue && (
          <p className={styles.paperCitation}>
            <span className={styles.italic}>{paper.venue}. </span>{paper.citation}
          </p>
        )}
        <AbstractDetails
          actions={[
            ...actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={styles.actionLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${action.label}: ${paper.title}`}
              >
                {action.label}
              </a>
            )),
            ...(citationsEnabled
              ? [<CiteButton key="cite" bibtex={paperBibtex(paper)} title={paper.title} className={styles.actionButton} />]
              : []),
          ]}
        >
          <p>{paper.abstract}</p>
        </AbstractDetails>
      </div>
    </article>
  )
}

function FeaturedPaper({ paper }) {
  return (
    <div className={styles.featuredItem}>
      <p className={styles.featuredLabel}>{paper.highlightLabel}</p>
      <h3 className={styles.featuredTitle}>
        <FlashLink targetId={paper.slug} className={styles.link}>{paper.title}</FlashLink>
      </h3>
      {paper.venue && (
        <p className={styles.featuredVenue}>
          <span className={styles.featuredVenueName}>{paper.venue}</span>
          {paper.featuredNote ? ` · ${paper.featuredNote}` : ''}
        </p>
      )}
      <p className={styles.featuredSummary}>{paper.summary}</p>
    </div>
  )
}

export default function Research() {
  const featured = papers.filter((paper) => paper.featured)

  return (
    <article className={styles.page}>
      <JsonLd graph={[personNode(), researchCollectionNode(papers), ...papers.map(scholarlyArticleNode)]} />

      <h1 className={styles.pageTitle}>{pages.research.title}</h1>

      <div className={styles.sectionStack}>
        {featured.length > 0 && (
          <SectionCard title={pages.research.featuredTitle} className={styles.featuredCard}>
            <div className={styles.featuredList}>
              {featured.map((paper) => (
                <FeaturedPaper key={paper.slug} paper={paper} />
              ))}
            </div>
          </SectionCard>
        )}

        {pages.research.sections.map((section) => {
          const items = papers.filter((paper) => paper.section === section.key)
          if (items.length === 0) return null
          return (
            <SectionCard key={section.key} title={section.title}>
              <div className={styles.paperList}>
                {items.map((paper) => (
                  <PaperItem key={paper.slug} paper={paper} />
                ))}
              </div>
            </SectionCard>
          )
        })}
      </div>
    </article>
  )
}
