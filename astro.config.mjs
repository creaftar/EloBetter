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
      i18n: {
        defaultLocale: "en-us",
        locales: {
          "en-us": "en",
          "en-gb": "en",
          "en-au": "en",
          "en-sg": "en",
          "en-ph": "en",
          "pt-br": "pt",
          "es-mx": "es",
          "es-es": "es",
          "ko-kr": "ko",
          "ja-jp": "ja",
          "tr-tr": "tr",
          "vi-vn": "vi",
          "de-de": "de",
          "fr-fr": "fr",
          "it-it": "it",
          "pl-pl": "pl",
          "el-gr": "el",
          "ro-ro": "ro",
          "hu-hu": "hu",
          "cs-cz": "cs",
          "ru-ru": "ru",
          "th-th": "th",
          "zh-tw": "zh",
          "ar-ae": "ar"
        }
      }
    })
  ],
});
