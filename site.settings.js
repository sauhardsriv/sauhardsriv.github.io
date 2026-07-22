// ─────────────────────────────────────────────────────────────────────────────
//  TEMPLATE SETTINGS
//  Controls theme, colors, layout styles, navigation structure, and page
//  metadata. User content (bio, papers, CV, job market) lives in content.js.
//  Fork users should not need to edit this file for normal use.
// ─────────────────────────────────────────────────────────────────────────────

const content = require('./content')

// Font size scale — documented here for reference; values are hardcoded in the
// style strings below because Tailwind's static scanner cannot resolve template
// literals. Change the hardcoded value in each style string to adjust sizes.
//   h1 (page titles):        21px
//   h2 (section headings):   18px
//   featured (paper titles): 16px
//   body (main content):     15px
//   action (links/summaries):14px
//   secondary (venues/dates):13px
//   small (metadata lines):  12px

const siteSettings = {
  ...content,

  // ── Theme ─────────────────────────────────────────────────────────────────
  // Palette tokens (primary-* = light mode, dark-* = dark mode) feed CSS custom
  // properties consumed by Tailwind. All color changes happen here only.
  // To switch palettes at runtime: localStorage.setItem('palette', 'm2')
  theme: {
    darkMode: 'class',
    providerAttribute: 'class',
    defaultTheme: 'system',
    enableSystem: true,
    disableTransitionOnChange: true,
    storageKey: 'theme',
    palette: 'm3',
    palettes: {
      m3: {
        'primary-light': '#F9F9FF',
        'primary-main': '#EDEDF4',
        'primary-dark': '#E2E2E9',
        'primary-navbar': '#F3F3FA',
        'primary-text': '#1A1C20',
        'primary-hover': '#0B57D1',
        'primary-url': '#0B57D1',
        'primary-url-hover': '#0842A0',
        'primary-outline': '#C4C6D0',
        'primary-variant': '#64656A',
        'dark-primary': '#111318',
        'dark-surface': '#1D2024',
        'dark-navbar': '#1D2024',
        'dark-text': '#E2E2E9',
        'dark-hover': '#8AB4F8',
        'dark-url': '#8AB4F8',
        'dark-url-hover': '#AECBFA',
        'dark-outline': '#34373D',
        'dark-variant': '#A7A8AE',
      },
      m2: {
        'primary-light': '#FFFFFF',
        'primary-main': '#F5F5F5',
        'primary-dark': '#E7EBF0',
        'primary-navbar': '#F5F5F5',
        'primary-text': '#2E2E2E',
        'primary-hover': '#2196F3',
        'primary-url': '#2196F3',
        'primary-url-hover': '#E91E63',
        'primary-outline': '#E0E3E7',
        'primary-variant': '#747474',
        'dark-primary': '#0D1117',
        'dark-surface': '#242A33',
        'dark-navbar': '#242A33',
        'dark-text': '#FFFFFF',
        'dark-hover': '#64B5F6',
        'dark-url': '#64B5F6',
        'dark-url-hover': '#F06292',
        'dark-outline': '#3A424D',
        'dark-variant': '#BDBFC2',
      },
    },
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  // Derived from content — add or rename links here if you add new pages.
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/research', label: 'Research' },
    { href: '/cv', label: 'CV' },
    ...(content.jobMarket.active ? [{ href: '/job-market', label: 'Job Market' }] : []),
  ],

  // ── Page metadata ─────────────────────────────────────────────────────────
  // Titles, descriptions, and keywords for each route. Descriptions and keywords
  // are derived from content so they stay accurate without manual updates.
  pages: {
    home: {
      title: 'Home',
      path: '/',
      description: content.site.description,
      keywords: content.site.keywords,
    },
    research: {
      title: 'Research',
      path: '/research',
      description: `Research papers by ${content.site.author} in ${content.profile.fields.map(f => f.toLowerCase()).join(', ')}`,
      keywords: [
        `${content.site.author} research`,
        'economics research papers',
        ...content.profile.fields.map(f => f.toLowerCase()),
      ],
      featuredTitle: 'Featured',
      sections: [
        { key: 'workingPapers', title: 'Working Papers' },
        { key: 'publications', title: 'Publications' },
      ],
    },
    cv: {
      title: 'CV',
      path: '/cv',
      description: `Academic curriculum vitae of ${content.site.author}: education, research experience, and publications`,
      keywords: ['CV', 'curriculum vitae', content.site.author, ...content.profile.fields.map(f => f.toLowerCase())],
    },
    jobMarket: {
      title: 'Job Market',
      path: '/job-market',
      description: `Job market information for ${content.site.author}, a ${content.profile.jobMarket} candidate: job market paper, CV, and references.`,
      keywords: [
        `${content.site.author} job market`,
        'economics job market candidate',
        content.profile.jobMarket,
        'job market paper',
        ...content.profile.fields.map(f => f.toLowerCase()),
      ],
    },
  },

  // ── Styles ────────────────────────────────────────────────────────────────
  // Shared Tailwind class strings consumed by every page and component.
  // Colors reference CSS custom properties defined in theme.palettes above.
  styles: {
    shell: 'flex flex-col min-h-screen',
    appBackground: 'min-h-screen',
    main: 'flex-grow',

    page: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8',
    homePage: 'flex flex-col space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    homeGrid: 'flex flex-col lg:flex-row gap-6 lg:gap-16 pt-6 sm:pt-8 lg:pt-12',
    sidebar: 'w-full lg:w-1/4 flex flex-col items-center',
    contentColumn: 'w-full lg:w-3/4',
    profileImageFrame: [
      'w-36 h-36 md:w-48 md:h-48 relative rounded-full overflow-hidden',
      'shadow-[0_4px_16px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_16px_rgba(255,255,255,0.15)]',
      'hover:shadow-[0_12px_28px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_12px_28px_rgba(255,255,255,0.2)]',
      'transform transition-all duration-300 hover:-translate-y-4 mb-6',
    ].join(' '),
    profileImage: 'object-cover select-none pointer-events-none',
    profileImageGuard: 'absolute inset-0 z-10 rounded-full select-none',
    sidebarDivider: 'w-32 h-px bg-primary-text dark:bg-dark-text opacity-20 dark:opacity-40 mt-4 mb-2',

    card: 'bg-primary-main dark:bg-dark-surface rounded-xl p-6 text-primary-text dark:text-dark-text',
    pageTitle: 'text-primary-text dark:text-dark-text text-[21px] font-semibold mb-5',
    homeTitle: 'text-primary-text dark:text-dark-text text-[21px] font-semibold mb-4',
    sectionTitle: 'text-[18px] font-semibold mb-3',
    sectionTitleSpacious: 'text-[18px] font-semibold mb-4',
    bodyCopy: 'text-primary-text dark:text-dark-text text-[15px] text-justify leading-[1.85] space-y-4',
    link: 'text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover',
    pdfLink: 'text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover font-bold',
    inlineLink: 'text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover ml-2 font-semibold',
    list: 'list-disc ml-6 space-y-6 text-[15px] font-normal',
    cvEntryList: 'divide-y divide-primary-text/15 dark:divide-dark-text/20',
    cvEntry: 'grid gap-1 py-2.5 first:pt-1 last:pb-1 sm:grid-cols-[minmax(8rem,10rem)_1fr] sm:gap-6',
    cvDate: 'text-[13px] text-primary-variant dark:text-dark-variant leading-relaxed',
    cvDateNote: 'text-xs leading-relaxed text-primary-variant dark:text-dark-variant',
    cvEntryBody: 'space-y-1',
    cvEntryTitle: 'text-[15px] leading-snug font-medium text-primary-text dark:text-dark-text',
    cvEntryInstitution: 'text-[13px] leading-relaxed text-primary-variant dark:text-dark-variant',
    compactList: 'list-disc ml-6 space-y-2 text-[15px] font-normal',
    sectionStack: 'space-y-8',
    sectionStackCompact: 'space-y-6',
    itemStack: 'space-y-0.5',
    itemAnchor: 'scroll-mt-24',
    itemTitle: 'font-semibold',
    secondaryText: 'text-primary-variant dark:text-dark-variant',
    metadataLine: 'text-sm text-primary-variant dark:text-dark-variant',
    keywordLine: 'text-xs text-primary-variant dark:text-dark-variant',
    featuredCard: 'mb-12 !bg-primary-url/[0.07] dark:!bg-dark-url/[0.08]',
    featuredList: 'flex flex-col gap-4',
    featuredItem: 'flex flex-col rounded-xl border-l-4 border-primary-url dark:border-dark-url bg-primary-light dark:bg-dark-primary p-4',
    featuredLabel: 'text-xs uppercase tracking-[0.08em] font-semibold text-primary-url dark:text-dark-url mb-0.5',
    featuredTitle: 'text-[16px] leading-snug font-medium',
    featuredVenue: 'mt-0.5 text-[13px] leading-relaxed text-primary-variant dark:text-dark-variant',
    featuredVenueName: 'italic font-semibold',
    featuredSummary: 'mt-0.5 text-[14px] leading-relaxed text-primary-variant dark:text-dark-variant',
    paperList: 'divide-y divide-primary-text/15 dark:divide-dark-text/20',
    paperItem: 'scroll-mt-24 flash-target py-2.5 first:pt-1 last:pb-1',
    paperTitle: 'text-[15px] leading-snug font-medium text-primary-text dark:text-dark-text',
    paperMeta: 'mt-1 text-[12px] leading-relaxed text-primary-text dark:text-dark-text',
    paperCitation: 'mt-1 text-[12px] leading-relaxed text-primary-variant dark:text-dark-variant',
    paperSecondary: 'mt-1 text-[12px] leading-relaxed text-primary-variant dark:text-dark-variant',
    paperActions: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[14px]',
    actionLink: 'text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover font-semibold',
    subList: 'list-disc ml-6 space-y-1 text-sm text-primary-variant dark:text-dark-variant font-normal',
    subListPlain: 'list-disc ml-6 space-y-1 text-sm text-primary-text dark:text-dark-text font-normal',
    muted: 'text-primary-variant dark:text-dark-variant',
    italic: 'italic',

    details: {
      root: 'group',
      summary: 'cursor-pointer flex items-center gap-2 text-[13px] text-primary-text dark:text-dark-text',
      prefix: 'font-semibold',
      separator: 'text-primary-text dark:text-dark-text opacity-45 dark:opacity-45',
      control: 'inline-flex items-center gap-2 opacity-65 dark:opacity-70 hover:opacity-90 dark:hover:opacity-90 transition-opacity',
      icon: 'transform transition-transform group-open:rotate-180',
      iconSvg: 'w-4 h-4',
      content: 'mt-2 pl-6 text-[13px] text-primary-variant dark:text-dark-variant leading-relaxed text-justify',
    },

    navbar: {
      root: [
        'sticky top-0 z-50 bg-primary-navbar dark:bg-dark-navbar',
        'text-primary-text dark:text-dark-text py-2 text-sm sm:text-base transition-shadow duration-300',
        'hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)]',
      ].join(' '),
      container: 'container relative mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 px-4 lg:px-16',
      brand: 'text-lg sm:text-xl md:text-2xl font-medium hover:text-primary-hover dark:hover:text-dark-hover text-primary-text dark:text-dark-text transition-colors duration-0 text-center sm:text-left',
      rightGroup: 'flex items-center justify-center',
      links: 'flex items-center justify-center flex-wrap gap-x-3 gap-y-1 sm:gap-x-4',
      linkBase: 'relative py-2 text-primary-text dark:text-dark-text hover:text-primary-hover dark:hover:text-dark-hover transition-colors duration-20',
      linkActive: 'font-semibold',
      linkInactive: 'font-normal',
      activeIndicator: 'absolute bottom-0 left-0 w-full h-0.5 bg-primary-url dark:bg-dark-url',
      actions: 'absolute top-2 right-4 sm:static sm:ml-6 flex items-center opacity-70 sm:opacity-100',
      divider: 'hidden sm:block h-6 w-px bg-primary-text dark:bg-dark-text opacity-20 mx-2',
    },

    footer: {
      root: 'bg-primary-navbar dark:bg-dark-navbar text-primary-text dark:text-dark-text px-[10px] mt-auto flex justify-center items-center',
      container: 'container mx-auto px-4 justify-center flex items-center',
      text: 'text-sm',
      divider: 'h-3 w-px bg-primary-text dark:bg-dark-text opacity-20 mx-4',
      link: 'text-sm text-primary-text dark:text-dark-text hover:text-primary-hover dark:hover:text-dark-hover',
    },

    iconLinks: {
      placeholder: 'h-8',
      list: 'flex space-x-2',
      link: 'text-primary-text dark:text-dark-text hover:text-primary-hover dark:hover:text-dark-hover transition-colors duration-200',
    },

    buttons: {
      themeToggle: 'p-2 rounded-full hover:bg-primary-hover/10 dark:hover:bg-dark-hover/20 transition-all duration-200',
      themeIcon: 'h-5 w-5 text-primary-text dark:text-dark-text',
      backToTop: 'fixed bottom-16 right-8 p-2 rounded-full bg-primary-navbar dark:bg-dark-navbar text-primary-text dark:text-dark-text shadow-lg hover:bg-primary-hover/80 dark:hover:bg-dark-hover/70 transition-all duration-300',
      backToTopIcon: 'h-6 w-6',
      primary: 'inline-flex items-center gap-2 rounded-full bg-primary-url dark:bg-dark-url text-primary-light dark:text-dark-primary px-5 py-2.5 text-sm font-semibold hover:bg-primary-url-hover dark:hover:bg-dark-url-hover transition-colors',
    },

    jobMarket: {
      actions: 'mt-4 flex flex-wrap gap-3',
      paperTitle: 'text-[17px] leading-snug font-medium mb-1',
      abstractWrap: 'mt-2 mb-1',
      researchLink: 'mt-4 text-[14px]',
      cvNote: 'text-[13px] leading-relaxed text-primary-variant dark:text-dark-variant -mt-2 mb-1',
      referenceList: 'grid gap-5 sm:grid-cols-3',
      referenceItem: 'flex flex-col gap-1 min-w-0',
      referenceName: 'text-[15px] font-semibold text-primary-text dark:text-dark-text',
      referenceInstitution: 'text-[13px] text-primary-variant dark:text-dark-variant break-words',
      referenceLink: 'text-[13px] text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover pt-1',
    },

    notFound: {
      root: 'flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-16 overflow-hidden text-center',
      icon: 'text-primary-text dark:text-dark-text text-[40px] font-semibold mb-6',
      title: 'text-primary-text dark:text-dark-text text-[21px] font-semibold mb-3',
      message: 'text-primary-text dark:text-dark-text opacity-60 dark:opacity-50 text-[15px] font-normal mb-6',
      button: 'inline-flex items-center gap-2 rounded-full bg-primary-url dark:bg-dark-url text-primary-light dark:text-dark-primary px-5 py-2.5 text-sm font-semibold hover:bg-primary-url-hover dark:hover:bg-dark-url-hover transition-colors',
      buttonIcon: 'h-4 w-4',
    },
  },
}

module.exports = siteSettings
