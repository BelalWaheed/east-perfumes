import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaWhatsapp, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { HiShoppingCart, HiArrowLeft } from 'react-icons/hi';
import { removeFromCart, updateQuantity, clearCart, selectCartTotal } from '@/redux/slices/cartSlice';
import { updateProfile } from '@/redux/slices/profileSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { useSEO } from '@/hooks/useSEO';
import {
  formatCurrency,
  calcFinalPrice,
  maxRedeemablePoints,
  pointsToEgp,
} from '@/lib/utils';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.cart);
  const { loggedUser, logged } = useSelector((s) => s.profile);
  const cartTotal = useSelector(selectCartTotal);
  const { t, isRTL } = useTranslation();
  const [pointsToUse, setPointsToUse] = useState(0);

  useSEO({ title: t('cart.title') });

  // Points calculations
  const availablePoints = loggedUser?.availablePoints || 0;
  const maxPoints = maxRedeemablePoints(cartTotal, availablePoints);
  const pointsDiscount = pointsToEgp(pointsToUse);
  const payableTotal = cartTotal - pointsDiscount;

  const handleOrder = () => {
    // Build WhatsApp message with all cart items
    const phone = import.meta.env.VITE_WHATSAPP_PHONE || '201000000000';
    const itemLines = items.map((item, i) => {
      const fp = calcFinalPrice(item.price, item.discount);
      return `${i + 1}. ${item.name} × ${item.quantity} — ${formatCurrency(fp * item.quantity)}`;
    });

    const lines = [
      t('cart.whatsappTitle'),
      `━━━━━━━━━━━━━━━━━━━`,
      ...itemLines,
      `━━━━━━━━━━━━━━━━━━━`,
      `${t('cart.whatsappSubtotal')} ${formatCurrency(cartTotal)}`,
      pointsToUse > 0
        ? `${t('cart.whatsappPoints')} ${pointsToUse} pts (−${formatCurrency(pointsDiscount)})`
        : null,
      `${t('cart.whatsappTotal')} ${formatCurrency(payableTotal)}`,
      `━━━━━━━━━━━━━━━━━━━`,
      t('cart.whatsappConfirm'),
    ]
      .filter(Boolean)
      .join('\n');

    // Open WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(lines)}`, '_blank');

    // Deduct redeemed points from user profile
    if (logged && loggedUser && pointsToUse > 0) {
      dispatch(updateProfile({
        id: loggedUser.id,
        data: {
          usedPoints: (loggedUser.usedPoints || 0) + pointsToUse,
          availablePoints: Math.max(0, (loggedUser.availablePoints || 0) - pointsToUse),
        },
      }));
    }

    dispatch(clearCart());
    navigate('/verify');
    setPointsToUse(0);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
            <HiShoppingCart className="text-4xl text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('cart.empty')}</h1>
          <p className="text-muted-foreground mb-8">{t('cart.emptyDesc')}</p>
          <Link to="/products" className="btn-premium px-8 py-3 text-white inline-flex items-center gap-2">
            {t('common.backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <HiArrowLeft className={`group-hover:-translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            {t('common.backToProducts')}
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="gradient-text">{t('cart.title')}</span>
          <span className="text-sm font-normal text-muted-foreground ms-3">
            ({items.length} {t('cart.itemsCount')})
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const fp = calcFinalPrice(item.price, item.discount);
              const hasDiscount = item.discount > 0;

              return (
                <div key={item.id} className="card-premium p-4 flex gap-4 items-center">
                  {/* Image */}
                  <Link to={`/products/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain bg-gray-50 dark:bg-gray-800 p-2"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 text-sm sm:text-base"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground capitalize mt-0.5">
                      {t(`categories.${item.category}`, item.category)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold gradient-text text-lg">{formatCurrency(fp)}</span>
                      {hasDiscount && (
                        <span className="text-xs text-muted-foreground line-through">{formatCurrency(item.price)}</span>
                      )}
                    </div>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center rounded-xl bg-secondary overflow-hidden">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="px-2.5 py-1.5 hover:bg-primary/10 transition-colors"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="px-2.5 py-1.5 hover:bg-primary/10 transition-colors"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-xs text-destructive hover:text-destructive/80 transition-colors flex items-center gap-1"
                    >
                      <FaTrash className="text-[10px]" />
                      {t('common.remove')}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart */}
            <button
              onClick={() => { dispatch(clearCart()); setPointsToUse(0); }}
              className="text-sm text-destructive hover:text-destructive/80 transition-colors flex items-center gap-2 mt-2"
            >
              <FaTrash className="text-xs" />
              {t('cart.clearAll')}
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6 sticky top-24 space-y-4">
              <h2 className="text-lg font-bold text-foreground">{t('cart.summary')}</h2>

              {/* Items breakdown */}
              <div className="space-y-2 text-sm border-b border-border pb-4">
                {items.map((item) => {
                  const fp = calcFinalPrice(item.price, item.discount);
                  return (
                    <div key={item.id} className="flex justify-between text-muted-foreground">
                      <span className="truncate me-2">{item.name} × {item.quantity}</span>
                      <span className="font-medium text-foreground whitespace-nowrap">{formatCurrency(fp * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal */}
              <div className="flex justify-between font-semibold text-foreground">
                <span>{t('cart.subtotal')}</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>

              {/* Points Section */}
              {logged && (
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('common.availablePoints')}</span>
                    <span className={`font-semibold ${availablePoints > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                      {availablePoints}
                    </span>
                  </div>

                  {availablePoints > 0 ? (
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
                  ) : (
                    <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg border border-border italic text-center">
                      {t('cart.noPointsHint', 'Start shopping to earn points and get future discounts! 🎁')}
                    </p>
                  )}

                  {pointsToUse > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('common.pointsDiscount')}</span>
                      <span className="font-semibold text-green-500">-{formatCurrency(pointsDiscount)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Guest Points Invitation */}
              {!logged && (
                <div className="border-t border-border pt-4">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {t('cart.saveWithPointsGuest')}
                    </p>
                    <Link to="/login" className="btn-premium px-6 py-2 text-white text-xs mt-3 inline-block">
                      {t('common.login')} / {t('common.signUp')}
                    </Link>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between text-xl font-bold border-t border-border pt-4">
                <span>{t('cart.total')}</span>
                <span className="gradient-text">{formatCurrency(payableTotal)}</span>
              </div>

              {/* Order Button */}
              <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white text-lg font-semibold transition-all hover:shadow-lg hover:scale-[1.01]"
              >
                <FaWhatsapp className="text-2xl" />
                {t('common.orderViaWhatsApp')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
