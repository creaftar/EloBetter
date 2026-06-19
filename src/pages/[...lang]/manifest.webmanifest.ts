import type { APIRoute } from 'astro';
import pt from "@/i18n/pages/index/pt.json";
import en from "@/i18n/pages/index/en.json";
import es from "@/i18n/pages/index/es.json";
import fr from "@/i18n/pages/index/fr.json";
import it from "@/i18n/pages/index/it.json";
import de from "@/i18n/pages/index/de.json";
import ru from "@/i18n/pages/index/ru.json";
import id from "@/i18n/pages/index/id.json";
import hi from "@/i18n/pages/index/hi.json";

export function getStaticPaths() {
  return [
    { params: { lang: undefined } },
    { params: { lang: 'pt' } },
    { params: { lang: 'es' } },
    { params: { lang: 'fr' } },
    { params: { lang: 'it' } },
    { params: { lang: 'de' } },
    { params: { lang: 'ru' } },
    { params: { lang: 'id' } },
    { params: { lang: 'hi' } },
  ];
}

export const GET: APIRoute = ({ params }) => {
  // Pega o lang dos parâmetros da URL (definidos no getStaticPaths)
  const lang = params.lang || 'en'; 

  const locales: any = { pt, en, es, fr, it, de, ru, id, hi };
  const d = locales[lang] || locales.en;
  
  const startUrl = lang === 'en' ? '/' : `/${lang}/`;

  const manifest = {
    name: d.seo.title,
    short_name: "Creaftar",
    description: d.seo.description,
    start_url: startUrl,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "rgb(64, 64, 115)",
    lang: lang,
    icons: [
      {
        src: "/assets/imgs/logov3/bitmap.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any"
      },
      {
        src: "/assets/imgs/logov3/bitmap-maskable.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "maskable"
      },
      {
        src: "/assets/imgs/logov3/bitmap-512x512.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8'
    }
  });
}