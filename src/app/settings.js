import siteSettings from '../../site.settings'

export default siteSettings

export const site = siteSettings.site
export const theme = siteSettings.theme
export const navigation = siteSettings.navigation
export const pages = siteSettings.pages
export const socialLinks = siteSettings.socialLinks
export const profile = siteSettings.profile
export const papers = siteSettings.papers
export const assets = siteSettings.assets
export const styles = siteSettings.styles

function hexToRgbChannels(hex) {
  const value = hex.replace('#', '')
  const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value
  const int = parseInt(full, 16)
  return `${(int >> 16) & 255} ${(int >> 8) & 255} ${int & 255}`
}

// Builds the CSS that maps each palette's tokens to custom properties. `:root` holds the active
// palette; each `[data-palette="key"]` block lets the palette be switched at runtime.
export function paletteVariablesCss() {
  const toVars = (tokens) =>
    Object.entries(tokens)
      .map(([token, hex]) => `--${token}: ${hexToRgbChannels(hex)};`)
      .join(' ')

  const blocks = [`:root { ${toVars(theme.palettes[theme.palette])} }`]
  for (const [name, tokens] of Object.entries(theme.palettes)) {
    blocks.push(`[data-palette="${name}"] { ${toVars(tokens)} }`)
  }
  return blocks.join('\n')
}
