import { cp, readFile, readdir, writeFile } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const repoRoot = path.resolve(projectRoot, '..');

await cp(distRoot, projectRoot, { recursive: true, force: true });
await cp(distRoot, repoRoot, { recursive: true, force: true });

async function getHtmlFiles(dir, skipDirs = []) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getHtmlFiles(fullPath, skipDirs));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function relativeTarget(file, root, rootUrl) {
  const [pathname, suffix = ''] = rootUrl.split(/(?=[?#])/);
  let decoded = decodeURIComponent(pathname);
  if (decoded === '/') decoded = '/index.html';
  else if (decoded.endsWith('/')) decoded += 'index.html';
  const target = path.join(root, decoded.slice(1));
  const relative = path.relative(path.dirname(file), target).replaceAll('\\', '/');
  return encodeURI(relative || 'index.html') + suffix;
}

async function processHtmlFiles(rootDir, skipDirs) {
  const files = await getHtmlFiles(rootDir, skipDirs);
  for (const file of files) {
    try {
      const source = readFileSync(file, 'utf8');
      const portable = source.replace(/\b(href|src)="(\/[^"]*)"/g, (_match, attr, url) => {
        return `${attr}="${relativeTarget(file, rootDir, url)}"`;
      });
      writeFileSync(file, portable, 'utf8');
    } catch (e) {
      console.warn(`Warning updating ${file}:`, e.message);
    }
  }
}

await processHtmlFiles(projectRoot, ['dist', 'node_modules', 'src', 'public', 'scripts', '.astro']);
await processHtmlFiles(repoRoot, ['dist', 'node_modules', 'src', 'public', 'scripts', '.astro', '.git', '.pnpm-store', 'fulijichang.com']);

console.log('Published dist to project root and repo root with portable relative links.');
