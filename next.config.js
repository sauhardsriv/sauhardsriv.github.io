/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  images: {
    unoptimized: true // Required for static export
  },
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig
