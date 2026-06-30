import { styles } from '../settings'

export default function AbstractDetails({ children, prefix = null }) {
  const icon = (
    <span className={styles.details.icon}>
      <svg className={styles.details.iconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  )

  return (
    <details className={styles.details.root}>
      <summary className={styles.details.summary}>
        {prefix ? (
          <>
            <span className={styles.details.prefix}>{prefix}</span>
            <span className={styles.details.separator} aria-hidden="true">|</span>
            <span className={styles.details.control}>
              <span>Abstract</span>
              {icon}
            </span>
          </>
        ) : (
          <span className={styles.details.control}>
            <span>Abstract</span>
            {icon}
          </span>
        )}
      </summary>
      <div className={styles.details.content}>
        {children}
      </div>
    </details>
  )
}
