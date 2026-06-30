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
                <p>
                  Welcome to my academic webpage. I am a PhD candidate in Economics at the{' '}
                  <a
                    href="https://cla.umn.edu/economics"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    University of Minnesota
                  </a>{' '}
                  and a Research Analyst at the{' '}
                  <a
                    href="https://www.minneapolisfed.org/economic-research"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Federal Reserve Bank of Minneapolis
                  </a>
                  {'. '}
                  <strong>I am on the 2026-27 economics job market.</strong>
                </p>
                <p>
                  My primary research interests include macroeconomics, international economics, and monetary economics with a particular focus on financial markets and theory-informed optimal policy analysis in dynamic general equilibrium models. My current research incorporates financial frictions, exchange rate dynamics, and household heterogeneity to examine how these features shape equilibrium outcomes.
                </p>
              </div>
            </SectionCard>
          </main>
        </div>
      </article>
    </>
  )
}
