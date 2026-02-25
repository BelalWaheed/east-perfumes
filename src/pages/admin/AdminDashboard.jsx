import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { calcFinalPrice } from '@/lib/utils';
import { FaBoxOpen, FaUsers, FaGem, FaTag } from 'react-icons/fa';

export default function AdminDashboard() {
  useSEO({ title: 'Admin Dashboard' });
  const { products } = useSelector((s) => s.products);
  const { allUsers } = useSelector((s) => s.user);

  const totalDiscount = products.filter((p) => p.discount > 0).length;
  const categories    = [...new Set(products.map((p) => p.category))];

  const stats = [
    { icon: FaBoxOpen, label: 'Total Products',   value: products.length,   color: 'var(--gold)',  link: '/admin/products' },
    { icon: FaUsers,   label: 'Total Users',       value: allUsers.length,   color: '#27ae60',      link: '/admin/users' },
    { icon: FaTag,     label: 'On Discount',       value: totalDiscount,     color: '#e67e22',      link: '/admin/products' },
    { icon: FaGem,     label: 'Categories',        value: categories.length, color: '#8e44ad',      link: '/admin/products' },
  ];

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '0.4rem' }}>
          Welcome to <span className="gradient-gold">East Perfumes</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Admin Control Center</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {stats.map(({ icon: Icon, label, value, color, link }) => (
            <Link key={label} to={link} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '1.5rem', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon style={{ color, fontSize: '1.2rem' }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color, marginBottom: '0.2rem' }}>{value}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/admin/products/add" className="btn btn-gold btn-lg">+ Add Product</Link>
          <Link to="/admin/users/add"    className="btn btn-outline btn-lg">+ Add User</Link>
          <Link to="/"                   className="btn btn-ghost btn-lg">← View Storefront</Link>
        </div>
      </div>
    </div>
  );
}
