import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fulijichang.com',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.includes('/search') })],
  markdown: { shikiConfig: { theme: 'github-light' } },
  build: { format: 'directory' },
});
