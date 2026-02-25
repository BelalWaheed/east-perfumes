import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSEO } from '@/hooks/useSEO';
import { calcFinalPrice, generateWhatsAppLink, pointsToEgp, maxRedeemablePoints, formatEGP } from '@/lib/utils';
import { purchaseProduct } from '@/redux/slices/profileSlice';
import { FaWhatsapp, FaArrowLeft, FaGem, FaMinus, FaPlus, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function ProductDetails() {
  const { id }        = useParams();
  const dispatch      = useDispatch();
  const { products }  = useSelector((s) => s.products);
  const { loggedUser, logged } = useSelector((s) => s.profile);

  const product    = products.find((p) => p.id === id);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  useSEO({
    title: product?.name || 'Product',
    description: product?.description,
    image: product?.image,
  });

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Product not found.</p>
        <Link to="/products" className="btn btn-gold">Browse Products</Link>
      </div>
    );
  }

  const finalPrice   = calcFinalPrice(product.price, product.discount);
  const hasDiscount  = product.discount > 0;
  const discount     = pointsToEgp(points);
  const payable      = Math.max(0, finalPrice - discount);
  const maxPoints    = logged ? maxRedeemablePoints(finalPrice, loggedUser?.availablePoints || 0) : 0;
  const alreadyOwned = loggedUser?.purchasedProducts?.includes(product.id);
  const waLink       = generateWhatsAppLink(product, finalPrice, points);

  const handlePurchase = async () => {
    if (!logged) { Swal.fire('Sign in required', 'Please sign in to purchase.', 'info'); return; }
    if (alreadyOwned) { Swal.fire('Already Owned', 'You already have this fragrance.', 'info'); return; }

    const confirm = await Swal.fire({
      title: 'Confirm Purchase',
      html: `
        <p style="margin-bottom:0.5rem">You will be ordering via WhatsApp.</p>
        <p><b>Payable:</b> ${formatEGP(payable)}</p>
        ${points > 0 ? `<p style="color:#c9a84c"><b>Points Used:</b> ${points} pts (−${formatEGP(discount)})</p>` : ''}
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '✅ Confirm & Order',
      confirmButtonColor: '#9b7d33',
    });
    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      await dispatch(purchaseProduct({ user: loggedUser, product, finalPrice, pointsUsed: points })).unwrap();
      window.open(waLink, '_blank');
      Swal.fire('Order Placed! 🌹', 'Your order has been sent via WhatsApp. Points updated.', 'success');
      setPoints(0);
    } catch {
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <Link to="/products" className="btn btn-ghost btn-sm" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FaArrowLeft size={12} /> Back to Products
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Image */}
          <div className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 360, background: 'var(--surface-raised)' }}>
            <img src={product.image} alt={product.name} style={{ maxHeight: 320, maxWidth: '100%', objectFit: 'contain' }} />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span className="badge badge-gold" style={{ textTransform: 'capitalize', marginBottom: '0.75rem' }}>{product.category}</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.2, marginBottom: '0.5rem' }}>{product.name}</h1>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{product.description}</p>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {hasDiscount && (
                <>
                  <span className="price-original" style={{ fontSize: '1rem' }}>{formatEGP(product.price)}</span>
                  <span className="discount-badge">-{product.discount}%</span>
                </>
              )}
              <span className="price-final" style={{ fontSize: '1.5rem' }}>{formatEGP(finalPrice)}</span>
            </div>

            {/* NFC code */}
            {product.nfcCode && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', background: 'var(--gold-glow)', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <FaCheckCircle style={{ color: 'var(--gold)' }} />
                NFC Verified — Code: <strong style={{ color: 'var(--gold)' }}>{product.nfcCode}</strong>
              </div>
            )}

            {/* Points Redemption */}
            {logged && (loggedUser?.availablePoints || 0) > 0 && (
              <div className="card" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  <FaGem style={{ color: 'var(--gold)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Redeem Points</span>
                  <span className="badge badge-gold">{loggedUser?.availablePoints || 0} pts available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setPoints((p) => Math.max(0, p - 10))} disabled={points === 0}><FaMinus size={12} /></button>
                  <div style={{ flex: 1 }}>
                    <input
                      id="points-input"
                      type="range"
                      min={0}
                      max={maxPoints}
                      step={10}
                      value={points}
                      onChange={(e) => setPoints(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--gold)' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                      <span>0</span><span>{maxPoints}</span>
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={() => setPoints((p) => Math.min(maxPoints, p + 10))} disabled={points >= maxPoints}><FaPlus size={12} /></button>
                </div>
                {points > 0 && (
                  <div style={{ marginTop: '0.75rem', padding: '0.6rem', background: 'var(--bg-secondary)', borderRadius: 8, fontSize: '0.83rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Points discount ({points} pts):</span>
                      <span style={{ color: 'var(--gold)' }}>−{formatEGP(discount)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: '0.3rem' }}>
                      <span>Payable:</span>
                      <span className="text-gold">{formatEGP(payable)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {alreadyOwned ? (
                <div style={{ padding: '0.75rem', background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 8, color: '#27ae60', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FaCheckCircle /> You already own this fragrance
                </div>
              ) : (
                <button
                  id="purchase-btn"
                  className="btn btn-gold btn-full btn-lg"
                  onClick={handlePurchase}
                  disabled={loading}
                >
                  {loading ? 'Processing…' : '🛒 Confirm Purchase'}
                </button>
              )}
              <a
                id={`wa-order-${id}`}
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-full"
                style={{ justifyContent: 'center', background: 'linear-gradient(135deg, #128c7e, #25d366)', color: 'white', padding: '0.75rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}
              >
                <FaWhatsapp size={18} /> Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
