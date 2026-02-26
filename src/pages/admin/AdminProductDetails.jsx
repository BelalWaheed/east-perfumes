import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiPencil, HiArrowLeft, HiShieldCheck } from 'react-icons/hi';
import { formatCurrency, calcFinalPrice } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export default function AdminProductDetails() {
  const { productId } = useParams();
  const { products } = useSelector((s) => s.products);
  const { t, isRTL } = useTranslation();

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(productId)),
    [products, productId]
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">{t('common.productNotFound')}</h2>
        <Link to="/admin/products" className="btn-premium px-8 py-3 text-white inline-block">
          {t('common.back')}
        </Link>
      </div>
    );
  }

  const finalPrice = calcFinalPrice(product.price, product.discount);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <HiArrowLeft className={`group-hover:-translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
        {t('common.back')}
      </Link>

      <div className="card-premium p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 object-contain"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
                {product.category}
              </span>
              <Link
                to={`/admin/products/edit/${product.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
              >
                <HiPencil /> {t('admin.edit')}
              </Link>
            </div>

            <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
            {product.description && (
              <p className="text-muted-foreground text-sm">{product.description}</p>
            )}

            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('admin.price')}</span>
                <span className="font-semibold text-foreground">{formatCurrency(product.price)}</span>
              </div>
              {product.discount > 0 && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('admin.discount')}</span>
                    <span className="text-destructive font-semibold">-{product.discount}%</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-foreground">{t('common.finalPrice')}</span>
                    <span className="gradient-text">{formatCurrency(finalPrice)}</span>
                  </div>
                </>
              )}
            </div>

            {product.nfcCode && (
              <div className="flex items-center gap-2 text-sm text-green-500 pt-4 border-t border-border">
                <HiShieldCheck className="text-lg" />
                NFC: <code className="px-2 py-0.5 bg-secondary rounded font-mono text-foreground">{product.nfcCode}</code>
              </div>
            )}

            

          </div>
        </div>
      </div>
    </div>
  );
}
