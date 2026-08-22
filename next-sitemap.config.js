/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');
const { jobMarket, site } = require('./site.settings');

// Returns every PDF path under public/ for inclusion in the sitemap.
function getAllPDFs(dirPath = 'public', arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      getAllPDFs(filePath, arrayOfFiles);
    } else if (path.extname(file).toLowerCase() === '.pdf') {
      const urlPath = encodeURI(filePath
        .replace('public', '')
        .split(path.sep)
        .join('/'));
      arrayOfFiles.push(urlPath);
    }
  });

  return arrayOfFiles;
}

module.exports = {
  siteUrl: process.env.SITE_URL || site.url,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', ...(jobMarket.active ? [] : ['/job-market'])],
  additionalPaths: async (config) => {
    const result = [];
    
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
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      }
    ],
  },
}
