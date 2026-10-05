// ─────────────────────────────────────────────────────────────────────────────
//  TEMPLATE SETTINGS
//  Theme, layout, navigation, and derived page metadata. Personal content is
//  provided by content.js.
// ─────────────────────────────────────────────────────────────────────────────

const content = require('./content')

// Newsreader supplies editorial display roles; IBM Plex Sans supplies body,
// metadata, and interface roles.
// Values are explicit because Tailwind's scanner cannot resolve dynamic strings.

const siteSettings = {
  ...content,

  // ── Theme ─────────────────────────────────────────────────────────────────
  // Material 3 color roles exposed to Tailwind through CSS custom properties.
  theme: {
    darkMode: 'class',
    providerAttribute: 'class',
    defaultTheme: 'system',
    enableSystem: true,
    disableTransitionOnChange: true,
    storageKey: 'theme',
    palette: 'm3',
    palettes: {
      // Tonal Spot palette based on the source color #255F85.
      m3: {
        'light-primary': '#29638A',
        'light-on-primary': '#FFFFFF',
        'light-primary-container': '#CBE6FF',
        'light-on-primary-container': '#004B71',
        'light-secondary': '#50606F',
        'light-on-secondary': '#FFFFFF',
        'light-secondary-container': '#D3E4F6',
        'light-on-secondary-container': '#394956',
        'light-tertiary': '#65587B',
        'light-on-tertiary': '#FFFFFF',
        'light-tertiary-container': '#EBDCFF',
        'light-on-tertiary-container': '#4D4162',
        'light-error': '#BA1A1A',
        'light-on-error': '#FFFFFF',
        'light-error-container': '#FFDAD6',
        'light-on-error-container': '#93000A',
        'light-surface': '#F7F9FF',
        'light-surface-dim': '#D7DADF',
        'light-surface-bright': '#F7F9FF',
        'light-surface-lowest': '#FFFFFF',
        'light-surface-low': '#F1F4F9',
        'light-surface-container': '#EBEEF3',
        'light-surface-high': '#E5E8ED',
        'light-surface-highest': '#E0E3E8',
        'light-on-surface': '#181C20',
        'light-on-surface-variant': '#41474D',
        'light-outline': '#72787E',
        'light-outline-variant': '#C1C7CE',
        'light-inverse-surface': '#2D3135',
        'light-inverse-on-surface': '#EEF1F6',
        'light-inverse-primary': '#97CCF8',
        'dark-primary': '#97CCF8',
        'dark-on-primary': '#00344F',
        'dark-primary-container': '#004B71',
        'dark-on-primary-container': '#CBE6FF',
        'dark-secondary': '#B8C8D9',
        'dark-on-secondary': '#22323F',
        'dark-secondary-container': '#394956',
        'dark-on-secondary-container': '#D3E4F6',
        'dark-tertiary': '#D0C0E8',
        'dark-on-tertiary': '#362B4A',
        'dark-tertiary-container': '#4D4162',
        'dark-on-tertiary-container': '#EBDCFF',
        'dark-error': '#FFB4AB',
        'dark-on-error': '#690005',
        'dark-error-container': '#93000A',
        'dark-on-error-container': '#FFDAD6',
        'dark-surface': '#101417',
        'dark-surface-dim': '#101417',
        'dark-surface-bright': '#363A3E',
        'dark-surface-lowest': '#0B0F12',
        'dark-surface-low': '#181C20',
        'dark-surface-container': '#1C2024',
        'dark-surface-high': '#262A2E',
        'dark-surface-highest': '#313539',
        'dark-on-surface': '#E0E3E8',
        'dark-on-surface-variant': '#C1C7CE',
        'dark-outline': '#8B9198',
        'dark-outline-variant': '#41474D',
        'dark-inverse-surface': '#E0E3E8',
        'dark-inverse-on-surface': '#2D3135',
        'dark-inverse-primary': '#29638A',
        shadow: '#000000',
        scrim: '#000000',
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
        'academic research papers',
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
        'academic job market candidate',
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
    sidebarDivider: 'w-32 h-px bg-outline-variant dark:bg-dark-outline-variant mt-4 mb-2',

    card: 'bg-surface-highest dark:bg-dark-surface-highest rounded-xl p-6 text-ink dark:text-dark-ink',
    pageTitle: 'font-display text-ink dark:text-dark-ink text-[30px] sm:text-[32px] leading-tight font-medium mb-5 tracking-[-0.01em]',
    homeTitle: 'font-display text-ink dark:text-dark-ink text-[30px] sm:text-[32px] leading-tight font-medium mb-4 tracking-[-0.01em]',
    sectionTitle: 'font-display text-[22px] sm:text-[24px] leading-8 font-medium mb-3 tracking-[-0.005em]',
    sectionTitleSpacious: 'font-display text-[22px] sm:text-[24px] leading-8 font-medium mb-4 tracking-[-0.005em]',
    bodyCopy: 'text-ink dark:text-dark-ink text-[15px] text-justify leading-[1.85] space-y-4',
    link: 'text-primary dark:text-dark-primary hover:text-primary-strong dark:hover:text-dark-primary-strong underline-offset-[3px] hover:underline decoration-1',
    pdfLink: 'text-primary dark:text-dark-primary hover:text-primary-strong dark:hover:text-dark-primary-strong underline-offset-[3px] hover:underline font-semibold',
    inlineLink: 'text-primary dark:text-dark-primary hover:text-primary-strong dark:hover:text-dark-primary-strong ml-2 font-semibold underline-offset-[3px] hover:underline',
    list: 'list-disc ml-6 space-y-6 text-[15px] font-normal',
    cvEntryList: 'divide-y divide-outline-variant/80 dark:divide-dark-outline-variant/80',
    cvEntry: 'grid gap-1 py-2.5 first:pt-1 last:pb-1 sm:grid-cols-[minmax(8rem,10rem)_1fr] sm:gap-6',
    cvDate: 'text-[13px] text-ink-muted dark:text-dark-ink-muted leading-relaxed',
    cvDateNote: 'text-xs leading-relaxed text-ink-muted dark:text-dark-ink-muted',
    cvEntryBody: 'space-y-1',
    cvEntryTitle: 'text-[16px] leading-6 font-medium text-ink dark:text-dark-ink',
    cvEntryInstitution: 'text-[13px] leading-relaxed text-ink-muted dark:text-dark-ink-muted',
    compactList: 'list-disc ml-6 space-y-2 text-[15px] font-normal',
    sectionStack: 'space-y-8',
    sectionStackCompact: 'space-y-6',
    itemStack: 'space-y-0.5',
    itemAnchor: 'scroll-mt-24',
    itemTitle: 'font-semibold',
    secondaryText: 'text-ink-muted dark:text-dark-ink-muted',
    metadataLine: 'text-sm text-ink-muted dark:text-dark-ink-muted',
    keywordLine: 'text-xs text-ink-muted dark:text-dark-ink-muted',
    featuredCard: 'mb-12 !rounded-[28px] !bg-secondary-container/75 dark:!bg-dark-secondary-container/70 !text-secondary-on-container dark:!text-dark-secondary-on-container',
    featuredList: 'flex flex-col gap-3',
    featuredItem: 'flex flex-col rounded-2xl bg-surface-lowest/75 dark:bg-dark-surface-low/80 p-4 sm:p-5',
    featuredLabel: 'text-[11px] uppercase tracking-[0.1em] font-semibold text-primary dark:text-dark-primary mb-0.5',
    featuredTitle: 'font-display text-[18px] leading-6 font-medium',
    featuredVenue: 'mt-0.5 text-[13px] leading-relaxed text-ink-muted dark:text-dark-ink-muted',
    featuredVenueName: 'italic font-semibold',
    featuredSummary: 'mt-0.5 text-[14px] leading-relaxed text-ink-muted dark:text-dark-ink-muted',
    paperList: 'divide-y divide-outline-variant/80 dark:divide-dark-outline-variant/80',
    paperItem: 'scroll-mt-24 flash-target py-2.5 first:pt-1 last:pb-1',
    paperHeadingRow: 'flex flex-wrap items-baseline gap-x-2 gap-y-1',
    paperTitle: 'text-[15px] leading-snug font-normal text-ink dark:text-dark-ink',
    paperTag: 'inline-flex shrink-0 items-center rounded-full bg-primary-container dark:bg-dark-primary-container px-2.5 py-0.5 text-[11px] leading-4 font-semibold text-primary-on-container dark:text-dark-primary-on-container',
    paperMeta: 'mt-1 text-[12px] leading-relaxed text-ink dark:text-dark-ink',
    paperCitation: 'mt-1 text-[12px] leading-relaxed text-ink-muted dark:text-dark-ink-muted',
    paperSecondary: 'mt-1 text-[12px] leading-relaxed text-ink-muted dark:text-dark-ink-muted',
    paperActions: 'mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[14px]',
    actionLink: 'text-primary dark:text-dark-primary hover:text-primary-strong dark:hover:text-dark-primary-strong font-semibold underline-offset-[3px] hover:underline',
    subList: 'list-disc ml-6 space-y-1 text-sm text-ink-muted dark:text-dark-ink-muted font-normal',
    subListPlain: 'list-disc ml-6 space-y-1 text-sm text-ink dark:text-dark-ink font-normal',
    muted: 'text-ink-muted dark:text-dark-ink-muted',
    italic: 'italic',

    details: {
      root: 'group',
      summary: 'cursor-pointer flex items-center gap-2 text-[13px] text-ink dark:text-dark-ink',
      prefix: 'font-semibold',
      separator: 'text-outline dark:text-dark-outline opacity-70',
      control: 'inline-flex items-center gap-2 opacity-65 dark:opacity-70 hover:opacity-90 dark:hover:opacity-90 hover:text-primary dark:hover:text-dark-primary transition-[color,opacity]',
      icon: 'transform transition-transform group-open:rotate-180',
      iconSvg: 'w-4 h-4',
      content: 'mt-2 pl-6 text-[13px] text-ink-muted dark:text-dark-ink-muted leading-relaxed text-justify',
    },

    navbar: {
      root: [
        'sticky top-0 z-50 bg-surface-low/95 dark:bg-dark-surface-low/95 backdrop-blur-md',
        'text-ink dark:text-dark-ink py-2 text-sm sm:text-base transition-shadow duration-300',
        'hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)]',
      ].join(' '),
      container: 'container relative mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 px-4 lg:px-16',
      brand: 'inline-flex min-h-10 items-center self-center font-display text-[24px] leading-none font-medium hover:text-primary dark:hover:text-dark-primary text-ink dark:text-dark-ink transition-colors duration-0 text-center sm:text-left',
      rightGroup: 'flex items-center justify-center',
      links: 'flex items-center justify-center flex-wrap gap-x-3 gap-y-1 sm:gap-x-4',
      linkBase: 'relative py-2 text-ink dark:text-dark-ink hover:text-primary dark:hover:text-dark-primary transition-colors duration-150',
      linkActive: 'font-semibold',
      linkInactive: 'font-normal',
      activeIndicator: 'absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-primary dark:bg-dark-primary',
      actions: 'absolute top-2 right-4 sm:static sm:ml-6 flex items-center opacity-70 sm:opacity-100',
      divider: 'hidden sm:block h-6 w-px bg-outline-variant dark:bg-dark-outline-variant mx-2',
    },

    footer: {
      root: 'bg-surface-low dark:bg-dark-surface-low text-ink dark:text-dark-ink px-[10px] mt-auto flex justify-center items-center',
      container: 'container mx-auto px-4 justify-center flex items-center',
      text: 'text-[13px] text-ink-muted dark:text-dark-ink-muted',
      divider: 'h-3 w-px bg-outline-variant dark:bg-dark-outline-variant mx-4',
      link: 'text-[13px] text-ink-muted dark:text-dark-ink-muted hover:text-primary dark:hover:text-dark-primary',
    },

    iconLinks: {
      placeholder: 'h-8',
      list: 'flex',
      link: 'inline-flex h-7 w-7 items-center justify-center rounded-full text-ink dark:text-dark-ink hover:text-primary dark:hover:text-dark-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors duration-150',
    },

    buttons: {
      themeToggle: 'inline-flex min-h-10 min-w-10 items-center justify-center rounded-full hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors duration-150',
      themeIcon: 'h-5 w-5 text-ink dark:text-dark-ink',
      backToTop: 'fixed bottom-16 right-8 p-2 rounded-full bg-surface-low dark:bg-dark-surface-low text-ink dark:text-dark-ink shadow-lg hover:bg-primary/80 dark:hover:bg-dark-primary/70 transition-all duration-300',
      backToTopIcon: 'h-6 w-6',
      primary: 'inline-flex min-h-10 items-center gap-2 rounded-full bg-primary dark:bg-dark-primary text-primary-on dark:text-dark-primary-on px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary-strong dark:hover:bg-dark-primary-strong hover:text-primary-on dark:hover:text-dark-primary-on transition-colors duration-150',
    },

    jobMarket: {
      actions: 'mt-4 flex flex-wrap gap-3',
      paperCard: '!mb-0 !rounded-[28px] !bg-secondary-container/75 dark:!bg-dark-secondary-container/70 !text-secondary-on-container dark:!text-dark-secondary-on-container',
      paperFeatureGrid: 'grid grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-surface-lowest/80 p-3 dark:bg-dark-surface-low/85 sm:p-4 md:grid-cols-[minmax(14rem,0.72fr)_minmax(0,1.68fr)] md:items-center md:gap-5',
      paperMedia: 'relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white',
      paperImage: 'object-contain',
      paperImagePlaceholder: 'absolute inset-0 flex flex-col items-center justify-center gap-2 text-tertiary-on-container dark:text-dark-tertiary-on-container',
      paperImagePlaceholderIcon: 'h-9 w-9 opacity-70',
      paperImagePlaceholderLabel: 'text-[11px] uppercase tracking-[0.1em] font-semibold opacity-80',
      paperFeatureBody: 'flex min-w-0 flex-col justify-center p-2 sm:p-3 md:py-4 md:pr-4 md:pl-2',
      paperTitle: 'font-display text-[22px] sm:text-[24px] leading-8 font-medium tracking-[-0.005em] mb-1 text-ink dark:text-dark-ink',
      abstractWrap: 'mt-2 mb-1',
      abstractText: 'text-[13px] leading-relaxed text-justify text-ink-muted dark:text-dark-ink-muted',
      researchLink: 'mt-4 text-[14px]',
      cvNote: 'text-[13px] leading-relaxed text-ink-muted dark:text-dark-ink-muted -mt-2 mb-1',
      referenceList: 'grid gap-5 sm:grid-cols-3',
      referenceItem: 'flex flex-col gap-1 min-w-0',
      referenceName: 'text-[16px] font-semibold text-ink dark:text-dark-ink',
      referenceInstitution: 'text-[13px] text-ink-muted dark:text-dark-ink-muted break-words',
      referenceLink: 'text-[13px] text-primary dark:text-dark-primary hover:text-primary-strong dark:hover:text-dark-primary-strong pt-1 underline-offset-[3px] hover:underline',
    },

    notFound: {
      root: 'flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-16 overflow-hidden text-center',
      icon: 'text-primary dark:text-dark-primary text-[40px] font-semibold mb-6',
      title: 'font-display text-ink dark:text-dark-ink text-[30px] font-medium mb-3',
      message: 'text-ink-muted dark:text-dark-ink-muted text-[16px] font-normal mb-6',
      button: 'inline-flex min-h-10 items-center gap-2 rounded-full bg-primary dark:bg-dark-primary text-primary-on dark:text-dark-primary-on px-5 py-2.5 text-sm font-semibold hover:bg-primary-strong dark:hover:bg-dark-primary-strong transition-colors duration-150',
      buttonIcon: 'h-4 w-4',
    },
  },
}

module.exports = siteSettings
