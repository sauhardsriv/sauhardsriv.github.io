import { Fragment } from 'react'
import AbstractDetails from '../components/AbstractDetails'
import FlashLink from '../components/FlashLink'
import SectionCard from '../components/SectionCard'
import { pages, papers, profile, site, socialLinks, styles } from '../settings'

const researchKeywords = Array.from(new Set([
  ...pages.research.keywords,
  ...profile.fields,
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
    url: pages.research.path,
    title: pages.research.title,
    description: pages.research.description,
  },
}

function absoluteUrl(url) {
  if (!url) return undefined
  return url.startsWith('http') ? url : `${site.url}${url}`
}

function cleanObject(value) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined))
}

function personNode(name, url) {
  return cleanObject({
    '@type': 'Person',
    name,
    url,
  })
}

function paperUrl(paper) {
  return `${site.url}${pages.research.path}#${paper.slug}`
}

// Link a paper's title points to: a published DOI, else a PDF, else the first extra link.
function primaryHref(paper) {
  return paper.doiUrl || paper.pdf || paper.links?.[0]?.href || null
}

// Supplementary resources shown next to the abstract toggle (PDF preprint, code, etc.).
function paperActions(paper) {
  const actions = []
  if (paper.pdf && paper.pdf !== primaryHref(paper)) actions.push({ label: 'PDF', href: paper.pdf })
  if (paper.code) actions.push({ label: 'Code', href: paper.code })
  if (paper.links) paper.links.forEach((link) => actions.push(link))
  return actions
}

function buildStructuredData() {
  const publicSocialLinks = socialLinks
    .filter((link) => link.type !== 'email' && link.href)
    .map((link) => link.href)

  const articleNodes = papers.map((paper) => cleanObject({
    '@type': 'ScholarlyArticle',
    '@id': paperUrl(paper),
    name: paper.title,
    headline: paper.title,
    url: paperUrl(paper),
    author: paper.authors.map((author) => personNode(author, paper.coauthorLinks?.[author])),
    abstract: paper.abstract,
    keywords: paper.keywords?.join(', '),
    isAccessibleForFree: true,
    identifier: paper.doi ? `doi:${paper.doi}` : undefined,
    sameAs: [paper.doiUrl, absoluteUrl(paper.pdf), paper.code].filter(Boolean),
    encoding: paper.pdf ? cleanObject({
      '@type': 'MediaObject',
      contentUrl: absoluteUrl(paper.pdf),
      encodingFormat: 'application/pdf',
    }) : undefined,
    publisher: paper.venue ? {
      '@type': 'Organization',
      name: paper.venue,
    } : undefined,
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.author,
        url: site.url,
        jobTitle: profile.title,
        description: `${profile.title}; ${profile.jobMarket}; research in ${profile.fields.join(', ')}`,
        affiliation: {
          '@type': 'CollegeOrUniversity',
          name: profile.affiliation,
        },
        worksFor: {
          '@type': 'Organization',
          name: profile.employer,
        },
        knowsAbout: profile.fields,
        sameAs: publicSocialLinks,
      },
      {
        '@type': 'CollectionPage',
        '@id': `${site.url}${pages.research.path}#webpage`,
        name: `${site.author} Research`,
        url: `${site.url}${pages.research.path}`,
        description: pages.research.description,
        about: { '@id': `${site.url}/#person` },
        mainEntity: { '@id': `${site.url}${pages.research.path}#papers` },
      },
      {
        '@type': 'ItemList',
        '@id': `${site.url}${pages.research.path}#papers`,
        name: `${site.author} research papers`,
        itemListElement: papers.map((paper, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: paperUrl(paper),
          item: { '@id': paperUrl(paper) },
        })),
      },
      ...articleNodes,
    ],
  }
}

function Coauthors({ paper }) {
  const others = paper.authors.filter((author) => author !== site.author)
  if (others.length === 0) return null

  return (
    <p className={styles.paperMeta}>
      With{' '}
      {others.map((name, index) => {
        const url = paper.coauthorLinks?.[name]
        const separator = index === 0 ? '' : index === others.length - 1 ? ' & ' : ', '
        return (
          <Fragment key={name}>
            {separator}
            {url ? (
              <a href={url} className={styles.link} target="_blank" rel="noopener noreferrer">{name}</a>
            ) : name}
          </Fragment>
        )
      })}
    </p>
  )
}

function PaperTitle({ paper }) {
  const href = primaryHref(paper)
  if (!href) {
    return <h3 className={styles.paperTitle}>{paper.title}</h3>
  }
  return (
    <h3 className={styles.paperTitle}>
      <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">{paper.title}</a>
    </h3>
  )
}

function PaperItem({ paper }) {
  const actions = paperActions(paper)
  return (
    <article id={paper.slug} className={styles.paperItem}>
      <div className={styles.itemStack}>
        <PaperTitle paper={paper} />
        <Coauthors paper={paper} />
        {paper.note && <p className={styles.paperSecondary}><em>{paper.note}</em></p>}
        {paper.venue && (
          <p className={styles.paperCitation}>
            <span className={styles.italic}>{paper.venue}. </span>{paper.citation}
          </p>
        )}
        <AbstractDetails
          actions={actions.length > 0 ? actions.map((action) => (
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
          )) : null}
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
  const structuredData = buildStructuredData()
  const featured = papers.filter((paper) => paper.featured)

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className={styles.pageTitle}>Research</h1>

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
