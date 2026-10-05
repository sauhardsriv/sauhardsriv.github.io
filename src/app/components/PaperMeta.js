import { Fragment } from 'react'
import { jobMarket, labels, site, styles } from '../settings'

function NameList({ names, links }) {
  return names.map((name, index) => {
    const url = links?.[name]
    const separator = index === 0 ? '' : index === names.length - 1 ? ' & ' : ', '
    return (
      <Fragment key={name}>
        {separator}
        {url ? (
          <a href={url} className={styles.link} target="_blank" rel="noopener noreferrer">{name}</a>
        ) : name}
      </Fragment>
    )
  })
}

export function Coauthors({ paper }) {
  const others = paper.authors.filter((author) => author !== site.author)
  if (others.length === 0) return null

  return (
    <p className={styles.paperMeta}>
      {labels.coauthorsPrefix}{' '}
      <NameList names={others} links={paper.coauthorLinks} />
    </p>
  )
}

export function AuthorList({ paper, className }) {
  return (
    <p className={className}>
      <NameList names={paper.authors} links={paper.coauthorLinks} />
    </p>
  )
}

export function PaperTag({ tag }) {
  if (!tag) return null

  const config = typeof tag === 'string' ? { label: tag } : tag
  if (!config.label || (config.jobMarketOnly && !jobMarket.active)) return null

  return <span className={styles.paperTag}>{config.label}</span>
}
