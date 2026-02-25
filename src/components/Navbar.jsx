import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/profileSlice';
import { toggleTheme } from '@/redux/slices/themeSlice';
import AudioPlayer from '@/components/AudioPlayer';
import {
  FaSun, FaMoon, FaBars, FaTimes, FaUser, FaSignOutAlt,
  FaShieldAlt, FaHome, FaFlask,
} from 'react-icons/fa';

const navLinks = [
  { to: '/',         label: 'Home',     icon: FaHome },
  { to: '/products', label: 'Products', icon: FaFlask },
];

export default function Navbar() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { isDark } = useSelector((s) => s.theme);
  const { logged, loggedUser } = useSelector((s) => s.profile);
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const isAdmin = loggedUser?.role === 'admin';

  const handleLogout = () => {
    dispatch(logout());
    setDropOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar" role="banner">
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🕌</span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            East Perfumes
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="hidden md:flex">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: '0.45rem 1rem',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                background: isActive ? 'var(--gold-glow)' : 'transparent',
                transition: 'all 0.2s ease',
              })}
            >
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                padding: '0.45rem 1rem',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                background: isActive ? 'var(--gold-glow)' : 'transparent',
              })}
            >
              <FaShieldAlt size={12} /> Admin
            </NavLink>
          )}
        </nav>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AudioPlayer />

          {/* Theme toggle */}
          <button
            id="theme-toggle"
            className="btn btn-ghost"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
            style={{ padding: '0.45rem', borderRadius: 8 }}
          >
            {isDark ? <FaSun color="var(--gold)" /> : <FaMoon color="var(--text-muted)" />}
          </button>

          {/* Auth */}
          {logged ? (
            <div style={{ position: 'relative' }}>
              <button
                id="user-menu-btn"
                className="btn btn-ghost"
                onClick={() => setDropOpen((p) => !p)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.45rem 0.75rem', borderRadius: 8,
                }}
              >
                <div
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#0d0a05', fontWeight: 700, fontSize: '0.85rem',
                  }}
                >
                  {loggedUser?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--text)', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {loggedUser?.name?.split(' ')[0]}
                </span>
              </button>

              {dropOpen && (
                <div
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 12, overflow: 'hidden',
                    minWidth: 180,
                    boxShadow: 'var(--shadow-gold)',
                    zIndex: 200,
                  }}
                >
                  <Link
                    to="/profile"
                    onClick={() => setDropOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.65rem',
                      padding: '0.75rem 1rem',
                      textDecoration: 'none', color: 'var(--text)',
                      fontSize: '0.875rem',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <FaUser color="var(--gold)" size={13} /> My Profile
                  </Link>
                  <button
                    id="logout-btn"
                    onClick={handleLogout}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.65rem',
                      padding: '0.75rem 1rem', width: '100%',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#e74c3c', fontSize: '0.875rem',
                    }}
                  >
                    <FaSignOutAlt size={13} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-gold btn-sm">Sign In</Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="btn btn-ghost md:hidden"
            onClick={() => setOpen((p) => !p)}
            aria-label="Menu"
            style={{ padding: '0.45rem' }}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
            background: 'var(--surface)',
          }}
        >
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.65rem 0.75rem', borderRadius: 8,
                textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
                color: isActive ? 'var(--gold)' : 'var(--text)',
                background: isActive ? 'var(--gold-glow)' : 'transparent',
              })}
            >
              <Icon size={14} /> {label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 0.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', color: 'var(--gold)' }}>
              <FaShieldAlt size={14} /> Admin Panel
            </NavLink>
          )}
          {!logged && (
            <Link to="/login" onClick={() => setOpen(false)} className="btn btn-gold btn-full" style={{ marginTop: '0.5rem' }}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
