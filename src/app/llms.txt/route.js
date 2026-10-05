import { assets, jobMarket, pages, papers, profile, site, socialLinks } from '../settings'
import { paperDateIso, paperUrl } from '../papers'
import { absoluteUrl, pageUrl } from '../structuredData'

export const dynamic = 'force-static'

function paperEntry(paper) {
  const details = [
    paper.authors.join(', '),
    paper.venue && [paper.venue, paper.citation].filter(Boolean).join(', '),
    paperDateIso(paper),
  ].filter(Boolean).join('. ')
  const resources = [
    paper.pdf && `PDF: ${absoluteUrl(paper.pdf)}`,
    paper.slides && `Slides: ${absoluteUrl(paper.slides)}`,
    paper.doiUrl && `DOI: ${paper.doiUrl}`,
    paper.code && `Code: ${paper.code}`,
  ].filter(Boolean)

  return [
    `- [${paper.title}](${paperUrl(paper)}): ${details}`,
    ...resources.map((line) => `  - ${line}`),
    `  - Abstract: ${paper.abstract}`,
  ].join('\n')
}

// Builds /llms.txt (llmstxt.org) from content.js at build time. Email addresses are omitted.
function buildLlmsTxt() {
  const about = [
    [profile.title, profile.affiliation].filter(Boolean).join(', '),
    profile.employer,
    profile.fields?.length ? `Research fields: ${profile.fields.join(', ')}` : undefined,
    jobMarket.active ? jobMarket.homeStatus?.replace(/\.$/, '') : undefined,
    jobMarket.active && jobMarket.fields?.length ? `Job market fields: ${jobMarket.fields.join(', ')}` : undefined,
  ].filter(Boolean).join('. ') + '.'

  const pageLinks = [
    pages.home,
    pages.research,
    pages.cv,
    ...(jobMarket.active ? [pages.jobMarket] : []),
  ].map((page) => `- [${page.title}](${pageUrl(page.path)}): ${page.description}`)
  if (assets.cvPdf) pageLinks.push(`- [${pages.cv.heading} (PDF)](${absoluteUrl(assets.cvPdf)})`)

  const research = pages.research.sections
    .map((section) => {
      const items = papers.filter((paper) => paper.section === section.key)
      return items.length ? [`### ${section.title}`, '', ...items.map(paperEntry)].join('\n') : ''
    })
    .filter(Boolean)

  const profiles = socialLinks
    .filter((link) => link.type !== 'email' && link.href)
    .map((link) => `- [${link.label}](${link.href})`)

  const usage = site.crawlers?.aiTraining === false
    ? ['## Usage', '', 'AI assistants may read, summarize, and cite this site with attribution. Content is not licensed for model training.']
    : []

  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    about,
    '',
    '## Pages',
    '',
    ...pageLinks,
    '',
    `## ${pages.research.title}`,
    '',
    research.join('\n\n'),
    '',
    ...(profiles.length ? ['## Profiles', '', ...profiles, ''] : []),
    ...usage,
    '',
  ].join('\n')
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
