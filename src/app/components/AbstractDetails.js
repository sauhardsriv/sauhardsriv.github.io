import { Fragment } from 'react'
import MaterialSymbol from './MaterialSymbol'
import { labels, styles } from '../settings'

export default function AbstractDetails({ children, actions = null, prefix = null }) {
  const items = actions || (prefix ? [prefix] : [])

  const icon = (
    <span className={styles.details.icon}>
      <MaterialSymbol name="expand_more" className={styles.details.iconSvg} />
    </span>
  )

  return (
    <details className={styles.details.root}>
      <summary className={styles.details.summary}>
        {items.map((item, index) => (
          <Fragment key={index}>
            <span className={styles.details.prefix}>{item}</span>
            <span className={styles.details.separator} aria-hidden="true">|</span>
          </Fragment>
        ))}
        <span className={styles.details.control}>
          <span>{labels.abstract}</span>
          {icon}
        </span>
      </summary>
      <div className={styles.details.content}>
        {children}
      </div>
    </details>
  )
}
