// src/app/page.js
import Image from 'next/image'
import SocialIcons from './components/SocialIcons'

export const metadata = {
  title: 'Sauhard Srivastava',
  description: 'Academic portfolio and research work in Economics',
  keywords: ['economics', 'research', 'macroeconomics', 'policy analysis'],
}

export default function Home() {
  return (
    <article className="flex flex-col space-y-8 max-w-7xl mx-auto px-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 pt-16">
        {/* Left Panel with Profile Picture */}
        <aside className="w-full lg:w-1/4 flex flex-col items-center">
          <div className="w-36 h-36 md:w-48 md:h-48 relative rounded-full overflow-hidden 
            shadow-[0_4px_16px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_16px_rgba(255,255,255,0.15)]
            hover:shadow-[0_12px_28px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_12px_28px_rgba(255,255,255,0.2)]
            transform transition-all duration-300 hover:-translate-y-4 mb-6"
          >
            <Image
              src="/profile.png"
              alt="Profile Picture"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 144px, 192px"
            />
          </div>

          {/* Divider */}
          <div className="w-32 h-px bg-primary-text dark:bg-dark-text opacity-20 dark:opacity-40 mt-4 mb-2"></div>

          {/* Social Icons - Client Component */}
          <SocialIcons />
        </aside>

        {/* Right Content Panel */}
        <main className="w-full lg:w-3/4">
          <section className="bg-primary-main dark:bg-dark-surface shadow-md rounded-lg p-6 text-primary-text dark:text-dark-text">
            <h1 className="text-primary-text dark:text-dark-text text-2xl font-semibold mb-4">
              About Me
            </h1>
            <div className="text-primary-text dark:text-dark-text text-justify leading-[1.9] space-y-4">
              <p>
                I am a PhD Candidate in Economics at the{' '}
                <a 
                  href="https://cla.umn.edu/economics" 
                  className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  University of Minnesota
                </a>{' '}
                and a Research Analyst at the{' '}
                <a 
                  href="https://www.minneapolisfed.org/economic-research" 
                  className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Federal Reserve Bank of Minneapolis
                </a>. 
              </p>
              <p>
                My research interests lie in Macroeconomics, International Economics, and Monetary Economics, 
                with particular focus on international financial markets and theory-informed policy analysis. 
                My current research focuses on theoretical modeling with empirical analysis to study how 
                financial frictions and market imperfections shape macroeconomic outcomes and policy choices 
                in open economies.
              </p>
            </div>
          </section>
        </main>
      </div>
    </article>
  )
}