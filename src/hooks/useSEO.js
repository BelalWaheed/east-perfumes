import { useEffect } from 'react';

/**
 * Lightweight SEO hook — uses native React 19 document metadata.
 * Sets document.title and injects/updates meta tags without any library.
 */
export function useSEO({ title, description, keywords, image } = {}) {
  useEffect(() => {
    // Title
    if (title) {
      document.title = `${title} | East Perfumes`;
    }

    const metaMap = {
      description,
      keywords,
      // Open Graph
      'og:title': title ? `${title} | East Perfumes` : undefined,
      'og:description': description,
      'og:image': image,
      'og:type': 'website',
      // Twitter
      'twitter:card': 'summary_large_image',
      'twitter:title': title ? `${title} | East Perfumes` : undefined,
      'twitter:description': description,
    };

    const applied = [];

    Object.entries(metaMap).forEach(([key, value]) => {
      if (!value) return;

      const isOG = key.startsWith('og:') || key.startsWith('twitter:');
      const attr  = isOG ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${key}"]`);

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        applied.push(el);
      }

      el.setAttribute('content', value);
    });

    return () => {
      // Reset title on unmount
      document.title = 'East Perfumes | Luxury Fragrances';
    };
  }, [title, description, keywords, image]);
}
