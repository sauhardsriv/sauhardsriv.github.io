// src/app/research/page.js
import AbstractDetails from '../components/AbstractDetails'
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
    datePublished: paper.year,
    isAccessibleForFree: true,
    identifier: paper.doi ? `doi:${paper.doi}` : undefined,
    sameAs: [paper.doiUrl, absoluteUrl(paper.pdf)].filter(Boolean),
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

function paperBySlug(slug) {
  return papers.find((paper) => paper.slug === slug)
}

function FeaturedPaper({ paper }) {
  return (
    <div className={styles.featuredItem}>
      <p className={styles.featuredLabel}>{paper.highlightLabel}</p>
      <h3 className={styles.featuredTitle}>
        <a href={`#${paper.slug}`} className={styles.link}>
          {paper.title}
        </a>
      </h3>
      <p className={styles.featuredSummary}>{paper.summary}</p>
    </div>
  )
}

export default function Research() {
  const structuredData = buildStructuredData()
  const importPriceSpikes = paperBySlug('import-price-spikes-exchange-rates')
  const reserves = paperBySlug('financial-frictions-fx-reserves-exchange-rate-management')
  const netZero = paperBySlug('net-zero-small-open-economy')
  const priceOfQuality = paperBySlug('price-of-quality-penn-effect')
  const productivity = paperBySlug('productivity-real-exchange-rates-india-balassa-samuelson')
  const labourDisputes = paperBySlug('labour-disputes-manufacturing-growth-indian-states')

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className={styles.pageTitle}>Research</h1>

      <div className={styles.sectionStack}>
        <SectionCard title="Featured">
          <div className={styles.featuredList}>
            <FeaturedPaper paper={importPriceSpikes} />
            <FeaturedPaper paper={reserves} />
          </div>
        </SectionCard>

        <SectionCard title="Working Papers">
          <div className={styles.paperList}>
            <article id={importPriceSpikes.slug} className={styles.paperItem}>
              <div className={styles.itemStack}>
                <h3 className={styles.paperTitle}>
                  Import Price Spikes and Real Income Stabilization through Exchange Rates in a Heterogeneous Agent Economy
                </h3>
                <p className={styles.paperSecondary}><em>Draft Available Soon</em></p>

                <AbstractDetails>
                  <p>{importPriceSpikes.abstract}</p>
                </AbstractDetails>
              </div>
            </article>

            <article id={netZero.slug} className={styles.paperItem}>
              <div className={styles.itemStack}>
                <h3 className={styles.paperTitle}>
                  <a
                    href="https://drive.google.com/file/d/1t-vdiOhsgqmXOeoc4e9UwTRG7-6BqJsU/view"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download PDF: The Transition to Net Zero in a Small Open Economy"
                  >
                    The Transition to Net Zero in a Small Open Economy
                  </a>
                </h3>
                <p className={styles.paperMeta}>
                  With{' '}
                  <a
                    href="https://sites.google.com/site/neilrmehrotra/"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Neil Mehrotra
                  </a>
                </p>

                <AbstractDetails>
                  <p>{netZero.abstract}</p>
                </AbstractDetails>
              </div>
            </article>

            <article id={priceOfQuality.slug} className={styles.paperItem}>
              <div className={styles.itemStack}>
                <h3 className={styles.paperTitle}>
                  <a
                    href="/papers/hbs_new2025.pdf"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download PDF: The Price of Quality: Demand-Driven Technology Choice and the Penn Effect"
                  >
                    The Price of Quality: Demand-Driven Technology Choice and the Penn Effect
                  </a>
                </h3>

                <AbstractDetails>
                  <p>{priceOfQuality.abstract}</p>
                </AbstractDetails>
              </div>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Publications">
          <div className={styles.paperList}>
            <article id={reserves.slug} className={styles.paperItem}>
              <div className={styles.itemStack}>
                <h3 className={styles.paperTitle}>
                  <a
                    href="https://doi.org/10.1016/j.jinteco.2026.104282"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Financial Frictions, FX Reserves, and Exchange Rate Management in Emerging Economies
                  </a>
                </h3>
                <p className={styles.paperCitation}>
                  <span className={styles.italic}>Journal of International Economics. </span>Vol. 162, Article 104282, August 2026.
                </p>
                <AbstractDetails
                  prefix={(
                    <a
                      href="/papers/reserves2024.pdf"
                      className={`${styles.link} font-semibold`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download pre-print PDF: Financial Frictions, FX Reserves, and Exchange Rate Management in Emerging Economies"
                    >
                      PDF
                    </a>
                  )}
                >
                  <p>{reserves.abstract}</p>
                </AbstractDetails>
              </div>
            </article>

            <article id={productivity.slug} className={styles.paperItem}>
              <div className={styles.itemStack}>
                <h3 className={styles.paperTitle}>
                  <a
                    href="https://doi.org/10.1108/IGDR-11-2022-0130"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Productivity and real exchange rates for India: does Balassa-Samuelson effect explain?
                  </a>
                </h3>
                <p className={styles.paperMeta}>
                  With Saurabh Ghosh & Siddhartha Nath
                </p>
                <p className={styles.paperCitation}>
                  <span className={styles.italic}>Indian Growth and Development Review. </span>Vol. 16 No. 1, pp. 41-73, March 2023.
                </p>

                <AbstractDetails>
                  <p>{productivity.abstract}</p>
                </AbstractDetails>
              </div>
            </article>

            <article id={labourDisputes.slug} className={styles.paperItem}>
              <div className={styles.itemStack}>
                <h3 className={styles.paperTitle}>
                  <a
                    href="https://doi.org/10.4236/tel.2022.123036"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Labour Disputes and the Manufacturing Sector’s Growth: Recent Evidence from Indian States
                  </a>
                </h3>
                <p className={styles.paperMeta}>With Siddhartha Nath</p>
                <p className={styles.paperCitation}>
                  <span className={styles.italic}>Theoretical Economics Letters. </span>Vol. 12 No. 3, pp. 636-663, June 2022.
                </p>
                <AbstractDetails>
                  <p>{labourDisputes.abstract}</p>
                </AbstractDetails>
              </div>
            </article>
          </div>
        </SectionCard>
      </div>
    </article>
  )
}
