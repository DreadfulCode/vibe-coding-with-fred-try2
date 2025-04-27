import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://vibecoding.com',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      [remarkToc, {
        heading: "Contents", // The heading to look for to replace with TOC
        tight: true,         // Compact list items
        maxDepth: 3          // Only include h2 and h3 headings
      }]
    ],
    syntaxHighlight: 'prism',
    shikiConfig: {
      theme: 'github-light',
      langs: [],
      wrap: true,
    },
  },
});