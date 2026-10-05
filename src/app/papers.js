import siteSettings, { labels, pages, site } from './settings'

export const paperPagesEnabled = siteSettings.features?.paperPages === true
export const citationsEnabled = siteSettings.features?.citations === true

// The paper page when paper pages are enabled, otherwise the paper's anchor on the Research page.
export function paperPath(paper) {
  return paperPagesEnabled
    ? `${pages.research.path}/${paper.slug}`
    : `${pages.research.path}#${paper.slug}`
}

export function paperUrl(paper) {
  return `${site.url}${paperPath(paper)}`
}

// paper.date accepts YYYY, YYYY-MM, or YYYY-MM-DD.
export function paperDateIso(paper) {
  return /^\d{4}(-\d{2}(-\d{2})?)?$/.test(paper.date || '') ? paper.date : undefined
}

// Formats paper.date for display in the site locale, to the precision given (for example "October 2026").
export function formatPaperDate(paper) {
  const iso = paperDateIso(paper)
  if (!iso) return undefined
  const [year, month, day] = iso.split('-').map(Number)
  const options = { year: 'numeric', timeZone: 'UTC', ...(month && { month: 'long' }), ...(day && { day: 'numeric' }) }
  return new Intl.DateTimeFormat((site.locale || 'en-US').replace('_', '-'), options)
    .format(new Date(Date.UTC(year, (month || 1) - 1, day || 1)))
}

// Google Scholar expects slash-separated dates.
export function paperDateCitation(paper) {
  return paperDateIso(paper)?.replace(/-/g, '/')
}

export function isLocalFile(href) {
  return Boolean(href) && href.startsWith('/')
}

const bibtexStopWords = ['the', 'and', 'for', 'with', 'from', 'does']

const bibtexMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

function bibtexEscape(text) {
  return text.replace(/([&%$#_])/g, '\\$1')
}

// "Given Family" becomes "Family, Given" so BibTeX sorts and abbreviates names correctly.
function bibtexName(name) {
  const parts = name.trim().split(/\s+/)
  return parts.length > 1 ? `${parts.pop()}, ${parts.join(' ')}` : name
}

// Returns paper.bibtex when supplied; otherwise builds an entry from the paper's data. Volume,
// number, and pages are read from `citation` strings such as "Vol. 16 No. 1, pp. 41-73".
export function paperBibtex(paper) {
  if (paper.bibtex) return paper.bibtex.trim()

  const [year, month] = (paperDateIso(paper) || '').split('-')
  const surname = bibtexName(paper.authors[0]).split(',')[0].toLowerCase().replace(/[^a-z]/g, '')
  const firstWord = paper.title.toLowerCase().match(/[a-z]{3,}/g)?.find((word) => !bibtexStopWords.includes(word)) || 'paper'
  const citation = paper.citation || ''
  const pages = citation.match(/pp?\.\s*(\d+)\s*[-–]\s*(\d+)/i)
  const pdfUrl = paper.pdf && (/^https?:\/\//.test(paper.pdf) ? paper.pdf : `${site.url}${paper.pdf}`)
  const isArticle = paper.section === 'publications' && paper.venue

  const fields = [
    ['author', paper.authors.map(bibtexName).join(' and ')],
    ['title', `{${paper.title}}`],
    isArticle && ['journal', paper.venue],
    ['year', year],
    ['month', month && bibtexMonths[Number(month) - 1]],
    isArticle && ['volume', citation.match(/Vol\.?\s*(\d+)/i)?.[1]],
    isArticle && ['number', citation.match(/No\.?\s*(\d+)/i)?.[1]],
    isArticle && ['pages', pages ? `${pages[1]}--${pages[2]}` : citation.match(/Article\s+(\w+)/i)?.[1]],
    ['doi', paper.doi],
    !isArticle && ['note', labels.workingPaperNote],
    ['url', paper.doiUrl || pdfUrl || paperUrl(paper)],
  ].filter((field) => field && field[1])

  const body = fields
    .map(([key, value]) => `  ${key} = ${key === 'month' ? value : `{${key === 'url' || key === 'doi' ? value : bibtexEscape(value)}}`}`)
    .join(',\n')
  return `@${isArticle ? 'article' : 'unpublished'}{${surname}${year || ''}${firstWord},\n${body}\n}`
}

// Builds the ordered resource list shown for each paper.
export function paperActions(paper) {
  const actions = []
  const addAction = (label, href) => {
    if (href && !actions.some((action) => action.href === href)) actions.push({ label, href })
  }

  if (paper.section === 'publications') addAction(labels.paperActions.journal, paper.doiUrl)
  addAction(labels.paperActions.pdf, paper.pdf)
  addAction(labels.paperActions.slides, paper.slides)
  addAction(labels.paperActions.code, paper.code)
  paper.links?.forEach((link) => addAction(link.label, link.href))
  return actions
}
