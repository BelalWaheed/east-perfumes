import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedUser, setLogged } from '@/redux/slices/profileSlice';
import { addNewUser } from '@/redux/slices/userSlice';
import { useSEO } from '@/hooks/useSEO';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function SignUp() {
  useSEO({ title: 'Create Account', description: 'Join East Perfumes and start earning loyalty points' });

  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      Swal.fire('Missing fields', 'Please fill all fields.', 'warning'); return;
    }
    if (form.password !== form.confirm) {
      Swal.fire('Password Mismatch', 'Passwords do not match.', 'warning'); return;
    }
    if (form.password.length < 6) {
      Swal.fire('Weak Password', 'Password must be at least 6 characters.', 'warning'); return;
    }

    setLoading(true);
    try {
      const newUser = await dispatch(addNewUser({
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        role: 'user',
        purchasedProducts: [],
        totalPoints: 0,
        usedPoints: 0,
        availablePoints: 0,
        audioURL: '',
      })).unwrap();

      localStorage.setItem('ep-userId', newUser.id);
      dispatch(setLoggedUser(newUser));
      dispatch(setLogged(true));
      Swal.fire({ title: `Welcome, ${newUser.name}! 🌹`, text: 'Your account has been created.', icon: 'success', timer: 2000, showConfirmButton: false });
      navigate('/');
    } catch {
      Swal.fire('Error', 'Could not create account. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, background: 'radial-gradient(circle, var(--gold-glow), transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: 420, padding: '2.5rem', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌹</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', marginBottom: '0.25rem' }}>
            Join <span className="gradient-gold">East Perfumes</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Create your account and earn loyalty points</p>
        </div>

        <form onSubmit={submit} noValidate>
          {[
            { id: 'name',     name: 'name',     type: 'text',     icon: FaUser,     placeholder: 'Your full name',    label: 'Full Name' },
            { id: 'email',    name: 'email',    type: 'email',    icon: FaEnvelope, placeholder: 'you@example.com',   label: 'Email' },
          ].map(({ id, name, type, icon: Icon, placeholder, label }) => (
            <div className="form-group" key={id}>
              <label className="label" htmlFor={id}>{label}</label>
              <div style={{ position: 'relative' }}>
                <Icon style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.85rem' }} />
                <input id={id} name={name} type={type} className="input" placeholder={placeholder} value={form[name]} onChange={handle} style={{ paddingLeft: '2.25rem' }} required />
              </div>
            </div>
          ))}

          <div className="form-group">
            <label className="label" htmlFor="signup-password">Password</label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.85rem' }} />
              <input id="signup-password" name="password" type={showPass ? 'text' : 'password'} className="input" placeholder="Min. 6 characters" value={form.password} onChange={handle} style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }} required />
              <button type="button" onClick={() => setShowPass((p) => !p)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: 4 }}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="confirm">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.85rem' }} />
              <input id="confirm" name="confirm" type="password" className="input" placeholder="Repeat password" value={form.confirm} onChange={handle} style={{ paddingLeft: '2.25rem' }} required />
            </div>
          </div>

          <button id="signup-btn" type="submit" className="btn btn-gold btn-full btn-lg" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <div className="divider" />
        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
