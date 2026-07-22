import SocialIcons from './components/SocialIcons'
import SectionCard from './components/SectionCard'
import ProfileImage from './components/ProfileImage'
import { pages, profile, site, socialLinks, styles } from './settings'

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
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${site.url}/#profile`,
    name: site.name,
    url: site.url,
    description: site.description,
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.author,
      url: site.url,
      jobTitle: profile.title,
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: profile.affiliation,
      },
      worksFor: {
        '@type': 'Organization',
        name: profile.employer,
      },
      knowsAbout: profile.fields,
      description: `${profile.title}; ${profile.jobMarket}; research in ${profile.fields.join(', ')}`,
      sameAs: socialLinks
        .filter((link) => link.type !== 'email' && link.href)
        .map((link) => link.href),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className={styles.homePage}>
        <div className={styles.homeGrid}>
          <aside className={styles.sidebar}>
            <ProfileImage />
            <div className={styles.sidebarDivider}></div>
            <SocialIcons />
          </aside>

          <main className={styles.contentColumn}>
            <SectionCard title="About Me" titleAs="h1" titleClassName={styles.homeTitle}>
              <div className={styles.bodyCopy}>
                {profile.bio.map((para, i) => (
                  <BioParagraph key={i} content={para} />
                ))}
              </div>
            </SectionCard>
          </main>
        </div>
      </article>
    </>
  )
}
