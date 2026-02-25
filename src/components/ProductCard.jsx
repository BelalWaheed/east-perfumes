import { Link } from 'react-router-dom';
import { calcFinalPrice, generateWhatsAppLink } from '@/lib/utils';
import { FaWhatsapp, FaTag } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const { id, name, price, discount, image, category } = product;
  const finalPrice = calcFinalPrice(price, discount);
  const hasDiscount = discount > 0;
  const waLink = generateWhatsAppLink(product, finalPrice);

  return (
    <article
      className="card animate-fade-in"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <Link to={`/products/${id}`} style={{ display: 'block', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            height: 220,
            background: 'var(--surface-raised)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            position: 'relative',
          }}
        >
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            style={{
              maxHeight: 190, maxWidth: '100%',
              objectFit: 'contain',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {hasDiscount && (
            <span
              className="discount-badge"
              style={{ position: 'absolute', top: 12, right: 12 }}
            >
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {/* Category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <FaTag style={{ color: 'var(--gold)', fontSize: '0.65rem' }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'capitalize', letterSpacing: '0.05em' }}>
            {category}
          </span>
        </div>

        {/* Name */}
        <Link
          to={`/products/${id}`}
          style={{
            textDecoration: 'none',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            fontSize: '1rem',
            color: 'var(--text)',
            lineHeight: 1.3,
          }}
        >
          {name}
        </Link>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
          {hasDiscount && (
            <span className="price-original">{Number(price).toFixed(2)} EGP</span>
          )}
          <span className="price-final">{finalPrice.toFixed(2)} EGP</span>
        </div>

        {/* WhatsApp Button */}
        <a
          id={`wa-order-${id}`}
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-full"
          style={{
            marginTop: '0.75rem',
            background: 'linear-gradient(135deg, #128c7e, #25d366)',
            color: 'white',
            padding: '0.6rem',
            borderRadius: 8,
            justifyContent: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          <FaWhatsapp size={16} /> Order via WhatsApp
        </a>
      </div>
    </article>
  );
}
