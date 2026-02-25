import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSEO } from '@/hooks/useSEO';
import ProductCard from '@/components/ProductCard';
import { FaArrowRight, FaStar, FaShieldAlt, FaTruck, FaGem } from 'react-icons/fa';

export default function Home() {
  useSEO({
    title: 'Luxury Fragrances',
    description: 'Discover authentic luxury perfumes from the East. Premium oud, musk, and Arabic fragrances.',
    keywords: 'east perfumes, luxury fragrances, oud, arabic perfume, authentic',
  });

  const { products } = useSelector((s) => s.products);
  const featured   = useMemo(() => products.slice(0, 4), [products]);
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))].slice(0, 4), [products]);

  const features = [
    { icon: FaStar,       title: 'Premium Quality',    desc: 'Handpicked authentic fragrances' },
    { icon: FaShieldAlt,  title: 'NFC Verified',       desc: 'Every bottle is authenticated' },
    { icon: FaTruck,      title: 'Fast Delivery',      desc: 'Swift delivery across Egypt' },
    { icon: FaGem,        title: 'Loyalty Rewards',    desc: '1 EGP = 1 point on every purchase' },
  ];

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: 'calc(100vh - 68px)',
          display: 'flex', alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Glow blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, var(--gold-glow), transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '45%', height: '45%', background: 'radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)', borderRadius: '50%' }} />
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', padding: '4rem 1rem', position: 'relative' }}>
          {/* Text */}
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="badge badge-gold" style={{ alignSelf: 'flex-start', padding: '0.4rem 1rem' }}>
              🌹 New Collection Available
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
              <span className="gradient-gold">Discover</span>
              <br />
              <span style={{ color: 'var(--text)' }}>The Scent of</span>
              <br />
              <span style={{ color: 'var(--text)' }}>the <em>East</em></span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 420 }}>
              Authentic luxury fragrances crafted from the finest oud, musk, and rose — each bottle a testament to Eastern heritage and craftsmanship.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-gold btn-lg">
                Shop Now <FaArrowRight />
              </Link>
              <Link to="/products" className="btn btn-outline btn-lg">
                View Collection
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2.5rem', paddingTop: '1rem' }}>
              {[
                { val: `${products.length}+`, label: 'Fragrances' },
                { val: '10K+', label: 'Happy Customers' },
                { val: '100%', label: 'Authentic' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700 }} className="gradient-gold">{val}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div
              className="animate-float"
              style={{
                width: 380, height: 380, borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--surface-raised)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, var(--gold-glow), transparent 70%)' }} />
              {featured[0] && (
                <img src={featured[0].image} alt={featured[0].name} style={{ maxWidth: '65%', maxHeight: '65%', objectFit: 'contain', position: 'relative' }} />
              )}
            </div>
            {/* Small floating pills */}
            {featured[1] && (
              <div className="card animate-float" style={{ position: 'absolute', top: 20, right: 0, width: 90, height: 90, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', animationDelay: '0.5s' }}>
                <img src={featured[1].image} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            )}
            {featured[2] && (
              <div className="card animate-float" style={{ position: 'absolute', bottom: 30, left: 0, width: 80, height: 80, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', animationDelay: '1s' }}>
                <img src={featured[2].image} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '4rem 1rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'var(--gold-glow)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <Icon style={{ color: 'var(--gold)', fontSize: '1.25rem' }} />
              </div>
              <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.35rem', color: 'var(--text)' }}>{title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.4rem' }}>
                <span className="gradient-gold">Featured</span> Collection
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Our most sought-after fragrances</p>
            </div>
            <Link to="/products" className="btn btn-outline">View All <FaArrowRight style={{ marginLeft: 6 }} /></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      {categories.length > 0 && (
        <section className="section" style={{ paddingTop: 0, background: 'var(--surface-raised)' }}>
          <div className="container">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Shop by <span className="gradient-gold">Category</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {categories.map((cat) => {
                const catProds = products.filter((p) => p.category === cat);
                return (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="card"
                    style={{
                      textDecoration: 'none', overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                    }}
                  >
                    <div style={{ height: 160, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                      {catProds[0] && (
                        <img src={catProds[0].image} alt={cat} style={{ maxHeight: 130, objectFit: 'contain' }} />
                      )}
                    </div>
                    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', textTransform: 'capitalize' }}>{cat}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{catProds.length} items</div>
                      </div>
                      <FaArrowRight style={{ color: 'var(--gold)' }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
