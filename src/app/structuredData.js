import { assets, cv, jobMarket, pages, profile, site, socialLinks } from './settings'
import { paperDateIso, paperPagesEnabled, paperUrl } from './papers'

export const personId = `${site.url}/#person`

export function absoluteUrl(url) {
  if (!url) return undefined
  return /^https?:\/\//.test(url) ? url : `${site.url}${url}`
}

export function pageUrl(path) {
  return path === '/' ? site.url : `${site.url}${path}`
}

function clean(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined && !(Array.isArray(entry) && entry.length === 0))
  )
}

export const publicSocialLinks = socialLinks
  .filter((link) => link.type !== 'email' && link.href)
  .map((link) => link.href)

export function personNode() {
  const schools = [...new Set((cv?.education || []).map((entry) => entry.institution).filter(Boolean))]
  return clean({
    '@type': 'Person',
    '@id': personId,
    name: site.author,
    url: site.url,
    image: absoluteUrl(assets.socialImage || assets.profileImage),
    jobTitle: profile.title,
    description: [
      profile.title,
      jobMarket.active ? profile.jobMarket : undefined,
      profile.fields?.length ? `research in ${profile.fields.join(', ')}` : undefined,
    ].filter(Boolean).join('; '),
    affiliation: profile.affiliation
      ? clean({ '@type': 'CollegeOrUniversity', name: profile.affiliation, url: profile.affiliationUrl })
      : undefined,
    worksFor: profile.employer
      ? clean({ '@type': 'Organization', name: profile.employer, url: profile.employerUrl })
      : undefined,
    alumniOf: schools.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
    knowsAbout: profile.fields,
    sameAs: publicSocialLinks,
  })
}

export function profilePageNode(page) {
  return {
    '@type': 'ProfilePage',
    '@id': `${pageUrl(page.path)}#webpage`,
    name: page.path === '/' ? site.name : `${page.title} | ${site.name}`,
    url: pageUrl(page.path),
    description: page.description,
    mainEntity: { '@id': personId },
  }
}

export function scholarlyArticleNode(paper) {
  return clean({
    '@type': 'ScholarlyArticle',
    '@id': paperUrl(paper),
    name: paper.title,
    headline: paper.title,
    url: paperUrl(paper),
    author: paper.authors.map((author) => (
      author === site.author
        ? { '@id': personId }
        : clean({ '@type': 'Person', name: author, url: paper.coauthorLinks?.[author] })
    )),
    datePublished: paperDateIso(paper),
    abstract: paper.abstract,
    keywords: paper.keywords?.join(', '),
    inLanguage: site.language,
    isAccessibleForFree: true,
    identifier: paper.doi ? `doi:${paper.doi}` : undefined,
    sameAs: paper.doiUrl,
    isPartOf: paper.venue ? { '@type': 'Periodical', name: paper.venue } : undefined,
    encoding: paper.pdf ? {
      '@type': 'MediaObject',
      contentUrl: absoluteUrl(paper.pdf),
      encodingFormat: 'application/pdf',
    } : undefined,
    subjectOf: paper.slides ? {
      '@type': 'PresentationDigitalDocument',
      name: `Slides: ${paper.title}`,
      url: absoluteUrl(paper.slides),
    } : undefined,
    mainEntityOfPage: paperPagesEnabled ? paperUrl(paper) : undefined,
  })
}

export function researchCollectionNode(papers) {
  return {
    '@type': 'CollectionPage',
    '@id': `${pageUrl(pages.research.path)}#webpage`,
    name: `${pages.research.title} | ${site.name}`,
    url: pageUrl(pages.research.path),
    description: pages.research.description,
    about: { '@id': personId },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: papers.map((paper, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: paperUrl(paper),
      })),
    },
  }
}

export function breadcrumbNode(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Serializes a JSON-LD graph; "<" is escaped so content can never close the script element.
export function JsonLd({ graph }) {
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
