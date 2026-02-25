import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSEO } from '@/hooks/useSEO';
import { logout, updateProfile } from '@/redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom';
import { formatEGP } from '@/lib/utils';
import { FaGem, FaBoxOpen, FaSignOutAlt, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function UserProfile() {
  useSEO({ title: 'My Profile', description: 'Manage your East Perfumes profile and loyalty points' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useSelector((s) => s.profile);
  const { products }   = useSelector((s) => s.products);

  const [editing, setEditing] = useState(false);
  const [form, setForm]  = useState({ name: loggedUser?.name || '', email: loggedUser?.email || '' });
  const [saving, setSaving] = useState(false);

  if (!loggedUser) return null;

  const purchased = products.filter((p) => loggedUser.purchasedProducts?.includes(p.id));

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      Swal.fire('Missing fields', 'Name and email are required.', 'warning'); return;
    }
    setSaving(true);
    try {
      await dispatch(updateProfile({ id: loggedUser.id, data: { name: form.name.trim(), email: form.email.trim() } })).unwrap();
      setEditing(false);
      Swal.fire({ title: 'Profile Updated!', icon: 'success', timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire('Error', 'Could not save profile.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        {/* Header card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', fontWeight: 700, color: '#0d0a05',
            flexShrink: 0,
          }}>
            {loggedUser.name?.[0]?.toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            {editing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input className="input" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Name" style={{ maxWidth: 300 }} />
                <input className="input" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" type="email" style={{ maxWidth: 300 }} />
              </div>
            ) : (
              <>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.2rem' }}>{loggedUser.name}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{loggedUser.email}</p>
                <span className={`badge ${loggedUser.role === 'admin' ? 'badge-gold' : 'badge-green'}`} style={{ marginTop: '0.4rem' }}>{loggedUser.role}</span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {editing ? (
              <>
                <button className="btn btn-gold btn-sm" onClick={handleSave} disabled={saving}><FaCheck /> Save</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}><FaTimes /></button>
              </>
            ) : (
              <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}><FaEdit /> Edit</button>
            )}
            <button className="btn btn-ghost btn-sm" onClick={() => { dispatch(logout()); navigate('/'); }} style={{ color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Points cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Points',      val: loggedUser.totalPoints     || 0, color: 'var(--gold)' },
            { label: 'Available Points',  val: loggedUser.availablePoints || 0, color: '#27ae60' },
            { label: 'Used Points',       val: loggedUser.usedPoints      || 0, color: '#e74c3c' },
            { label: 'Discount Value',    val: `${formatEGP((loggedUser.availablePoints || 0) * 0.5)}`, color: 'var(--gold)' },
          ].map(({ label, val, color }) => (
            <div key={label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <FaGem style={{ color, fontSize: '1.5rem', marginBottom: '0.5rem' }} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color }}>{val}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Purchased products */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <FaBoxOpen style={{ color: 'var(--gold)' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem' }}>My Fragrances</h2>
            <span className="badge badge-gold">{purchased.length}</span>
          </div>
          {purchased.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem', fontSize: '0.9rem' }}>
              No fragrances yet.{' '}
              <a href="/products" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Browse collection →</a>
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
              {purchased.map((p) => (
                <div key={p.id} className="card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: 90, objectFit: 'contain', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{p.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
