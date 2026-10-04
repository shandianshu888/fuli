# 福利机场观察

基于 Astro 的静态中文内容博客，使用 TypeScript、Content Collections、原生 CSS 和少量原生 JavaScript。

## 本地运行

要求 Node.js 20.19+ 或 22.12+。

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

也可使用 npm：`npm install`、`npm run dev`、`npm run build`。

## 内容发布

文章位于 `src/content/articles/`。复制现有 Markdown 并填写 `src/content.config.ts` 定义的字段；图片放入 `src/assets/`。`draft: true` 的草稿不会进入页面、RSS 或 sitemap。

发布前核对标题与描述、来源、事实/反馈/观点标注、日期、图片 alt 和页面可见 FAQ。

## 结构

- `src/content.config.ts`：内容 schema
- `src/content/articles/`：文章
- `src/components/`：可复用组件
- `src/layouts/`：基础、栏目和文章布局
- `src/pages/`：页面与动态路由
- `src/styles/`：设计系统
- `KEYWORD-MAP.md`：关键词映射

## 品牌与部署

域名和站名在 `src/consts.ts` 与 `astro.config.mjs`。上线前替换站名、真实联系邮箱、作者资料和部署商隐私说明。

构建产物输出到 `dist/`，并自动同步到项目顶层。顶层发布副本使用相对链接，可以直接双击 `index.html` 预览，也可以上传到域名根目录。`dist/` 保留标准站点根路径版本。配置自定义 404、HTTPS、压缩和静态资源长缓存。
