const fs = require('fs');
const path = require('path');

const nojekyllPath = path.join(__dirname, 'out', '.nojekyll');

fs.writeFileSync(nojekyllPath, ''); // Create an empty file
console.log('.nojekyll file created in out directory.');