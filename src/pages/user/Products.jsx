import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

export default function Products() {
  useSEO({ title: 'Our Products', description: 'Browse our full collection of authentic Eastern luxury perfumes.' });

  const { products, loading } = useSelector((s) => s.products);
  const [params, setParams]   = useSearchParams();
  const [search, setSearch]   = useState('');
  const [sortBy, setSortBy]   = useState('default');

  const activeCategory = params.get('category') || '';
  const categories     = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }

    // Sort
    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'discount')   list.sort((a, b) => b.discount - a.discount);

    return list;
  }, [products, activeCategory, search, sortBy]);

  if (loading) return <Loader />;

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.4rem' }}>
            Our <span className="gradient-gold">Collection</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>{filtered.length} fragrances available</p>
        </div>

        {/* Filters Row */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
            <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.85rem' }} />
            <input
              id="product-search"
              className="input"
              placeholder="Search fragrances…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.25rem' }}
            />
          </div>

          {/* Sort */}
          <select
            id="sort-select"
            className="input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: 'auto', minWidth: 160 }}
          >
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="discount">Most Discounted</option>
          </select>
        </div>

        {/* Category tabs */}
        {categories.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <button
              id="cat-all"
              className={`btn btn-sm ${!activeCategory ? 'btn-gold' : 'btn-outline'}`}
              onClick={() => setParams({})}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-${cat}`}
                className={`btn btn-sm ${activeCategory === cat ? 'btn-gold' : 'btn-outline'}`}
                onClick={() => setParams({ category: cat })}
                style={{ textTransform: 'capitalize' }}
              >
                {cat}
              </button>
            ))}
            {activeCategory && (
              <button
                id="clear-cat"
                className="btn btn-ghost btn-sm"
                onClick={() => setParams({})}
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)' }}
              >
                <FaTimes size={11} /> Clear
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
            <FaFilter style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.4 }} />
            <p>No fragrances match your filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
