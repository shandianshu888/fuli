import { cp, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');

await cp(distRoot, projectRoot, { recursive: true, force: true });

async function htmlFiles(directory) {
  const files = [];
  for (const name of await readdir(directory)) {
    if (['dist', 'node_modules', 'src', 'public', 'scripts', '.astro'].includes(name)) continue;
    const fullPath = path.join(directory, name);
    const entry = await stat(fullPath);
    if (entry.isDirectory()) files.push(...await htmlFiles(fullPath));
    else if (name.endsWith('.html')) files.push(fullPath);
  }
  return files;
}

function relativeTarget(file, rootUrl) {
  const [pathname, suffix = ''] = rootUrl.split(/(?=[?#])/);
  let decoded = decodeURIComponent(pathname);
  if (decoded === '/') decoded = '/index.html';
  else if (decoded.endsWith('/')) decoded += 'index.html';
  const target = path.join(projectRoot, decoded.slice(1));
  const relative = path.relative(path.dirname(file), target).replaceAll('\\', '/');
  return encodeURI(relative || 'index.html') + suffix;
}

for (const file of await htmlFiles(projectRoot)) {
  const source = await readFile(file, 'utf8');
  const portable = source.replace(/\b(href|src)="(\/[^"]*)"/g, (_match, attr, url) => {
    return `${attr}="${relativeTarget(file, url)}"`;
  });
  await writeFile(file, portable, 'utf8');
}

console.log('Published dist to the project root with portable relative links.');
