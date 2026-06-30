const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const nojekyllPath = path.join(__dirname, 'out', '.nojekyll');
const seoFiles = ['robots.txt', 'sitemap.xml'];

if (!fs.existsSync(outDir)) {
  throw new Error('The out directory does not exist. Run npm run build before deployment.');
}

for (const fileName of seoFiles) {
  const sourcePath = path.join(__dirname, 'public', fileName);
  const outputPath = path.join(outDir, fileName);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, outputPath);
    console.log(`${fileName} copied to out directory.`);
  }
}

fs.writeFileSync(nojekyllPath, ''); // Create an empty file
console.log('.nojekyll file created in out directory.');
