import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaCheck } from 'react-icons/fa6';
import { FaCartPlus } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency, calcFinalPrice } from '@/lib/utils';
import { addToCart } from '@/redux/slices/cartSlice';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const [justAdded, setJustAdded] = useState(false);

  const finalPrice = calcFinalPrice(product.price, product.discount);
  const hasDiscount = product.discount > 0;
  const inCart = cartItems.some((i) => String(i.id) === String(product.id));

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block relative">
      <div className="card-premium h-full flex flex-col overflow-hidden hover-lift">
        {/* Image Container */}
        <div className="relative aspect-square bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />

          {/* Overlay Actions - Desktop */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-primary flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              <FaEye className="text-lg" />
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-12 h-12 rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg ${
                justAdded
                  ? 'bg-green-500 text-white'
                  : inCart
                    ? 'bg-green-500/80 text-white hover:bg-green-600'
                    : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {justAdded ? (
                <FaCheck className="text-lg animate-in zoom-in-50 duration-200" />
              ) : (
                <FaCartPlus className="text-lg" />
              )}
            </button>
          </div>

          {/* Mobile Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-2 inset-e-2 md:hidden w-9 h-9 rounded-full flex items-center justify-center shadow-lg z-10 transition-all ${
              justAdded
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white'
            }`}
          >
            {justAdded ? <FaCheck className="text-sm" /> : <FaCartPlus className="text-sm" />}
          </button>

          {/* Category Badge */}
          <span className="absolute top-3 inset-s-3 px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-primary-foreground capitalize backdrop-blur-sm">
            {t(`categories.${product.category}`, product.category)}
          </span>

          {/* Discount Badge */}
          {hasDiscount && (
            <span className="absolute top-2 inset-e-2 px-4 py-2 text-2xl font-black rounded-2xl bg-destructive text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse ring-4 ring-white/20 z-10">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-1 md:line-clamp-2 mb-2 group-hover:text-primary transition-colors text-sm md:text-base">
            {t(`productData.${product.name.toLowerCase().replace(/\s+/g, '-')}.name`, product.name)}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-center gap-2 mt-auto pt-3 border-t border-border">
            <span className="text-xl md:text-2xl font-bold gradient-text">
              {formatCurrency(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
