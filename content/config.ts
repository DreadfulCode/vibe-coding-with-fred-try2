import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' is for Markdown/MDX files
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};