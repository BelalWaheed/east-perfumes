import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/profileSlice';
import {
  FaTachometerAlt, FaBoxOpen, FaUsers, FaSignOutAlt, FaPlusCircle,
} from 'react-icons/fa';

const adminLinks = [
  { to: '/admin',          label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/admin/products', label: 'Products',  icon: FaBoxOpen },
  { to: '/admin/users',    label: 'Users',     icon: FaUsers },
];

export default function AdminNav() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  return (
    <header
      role="banner"
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 1rem',
        position: 'sticky', top: 0, zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🕌</span>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              East Perfumes
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Admin Panel
            </div>
          </div>
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.45rem 0.875rem', borderRadius: 8,
                textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                background: isActive ? 'var(--gold-glow)' : 'transparent',
                transition: 'all 0.2s ease',
              })}
            >
              <Icon size={13} /> {label}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <NavLink
            to="/admin/products/add"
            className="btn btn-gold btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <FaPlusCircle size={12} /> Add Product
          </NavLink>
          <button
            id="admin-logout-btn"
            className="btn btn-ghost btn-sm"
            onClick={() => { dispatch(logout()); navigate('/'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e74c3c' }}
          >
            <FaSignOutAlt size={13} /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
