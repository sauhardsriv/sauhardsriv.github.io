// src/app/research/page.js
export const metadata = {
  title: 'Sauhard Srivastava - Research',
  description: 'Research projects and interests in Economics, including current work on financial frictions and exchange rate management',
  keywords: ['research', 'economics', 'macroeconomics', 'monetary economics', 'financial frictions']
}

export default function Research() {
  return (
    <article className="max-w-7xl mx-auto px-8 pt-8 pb-8">
      <h1 className="text-primary-text dark:text-dark-text text-[24px] font-semibold mb-6">Research</h1>
      
      <div className="space-y-8">
        <section className="bg-primary-main dark:bg-dark-surface shadow-md rounded-lg p-6 text-primary-text dark:text-dark-text">
          <h2 className="text-[20px] font-semibold mb-3">Current Projects</h2>
          <ul className="list-disc ml-6 space-y-2 text-[16px] font-normal">
            <li>
              Financial Frictions, FX Reserves, and Exchange Rate Management in Emerging Economies{' '}
              <a 
                href="/papers/reserves2024.pdf" 
                className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover ml-2 font-semibold" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                [PDF]
              </a>
            </li>
          </ul>
        </section>
        
        <section className="bg-primary-main dark:bg-dark-surface shadow-md rounded-lg p-6 text-primary-text dark:text-dark-text">
          <h2 className="text-[20px] font-semibold mb-3">Research Interests</h2>
          <ul className="list-disc ml-6 space-y-2 text-[16px] font-normal">
            <li>Macroeconomics</li>
            <li>International Macroeconomics</li>
            <li>Monetary Economics</li>
            <li>Dynamic General Equilibrium Models</li>
            <li>Portfolio Choice and Asset Pricing</li>
            <li>Heterogenous Agent Models</li>
          </ul>
        </section>
      </div>
    </article>
  )
}