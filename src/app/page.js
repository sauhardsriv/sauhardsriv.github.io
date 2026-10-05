import Link from 'next/link'
import SocialIcons from './components/SocialIcons'
import SectionCard from './components/SectionCard'
import ProfileImage from './components/ProfileImage'
import { JsonLd, personNode, profilePageNode } from './structuredData'
import { jobMarket, openGraphBase, pages, profile, site, styles } from './settings'

export const metadata = {
  title: {
    absolute: site.name,
  },
  description: pages.home.description,
  keywords: pages.home.keywords,
  alternates: {
    canonical: pages.home.path,
  },
  openGraph: {
    ...openGraphBase,
    url: pages.home.path,
    title: site.name,
    description: pages.home.description,
  },
}

function BioParagraph({ content }) {
  if (typeof content === 'string') return <p>{content}</p>
  return (
    <p>
      {content.map((seg, i) =>
        typeof seg === 'string' ? seg :
        seg.bold ? <strong key={i}>{seg.text}</strong> :
        <a key={i} className={styles.link} href={seg.href} target="_blank" rel="noopener noreferrer">{seg.text}</a>
      )}
    </p>
  )
}

export default function Home() {
  return (
    <>
      <JsonLd graph={[personNode(), profilePageNode(pages.home)]} />

      <article className={styles.homePage}>
        <div className={styles.homeGrid}>
          <aside className={styles.sidebar}>
            <ProfileImage />
            <div className={styles.sidebarDivider}></div>
            <SocialIcons />
          </aside>

          <div className={styles.contentColumn}>
            <SectionCard title={pages.home.heading} titleAs="h1" titleClassName={styles.homeTitle}>
              <div className={styles.bodyCopy}>
                {(profile.bio || []).map((para, i) => (
                  <BioParagraph key={i} content={para} />
                ))}
                {jobMarket.active && jobMarket.homeStatus && jobMarket.homeLink && (
                  <p>
                    <strong>
                      {jobMarket.homeStatus}{' '}
                      {jobMarket.homeLink.text}{' '}
                      <Link className={styles.link} href={pages.jobMarket.path}>
                        {jobMarket.homeLink.label}
                      </Link>
                      .
                    </strong>
                  </p>
                )}
              </div>
            </SectionCard>
          </div>
        </div>
      </article>
    </>
  )
}
