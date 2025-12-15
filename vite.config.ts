/// <reference types="vitest" />

import analog, { PrerenderContentFile } from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: './node_modules/.vite',
    build: {
      // outDir: './dist/./client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    plugins: [
      analog({
        ssr: true,
        static: false,
        content: {
          highlighter: 'shiki',
          shikiOptions: {
            highlighter: {
              additionalLangs: ['bash', 'java', 'yaml'],
            },
            highlight: {
              theme: 'github-dark',
            },
          },
        },
        prerender: {
          sitemap: {
            host: 'https://www.oussemasahbeni.com',
          },
          routes: [
            '/',
            '/blog',
            '/projects',
            '/api/rss.xml',
            {
              contentDir: 'src/content',
              transform: (file: PrerenderContentFile) => {
                // do not include files marked as draft in frontmatter
                if (file.attributes['draft']) {
                  return false;
                }
                // use the slug from frontmatter if defined, otherwise use the files basename
                const slug = file.attributes['slug'] || file.name;
                return `/blog/${slug}`;
              },
            },
          ],
        },
      }),
      tailwindcss(),
      viteTsConfigPaths(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
