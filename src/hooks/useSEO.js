import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const BRAND = {
  ar: 'إيست بيرفيومز | عطور الشرق',
  en: 'East Perfumes | Luxury Fragrances',
};

/**
 * Lightweight SEO hook — sets document.title and injects/updates meta tags.
 * Accepts both `title` (string) and `titleAr`/`titleEn` for bilingual support.
 */
export function useSEO({ title, description, keywords, image } = {}) {
  const lang = useSelector((s) => s.language.language);

  useEffect(() => {
    // Title
    if (title) {
      document.title = `${title} | ${lang === 'ar' ? 'إيست بيرفيومز' : 'East Perfumes'}`;
    } else {
      document.title = BRAND[lang] || BRAND.ar;
    }

    const metaMap = {
      description,
      keywords,
      // Open Graph
      'og:title': document.title,
      'og:description': description,
      'og:image': image,
      'og:type': 'website',
      // Twitter
      'twitter:card': 'summary_large_image',
      'twitter:title': document.title,
      'twitter:description': description,
    };

    Object.entries(metaMap).forEach(([key, value]) => {
      if (!value) return;

      const isOG = key.startsWith('og:') || key.startsWith('twitter:');
      const attr  = isOG ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${key}"]`);

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }

      el.setAttribute('content', value);
    });

    return () => {
      document.title = BRAND[lang] || BRAND.ar;
    };
  }, [title, description, keywords, image, lang]);
}
