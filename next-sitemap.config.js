/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');

// Function to recursively get all PDF files from public directory
function getAllPDFs(dirPath = 'public', arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      getAllPDFs(filePath, arrayOfFiles);
    } else if (path.extname(file).toLowerCase() === '.pdf') {
      // Convert file path to URL path by removing 'public' and replacing backslashes
      const urlPath = filePath
        .replace('public', '')
        .split(path.sep)
        .join('/');
      arrayOfFiles.push(urlPath);
    }
  });

  return arrayOfFiles;
}

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sauhardsriv.github.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404'],
  additionalPaths: async (config) => {
    const result = [];
    
    // Automatically detect all PDFs in public folder
    const pdfPaths = getAllPDFs();
    
    for (const pdf of pdfPaths) {
      result.push({
        loc: `${config.siteUrl}${pdf}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      });
    }

    return result;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: ['/*.pdf'] // Allow all PDFs
      }
    ],
  },
}