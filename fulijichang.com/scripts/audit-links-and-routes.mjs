import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const repoRoot = path.resolve(projectRoot, '..');

console.log('====================================================');
console.log('开始全面排查博客项目死链、数据源映射与重定向自检');
console.log('====================================================\n');

// 1. 读取实际数据源
const articlesDir = path.join(projectRoot, 'src', 'content', 'articles');
const mdFiles = (await readdir(articlesDir)).filter(f => f.endsWith('.md'));
const articleSlugs = new Set(mdFiles.map(f => f.replace(/\.md$/, '')));

console.log(`[数据源] src/content/articles 下检测到 ${articleSlugs.size} 篇 Markdown 文章。`);

// 读取 knowledgeGuides.ts
const knowledgeFile = path.join(projectRoot, 'src', 'data', 'knowledgeGuides.ts');
const knowledgeContent = await readFile(knowledgeFile, 'utf8');
const knowledgeSlugMatches = [...knowledgeContent.matchAll(/g\('([^']+)'/g)].map(m => m[1]);
const knowledgeSlugs = new Set(knowledgeSlugMatches);
console.log(`[数据源] src/data/knowledgeGuides.ts 下检测到 ${knowledgeSlugs.size} 篇知识库指南。`);

// 读取 airportDetails.ts
const airportFile = path.join(projectRoot, 'src', 'data', 'airportDetails.ts');
const airportContent = await readFile(airportFile, 'utf8');
const airportIdMatches = [...airportContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const airportIds = new Set(airportIdMatches);
console.log(`[数据源] src/data/airportDetails.ts 下检测到 ${airportIds.size} 个独立机场详情。\n`);

// 2. 递归获取目录下所有 HTML 文件
async function getAllHtmlFiles(dir, skipDirs = []) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllHtmlFiles(fullPath, skipDirs));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = await getAllHtmlFiles(repoRoot, ['node_modules', 'dist', '.astro', '.git', '.pnpm-store', 'fulijichang.com']);
console.log(`[扫描范围] 仓库根目录下共检测到 ${htmlFiles.length} 个 HTML 页面待扫描。\n`);

// 3. 检查 HTML 文件的内链与死链
const deadLinks = [];
const emptyLinks = [];
const redirectRisks = [];
let totalLinksChecked = 0;
const verifiedFiles = new Set();
const htmlContentCache = new Map();

function getHtmlContent(filePath) {
  if (!htmlContentCache.has(filePath)) {
    try {
      htmlContentCache.set(filePath, readFileSync(filePath, 'utf8'));
    } catch {
      htmlContentCache.set(filePath, null);
    }
  }
  return htmlContentCache.get(filePath);
}

for (const htmlFile of htmlFiles) {
  const relFile = path.relative(repoRoot, htmlFile).replaceAll('\\', '/');
  const content = getHtmlContent(htmlFile);
  if (!content) continue;

  // 检查重定向死循环风险
  if (content.includes('http-equiv="refresh"') || content.includes('http-equiv=\'refresh\'')) {
    redirectRisks.push({ file: relFile, type: 'META_REFRESH', detail: '存在 meta refresh 重定向标签' });
  }
  if (content.includes('window.location.href =') || content.includes('location.replace(') || content.includes('location.assign(')) {
    redirectRisks.push({ file: relFile, type: 'JS_REDIRECT', detail: '存在 window.location 跳转语句' });
  }

  // 提取所有 a href、link href、script src、img src
  const linkRegex = /(?:href|src)=["']([^"']+)["']/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const rawUrl = match[1].trim();
    totalLinksChecked++;

    // 过滤外部链接与特殊协议
    if (!rawUrl) {
      emptyLinks.push({ file: relFile, rawUrl, reason: '空链接' });
      continue;
    }
    if (rawUrl === '#' || rawUrl === 'javascript:void(0)' || rawUrl === 'javascript:;') {
      emptyLinks.push({ file: relFile, rawUrl, reason: '空哈希或占位符' });
      continue;
    }
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('//') || rawUrl.startsWith('mailto:') || rawUrl.startsWith('tel:') || rawUrl.startsWith('data:')) {
      continue; // 站外或特殊协议
    }

    // 解析站内链接
    let [urlPath, hash] = rawUrl.split('#');
    let targetFilePath;

    if (urlPath === '') {
      // 纯锚点跳转当前页，如 href="#group-clash"
      targetFilePath = htmlFile;
    } else {
      // 包含路径，如 ../recommend/index.html 或 /articles/xxx/
      // 统一根据相对路径解析
      if (urlPath.startsWith('/')) {
        targetFilePath = path.join(repoRoot, decodeURIComponent(urlPath));
      } else {
        targetFilePath = path.resolve(path.dirname(htmlFile), decodeURIComponent(urlPath));
      }

      // 如果目标是目录，自动补全 index.html
      if (existsSync(targetFilePath)) {
        try {
          const s = readFileSync(targetFilePath);
        } catch (e) {
          if (existsSync(path.join(targetFilePath, 'index.html'))) {
            targetFilePath = path.join(targetFilePath, 'index.html');
          }
        }
      } else if (existsSync(targetFilePath + '.html')) {
        targetFilePath = targetFilePath + '.html';
      } else if (existsSync(path.join(targetFilePath, 'index.html'))) {
        targetFilePath = path.join(targetFilePath, 'index.html');
      }
    }

    // 检查目标文件是否存在
    if (!existsSync(targetFilePath)) {
      deadLinks.push({
        file: relFile,
        rawUrl,
        resolvedPath: path.relative(repoRoot, targetFilePath).replaceAll('\\', '/'),
        reason: '目标静态文件不存在 (404)'
      });
      continue;
    }

    // 如果带有锚点 hash，验证目标页面内是否存在对应 ID
    if (hash) {
      const decodedHash = decodeURIComponent(hash);
      const targetContent = getHtmlContent(targetFilePath);
      if (targetContent) {
        // 匹配 id="hash" 或 id='hash' 或 name="hash"
        const hasId = targetContent.includes(`id="${decodedHash}"`) || targetContent.includes(`id='${decodedHash}'`);
        const hasName = targetContent.includes(`name="${decodedHash}"`) || targetContent.includes(`name='${decodedHash}'`);
        if (!hasId && !hasName) {
          deadLinks.push({
            file: relFile,
            rawUrl,
            resolvedPath: path.relative(repoRoot, targetFilePath).replaceAll('\\', '/'),
            reason: `页面存在，但找不到锚点 ID: #${decodedHash}`
          });
        }
      }
    }
  }
}

// 4. 核对详情页与列表页的数据源映射
console.log('--- 数据源与正文存在性核对 ---');
let missingArticles = 0;
for (const slug of articleSlugs) {
  const htmlPath = path.join(repoRoot, 'articles', slug, 'index.html');
  if (!existsSync(htmlPath)) {
    console.error(`[缺失] Markdown 文章 ${slug}.md 对应的静态页面不存在: articles/${slug}/index.html`);
    missingArticles++;
  }
}

let missingGuides = 0;
for (const slug of knowledgeSlugs) {
  const htmlPath = path.join(repoRoot, 'knowledge', slug, 'index.html');
  if (!existsSync(htmlPath)) {
    console.error(`[缺失] 知识库指南 ${slug} 对应的静态页面不存在: knowledge/${slug}/index.html`);
    missingGuides++;
  }
}

let missingAirports = 0;
for (const id of airportIds) {
  const htmlPath = path.join(repoRoot, 'airport', id, 'index.html');
  if (!existsSync(htmlPath)) {
    console.error(`[缺失] 机场独立测评 ID ${id} 对应的静态页面不存在: airport/${id}/index.html`);
    missingAirports++;
  }
}

console.log(`- 深度文章核对: ${articleSlugs.size} 篇全部存在: ${missingArticles === 0 ? '✓ 通过' : '✗ 存在缺失'}`);
console.log(`- 知识库指南核对: ${knowledgeSlugs.size} 篇全部存在: ${missingGuides === 0 ? '✓ 通过' : '✗ 存在缺失'}`);
console.log(`- 机场独立测评核对: ${airportIds.size} 家全部存在: ${missingAirports === 0 ? '✓ 通过' : '✗ 存在缺失'}\n`);

// 5. 结果汇总
console.log('================ 扫描报告统计 ================');
console.log(`共核验链接总数: ${totalLinksChecked} 次`);
console.log(`死链 (404) 数量: ${deadLinks.length}`);
console.log(`空链接/占位符数量: ${emptyLinks.length}`);
console.log(`重定向冲突与死循环风险: ${redirectRisks.length}`);

if (deadLinks.length > 0) {
  console.log('\n[死链详情清单]:');
  deadLinks.forEach(item => {
    console.log(`- 来源文件: ${item.file}`);
    console.log(`  链接目标: ${item.rawUrl}`);
    console.log(`  解析路径: ${item.resolvedPath}`);
    console.log(`  原因: ${item.reason}\n`);
  });
}

if (redirectRisks.length > 0) {
  console.log('\n[重定向风险清单]:');
  redirectRisks.forEach(item => {
    console.log(`- 文件: ${item.file} | 类型: ${item.type} | 说明: ${item.detail}`);
  });
}

if (emptyLinks.length > 0) {
  console.log('\n[空链接清单]:');
  emptyLinks.forEach(item => {
    console.log(`- 文件: ${item.file} | 链接: ${item.rawUrl} | 说明: ${item.reason}`);
  });
}

if (deadLinks.length === 0 && redirectRisks.length === 0 && emptyLinks.length === 0 && missingArticles === 0 && missingGuides === 0 && missingAirports === 0) {
  console.log('\n>>> 结论: 未发现任何死链与路由异常，无需改动代码。');
} else {
  console.log('\n>>> 结论: 检测到异常项，请根据上述清单进行修复。');
}
