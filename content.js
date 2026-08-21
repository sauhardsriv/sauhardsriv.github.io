// ─────────────────────────────────────────────────────────────────────────────
//  USER CONTENT
//  Edit this file to personalise the site. No other file needs to be touched
//  for normal use. See README.md for field-by-field documentation.
// ─────────────────────────────────────────────────────────────────────────────

// Set to false after the job market cycle ends — hides the page and navbar link.
const jobMarketActive = true

const content = {

  // ── Site identity ────────────────────────────────────────────────────────
  site: {
    name: 'Sauhard Srivastava',
    url: 'https://sauhardsriv.github.io',
    author: 'Sauhard Srivastava',
    locale: 'en_US',
    description: 'Academic portfolio and research work in economics by Sauhard Srivastava, PhD candidate in Economics at the University of Minnesota',
    keywords: ['Sauhard Srivastava', 'economics job market', '2026-2027 economics job market', 'macroeconomics', 'international macroeconomics', 'monetary economics', 'exchange rates', 'financial frictions'],
    license: {
      label: 'CC BY-NC 4.0',
      url: 'https://creativecommons.org/licenses/by-nc/4.0/',
    },
  },

  // ── Profile ──────────────────────────────────────────────────────────────
  profile: {
    title: 'PhD candidate in Economics',
    affiliation: 'University of Minnesota',
    affiliationUrl: 'https://cla.umn.edu/economics',
    employer: 'Federal Reserve Bank of Minneapolis',
    employerUrl: 'https://www.minneapolisfed.org/economic-research',
    jobMarket: '2026-2027 economics job market',
    fields: [
      'Macroeconomics',
      'International Macroeconomics',
      'Monetary Economics',
      'Exchange Rates',
      'Financial Frictions',
      'Heterogeneous Agent Models',
    ],
    // About Me bio. Each entry is a paragraph: a plain string or an array of segments.
    // Segment types: plain string | { text, href } for a link | { text, bold: true } for bold.
    bio: [
      [
        'Welcome to my academic webpage. I am a PhD candidate in Economics at the ',
        { text: 'University of Minnesota', href: 'https://cla.umn.edu/economics' },
        ' and a Research Analyst at the ',
        { text: 'Federal Reserve Bank of Minneapolis', href: 'https://www.minneapolisfed.org/economic-research' },
        '. ',
        { text: 'I am on the 2026-27 economics job market.', bold: true },
      ],
      'My primary research interests include macroeconomics, international economics, and monetary economics with a particular focus on financial markets and theory-informed optimal policy analysis in dynamic general equilibrium models. My current research incorporates financial frictions, exchange rate dynamics, and household heterogeneity to examine how these features shape equilibrium outcomes.',
    ],
  },

  // ── Social links ─────────────────────────────────────────────────────────
  // Supported types: email, linkedin, github, x. Add or remove entries as needed.
  // For email, provide emailUser and emailDomain separately (avoids scraping).
  socialLinks: [
    { type: 'email', label: 'Email', emailUser: 'sauhardsrivastava', emailDomain: 'gmail.com' },
    { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sauhard-srivastava/' },
    { type: 'github', label: 'GitHub', href: 'https://github.com/sauhardsriv' },
    { type: 'x', label: 'X', href: 'https://x.com/sauhardsriv' },
  ],

  // ── Research papers ───────────────────────────────────────────────────────
  // Required per entry: slug, section, title, authors, abstract.
  // Optional: doiUrl, pdf, code, links[], venue, citation, doi, note, coauthorLinks, keywords,
  //           featured, highlightLabel, summary, featuredNote.
  // The title links to: doiUrl → pdf → links[0] → plain text (in that priority order).
  // Set featured:true to surface the paper in the Featured panel on the Research page.
  papers: [
    {
      slug: 'import-price-spikes-exchange-rates',
      section: 'workingPapers',
      title: 'Import Price Shocks, FX-Monetary Policies, and Real Income Stabilization',
      authors: ['Sauhard Srivastava'],
      //note: 'Draft Available Soon',
      featured: true,
      pdf: '/papers/hasoe_imports2026.pdf',
      highlightLabel: 'Featured working paper',
      summary: 'Optimal exchange rate and monetary policies in a heterogeneous-agent small open economy facing essential import price spikes.',
      abstract: 'We characterize jointly optimal exchange rate and monetary policies under commitment in a heterogeneous-agent, import-dependent small open economy facing essential import price spikes. When some households are borrowing constrained, exchange rate management becomes a tool for real income stabilization through the intertemporal margin, requiring temporary interest parity deviations, while optimal monetary policy targets the labor wedge. In an open economy, these roles are not substitutable. A Ramsey planner internalizes how pecuniary general equilibrium effects from real exchange rate movements redistribute real incomes: facing a spike, the planner leans against the depreciation, cutting exports and shifting resources toward constrained households through higher real wages. Calibrated to Japan`s 2022 energy price path, optimal policy departs from representative-agent prescriptions and uses FX interventions to cut the contemporaneous co-movement of the real exchange rate with world energy prices while accepting costly interest parity deviations. Monetary policy complements FX policy by taking a disinflationary stance.',
      keywords: ['Foreign exchange interventions', 'optimal monetary policy', 'heterogeneous agents', 'import price shocks', 'real income channel', 'energy shocks'],
    },
    {
      slug: 'financial-frictions-fx-reserves-exchange-rate-management',
      section: 'publications',
      title: 'Financial Frictions, FX Reserves, and Exchange Rate Management with Local-Currency Debt',
      authors: ['Sauhard Srivastava'],
      featured: true,
      highlightLabel: 'Accepted article',
      summary: 'Why debtor economies may simultaneously hold FX reserves with local-currency liabilities despite carry costs.',
      featuredNote: 'Aug 2026',
      venue: 'Journal of International Economics',
      citation: 'Vol. 162, Article 104282, August 2026.',
      doi: '10.1016/j.jinteco.2026.104282',
      doiUrl: 'https://doi.org/10.1016/j.jinteco.2026.104282',
      pdf: '/papers/reserves2024.pdf',
      code: 'https://doi.org/10.17632/s6h8vj9z3k.1',
      abstract: 'Emerging economy central banks often hold large FX reserves while residents carry substantial local-currency-linked external liabilities. With financial frictions creating interest parity gaps, such opposing positions imply a carry cost. In a small open economy with intermediation frictions and inherited local-currency debt, we study optimal reserve and exchange rate policies, explaining why debtor economies may retain reserves rather than netting out costly gross positions. While policy can eliminate costly intermediation by deploying reserves and appreciating the real exchange rate, doing so creates a general equilibrium revaluation effect which raises the real burden of local-currency obligations. Optimal policy retains reserves, accepting some intermediation to avoid a larger revaluation loss. This policy is time-inconsistent: a discretionary central bank prefers stronger ex-post appreciation; a time-consistent equilibrium features more reserve retention and larger interest parity gaps. Revaluation costs restrain reserve deployment; when large, optimal policy retains more reserves during disruptions than in normal times.',
      keywords: ['FX reserves', 'exchange rate management', 'financial frictions', 'emerging economies', 'interest parity gaps', 'local-currency debt', 'central banks'],
    },
    {
      slug: 'net-zero-small-open-economy',
      section: 'workingPapers',
      title: 'The Transition to Net Zero in a Small Open Economy',
      authors: ['Sauhard Srivastava', 'Neil Mehrotra'],
      coauthorLinks: {
        'Neil Mehrotra': 'https://sites.google.com/site/neilrmehrotra/',
      },
      pdf: 'https://drive.google.com/file/d/1t-vdiOhsgqmXOeoc4e9UwTRG7-6BqJsU/view',
      abstract: 'This paper examines the macroeconomic cost and implications of transitioning to net zero for a fossil-fuel-dependent, small open economy. A net zero target operates as an anticipated negative productivity shock that lowers consumption, raises the current account surplus along the transition path, and has ambiguous effects on the real exchange rate. A transition to net zero appreciates the currency by lowering the import bill for fossil fuels, but depreciates the currency by making domestic tradables more expensive. We calibrate the model to the case of Japan and find that the transition to net zero lowers consumption by 0.2-2%.',
      keywords: ['net zero', 'small open economy', 'fossil fuels', 'real exchange rate', 'current account', 'Japan', 'climate transition'],
    },
    {
      slug: 'price-of-quality-penn-effect',
      section: 'workingPapers',
      title: 'The Price of Quality: Demand-Driven Technology Choice and the Penn Effect',
      authors: ['Sauhard Srivastava'],
      pdf: '/papers/hbs_new2025.pdf',
      abstract: 'This paper proposes a novel, demand-side explanation for the Penn effect: the observation that richer countries systematically exhibit higher price levels. We develop a general equilibrium model where income-dependent preferences lead more productive countries to produce and consume higher-quality, more resource-intensive non-tradeable goods. Our key result is that this endogenous shift toward producing superior goods, which have higher unit factor requirements, outweighs the standard cost-reducing effects of productivity growth, resulting in higher prices. The model shows that quality upgrading emerges as an equilibrium response to rising incomes and leads to higher non-tradeable prices in richer economies even in the absence of Harrod-Balassa-Samuelson (HBS) effects. Using Penn World Table data, the model replicates the empirical Penn effect, explaining about 69 percent of cross-country price variation without relying on HBS effects.',
      keywords: ['Penn effect', 'quality upgrading', 'non-tradeable goods', 'technology choice', 'income-dependent preferences', 'price levels', 'Penn World Table'],
    },
    {
      slug: 'productivity-real-exchange-rates-india-balassa-samuelson',
      section: 'publications',
      title: 'Productivity and real exchange rates for India: does Balassa-Samuelson effect explain?',
      authors: ['Sauhard Srivastava', 'Saurabh Ghosh', 'Siddhartha Nath'],
      venue: 'Indian Growth and Development Review',
      citation: 'Vol. 16 No. 1, pp. 41-73, March 2023.',
      doi: '10.1108/IGDR-11-2022-0130',
      doiUrl: 'https://doi.org/10.1108/IGDR-11-2022-0130',
      abstract: 'This study explores the long-run equilibrium relationship between India\'s real exchange rate and sectoral productivity trends using internationally comparable KLEMS productivity databases for India, China, the euro area, the USA, the UK, and Japan. This study uses pooled mean group estimations for panel data, as suggested by Pesaran et al. (1999). The results support an "extended" Balassa-Samuelson (BS) hypothesis, which allows for labour market frictions that prevent wage equalisation between traded and non-traded sectors within a country. This mechanism continues to find support when we separate out the distribution sector, which comprises wholesale and retail trade in the domestic services sector. The empirical evidence suggests that India\'s real exchange rate is anchored to domestic fundamentals and is closely aligned with its fair value over a medium- to long-term horizon.',
      keywords: ['real exchange rates', 'India', 'Balassa-Samuelson effect', 'sectoral productivity', 'KLEMS', 'labour market frictions'],
    },
    {
      slug: 'labour-disputes-manufacturing-growth-indian-states',
      section: 'publications',
      title: 'Labour Disputes and the Manufacturing Sector\'s Growth: Recent Evidence from Indian States',
      authors: ['Sauhard Srivastava', 'Siddhartha Nath'],
      venue: 'Theoretical Economics Letters',
      citation: 'Vol. 12 No. 3, pp. 636-663, June 2022.',
      doi: '10.4236/tel.2022.123036',
      doiUrl: 'https://doi.org/10.4236/tel.2022.123036',
      abstract: 'The persistent variation among Indian states in per-capita value added from the manufacturing sector raises the question of whether the long-run equilibrium in the manufacturing sector differs across states. In this paper, we provide empirical evidence on whether labour disputes in the form of strikes, lockouts, temporary closures, and related disruptions have caused variation in these equilibria in the recent period. Available data suggest that in 9 out of 16 states in our sample, labour disputes generally declined between 2001 and 2017, while in others, labour disputes were mostly characterised as random shocks with little predictability. Our two-stage least squares estimates, using states\' election cycles as an instrument for labour disputes, suggest that these low-persistence labour disputes did not have much influence over inter-state differences in equilibrium capital-labour ratios in "registered" manufacturing units between 2001 and 2017. However, a 1 percent increase in labour disputes might be associated with a 3.2 percent reduction in total factor productivity for the sector in states where disputes were random events. In the remaining states, where labour disputes have consistently fallen over time, this effect is significantly reduced. Our findings are robust in a different sample of firms.',
      keywords: ['labour disputes', 'manufacturing', 'Indian states', 'capital-labour ratios', 'total factor productivity', 'two-stage least squares'],
    },
  ],

  // ── Curriculum Vitae ─────────────────────────────────────────────────────
  // Each entry: date, title, institution. Optional: dateNote, note.
  cv: {
    education: [
      { date: '2027', dateNote: '(expected)', title: 'Ph.D. Economics', institution: 'University of Minnesota' },
      { date: '2024', title: 'M.A. Economics', institution: 'University of Minnesota' },
      { date: '2019', title: 'M.Sc. Economics', institution: 'The London School of Economics and Political Science' },
      { date: '2018', title: 'B.A. (Hons.) Economics', institution: 'Shri Ram College of Commerce, University of Delhi' },
    ],
    experience: [
      { date: 'Sep 2023–present', title: 'Research Analyst', institution: 'Federal Reserve Bank of Minneapolis' },
      { date: 'Sep 2021–Jul 2023', title: 'Teaching Assistant', institution: 'CLA, University of Minnesota' },
      { date: 'Jan 2020–Jun 2021', title: 'Research Assistant/Intern', institution: 'Reserve Bank of India' },
      { date: 'Aug 2019–Dec 2019', title: 'Research Assistant/Intern', institution: 'United Nations Development Programme (UNDP) in India' },
      { date: 'Sep 2018–May 2019', title: 'Graduate Teaching Assistant', institution: 'Department of Economics, LSE' },
    ],
  },

  // ── Assets ───────────────────────────────────────────────────────────────
  // Files live in public/. profileImageSizes is used for responsive image hints.
  assets: {
    profileImage: '/profile.png',
    profileImageDark: '/profile-dark.png',
    profileImageAlt: 'Sauhard Srivastava profile photo',
    profileImageSizes: '(max-width: 768px) 144px, 192px',
    cvPdf: '/resume/resume-web.pdf',
  },

  // ── Job Market ────────────────────────────────────────────────────────────
  // Temporary hub for the hiring cycle. Set jobMarketActive = false (line 7) to
  // hide the page and navbar link after the cycle ends.
  jobMarket: {
    active: jobMarketActive,
    jmpSlug: 'import-price-spikes-exchange-rates',   // must match a paper slug above
    jmpPdf: '/papers/hasoe_imports2026.pdf',
    cvPdf: '/resume/job-market-cv.pdf',
    placementUrl: 'https://cla.umn.edu/economics/people/job-market-candidates',
    pitch: 'I am on the 2026-27 economics job market. My job market paper studies optimal exchange rate and monetary policy in a heterogeneous-agent open economy facing import price spikes. Below are my job market paper, CV, and references.',
    // institution may be a single string or an array of strings (for referees affiliated with multiple institutions).
    references: [
      { name: 'Manuel Amador (Advisor)', institution: ['University of Minnesota &', 'Federal Reserve Bank of Minneapolis'], url: 'https://manuelamador.me/' },
      { name: 'Javier Bianchi', institution: 'Federal Reserve Bank of Minneapolis', url: 'https://javierbianchi.com/index.html' },
      { name: 'Neil Mehrotra', institution: 'Federal Reserve Bank of Minneapolis', url: 'https://sites.google.com/site/neilrmehrotra/' },
    ],
  },

}

module.exports = content
