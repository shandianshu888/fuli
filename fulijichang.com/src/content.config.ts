import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) => z.object({
    title: z.string().min(8), description: z.string().min(30).max(180),
    publishDate: z.coerce.date(), updatedDate: z.coerce.date(),
    author: z.string(), reviewer: z.string(),
    category: z.enum(['recommend','compare','reviews','knowledge','deals','faq','risk']),
    tags: z.array(z.string()).min(1), cover: image(), coverAlt: z.string().min(5),
    draft: z.boolean().default(false), featured: z.boolean().default(false),
    sources: z.array(z.object({ title: z.string(), url: z.url(), publisher: z.string().optional(), accessed: z.coerce.date().optional() })).default([]),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    seoTitle: z.string().max(65).optional(), canonical: z.url().optional(), noindex: z.boolean().default(false),
  }),
});

export const collections = { articles };
