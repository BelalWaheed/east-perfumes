import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 1rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🕌</span>
              <span style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem',
                background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                East Perfumes
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 220 }}>
              Authentic luxury fragrances from the East. Every bottle tells a story of heritage and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gold)', marginBottom: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Quick Links
            </h3>
            {[['/', 'Home'], ['/products', 'Products'], ['/login', 'Sign In']].map(([to, label]) => (
              <Link
                key={to} to={to}
                style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '0.4rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gold)', marginBottom: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#25d366', fontSize: '0.875rem', textDecoration: 'none' }}>
                <FaWhatsapp /> WhatsApp
              </a>
              <a href="mailto:info@eastperfumes.com"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none' }}>
                <FaEnvelope /> info@eastperfumes.com
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e1306c', fontSize: '0.875rem', textDecoration: 'none' }}>
                <FaInstagram /> @eastperfumes
              </a>
            </div>
          </div>
        </div>

        <div className="divider" />
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
          © {year} East Perfumes. All rights reserved. | Crafted with elegance 🌹
        </p>
      </div>
    </footer>
  );
}
