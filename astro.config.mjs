import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elobetter.pages.dev',  
  trailingSlash: 'never',
  prefetch: false,
  output: 'static',
  i18n: {
    defaultLocale: 'en-us', // Define uma string que exista nos locais abaixo
    locales: [
      'en-us', 'en-gb', 'en-au', 'en-sg', 'en-ph',
      'pt-br',
      'es-mx', 'es-es',
      'ko-kr', 'ja-jp', 'tr-tr', 'vi-vn',
      'de-de', 'fr-fr', 'it-it', 'pl-pl',
      'el-gr', 'ro-ro', 'hu-hu', 'cs-cz',
      'ru-ru', 'th-th', 'zh-tw', 'ar-ae'
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: 'file'
  },
  vite: {
    optimizeDeps: {
      include: ['axobject-query', 'aria-query'],
    },
    server: {
      host: true,
      port: 4321,
      fs: {
        allow: ['..']
      }
    },
    preview: {
      host: true,
      port: 4321,
    },
  },
  integrations: [
    sitemap({
      //filter: (page) => !page.includes('/private'), // exemplo: excluir rotas
      i18n: true, // gera sitemap com base nas rotas multilíngues
    }),
  ],
});
