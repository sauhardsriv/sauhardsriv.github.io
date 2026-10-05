const { features = {} } = require('./content')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  images: {
    unoptimized: true // Required for static export
  },
  basePath: '',
  assetPrefix: '',
  // Per-paper pages live in page.paper.js and are built only when features.paperPages is enabled in content.js.
  pageExtensions: ['js', 'jsx', ...(features.paperPages ? ['paper.js'] : [])],
}

module.exports = nextConfig
