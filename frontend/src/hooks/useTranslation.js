import { useSelector } from 'react-redux';
import ar from '@/i18n/ar.json';
import en from '@/i18n/en.json';

const translations = { ar, en };

export function useTranslation() {
  const { language } = useSelector((state) => state.language);
  const t = translations[language];
  const isRTL = language === 'ar';

  const translate = (key, fallback = null) => {
    const keys = key.split('.');
    let result = t;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return fallback !== null ? fallback : key;
      }
    }

    return typeof result === 'string' ? result : (fallback !== null ? fallback : key);
  };

  return {
    t: translate,
    language,
    isRTL,
    dir: isRTL ? 'rtl' : 'ltr',
  };
}
