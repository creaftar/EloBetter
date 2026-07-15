import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elobetter.com', 
  trailingSlash: 'always',
  prefetch: false,
  output: 'static',
  i18n: {
    defaultLocale: 'en-us', // Define uma string que exista nos locais abaixo
    locales: [
      'en-us',
      'en-gb', 'en-au', 'en-sg', 'en-ph',
      'pt-br', 'es-mx', 'es-es',
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
    format: 'directory',
    inlineStylesheets: 'always'
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
    build: {
      // Limite exato de 13 KiB em bytes
      assetsInlineLimit: 13312, 
    }
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en-us",
        locales: {
          "en-us": "en-us",
          "en-gb": "en-gb",
          "en-au": "en-au",
          "en-sg": "en-sg",
          "en-ph": "en-ph",
          "pt-br": "pt-br",
          "es-mx": "es-mx",
          "es-es": "es-es",
          "ko-kr": "ko-kr",
          "ja-jp": "ja-jp",
          "tr-tr": "tr-tr",
          "vi-vn": "vi-vn",
          "de-de": "de-de",
          "fr-fr": "fr-fr",
          "it-it": "it-it",
          "pl-pl": "pl-pl",
          "el-gr": "el-gr",
          "ro-ro": "ro-ro",
          "hu-hu": "hu-hu",
          "cs-cz": "cs-cz",
          "ru-ru": "ru-ru",
          "th-th": "th-th",
          "zh-tw": "zh-tw",
          "ar-ae": "ar-ae"
        }
      },
      serialize(item) {
        item.links = item.links || [];

        // 1. TRAVA: Só adicionamos o x-default se ele já não estiver na lista
        const jáTemXDefault = item.links.some(
          link => link.hreflang && link.hreflang.toLowerCase() === 'x-default'
        );

        if (!jáTemXDefault) {
          // 2. Procura se já existe um link com hreflang "en-us"
          const defaultLink = item.links.find(
            link => link.hreflang && link.hreflang.toLowerCase() === 'en-us'
          );

          if (defaultLink) {
            // Se achou o en-us, clona a URL dele para o x-default
            item.links.push({
              hreflang: 'x-default',
              url: defaultLink.url
            });
          } else {
            // 3. Fallback: Se o "en-us" ainda não estiver no loop, removemos a subpasta manualmente
            const urlObj = new URL(item.url);
            const cleanPath = urlObj.pathname.replace(/^\/(?:en-us|en-gb|en-au|en-sg|en-ph|pt-br|es-mx|es-es|ko-kr|ja-jp|tr-tr|vi-vn|de-de|fr-fr|it-it|pl-pl|el-gr|ro-ro|hu-hu|cs-cz|ru-ru|th-th|zh-tw|ar-ae)\//, '/');
            const defaultUrl = `${urlObj.origin}${cleanPath}`;

            item.links.push({
              hreflang: 'x-default',
              url: defaultUrl
            });
          }
        }

        return item;
      }
    })
  ],
});