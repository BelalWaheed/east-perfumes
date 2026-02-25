import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

export default function NotFound() {
  useSEO({ title: '404 – Page Not Found' });
  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '6rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1 }} className="gradient-gold">404</div>
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🕌</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem', maxWidth: 360 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-gold btn-lg">Return Home</Link>
    </div>
  );
}
