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
          <h2 className="text-[20px] font-semibold mb-3">Working Papers</h2>
          <ul className="list-disc ml-6 space-y-6 text-[16px] font-normal">
            <li>
              <div className="space-y-2">
                <p> Financial Frictions, FX Reserves, and Exchange Rate Management in Emerging Economies {' '}
                  <a
                    href="/papers/reserves2024.pdf"
                    className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover ml-2 font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [PDF]
                  </a> </p>
                <ul className="list-disc ml-6 space-y-1 text-sm text-primary-text dark:text-dark-text opacity-70 dark:opacity-70 font-normal">
                  <li><span className="italic">Revise & Resubmit- Journal of International Economics. </span>
                    </li>
                </ul>



                <details className="group">
                  <summary className="cursor-pointer flex items-center gap-2 text-sm text-primary-text dark:text-dark-text opacity-70 dark:opacity-70 hover:opacity-90 dark:hover:opacity-90 transition-opacity">
                    <span className="transform transition-transform group-open:rotate-180">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                    Abstract
                  </summary>
                  <div className="mt-3 pl-6 text-sm text-primary-text dark:text-dark-text opacity-80 leading-relaxed">
                    <p>
                      Emerging economies, even those with considerable external debt, hold substantial amounts
                      in foreign exchange (FX) reserves. This paper identifies a distinct channel through which
                      financial market frictions explain why net external debtor economies might prefer maintaining
                      reserves to reducing their external debt. In a small open economy with free capital mobility
                      and financial frictions, the model shows that the central bank optimally maintains FX reserves
                      instead of reducing the economy’s external debt. This is because reserve operations influence
                      the exchange rate; specifically, reserve accumulation depreciates the exchange rate, diluting the
                      real value of existing debt payments and minimizing resource losses. Furthermore, the model
                      shows that the optimal reserve accumulation policy under commitment is time-inconsistent
                      as the central bank faces incentives to mitigate the external debt burden. A time-consistent
                      equilibrium features even greater reserve accumulation. Finally, a quantitative analysis of
                      the model demonstrates that in the presence of volatile capital flows, the economy optimally
                      maintains a portfolio of external debt and foreign reserves with FX interventions stabilizing the
                      exchange rate and smoothing consumption.
                    </p>
                  </div>
                </details>
              </div>
            </li>            <li>
              <div className="space-y-2">
                <p>The Transition to Net Zero in a Small Open Economy (with{' '}
                  <a
                    href="https://sites.google.com/site/neilrmehrotra/"
                    className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Neil Mehrotra
                  </a>){' '}

                  <a
                    href="https://drive.google.com/file/d/1t-vdiOhsgqmXOeoc4e9UwTRG7-6BqJsU/view"
                    className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover ml-2 font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [PDF]
                  </a></p>

                <details className="group">
                  <summary className="cursor-pointer flex items-center gap-2 text-sm text-primary-text dark:text-dark-text opacity-70 dark:opacity-70 hover:opacity-90 dark:hover:opacity-90 transition-opacity">
                    <span className="transform transition-transform group-open:rotate-180">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                    Abstract
                  </summary>
                  <div className="mt-3 pl-6 text-sm text-primary-text dark:text-dark-text opacity-80 leading-relaxed">
                    <p>
                      This paper examines the macroeconomic cost and implications of transitioning to net zero
                      for a fossil-fuel dependent, small open economy. A net zero target operates as an anticipated
                      negative productivity shock that lowers consumption, raises the current account surplus along
                      the transition path, and has ambiguous effects on the real exchange rate. A transition to net
                      zero appreciates the currency by lowering the import bill for fossil fuels, but depreciates the
                      currency by making domestic tradables more expensive. We calibrate the model to the case of
                      Japan and find that the transition to net zero lowers consumption by 0.2-2%.
                    </p>
                  </div>
                </details>
              </div>
            </li>
          </ul>
        </section>


        <section className="bg-primary-main dark:bg-dark-surface shadow-md rounded-lg p-6 text-primary-text dark:text-dark-text">
          <h2 className="text-[20px] font-semibold mb-3">Publications</h2>
          <ul className="list-disc ml-6 space-y-6 text-[16px] font-normal">
            <li>
              <div className="space-y-2">
                <p>  {' '}
                  <a
                    href="https://doi.org/10.1108/IGDR-11-2022-0130"
                    className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover ml-2 font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Productivity and real exchange rates for India: does Balassa-Samuelson effect explain?
                  </a>{' '}(with Saurabh Ghosh & Siddhartha Nath)</p>
                <ul className="list-disc ml-6 space-y-1 text-sm text-primary-text dark:text-dark-text opacity-70 dark:opacity-70 font-normal">
                  <li><span className="italic">Indian Growth and Development Review. </span>Vol. 16 No. 1, pp. 41-73, March 2023.</li>
                </ul>



                <details className="group">
                  <summary className="cursor-pointer flex items-center gap-2 text-sm text-primary-text dark:text-dark-text opacity-70 dark:opacity-70 hover:opacity-90 dark:hover:opacity-90 transition-opacity">
                    <span className="transform transition-transform group-open:rotate-180">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                    Abstract
                  </summary>
                  <div className="mt-3 pl-6 text-sm text-primary-text dark:text-dark-text opacity-80 leading-relaxed">
                    <p>
                      This study aims to explore the long-run equilibrium relationship between India’s real exchange rate and sectoral productivity trends using internationally comparable KLEMS databases on productivity for India, China, Euro area, the USA, the UK and Japan. This study uses pooled mean group estimations for panel data suggested by Pesaran et al. (1999). The results find support for an “extended” Balassa–Samuelson (BS) hypothesis which allows labour market frictions that does not allow for wage equalisation between traded and non-traded sectors within a country. This mechanism continues to find some support when we separate out distribution sector that comprises wholesale and retail trade in the domestic services sector. The empirical evidence suggests that India’s real exchange rate is anchored to domestic fundamentals and is closely aligned to its fair value over a medium to long-time horizon.
                    </p>
                  </div>
                </details>
              </div>
            </li>            
            
            
           <li>
              <div className="space-y-2">
                <p>  {' '}
                  <a
                    href="https://doi.org/10.4236/tel.2022.123036"
                    className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover ml-2 font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Labour Disputes and the Manufacturing Sector’s Growth: Recent Evidence from Indian States
                  </a>{' '}(with Siddhartha Nath)</p>
                <ul className="list-disc ml-6 space-y-1 text-sm text-primary-text dark:text-dark-text opacity-70 dark:opacity-70 font-normal">
                  <li><span className="italic">Theoretical Economics Letters. </span>Vol. 12 No. 3, pp. 636-663, June 2022.</li>
                </ul>



                <details className="group">
                  <summary className="cursor-pointer flex items-center gap-2 text-sm text-primary-text dark:text-dark-text opacity-70 dark:opacity-70 hover:opacity-90 dark:hover:opacity-90 transition-opacity">
                    <span className="transform transition-transform group-open:rotate-180">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                    Abstract
                  </summary>
                  <div className="mt-3 pl-6 text-sm text-primary-text dark:text-dark-text opacity-80 leading-relaxed">
                    <p>
                      The persistent variation among Indian states in per-capita value added from manufacturing sector raises the question whether the long-run equilibrium in the manufacturing sector differs across states. In this paper, we provide empirical evidence on whether labour disputes in the form of strikes, lockouts, temporary closure etc., have caused any variation in these equilibria for the recent period. Available data suggests that in 9 out of 16 states in our sample, labour disputes have generally reduced between 2001 and 2017, while in others labour disputes mostly characterised as random shocks with little predictability. Our two-stage least squares estimates using states’ election cycles as instrument for the labour disputes suggest that these labour disputes with little persistence did not have much influence over the inter-state differences in the equilibrium capital-labour ratios in “registered” manufacturing units between 2001 and 2017. However, 1 percent increase in labour disputes might be associated with 3.2 percent reduction in total factor productivity for the sector in states where disputes were random events. In the remaining states, where labour disputes have consistently fallen over time, this effect is significantly reduced. Our findings are robust in different sample of firms.
                    </p>
                  </div>
                </details>
              </div>
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