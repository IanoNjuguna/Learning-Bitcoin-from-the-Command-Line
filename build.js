const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.mkdirSync(distDir, { recursive: true });

const entries = fs.readdirSync(__dirname, { withFileTypes: true });

for (const entry of entries) {
  if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'build.js') {
    continue;
  }
  const srcPath = path.join(__dirname, entry.name);
  const destPath = path.join(distDir, entry.name);
  fs.cpSync(srcPath, destPath, { recursive: true });
}

console.log('Successfully built static documentation into dist/');
