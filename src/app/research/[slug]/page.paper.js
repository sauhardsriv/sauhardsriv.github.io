import Link from 'next/link'
import { notFound } from 'next/navigation'
import CiteButton from '../../components/CiteButton'
import SectionCard from '../../components/SectionCard'
import { AuthorList, PaperTag } from '../../components/PaperMeta'
import { citationsEnabled, isLocalFile, paperActions, paperBibtex, paperDateCitation, paperDateIso, paperPath, paperUrl } from '../../papers'
import { JsonLd, absoluteUrl, breadcrumbNode, pageUrl, personNode, scholarlyArticleNode } from '../../structuredData'
import { openGraphBase, pages, papers, site, styles } from '../../settings'

export const dynamicParams = false

export function generateStaticParams() {
  return papers.map((paper) => ({ slug: paper.slug }))
}

function findPaper(slug) {
  return papers.find((paper) => paper.slug === slug)
}

// Uses the summary when present, otherwise the abstract cut at a sentence boundary.
function paperDescription(paper) {
  if (paper.summary) return paper.summary
  const sentences = paper.abstract.match(/[^.!?]+[.!?]+/g) || [paper.abstract]
  let text = ''
  for (const sentence of sentences) {
    if ((text + sentence).length > 300) break
    text += sentence
  }
  return (text || paper.abstract.slice(0, 297) + '...').trim()
}

function defined(value) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== ''))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const paper = findPaper(slug)
  if (!paper) return {}

  const description = paperDescription(paper)
  return {
    title: paper.title,
    description,
    keywords: paper.keywords,
    authors: paper.authors.map((name) => defined({ name, url: paper.coauthorLinks?.[name] })),
    alternates: {
      canonical: paperPath(paper),
    },
    openGraph: defined({
      ...openGraphBase,
      type: 'article',
      url: paperPath(paper),
      title: paper.title,
      description,
      publishedTime: paperDateIso(paper),
      authors: paper.authors,
    }),
    // Highwire Press tags read by Google Scholar.
    other: defined({
      citation_title: paper.title,
      citation_author: paper.authors,
      citation_publication_date: paperDateCitation(paper),
      citation_journal_title: paper.venue,
      citation_doi: paper.doi,
      citation_pdf_url: isLocalFile(paper.pdf) ? absoluteUrl(paper.pdf) : undefined,
      citation_abstract_html_url: paperUrl(paper),
      citation_keywords: paper.keywords?.join('; '),
      citation_language: site.language,
    }),
  }
}

export default async function PaperPage({ params }) {
  const { slug } = await params
  const paper = findPaper(slug)
  if (!paper) notFound()

  const actions = paperActions(paper)
  const breadcrumbs = breadcrumbNode([
    { name: pages.home.title, url: pageUrl(pages.home.path) },
    { name: pages.research.title, url: pageUrl(pages.research.path) },
    { name: paper.title, url: paperUrl(paper) },
  ])

  return (
    <article className={styles.page}>
      <JsonLd graph={[personNode(), scholarlyArticleNode(paper), breadcrumbs]} />

      <header className={styles.paperPage.header}>
        <h1 className={styles.pageTitle}>{paper.title}</h1>
        <PaperTag tag={paper.tag} />
        <div className={styles.paperPage.meta}>
          <AuthorList paper={paper} className={styles.paperPage.authors} />
          {paper.venue && (
            <p className={styles.paperPage.citation}>
              <span className={styles.italic}>{paper.venue}. </span>{paper.citation}
            </p>
          )}
          {paper.note && <p className={styles.paperPage.citation}><em>{paper.note}</em></p>}
        </div>
        <div className={styles.paperPage.actions}>
          {actions.map((action, index) => (
            <a
              key={action.label}
              href={action.href}
              className={index === 0 ? styles.buttons.filled : styles.buttons.outlined}
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.label}
            </a>
          ))}
          {citationsEnabled && (
            <CiteButton bibtex={paperBibtex(paper)} title={paper.title} className={styles.buttons.outlined} />
          )}
        </div>
      </header>

      <SectionCard title={pages.paper.abstractTitle}>
        <div className={styles.bodyCopy}>
          <p>{paper.abstract}</p>
        </div>
        {paper.keywords?.length > 0 && (
          <p className={styles.paperPage.keywords}>
            {pages.paper.keywordsLabel}: {paper.keywords.join(', ')}
          </p>
        )}
      </SectionCard>

      <Link href={pages.research.path} className={`${styles.link} ${styles.paperPage.back}`}>
        {pages.paper.backLabel}
      </Link>
    </article>
  )
}
