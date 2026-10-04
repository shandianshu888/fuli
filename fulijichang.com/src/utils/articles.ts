import type { CollectionEntry } from 'astro:content';

export const visible = (items: CollectionEntry<'articles'>[]) => items.filter((item) => !item.data.draft);
export const newest = (items: CollectionEntry<'articles'>[]) => [...visible(items)].sort((a,b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
export const readingTime = (body = '') => Math.max(1, Math.ceil(body.replace(/[#*`>|\[\]()\-]/g, '').length / 500));
export const formatDate = (date: Date) => new Intl.DateTimeFormat('zh-CN', { year:'numeric', month:'long', day:'numeric' }).format(date);
export const articlePath = (id: string) => `/articles/${id.replace(/\.(md|mdx)$/,'')}/`;
