import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaCartPlus, FaCheck } from 'react-icons/fa';
import { HiShieldCheck } from 'react-icons/hi';
import { addToCart } from '@/redux/slices/cartSlice';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import { useTranslation } from '@/hooks/useTranslation';
import {
  formatCurrency,
  calcFinalPrice,
  calcPointsEarned,
  maxRedeemablePoints,
  pointsToEgp,
  generateWhatsAppLink,
} from '@/lib/utils';

export default function ProductDetails() {
  const { productId } = useParams();
  const { products, loading } = useSelector((s) => s.products);
  const { loggedUser, logged } = useSelector((s) => s.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const [pointsToUse, setPointsToUse] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const cartItems = useSelector((s) => s.cart.items);
  const inCart = cartItems.some((i) => String(i.id) === String(productId));

  const BackIcon = isRTL ? FaChevronRight : FaChevronLeft;

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(productId)),
    [products, productId]
  );

  // Reset points slider when product changes
  useEffect(() => {
    setPointsToUse(0);
  }, [productId]);

  // Scroll to top on navigate
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  if (loading) return <Loader message={t('common.loading')} />;

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t('common.productNotFound')}
          </h1>
          <Link to="/products" className="btn-premium text-white px-6 py-3 inline-flex items-center gap-2">
            <BackIcon className="text-sm" />
            {t('common.backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  const finalPrice = calcFinalPrice(product.price, product.discount);
  const hasDiscount = product.discount > 0;
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Points calculations
  const availablePoints = loggedUser?.availablePoints || 0;
  const maxPoints = maxRedeemablePoints(finalPrice, availablePoints);
  const pointsDiscount = pointsToEgp(pointsToUse);
  const payablePrice = finalPrice - pointsDiscount;
  const earnablePoints = calcPointsEarned(payablePrice);

  const handleOrder = () => {
    // Open WhatsApp
    window.open(generateWhatsAppLink(product, finalPrice, pointsToUse), '_blank');
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <BackIcon className="text-sm group-hover:-translate-x-1 transition-transform" />
          <span>{t('common.backToProducts')}</span>
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Product Image */}
          <div className="space-y-4">
            <div
              className={`relative card-premium aspect-square overflow-hidden cursor-zoom-in transition-all duration-300 ${
                isZoomed ? 'shadow-glow' : ''
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              {/* Category Badge */}
              <span className="absolute top-4 inset-s-4 z-10 px-4 py-1.5 text-sm font-medium rounded-full bg-primary/90 text-primary-foreground capitalize backdrop-blur-sm">
                {t(`categories.${product.category}`, product.category)}
              </span>

              {/* Discount Badge */}
              {hasDiscount && (
                <span className="absolute top-4 inset-e-4 z-20 px-6 py-3 text-4xl font-black rounded-2xl bg-destructive text-white shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse ring-4 ring-white/30">
                  -{product.discount}%
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-contain p-8 transition-transform duration-500 ${
                  isZoomed ? 'scale-150' : 'hover:scale-105'
                }`}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/500x500?text=No+Image';
                }}
              />

              {/* NFC Badge */}
              {product.nfcCode && (
                <span className="absolute bottom-4 inset-s-4 flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/90 text-white text-sm font-medium backdrop-blur-sm">
                  <HiShieldCheck className="text-lg" />
                  {t('common.authentic')}
                </span>
              )}

              {!isZoomed && (
                <div className="absolute bottom-4 inset-e-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs backdrop-blur-sm">
                  {t('common.clickToZoom')}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-sm font-medium text-primary capitalize">{t(`categories.${product.category}`, product.category)}</span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-1">
                {t(`productData.${product.name.toLowerCase().replace(/\s+/g, '-')}.name`, product.name)}
              </h1>
            </div>

            {/* Description */}
            {(product.description || t(`productData.${product.name.toLowerCase().replace(/\s+/g, '-')}.description`, '')) && (
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 flex-1">
                {t(`productData.${product.name.toLowerCase().replace(/\s+/g, '-')}.description`, product.description)}
              </p>
            )}

            {/* Price Card */}
            <div className="card-premium p-6 mb-6">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
                  {formatCurrency(finalPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>

              {/* Points Section */}
              {logged && (
                <div className="border-t border-border pt-4 mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('common.availablePoints')}</span>
                    <span className="font-semibold text-primary">{availablePoints}</span>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">{t('common.redeemPoints')}</label>
                    <input
                      type="range"
                      min="0"
                      max={maxPoints}
                      step="1"
                      value={pointsToUse}
                      onChange={(e) => setPointsToUse(Number(e.target.value))}
                      className="w-full mt-1 accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span className="font-medium text-foreground">{pointsToUse} {t('common.points')}</span>
                      <span>{maxPoints}</span>
                    </div>
                  </div>

                  {pointsToUse > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('common.pointsDiscount')}</span>
                      <span className="font-semibold text-green-500">-{formatCurrency(pointsDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                    <span>{t('common.finalPrice')}</span>
                    <span className="gradient-text">{formatCurrency(payablePrice)}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {t('common.earnPoints')}: +{earnablePoints} {t('common.points')}
                  </p>
                </div>
              )}
              

              {/* Guest Points Invitation */}
              {!logged && (
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-sm font-medium text-foreground text-center sm:text-start">
                    {t('common.earnPointsGuest').replace('{points}', earnablePoints)}
                  </p>
                  <Link to="/login" className="text-xs text-primary hover:underline mt-1 block text-center sm:text-start">
                    {t('common.login')} / {t('common.signUp')}
                  </Link>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleOrder}
                className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white text-lg font-semibold transition-all hover:shadow-lg hover:scale-[1.01]"
              >
                <FaWhatsapp className="text-2xl" />
                {t('common.orderViaWhatsApp')}
              </button>
              <button
                onClick={handleAddToCart}
                className={`px-5 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-green-500 text-white'
                    : inCart
                      ? 'bg-primary/80 text-white hover:bg-primary'
                      : 'bg-primary text-white hover:bg-primary/90'
                }`}
                title={t('common.addToCart')}
              >
                {justAdded ? <FaCheck className="text-xl" /> : <FaCartPlus className="text-xl" />}
              </button>
            </div>

            {/* Authentic Status */}
            {product.nfcCode && (
              <div className="flex items-center gap-2 text-sm text-green-500 font-medium mt-4">
                <HiShieldCheck className="text-xl" />
                {t('common.authentic')}
              </div>
            )}
          </div>
        </div>

        {/* Customer Service Link */}
        <div className="mb-12 p-6 rounded-2xl bg-secondary/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">{t('customerService.needHelp')}</h3>
            <p className="text-sm text-muted-foreground">{t('customerService.helpDesc')}</p>
          </div>
          <Link
            to="/customer-service"
            className="px-6 py-2.5 rounded-xl border border-border text-foreground hover:bg-secondary transition-all font-medium whitespace-nowrap"
          >
            {t('footer.customerService')}
          </Link>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              <span className="gradient-text">{t('common.relatedProducts')}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
