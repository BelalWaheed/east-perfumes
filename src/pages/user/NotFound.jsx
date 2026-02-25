import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotFound() {
  const { t, isRTL } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Big 404 */}
        <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {t('notFound.title')}
        </h2>
        <p className="text-muted-foreground mb-8">{t('notFound.description')}</p>
        <Link to="/" className="btn-premium px-8 py-3 text-white inline-block">
          {t('common.goHome')}
        </Link>
      </div>
    </div>
  );
}
