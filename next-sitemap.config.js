/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');
const { jobMarket, site } = require('./site.settings');

// User agents that collect content for AI model training. Search engines and the
// retrieval agents that AI assistants use to read and cite pages (OAI-SearchBot,
// ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot) are not listed.
const aiTrainingCrawlers = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'CCBot',
  'Bytespider',
  'cohere-training-data-crawler',
];
const allowAiTraining = site.crawlers?.aiTraining !== false;

// Returns every PDF under public/ with its last-modified time, for inclusion in the sitemap.
function getAllPDFs(dirPath = 'public', arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getAllPDFs(filePath, arrayOfFiles);
    } else if (path.extname(file).toLowerCase() === '.pdf') {
      const urlPath = encodeURI(filePath
        .replace('public', '')
        .split(path.sep)
        .join('/'));
      arrayOfFiles.push({ urlPath, lastmod: stats.mtime.toISOString() });
    }
  });

  return arrayOfFiles;
}

module.exports = {
  siteUrl: process.env.SITE_URL || site.url,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/_not-found', '/llms.txt', ...(jobMarket?.active ? [] : ['/job-market'])],
  additionalPaths: async (config) => {
    return getAllPDFs().map(pdf => ({
      loc: `${config.siteUrl}${pdf.urlPath}`,
      lastmod: pdf.lastmod,
      changefreq: 'monthly',
      priority: 0.7,
    }));
  },
  robotsTxtOptions: {
    policies: [
      ...(allowAiTraining ? [] : aiTrainingCrawlers.map(userAgent => ({ userAgent, disallow: '/' }))),
      {
        userAgent: '*',
        allow: '/',
      }
    ],
    transformRobotsTxt: async (config, robotsTxt) => allowAiTraining
      ? robotsTxt
      : robotsTxt.replace(/^User-agent: \*$/m, '$&\nContent-Signal: search=yes, ai-input=yes, ai-train=no'),
  },
}
