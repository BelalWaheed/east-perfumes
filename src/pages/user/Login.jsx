import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedUser, setLogged } from '@/redux/slices/profileSlice';
import { useSEO } from '@/hooks/useSEO';
import { userApi } from '@/lib/api';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Login() {
  useSEO({ title: 'Sign In', description: 'Sign in to your East Perfumes account' });

  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      Swal.fire('Missing fields', 'Please fill all fields.', 'warning'); return;
    }
    setLoading(true);
    try {
      const users     = await userApi.getAll();
      const matched   = users.find(
        (u) => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password
      );
      if (!matched) {
        Swal.fire('Invalid Credentials', 'Email or password is incorrect.', 'error'); return;
      }
      localStorage.setItem('ep-userId', matched.id);
      dispatch(setLoggedUser(matched));
      dispatch(setLogged(true));
      Swal.fire({ title: `Welcome back, ${matched.name}! 🌹`, icon: 'success', timer: 1500, showConfirmButton: false });
      navigate(matched.role === 'admin' ? '/admin' : '/');
    } catch {
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, background: 'radial-gradient(circle, var(--gold-glow), transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: 420, padding: '2.5rem', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🕌</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', marginBottom: '0.25rem' }}>
            Welcome <span className="gradient-gold">Back</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sign in to your account</p>
        </div>

        <form onSubmit={submit} noValidate>
          <div className="form-group">
            <label className="label" htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.85rem' }} />
              <input id="email" name="email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={handle} style={{ paddingLeft: '2.25rem' }} required />
            </div>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.85rem' }} />
              <input id="password" name="password" type={showPass ? 'text' : 'password'} className="input" placeholder="••••••••" value={form.password} onChange={handle} style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }} required />
              <button type="button" onClick={() => setShowPass((p) => !p)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: 4 }}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button id="login-btn" type="submit" className="btn btn-gold btn-full btn-lg" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="divider" />
        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/sign-up" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
