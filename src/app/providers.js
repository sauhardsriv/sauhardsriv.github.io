'use client'

import { ThemeProvider } from 'next-themes'
import { styles, theme } from './settings'

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute={theme.providerAttribute}
      defaultTheme={theme.defaultTheme}
      enableSystem={theme.enableSystem}
      storageKey={theme.storageKey}
      disableTransitionOnChange={theme.disableTransitionOnChange}
    >
      <div className={styles.appBackground}>
        {children}
      </div>
    </ThemeProvider>
  )
}
