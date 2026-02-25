import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAudioUrl, setIsPlaying } from '@/redux/slices/audioSlice';
import { productApi, userApi } from '@/lib/api';
import { useSEO } from '@/hooks/useSEO';
import Loader from '@/components/Loader';
import { FaCheckCircle, FaTimesCircle, FaMusic } from 'react-icons/fa';

export default function NfcVerify() {
  const { nfcCode }  = useParams();
  const dispatch     = useDispatch();

  const [status, setStatus]   = useState('loading'); // 'loading' | 'valid' | 'invalid'
  const [product, setProduct] = useState(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useSEO({
    title: status === 'valid' ? `Verified: ${product?.name}` : 'NFC Verification',
    description: 'East Perfumes NFC product authenticity verification',
  });

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      try {
        const [products, users] = await Promise.all([productApi.getAll(), userApi.getAll()]);

        if (cancelled) return;

        const found = products.find((p) => p.nfcCode === nfcCode);
        if (!found) { setStatus('invalid'); return; }

        setProduct(found);
        setStatus('valid');

        // Set admin audio
        const admin = users.find((u) => u.role === 'admin');
        if (admin?.audioURL) {
          dispatch(setAudioUrl(admin.audioURL));
          dispatch(setIsPlaying(true));
          setAudioLoaded(true);
        }
      } catch {
        setStatus('invalid');
      }
    }

    verify();
    return () => { cancelled = true; };
  }, [nfcCode, dispatch]);

  if (status === 'loading') return <Loader />;

  return (
    <div style={{
      minHeight: 'calc(100vh - 68px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: status === 'valid'
            ? 'radial-gradient(circle, rgba(39,174,96,0.12), transparent 70%)'
            : 'radial-gradient(circle, rgba(231,76,60,0.1), transparent 70%)',
        }} />
      </div>

      <div className="card animate-fade-in" style={{ maxWidth: 460, width: '100%', padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
        {status === 'valid' ? (
          <>
            {/* Valid */}
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              <FaCheckCircle style={{ color: '#27ae60' }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', color: '#27ae60', marginBottom: '0.5rem' }}>
              Authentic Product
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              This product has been verified as genuine by East Perfumes.
            </p>

            {/* Product card */}
            {product && (
              <div style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '1.25rem',
                marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <img src={product.image} alt={product.name} style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>{product.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', textTransform: 'capitalize', marginBottom: '0.3rem' }}>{product.category}</div>
                  <div className="badge badge-gold">NFC: {product.nfcCode}</div>
                </div>
              </div>
            )}

            {audioLoaded && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: 'var(--gold)', fontSize: '0.85rem' }}>
                <FaMusic /> Playing brand audio…
              </div>
            )}
          </>
        ) : (
          <>
            {/* Invalid */}
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              <FaTimesCircle style={{ color: '#e74c3c' }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', color: '#e74c3c', marginBottom: '0.5rem' }}>
              Invalid Product Code
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              The NFC code <strong>"{nfcCode}"</strong> does not match any product in our database.
              This product may not be authentic.
            </p>
            <a href="/products" className="btn btn-outline">
              Browse Verified Products
            </a>
          </>
        )}
      </div>
    </div>
  );
}
