import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSEO } from '@/hooks/useSEO';
import { calcFinalPrice, formatEGP } from '@/lib/utils';
import { FaEdit, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function AdminProductDetails() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { products } = useSelector((s) => s.products);
  const product      = products.find((p) => p.id === id);

  useSEO({ title: product ? `Detail: ${product.name}` : 'Product Detail' });

  if (!product) return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      Product not found. <Link to="/admin/products" style={{ color: 'var(--gold)' }}>← Back</Link>
    </div>
  );

  const final = calcFinalPrice(product.price, product.discount);

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FaArrowLeft size={12} /> Back
        </button>
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ background: 'var(--surface-raised)', borderRadius: 12, padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
              <img src={product.image} alt={product.name} style={{ maxHeight: 180, maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <span className="badge badge-gold" style={{ textTransform: 'capitalize', marginBottom: '0.75rem' }}>{product.category}</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '0.75rem' }}>{product.name}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>{product.description}</p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <div><div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Original Price</div><div style={{ fontWeight: 600 }}>{formatEGP(product.price)}</div></div>
                <div><div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Discount</div><div style={{ fontWeight: 600, color: '#e74c3c' }}>{product.discount || 0}%</div></div>
                <div><div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Final Price</div><div className="price-final">{formatEGP(final)}</div></div>
              </div>

              {product.nfcCode && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--gold)' }}>
                  <FaCheckCircle /> NFC Code: <strong>{product.nfcCode}</strong>
                </div>
              )}
              <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '1rem' }}>ID: {product.id}</div>

              <Link to={`/admin/products/edit/${product.id}`} className="btn btn-gold btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaEdit size={12} /> Edit Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
